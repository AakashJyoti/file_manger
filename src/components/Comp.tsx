import Image from "next/image";
import FolderImg from "@/assets/folder.png";
import FileImg from "@/assets/docs.png";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { ImBin2 } from "react-icons/im";
import { FaPen } from "react-icons/fa6";

type Props = {
  fileContent: TFileData;
  handleSelectComp: (id: TFileData) => void;
  selectedComp: TFileData | undefined;
  toggleDeleteModal: (val: boolean) => void;
};

const Comp = ({
  fileContent,
  handleSelectComp,
  selectedComp,
  toggleDeleteModal,
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
        <div className="absolute right-0 top-0 w-full h-full bg-[#ffffffae] border p-0.5 rounded flex justify-center items-center gap-4">
          <button
            className="flex justify-center items-center rounded bg-red-500 p-1 text-white"
            title="Delete"
            onClick={() => toggleDeleteModal(true)}
          >
            <ImBin2 />
          </button>
          <button
            className="flex justify-center items-center rounded bg-blue-500 p-1 text-white"
            title="Edit"
            onClick={() => toggleDeleteModal(true)}
          >
            <FaPen />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comp;
