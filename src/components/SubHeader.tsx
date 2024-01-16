import Link from "next/link";
import { FaFolderPlus, FaFileMedical } from "react-icons/fa6";
import { usePathname } from "next/navigation";

type Props = {
  fileContent?: TFileData;
  handleSelectComp: (id: TFileData) => void;
  toggleCreateModal: (val: boolean) => void;
  handleCreateFolder: (val: boolean) => void;
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
    if (fileContent) {
      handleSelectComp(fileContent);
    }
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
              <span className="hover:bg-gray-500 px-2 py-0.5 rounded">
                &larr; Back
              </span>
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
            <p>New Folder</p>
          </button>
          <button
            className="bg-white px-2 py-1 rounded flex gap-1 items-center hover:bg-slate-200"
            onClick={() => handleCreateFile(false)}
          >
            <FaFileMedical />
            <p>New File</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
