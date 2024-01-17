"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Comp, Loading, SubHeader } from "@/components";
import { CreateModal, DeleteModal, UpdateModal } from "@/components/modals";
import toast from "react-hot-toast";

const Home = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [selectedComp, setSelectedComp] = useState<TFileData>();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/file/getFolderFiles");
        setContent(data.data);
      } catch (error) {
        console.log(error);
        toast.error(`Server error please try again later`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [toggle]);

  const handleToggle = () => setToggle((prev) => !prev);
  const handleSelectComp = (val: TFileData | undefined) => setSelectedComp(val);
  const handleCreateFolder = (val: boolean) => setCreateFolder(val);
  const toggleDeleteModal = (val: boolean) => setOpenDeleteModal(val);
  const toggleCreateModal = (val: boolean) => setOpenCreateModal(val);
  const toggleUpdateModal = (val: boolean) => setOpenUpdateModal(val);
  const toggleLoading = (val: boolean) => setIsLoading(val);

  return (
    <>
      <SubHeader
        handleSelectComp={handleSelectComp}
        toggleCreateModal={toggleCreateModal}
        handleCreateFolder={handleCreateFolder}
      />

      <div className="h-screen lg:h-[400px] p-3 overflow-y-auto bg-white grid  lg:grid-cols-7 grid-cols-2">
        {content?.map((file) => (
          <Comp
            key={file._id}
            fileContent={file}
            handleSelectComp={handleSelectComp}
            selectedComp={selectedComp}
            toggleDeleteModal={toggleDeleteModal}
            toggleUpdateModal={toggleUpdateModal}
          />
        ))}
      </div>
      {isLoading && <Loading />}
      {openDeleteModal && (
        <DeleteModal
          toggleModal={toggleDeleteModal}
          toggleLoading={toggleLoading}
          fileId={selectedComp?._id}
          handleToggle={handleToggle}
        />
      )}
      {openCreateModal && (
        <CreateModal
          toggleModal={toggleCreateModal}
          fileId={selectedComp?._id}
          isFolder={createFolder}
          handleToggle={handleToggle}
          toggleLoading={toggleLoading}
        />
      )}
      {openUpdateModal && (
        <UpdateModal
          toggleModal={toggleUpdateModal}
          selectedComp={selectedComp}
          handleToggle={handleToggle}
          toggleLoading={toggleLoading}
        />
      )}
    </>
  );
};

export default Home;
