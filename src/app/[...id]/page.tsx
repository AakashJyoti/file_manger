"use client";

import Comp from "@/components/Comp";
import SubHeader from "@/components/SubHeader";
import DeleteModal from "@/modal/DeleteModal";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Folder = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [currentFolder, setCurrentFolder] = useState<TFileData>();

  const params = useParams();
  const id = params.id[0];

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const allSubData = await axios.get(
            `/api/file/getFolderFiles?id=${id}`
          );
          setContent(allSubData.data.data);
          const currentData = await axios.get(`/api/file/getFolder?id=${id}`);
          setCurrentFolder(currentData.data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  return (
    <>
      <main className="text-xl w-[1000px] border mx-auto rounded-lg overflow-hidden">
        <div className="flex justify-center items-center bg-white py-5 shadow-md">
          <p className="text-3xl font-semibold">Your Explorer</p>
        </div>

        <SubHeader fileContent={currentFolder} />

        <div className="min-h-[400px] max-h-[90dvh] overflow-y-auto p-3 flex flex-wrap gap-2">
          {content?.map((file) => (
            <div key={file._id} className="h-[100%]">
              {file.isFolder ? (
                <Link href={`/${file._id}`}>
                  <Comp fileContent={file} imageLink={"/folder.png"} />
                </Link>
              ) : (
                <Comp fileContent={file} imageLink={"/docs.png"} />
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Folder;
