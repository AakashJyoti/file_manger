import Link from "next/link";
import { FaFolderPlus, FaFileMedical } from "react-icons/fa6";
import { usePathname } from "next/navigation";

type Props = {
  fileContent?: TFileData;
  toggleCreateModal: (val: boolean) => void;
  handleCreateFolder: (val: boolean) => void;
  handleSelectComp: (id: TFileData | undefined) => void;
};

const SubHeader = ({
  fileContent,
  handleSelectComp,
  toggleCreateModal,
  handleCreateFolder,
}: Props) => {
  const pathName = usePathname();

  const handleCreateFile = (isFolder: boolean) => {
    toggleCreateModal(true);
    handleCreateFolder(isFolder);
    handleSelectComp(fileContent);
  };

  return (
    <>
      <div className="grid grid-cols-3 px-4 py-2 shadow bg-gray-600">
        <div className="flex items-center text-white">
          {pathName === "/" ? (
            <div />
          ) : (
            <Link
              href={
                fileContent?.parentFolder
                  ? `/${fileContent?.parentFolder}`
                  : "/"
              }
            >
              <p className="hover:bg-gray-500 px-2 py-0.5 rounded">
                &larr; <span className="hidden lg:inline" >Back</span>
              </p>
            </Link>
          )}
        </div>

        <p className="text-2xl font-semibold text-white text-center">
          {fileContent?.fileName ? fileContent?.fileName : "Home"}
        </p>

        <div className="flex gap-2 justify-end">
          <button
            className="bg-white px-2 py-1 rounded flex gap-1 items-center hover:bg-slate-200"
            onClick={() => handleCreateFile(true)}
          >
            <FaFolderPlus />
            <p className="hidden lg:block">New Folder</p>
          </button>
          <button
            className="bg-white px-2 py-1 rounded flex gap-1 items-center hover:bg-slate-200"
            onClick={() => handleCreateFile(false)}
          >
            <FaFileMedical />
            <p className="hidden lg:block">New File</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
