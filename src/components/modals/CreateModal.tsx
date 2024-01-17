import { motion, AnimatePresence } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import {
  modalBackDropVariants,
  modalVariants,
} from "../../animations/modal.animation";
import toast from "react-hot-toast";
import { Loading } from "..";

type TProps = {
  fileId?: string;
  isFolder: boolean;
  handleToggle: () => void;
  toggleModal: (val: boolean) => void;
};

const CreateModal = ({
  fileId,
  isFolder,
  toggleModal,
  handleToggle,
}: TProps) => {
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
      toast.success(`${isFolder ? "Folder" : "File"} Created`);
    } catch (error) {
      console.log(error);
      toast.error(`${isFolder ? "Folder" : "File"} create Error`);
    } finally {
      handleCancel();
      handleToggle();
    }
  };

  const handleCancel = () => {
    toggleModal(false);
    reset();
  };

  return (
    <>
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
              <button className="px-2" onClick={handleCancel}>
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
                className="border py-0.5 px-2 w-full rounded focus:outline-gray-500"
                placeholder="Enter folder Name"
                maxLength={12}
                autoFocus
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
      </AnimatePresence>

      {isSubmitting && <Loading />}
    </>
  );
};

export default CreateModal;
