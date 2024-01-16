"use client";

import Comp from "@/components/Comp";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import CreateModal from "@/components/modals/CreateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Folder = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [currentFolder, setCurrentFolder] = useState<TFileData>();
  const [selectedComp, setSelectedComp] = useState<TFileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
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
          setContent(allSubData.data.data);
          const currentData = await axios.get(`/api/file/getFolder?id=${id}`);
          setCurrentFolder(currentData.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [id, toggle]);

  const handleSelectComp = (val: TFileData) => setSelectedComp(val);
  const handleCreateFolder = (val: boolean) => setCreateFolder(val);
  const handleToggle = () => setToggle((prev) => !prev);
  const toggleCreateModal = (val: boolean) => setOpenCreateModal(val);
  const toggleDeleteModal = (val: boolean) => setOpenDeleteModal(val);
  const toggleLoading = (val: boolean) => setIsLoading(val);

  return (
    <>
      <SubHeader
        fileContent={currentFolder}
        handleSelectComp={handleSelectComp}
        toggleCreateModal={toggleCreateModal}
        handleCreateFolder={handleCreateFolder}
      />

      <div className="min-h-[400px] max-h-[90dvh] overflow-y-auto p-3 flex flex-wrap gap-2 bg-white">
        {content?.map((file) => (
          <div key={file._id} className="h-[100%]">
            <Comp
              fileContent={file}
              handleSelectComp={handleSelectComp}
              selectedComp={selectedComp}
              toggleDeleteModal={toggleDeleteModal}
            />
          </div>
        ))}
      </div>

      {isLoading && <Loading />}
      {openDeleteModal && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          toggleLoading={toggleLoading}
          fileId={selectedComp?._id}
          handleToggle={handleToggle}
        />
      )}
      {openCreateModal && (
        <CreateModal
          toggleCreateModal={toggleCreateModal}
          fileId={selectedComp?._id}
          isFolder={createFolder}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default Folder;
