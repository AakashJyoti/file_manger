"use client";

import CreateModal from "@/components/modals/CreateModal";
import Link from "next/link";
import { useState } from "react";
import { FaFolderPlus, FaFileMedical } from "react-icons/fa6";

type Props = {
  fileContent?: TFileData;
  handleToggle: () => void;
};

const SubHeader = ({ fileContent, handleToggle }: Props) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);

  const handleCreateFile = (isFolder: boolean) => {
    setOpenCreateModal(true);
    setCreateFolder(isFolder);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);
  };

  return (
    <>
      <div className="flex px-4 py-2 justify-between items-center shadow bg-gray-600">
        {/* <Link href={`/${fileContent?._id}`}> */}
        <p className="text-2xl font-semibold ml-3 text-white">
          {fileContent?.fileName ? fileContent?.fileName : "Home"}
        </p>
        {/* </Link> */}
        <div className="flex gap-2">
          <button
            className="bg-white px-2 py-1 rounded flex gap-1 items-center hover:bg-slate-200"
            onClick={() => handleCreateFile(true)}
          >
            <FaFolderPlus />
            <p>New Folder</p>
          </button>
          <button
            className="bg-white px-2 py-1 rounded flex gap-1 items-center hover:bg-slate-200"
            onClick={() => handleCreateFile(false)}
          >
            <FaFileMedical />
            <p>New File</p>
          </button>
        </div>
      </div>

      {openCreateModal && (
        <CreateModal
          closeCreateModal={closeCreateModal}
          fileId={fileContent?._id}
          isFolder={createFolder}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default SubHeader;
