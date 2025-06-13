// "use client"

// import Lottie from "lottie-react";

// const AnimationLottie = ({ animationPath, width }) => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationPath,
//     style: {
//       width: '95%',
//     }
//   };

//   return (
//     <Lottie {...defaultOptions} />
//   );
// };

// export default AnimationLottie;

"use client";
import { motion } from "framer-motion";

const Animation = () => {
  return (
    <motion.div
      // style={{ width: 200, height: 200 }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <img
        src="/exp4.png"
        alt="Experience Icon"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        className="rounded"
      />
    </motion.div>
  );
};

export default Animation;
