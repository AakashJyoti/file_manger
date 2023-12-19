"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Comp from "@/components/Comp";

const Home = () => {
  const [content, setContent] = useState<TFileData[]>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/file/getFolderFiles");
        setContent(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <main className="text-xl w-[1000px] border mx-auto rounded-lg overflow-hidden">
      <div className="flex justify-center items-center bg-white py-5 shadow-md">
        <p className="text-3xl font-semibold">Your Explorer</p>
      </div>

      <SubHeader />

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
  );
};

export default Home;
