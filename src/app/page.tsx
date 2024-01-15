"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SubHeader from "@/components/SubHeader";
import Comp from "@/components/Comp";
import Loading from "@/components/Loading";

const Home = () => {
  const [content, setContent] = useState<TFileData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

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

  return (
    <>
      <SubHeader handleToggle={handleToggle} />

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

export default Home;
