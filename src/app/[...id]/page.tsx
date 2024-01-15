"use client";

import Comp from "@/components/Comp";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import DeleteModal from "@/components/modals/DeleteModal";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Folder = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [currentFolder, setCurrentFolder] = useState<TFileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [selectedComp, setSelectedComp] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const handleSelectComp = (id: string) => setSelectedComp(id);

  const handleToggle = () => setToggle((prev) => !prev);

  const toggleDeleteModal = (val: boolean) => setOpenDeleteModal(val);

  const toggleLoading = (val: boolean) => setIsLoading(val);

  return (
    <>
      <SubHeader fileContent={currentFolder} handleToggle={handleToggle} />

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
          fileId={selectedComp}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default Folder;
