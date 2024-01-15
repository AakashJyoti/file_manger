import Image from "next/image";
import FolderImg from "@/assets/folder.png";
import FileImg from "@/assets/docs.png";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { ImBin2 } from "react-icons/im";

type Props = {
  fileContent: TFileData;
  handleSelectComp: (id: string) => void;
  selectedComp: string;
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
    handleSelectComp(fileContent._id);
  };

  return (
    <div
      className={`px-4 py-2 w-[140px] flex justify-center items-center flex-col hover:bg-gray-200 rounded gap-1 cursor-pointer relative active:bg-gray-200 ${
        selectedComp === fileContent._id && "bg-gray-200"
      }`}
      onDoubleClick={handelOpenLink}
      onContextMenu={(e) => handelContextMenu(e)}
      onClick={() => handleSelectComp(fileContent._id)}
    >
      <Image
        src={fileContent.isFolder ? FolderImg : FileImg}
        alt={fileContent.fileName}
        width={50}
        height={80}
        priority
      />
      <p className="font-medium">{fileContent.fileName}</p>

      {showOption && selectedComp === fileContent._id && (
        <div className="absolute right-1 top-1 bg-[#ffffffd0] border p-0.5 rounded">
          <button
            className="flex justify-center items-center rounded bg-red-500 p-1 text-white"
            title="Delete"
            onClick={() => toggleDeleteModal(true)}
          >
            <ImBin2 />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comp;
