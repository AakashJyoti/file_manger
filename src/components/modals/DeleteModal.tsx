import { AnimatePresence, motion } from "framer-motion";
import {
  modalBackDropVariants,
  modalVariants,
} from "../../animations/modal.animation";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

type Props = {
  showModal: boolean;
  fileId: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteModal = ({ showModal, setShowModal, fileId }: Props) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/file/deleteFile?id=${fileId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showModal ? (
        <motion.div
          className="fixed top-0 left-0 w-[100%] h-[100%] z-10 bg-[rgba(0,0,0,0.5)]"
          variants={modalBackDropVariants}
          animate="final"
          initial="initial"
          exit="exit"
        >
          <motion.div
            className="w-max-[400px] my-0 mx-auto px-[20px] py-[40px] bg-white rounded-lg"
            variants={modalVariants}
          >
            <p>Confirm Deletion</p>
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default DeleteModal;
