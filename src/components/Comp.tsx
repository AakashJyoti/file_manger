import Image from "next/image";

type Props = {
  fileContent: TFileData;
  imageLink: string;
};

const Comp = ({ fileContent, imageLink }: Props) => {
  return (
    <div className="px-4 py-2 flex justify-center items-center flex-col hover:bg-gray-200 rounded gap-1 cursor-pointer">
      <Image src={imageLink} alt="" width={50} height={80} priority />
      <p className="font-medium">{fileContent.fileName}</p>
    </div>
  );
};

export default Comp;
