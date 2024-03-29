"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Comp, Loading, SubHeader } from "@/components";
import { CreateModal, DeleteModal, UpdateModal } from "@/components/modals";
import toast from "react-hot-toast";

const Folder = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [currentFolder, setCurrentFolder] = useState<TFileData>();
  const [selectedComp, setSelectedComp] = useState<TFileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);

  const params = useParams();
  const id = params.id[0];

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setIsLoading(true);
          const allSubData = await axios.get(
            `/api/file/getFolderFiles?id=${id}`
          );
          const sortByName = allSubData.data.data.sort(
            (a: TFileData, b: TFileData) => (b.fileName > a.fileName ? 1 : -1)
          );
          const sortedByFileType = sortByName.sort(
            (a: TFileData, b: TFileData) => (b.isFolder > a.isFolder ? 1 : -1)
          );
          setContent(sortedByFileType);
          const currentData = await axios.get(`/api/file/getFolder?id=${id}`);
          setCurrentFolder(currentData.data.data);
        } catch (error) {
          console.log(error);
          toast.error(`Server error please try again later`);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [id, toggle]);

  const handleSelectComp = (val: TFileData | undefined) => setSelectedComp(val);
  const handleCreateFolder = (val: boolean) => setCreateFolder(val);
  const handleToggle = () => setToggle((prev) => !prev);
  const toggleCreateModal = (val: boolean) => setOpenCreateModal(val);
  const toggleDeleteModal = (val: boolean) => setOpenDeleteModal(val);
  const toggleUpdateModal = (val: boolean) => setOpenUpdateModal(val);
  const toggleLoading = (val: boolean) => setIsLoading(val);

  return (
    <>
      <SubHeader
        fileContent={currentFolder}
        handleSelectComp={handleSelectComp}
        toggleCreateModal={toggleCreateModal}
        handleCreateFolder={handleCreateFolder}
      />

      <div className="h-screen lg:h-[400px] p-3 overflow-y-auto bg-white ">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
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
        />
      )}
      {openUpdateModal && (
        <UpdateModal
          toggleModal={toggleUpdateModal}
          selectedComp={selectedComp}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default Folder;
