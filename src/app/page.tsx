"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SubHeader from "@/components/SubHeader";
import Comp from "@/components/Comp";
import Loading from "@/components/Loading";
import DeleteModal from "@/components/modals/DeleteModal";

const Home = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedComp, setSelectedComp] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/file/getFolderFiles");
        setContent(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [toggle]);

  const handleToggle = () => setToggle((prev) => !prev);

  const handleSelectComp = (id: string) => setSelectedComp(id);

  const toggleDeleteModal = (val: boolean) => setOpenDeleteModal(val);

  const toggleLoading = (val: boolean) => setIsLoading(val);

  return (
    <>
      <SubHeader handleToggle={handleToggle} />

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

export default Home;
