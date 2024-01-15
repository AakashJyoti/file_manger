import { motion, AnimatePresence } from "framer-motion";
import {
  modalBackDropVariants,
  modalVariants,
} from "../../animations/modal.animation";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Loading from "../Loading";

type Props = {
  fileId?: string | undefined;
  isFolder: boolean;
  closeCreateModal: () => void;
  handleToggle: () => void;
};

const CreateModal = ({
  fileId,
  isFolder,
  closeCreateModal,
  handleToggle,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleFormSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      let requestPackage = JSON.stringify({
        fileName: data.name,
        isFolder: isFolder,
        parentFolder: fileId,
      });
      await axios.post("api/file/createFile", requestPackage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleCancel();
      handleToggle();
    }
  };

  const handleCancel = () => {
    closeCreateModal();
    reset();
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
            <button className="px-2" onClick={closeCreateModal}>
              X
            </button>
          </div>
          <p className="text-3xl">Create {isFolder ? "Folder" : "File"}</p>
          <form
            className="px-5 py-2 flex gap-2 flex-col"
            onSubmit={handleSubmit(handleFormSubmit)}
            onReset={handleCancel}
          >
            <input
              type="text"
              className="border py-0.5 px-2 w-full rounded"
              placeholder="Enter folder Name"
              maxLength={12}
              {...register("name", {
                required: "Name field id required",
              })}
            />
            <div className="flex justify-between">
              <button
                type="reset"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Create
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      {isLoading && <Loading />}
    </AnimatePresence>
  );
};

export default CreateModal;
