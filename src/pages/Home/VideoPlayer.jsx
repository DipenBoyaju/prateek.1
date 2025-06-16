const VideoPlayer = () => {
  return (
    <div className="py-20 px-4 md:px-0 relative">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto w-full h-full flex justify-center items-center">
          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Fzxre3r_-ys"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
