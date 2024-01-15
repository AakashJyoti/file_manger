"use client";

import Comp from "@/components/Comp";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Folder = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [currentFolder, setCurrentFolder] = useState<TFileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

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

  const handleToggle = () => setToggle((prev) => !prev);

  return (
    <>
      <SubHeader fileContent={currentFolder} handleToggle={handleToggle} />

      <div className="min-h-[400px] max-h-[90dvh] overflow-y-auto p-3 flex flex-wrap gap-2 bg-white">
        {content?.map((file) => (
          <div key={file._id} className="h-[100%]">
            <Comp fileContent={file} />
          </div>
        ))}
      </div>

      {isLoading && <Loading />}
    </>
  );
};

export default Folder;
