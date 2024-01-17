import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import {
  modalBackDropVariants,
  modalVariants,
} from "../../animations/modal.animation";
import toast from "react-hot-toast";

type Props = {
  fileId: string | undefined;
  handleToggle: () => void;
  toggleModal: (val: boolean) => void;
  toggleLoading: (val: boolean) => void;
};

const DeleteModal = ({
  toggleModal,
  fileId,
  toggleLoading,
  handleToggle,
}: Props) => {
  const handleDelete = async () => {
    try {
      toggleLoading(true);
      await axios.delete(`/api/file/deleteFile?id=${fileId}`);
      toast.success(`Deleted Successful`);
    } catch (error) {
      console.log(error);
      toast.success(`Deletion Error`);
    } finally {
      toggleLoading(false);
      handleToggle();
      toggleModal(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute top-0 right-0 w-full h-full z-10 bg-[rgba(0,0,0,0.86)]"
        variants={modalBackDropVariants}
        animate="final"
        initial="initial"
        exit="exit"
      >
        <motion.div
          className="w-[400px] my-0 mx-auto p-5 rounded-lg bg-white relative"
          variants={modalVariants}
        >
          <div className="absolute top-5 right-5 z-20  rounded hover:bg-gray-200">
            <button className="px-2" onClick={() => toggleModal(false)}>
              X
            </button>
          </div>
          <p className="text-3xl">Confirm Deletion</p>
          <div className="flex justify-evenly py-4">
            <button
              onClick={() => toggleModal(false)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteModal;
