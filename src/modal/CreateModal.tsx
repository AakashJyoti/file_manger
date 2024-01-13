import { motion, AnimatePresence } from "framer-motion";
import {
  modalBackDropVariants,
  modalVariants,
} from "../animations/modal.animation";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";

type Props = {
  fileId: string | undefined;
  isFolder: boolean;
  closeCreateModal: () => void;
};

const CreateModal = ({ fileId, isFolder, closeCreateModal }: Props) => {
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
    closeCreateModal();
    reset();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-50 bg-[rgba(0,0,0,0.86)]"
        variants={modalBackDropVariants}
        animate="final"
        initial="initial"
        exit="exit"
      >
        <motion.div
          className="w-max-[400px] my-0 mx-auto px-[20px] py-[40px] rounded-lg"
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
    </AnimatePresence>
  );
};

export default CreateModal;
