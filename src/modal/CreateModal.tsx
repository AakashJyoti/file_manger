import { motion, AnimatePresence } from "framer-motion";
import {
  modalBackDropVariants,
  modalVariants,
} from "../animations/modal.animation";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";

type Props = {
  showModal: boolean;
  fileId: string;
  isFolder: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const CreateModal = ({ showModal, setShowModal, fileId, isFolder }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleFormSubmit = async (data: FieldValues) => {
    try {
      let requestPackage = JSON.stringify({
        fileName: data.name,
        isFolder: isFolder,
        parentFolder: fileId,
      });
      await axios.post("api/file/createFile", requestPackage);
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
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              onReset={handleCancel}
            >
              <input
                type="text"
                placeholder="Folder Name"
                {...register("name", {
                  required: "Name field id required",
                })}
              />
              <div>
                <button type="reset">Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CreateModal;
