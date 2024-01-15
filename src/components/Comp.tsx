import Image from "next/image";
import FolderImg from "@/assets/folder.png";
import FileImg from "@/assets/docs.png";
import { useRouter } from "next/navigation";

type Props = {
  fileContent: TFileData;
};

const Comp = ({ fileContent }: Props) => {
  const router = useRouter();
  
  const handelOpenLink = () => {
    if (!fileContent.isFolder) return;
    router.push(`/${fileContent._id}`);
  };

  return (
    <div
      className="px-4 py-2 flex justify-center items-center flex-col hover:bg-gray-200 rounded gap-1 cursor-pointer"
      onDoubleClick={handelOpenLink}
    >
      <Image
        src={fileContent.isFolder ? FolderImg : FileImg}
        alt={fileContent.fileName}
        width={50}
        height={80}
        priority
      />
      <p className="font-medium">{fileContent.fileName}</p>
    </div>
  );
};

export default Comp;
