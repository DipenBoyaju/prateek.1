import { useEffect, useRef, useState } from "react";
import HowItWorks from "../../components/HowItWorks"
import toast from "react-hot-toast";
import { Camera, CameraOff } from "lucide-react";

const SignLanguage = () => {
  const localVideoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [signText, setSignText] = useState(null);

  useEffect(() => {
    let localVideo = localVideoRef.current;
    if (!isCameraOn) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        // Start sending frames to the backend for sign language detection
        const interval = setInterval(() => {
          captureFrameAndSend(stream); // Capture and send every few seconds
        }, 2000);

        return () => clearInterval(interval); // Clean up interval on unmount
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error)
        toast.error('Unable to access the camera. Please check permissions.')

      });

    // Cleanup on unmount
    return () => {
      if (localVideo && localVideo.srcObject) {
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const captureFrameAndSend = () => {
    const canvas = document.createElement('canvas');
    const video = localVideoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg'); // Convert the canvas image to base64

    // Send the frame to the backend API for sign language detection
    fetch('http://localhost:8000/api/detect-sign-language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detectedSign) {
          setSignText(data.detectedSign); // Update the detected sign text
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  return (
    <div>
      <HowItWorks />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-6 md:h-[80vh]">
          <div className="md:col-span-4 bg-zinc-800 p-2 h-[50vh] md:h-[80vh]">
            {isCameraOn ? (
              <div className="relative">
                <div className="h-[50vh] md:h-[80vh] w-full">
                  {/* Local webcam stream */}
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    className="video-mirror rounded-lg w-full h-full object-cover"
                  />
                </div>

                <button
                  onClick={toggleCamera}
                  className="absolute left-1 top-1/2 -translate-y-1/2 p-3 rounded-full text-white font-[500] transition bg-red-500 hover:bg-red-600 mt-2 cursor-pointer"
                >
                  <CameraOff size={20} />
                </button>
              </div>
            ) : (
              <div className="h-[50vh] w-full h-full flex items-center justify-center">
                <div className="flex justify-center flex-col items-center bg-zinc-100/10 md:p-10 p-4 rounded-xl gap-4">
                  <Camera size={52} className="text-purple-400 bg-amber p-3 rounded-full" />
                  <button
                    onClick={toggleCamera}
                    className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white py-2 px-4 rounded-lg font-[500] text-sm md:text-base"
                  >
                    Enable Camera
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-2 h-[30vh] md:h-[80vh] bg-zinc-700 p-5 relative" style={{ backgroundImage: `url('/textbg.webp')` }}>
            <div className="absolute top-0 left-0 bg-zinc-600/10 h-full w-full">
            </div>
            <div className="z-20 relative">
              <span className="bg-zinc-50 p-2 rounded-sm">text diaplay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignLanguage