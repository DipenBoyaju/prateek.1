// SignLanguageLiveMode.tsx
import { useEffect, useRef, useState } from "react";
import HowItWorks from "../../components/HowItWorks";
import toast from "react-hot-toast";
import { Camera, CameraOff } from "lucide-react";

const SignLanguageLiveMode = () => {
  const localVideoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [signText, setSignText] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    let stream
    let interval

    if (!isCameraOn) return;

    socketRef.current = new WebSocket("ws://localhost:8000/ws");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSignText(data.translation || "");
    };

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        interval = setInterval(() => {
          sendFrame();
        }, 100); // 10 fps
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast.error("Camera access denied");
      }
    };

    setupCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      clearInterval(interval);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [isCameraOn]);

  const sendFrame = () => {
    const canvas = document.createElement("canvas");
    const video = localVideoRef.current;
    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ image: imageData }));
    }
  };

  return (
    <div>
      <HowItWorks />
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-6 md:h-[80vh]">
          <div className="md:col-span-4 bg-zinc-800 p-2 h-[50vh] md:h-[80vh]">
            {isCameraOn ? (
              <div className="relative h-full">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  className="rounded-lg w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsCameraOn(false)}
                  className="absolute left-1 top-1/2 -translate-y-1/2 p-3 rounded-full text-white bg-red-500 hover:bg-red-600"
                >
                  <CameraOff size={20} />
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center bg-zinc-100/10 p-6 md:p-10 rounded-xl gap-4">
                  <Camera size={52} className="text-purple-400 bg-amber p-3 rounded-full" />
                  <button
                    onClick={() => setIsCameraOn(true)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Enable Camera
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-2 h-[30vh] md:h-[80vh] bg-zinc-700 p-5 relative" style={{ backgroundImage: `url('/textbg.webp')` }}>
            <div className="absolute top-0 left-0 bg-zinc-600/10 h-full w-full" />
            <div className="relative z-20">
              <span className="bg-zinc-50 p-2 rounded-sm text-black text-lg">
                {signText || "Waiting for live sign..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageLiveMode;
