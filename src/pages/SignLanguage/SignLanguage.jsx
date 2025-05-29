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

const SignLanguage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [message, setMessage] = useState("");
  const [intervalId, setIntervalId] = useState(null);



  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
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
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const captureFrameAndDetect = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpeg");

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        image: base64Image,
      });

      const predictionResult = res.data.sign || "";



      if (res.data.audio) {
        const audio = new Audio(`${window.location.origin}${res.data.audio}`);
        audio.play();
      }

      setPrediction(predictionResult);
      setMessage(res.data.message || "");
    } catch (err) {
      console.error("Prediction error:", err);
      setMessage("Error making prediction.");
    }
  };

  useEffect(() => {
    if (isCameraOn && !intervalId) {
      const id = setInterval(() => {
        captureFrameAndDetect();
      }, 2000); // every 2 seconds
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [isCameraOn]);

  return (
    <div>
      <HowItWorks />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-12 md:h-[80vh]">
          <div className="col-span-3">
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
          <div className="md:col-span-3 h-[30vh] md:h-[80vh] bg-zinc-700 relative overflow-y-scroll" style={{ backgroundImage: `url('/textbg.webp')` }}>

            <div className="relative z-20 p-5">
              <span className="bg-zinc-50 p-2 rounded-sm text-black text-lg">
                {/* {prediction && `${prediction}`} */}
                {prediction && nepaliTranslations[prediction.toLowerCase()] || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguage;
