import Image from "next/image";
import FolderImg from "@/assets/folder.png";
import FileImg from "@/assets/docs.png";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import { ImBin2 } from "react-icons/im";
import { FaPen, FaShareNodes } from "react-icons/fa6";
import toast from "react-hot-toast";

type Props = {
  fileContent: TFileData;
  selectedComp: TFileData | undefined;
  handleSelectComp: (id: TFileData) => void;
  toggleDeleteModal: (val: boolean) => void;
  toggleUpdateModal: (val: boolean) => void;
};

const Comp = ({
  fileContent,
  handleSelectComp,
  selectedComp,
  toggleDeleteModal,
  toggleUpdateModal,
}: Props) => {
  const router = useRouter();
  const [showOption, setShowOption] = useState(false);

  const handelOpenLink = () => {
    if (!fileContent.isFolder) return;
    router.push(`/${fileContent._id}`);
  };

  const handelContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setShowOption(true);
    handleSelectComp(fileContent);
  };

  const handleClick = () => {
    setShowOption(false);
    handleSelectComp(fileContent);
  };

  const handleShare = useCallback(() => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/${fileContent._id}`
    );
    toast.success("Link copied!..");
  }, [fileContent._id]);

  return (
    <div
      className={`px-4 py-2 w-[140px] flex justify-center items-center flex-col hover:bg-gray-200 rounded gap-1 cursor-pointer relative active:bg-gray-200 ${
        selectedComp?._id === fileContent._id && "bg-gray-200"
      }`}
      onDoubleClick={handelOpenLink}
      onContextMenu={(e) => handelContextMenu(e)}
      onClick={handleClick}
    >
      <Image
        src={fileContent.isFolder ? FolderImg : FileImg}
        alt={fileContent.fileName}
        width={50}
        height={80}
        priority
      />
      <p className="font-medium">{fileContent.fileName}</p>

      {showOption && selectedComp?._id === fileContent._id && (
        <div className="absolute right-0 top-0 w-full h-full bg-[#b2b2b28e] border p-0.5 rounded flex justify-center items-center gap-4">
          <button
            className="flex justify-center items-center rounded bg-red-500 p-1 text-white hover:bg-red-700"
            title="Delete"
            onClick={() => toggleDeleteModal(true)}
          >
            <ImBin2 />
          </button>
          <button
            className="flex justify-center items-center rounded bg-blue-500 p-1 text-white hover:bg-blue-700"
            title="Edit"
            onClick={() => toggleUpdateModal(true)}
          >
            <FaPen />
          </button>
          {fileContent.isFolder && (
            <button
              className="flex justify-center items-center rounded bg-green-500 p-1 text-white hover:bg-green-700 "
              title="Share"
              onClick={handleShare}
            >
              <FaShareNodes />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comp;
