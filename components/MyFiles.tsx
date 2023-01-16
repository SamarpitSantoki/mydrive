import { ItemCard } from "./ItemCard";
import { FaFolder, FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import useDirectory from "../hooks/useDirectory";
function MyFiles() {
  const [modal, setModal] = useState(false);
  const {
    breadcrump,
    currentDirectory,
    dummyData,
    newFolder,
    setBreadcrump,
    setCurrentDirectory,
    setDummyData,
    setNewFolder,
    handleFolderClick,
    handleBreadcrumpClick,
    handleFolderAdd,
  } = useDirectory(setModal);

  return (
    <div className="sm:px-12 ">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-mainPrimary p-2 rounded-full">
              <FaFolder className="text-2xl text-white" />
            </div>
            <div className="text-xl font-semibold">My Files</div>
          </div>
          <div
            className="flex items-center gap-2"
            onClick={() => setModal(true)}
          >
            <FaPlusCircle className="text-2xl text-mainPrimary" />
            <div className="text-xl font-semibold">Add Folder</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="text-xl font-semibold text-mainPrimary">
            {breadcrump.map((item) => {
              return (
                <span
                  key={item.id}
                  className={"cursor-pointer"}
                  onClick={() => handleBreadcrumpClick(item)}
                >
                  {item.name}
                  <span className="text-gray-400"> / </span>
                </span>
              );
            })}
          </div>
        </div>
        <div
          className="directory grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 py-4 gap-y-3 
          transition duration-200 ease-in-out
        "
        >
          {dummyData.map((item: any) => {
            return (
              <ItemCard
                key={item.id}
                {...item}
                handleFolderClick={handleFolderClick}
              />
            );
          })}
        </div>
      </div>
      {/* create a modal to add new folder */}

      {/* make it fixed at the center of the screen */}
      {modal && (
        <div
          className="
        fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
      "
        >
          <div className="bg-white px-10 py-5 rounded-md">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">Add Folder</div>

                <button
                  className="text-2xl font-semibold text-red-600 font-sans
                  hover:opacity-80 transition duration-200 ease-in-out
                "
                  onClick={() => setModal(false)}
                >
                  X
                </button>
              </div>
              <div className="mt-5">
                <div className="text-xl font-semibold">Folder Name</div>
                <input
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
                />
              </div>
              <div>
                {/* Add button */}
                <button
                  className="bg-mainPrimary text-white p-2 rounded-md mt-5
                  hover:opacity-80 transition duration-200 ease-in-out
                "
                  onClick={() => {
                    handleFolderAdd();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MyFiles;
