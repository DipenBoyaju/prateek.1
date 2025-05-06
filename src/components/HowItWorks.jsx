import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useEffect } from "react";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const HowItWorks = () => {

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-[30vh] overflow-hidden bg-gray-950 px-4 py-16 text-gray-200">
      <div className="container mx-auto px-4 md:px-8 pt-10">
        <h3 className="font-bold text-2xl md:text-3xl">How it works</h3>
        <div className="grid  md:grid-cols-3 pt-4 gap-4 md:gap-0">
          <div className="p-3 border border-zinc-200 rounded-md backdrop-blur-3xl">
            <h3 className="font-semibold text-white text-lg">Enable Camera</h3>
            <p className="text-zinc-200 text-sm pt-2">Allow access to your webcam for real-time sign detection.</p>
          </div>
          <div className="p-3 border border-zinc-200 rounded-sm text-lg backdrop-blur-3xl">
            <h3 className="font-semibold text-zinc-200">Perform Signs</h3>
            <p className="text-zinc-200 text-sm pt-2">Show a sign gesture in front of the camera.</p>
          </div>
          <div className="p-3 border border-zinc-200 rounded-sm text-lg backdrop-blur-3xl">
            <h3 className="font-semibold text-white">Get Translation</h3>
            <p className="text-zinc-200 text-sm pt-2">The system will recognize and display the meaning of your sign.</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  )
}
export default HowItWorks