import {
  modalBackDropVariants,
  modalVariants,
} from "@/animations/modal.animation";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full z-50 bg-[rgba(0,0,0,0.86)] flex justify-center items-center ">
      <span className="loader"></span>
    </div>
  );
};
export default Loading;
