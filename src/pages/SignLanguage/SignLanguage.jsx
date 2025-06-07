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
  // Get the pixel data
  const data = imageData.data;

  // Count skin-colored pixels
  let skinPixelCount = 0;
  const totalPixels = width * height;

  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Simple skin color detection
    if (r > 60 && g > 40 && b > 20 &&
      r > g && r > b &&
      r - g > 15 &&
      r - b > 15) {
      skinPixelCount++;
    }
  }

  // Calculate percentage of skin-colored pixels
  const skinPercentage = (skinPixelCount / (totalPixels / 4)) * 100;

  // Return true if enough skin-colored pixels are detected
  return skinPercentage > 5; // Threshold percentage
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

  const startCamera = async () => {
    try {
      console.log("Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().then(() => {
          console.log("Camera started successfully");
          setIsCameraOn(true);
          setMessage("Camera enabled. Show your hand to the camera.");
        }).catch(err => {
          console.error("Error playing video:", err);
          setMessage("Error starting video playback. Please try again.");
        });
      };
    } catch (err) {
      console.error("Error accessing camera:", err);
      setMessage("Error accessing camera. Please check permissions and try again.");
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
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
    console.log("Camera stopped");
  };

  const captureFrameAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current || !isCameraOn) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ensure video is ready
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.log("Video not ready yet");
      return;
    }

    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for hand detection
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Detect if hand is present
    const handDetected = detectHand(imageData, canvas.width, canvas.height);
    setIsHandDetected(handDetected);

    // Only send API request if hand is detected
    if (handDetected) {
      console.log("Hand detected, sending API request");
      setIsLoading(true);

      // Convert canvas to base64 image
      const base64Image = canvas.toDataURL("image/jpeg", 0.7);

      try {
        const res = await axios.post("https://signlanguage-api.onrender.com/predict", {
          image: base64Image,
        });

        // Get confidence score from response
        const confidenceScore = res.data.confidence || 0;
        setConfidence(confidenceScore);

        // Only show prediction if confidence is above 70%
        if (confidenceScore >= 70) {
          const predictionResult = res.data.sign || "";

          if (res.data.audio) {
            const audio = new Audio(`${window.location.origin}${res.data.audio}`);
            audio.play();
          }

          setPrediction(predictionResult);
          setMessage(res.data.message || "");
        } else {
          setPrediction("");
          setMessage("Please try again. Accuracy is below 70%.");
        }
      } catch (err) {
        console.error("Prediction error:", err);
        setMessage("Error making prediction.");
        setConfidence(0);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No hand detected");
      setPrediction("");
      setMessage("No hand detected. Please show your hand to the camera.");
      setConfidence(0);
    }
  };

  useEffect(() => {
    if (!isCameraOn) return;

    console.log("Setting up detection interval");
    const id = setInterval(() => {
      captureFrameAndDetect();
    }, 1000); // Check every second

    setIntervalId(id);

    return () => {
      console.log("Clearing detection interval");
      clearInterval(id);
    };
  }, [isCameraOn]);

  return (
    <div>
      <HowItWorks />
      <div className="container mx-auto px-4 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 md:h-[80vh]">
          <div className="md:col-span-3">
            <div className="">
              <CardSlider />
            </div>
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

                  {/* Hand detection status indicator */}
                  <div className="absolute right-2 top-2 flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${isHandDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                      {isLoading ? 'Processing...' : isHandDetected ? 'Hand Detected' : 'No Hand Detected'}
                    </span>
                  </div>

                  {/* Confidence score indicator */}
                  {/* {isHandDetected && confidence > 0 && (
                    <div className="absolute left-2 top-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${confidence >= 70 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs mt-1 block">
                        Accuracy: {confidence.toFixed(1)}%
                      </span>
                    </div>
                  )} */}
                </>
              ) : (
                <div className="flex items-center flex-col justify-center absolute inset-0">
                  <Camera size={52} className="text-purple-400 bg-amber p-3 rounded-full" />
                  <button
                    onClick={startCamera}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Enable Camera
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-3 h-[30vh] md:h-[80vh] bg-zinc-700 relative overflow-hidden mt-5 md: mt-0" style={{ backgroundImage: `url('/textbg.jpeg')` }}>
            <div className="relative z-20 p-5">
              {prediction ? (
                <span className="bg-zinc-50 p-2 rounded-sm text-black text-lg">
                  {nepaliTranslations[prediction.toLowerCase()] || ""}
                </span>
              ) : (
                <span className="bg-zinc-50 p-2 rounded-sm text-black text-lg opacity-50">
                  {message === "Please try again. Accuracy is below 70%." ? "Please try again" : "Waiting..."}
                </span>
              )}
              {message && (
                <div className="mt-4 bg-white bg-opacity-80 p-2 rounded text-black">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguage;

