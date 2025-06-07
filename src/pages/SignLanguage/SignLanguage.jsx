import { useRef, useState, useEffect } from "react";
import axios from "axios";
import HowItWorks from "../../components/HowItWorks";
import { Camera, CameraOff } from "lucide-react";
import CardSlider from "../../components/CardSlider";

const nepaliTranslations = {
  namaskaar: "नमस्कार",
  ma: "म",
  dhanyabaad: "धन्यवाद",
  ghar: "घर",
};

// Simple pixel-based hand detection function
const detectHand = (imageData, width, height) => {
  const data = imageData.data;
  let skinPixelCount = 0;
  const totalPixels = width * height;

  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (
      r > 60 &&
      g > 40 &&
      b > 20 &&
      r > g &&
      r > b &&
      r - g > 15 &&
      r - b > 15
    ) {
      skinPixelCount++;
    }
  }

  const skinPercentage = (skinPixelCount / (totalPixels / 4)) * 100;
  return skinPercentage > 5;
};

const SignLanguage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [message, setMessage] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const API_URL = "https://e2fc0427.sitepreview.org/api";

  const API_URL = "https://signlanguage-api.onrender.com"

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().then(() => {
          setIsCameraOn(true);
          setMessage("Camera enabled. Show your hand to the camera.");
        });
      };
    } catch (err) {
      console.error("Camera error:", err);
      setMessage("Camera access failed. Check permissions.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setPrediction("");
    setMessage("");
    setIsHandDetected(false);
    setConfidence(0);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const captureFrameAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current || !isCameraOn) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const handDetected = detectHand(imageData, canvas.width, canvas.height);
    setIsHandDetected(handDetected);

    if (handDetected) {
      setIsLoading(true);
      const base64Image = canvas.toDataURL("image/jpeg", 0.7);

      try {
        const res = await axios.post(
          `${API_URL}/predict`,
          { image: base64Image },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          }
        );

        const confidenceScore = res.data.confidence || 0;
        setConfidence(confidenceScore);

        if (res.data.success && res.data.sign) {
          setPrediction(res.data.sign);
          setMessage(res.data.message || "Prediction successful!");

          if (res.data.audio) {
            try {
              const audio = new Audio(`${API_URL}${res.data.audio}`);
              await audio.play();
            } catch (audioError) {
              console.error("Audio error:", audioError);
            }
          }
        } else {
          setPrediction("");
          setMessage("Please try again. Sign not recognized clearly.");
        }
      } catch (err) {
        if (err.code === "ECONNABORTED") {
          setMessage("Request timeout. Check your internet connection.");
        } else if (err.response) {
          setMessage(`Server error: ${err.response.status}`);
        } else if (err.request) {
          setMessage("Cannot connect to server.");
        } else {
          setMessage("Prediction failed.");
        }

        setConfidence(0);
        setPrediction("");
      } finally {
        setIsLoading(false);
      }
    } else {
      setPrediction("");
      setMessage("No hand detected.");
      setConfidence(0);
    }
  };

  useEffect(() => {
    if (!isCameraOn) return;
    const id = setInterval(() => {
      captureFrameAndDetect();
    }, 1500);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [isCameraOn]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API_URL}/health`);
        console.log("Backend health:", response.data);
      } catch (error) {
        console.error("Backend health check failed:", error);
      }
    };
    testConnection();
  }, []);

  return (
    <div>
      <HowItWorks />
      <div className="container mx-auto px-4 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 md:h-[80vh]">
          <div className="md:col-span-3">
            <CardSlider />
          </div>

          <div className="md:col-span-6 p-2 h-[50vh] md:h-[80vh]">
            <div className="relative h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full bg-zinc-800 rounded-lg object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {isCameraOn ? (
                <>
                  <button
                    onClick={stopCamera}
                    className="absolute left-1 top-1/2 -translate-y-1/2 p-3 rounded-full text-white bg-red-500 hover:bg-red-600"
                  >
                    <CameraOff size={20} />
                  </button>

                  <div className="absolute right-2 top-2 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${isHandDetected ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></div>
                    <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                      {isLoading
                        ? "Processing..."
                        : isHandDetected
                          ? "Hand Detected"
                          : "No Hand Detected"}
                    </span>
                  </div>

                  {isHandDetected && confidence > 0 && (
                    <div className="absolute left-2 top-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${confidence >= 70 ? "bg-green-500" : "bg-red-500"
                            }`}
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs mt-1 block">
                        Accuracy: {confidence.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center flex-col justify-center absolute inset-0">
                  <Camera size={52} className="text-purple-400 p-3 bg-amber-300 rounded-full" />
                  <button
                    onClick={startCamera}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium mt-4"
                  >
                    Enable Camera
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="md:col-span-3 h-[30vh] md:h-[80vh] bg-zinc-700 relative overflow-hidden mt-5 md:mt-0"
            style={{ backgroundImage: "url('/textbg.jpeg')" }}
          >
            <div className="relative z-20 p-5">
              {prediction ? (
                <div>
                  <span className="bg-zinc-50 p-2 rounded-sm text-black text-lg block mb-2">
                    {prediction}
                  </span>
                  <span className="bg-blue-100 p-2 rounded-sm text-black text-sm block">
                    {nepaliTranslations[prediction.toLowerCase()] || ""}
                  </span>
                </div>
              ) : (
                <p className="text-white">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguage;
