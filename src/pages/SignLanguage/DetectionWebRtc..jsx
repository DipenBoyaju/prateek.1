import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import toast from "react-hot-toast";

const SignLanguageRtc = () => {
  const localVideoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [signText, setSignText] = useState(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    let localVideo = localVideoRef.current;
    if (!isCameraOn) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        // Set up WebRTC peer connection
        setupWebRTC(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        toast.error("Unable to access the camera. Please check permissions.");
      });

    // Cleanup on unmount
    return () => {
      if (localVideo && localVideo.srcObject) {
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const setupWebRTC = (stream) => {
    peerConnectionRef.current = new RTCPeerConnection();

    // Add video stream to the connection
    stream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, stream);
    });

    peerConnectionRef.current.ontrack = (event) => {
      const remoteStream = event.streams[0];
      // Handle the received video stream from the backend
      // This could be the processed video or detected text from backend
      remoteStream.onaddtrack = (e) => {
        const videoElement = document.createElement("video");
        videoElement.srcObject = remoteStream;
        videoElement.play();
        document.body.appendChild(videoElement);
      };
    };

    // Use WebRTC to create an offer, send to backend, and receive answer
    peerConnectionRef.current.createOffer().then((offer) => {
      return peerConnectionRef.current.setLocalDescription(offer);
    });
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  return (
    <div>
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-6 md:h-[80vh]">
          <div className="md:col-span-4 bg-zinc-800 p-2 h-[50vh] md:h-[80vh]">
            {isCameraOn ? (
              <div className="relative">
                <div className="h-[50vh] md:h-[80vh] w-full">
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
          <div className="md:col-span-2 h-[30vh] md:h-[80vh] bg-zinc-700 p-5 relative">
            <div className="z-20 relative">
              <span className="bg-zinc-50 p-2 rounded-sm">Text Display</span>
              <p className="mt-2 text-white">{signText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageRtc;
