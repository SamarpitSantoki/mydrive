import { ItemCard } from "./ItemCard";
import { FaFolder, FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import useDirectory from "../hooks/useDirectory";
import { Box, IconButton, Modal, Skeleton } from "@mui/material";
import { MdClose, MdRefresh } from "react-icons/md";
import FileSkeleton from "./common/FileSkeleton";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { api, useUploadFileMutation } from "../store/api";
import FileDropzone from "./common/FileDropzone";
import axios from "axios";
import { authSelector } from "../store/authSlice";
function MyFiles() {
  const [modal, setModal] = useState(false);
  const BUCKET_URL = "https://my-testing-drive.s3.us-east-2.amazonaws.com/";

  const {
    breadcrump,
    currentDirectory,
    newFolder,
    setNewFolder,
    handleFolderClick,
    handleBreadcrumpClick,
    handleFolderAdd,
    handleDelete,
    isFetching,
    workingDirectory,
    handleStarToggle,
  } = useDirectory(setModal);
  const { user } = useAppSelector(authSelector);
  const [addFileModal, setAddFileModal] = useState(false);
  const [mutateUploadFile, result] = useUploadFileMutation();
  const [awsUrlCall, setAwsUrlCall] = useState(false);

  const dispatch = useAppDispatch();
  const uploadFile = async (e: File) => {
    console.log("breadcrump", breadcrump);
    setAwsUrlCall(true);
    try {
      let { data } = await axios.post(
        "/api/s3/uploadFile",
        {
          name: user.id + "." + workingDirectory.id + "." + e.name,
          type: e.type,
        },
        {
          headers: {
            ownerId: user.id,
          },
        }
      );

      console.log(data);

      const url = data.url;
      let { data: newData } = await axios.put(url, e, {
        headers: {
          "Content-Type": e.type,
          "Access-Control-Allow-Origin": "*",
        },
      });
      mutateUploadFile({
        name: e.name,
        nodeType: e.type,
        s3Url: BUCKET_URL + user.id + "." + workingDirectory.id + "." + e.name,
        url: user.id + "." + workingDirectory.id + "." + e.name,
        parentId: breadcrump[breadcrump.length - 1].id,
        nodeSize: e.size,
      });
      setAwsUrlCall(false);
    } catch (error) {
      console.log(error);
    }
  };
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
            className="flex items-center gap-2 cursor-pointer
              hover:shadow-inner   p-2 rounded-xl 
              transition duration-100 ease-in-out
              hover:shadow-slate-400 hover:ring-mainPrimary hover:ring-2
            "
            onClick={() => setAddFileModal(true)}
          >
            <FaPlusCircle className="text-2xl text-mainPrimary" />
            <div className="text-xl font-semibold">Add File</div>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer
              hover:shadow-inner   p-2 rounded-xl 
              transition duration-100 ease-in-out
              hover:shadow-slate-400 hover:ring-mainPrimary hover:ring-2
            "
            onClick={() => setModal(true)}
          >
            <FaPlusCircle className="text-2xl text-mainPrimary" />
            <div className="text-xl font-semibold">Add Folder</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 text-xl font-semibold text-mainPrimary">
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
          {/* refresh button */}
          <IconButton
            onClick={() => {
              dispatch(
                api.util.invalidateTags([
                  {
                    type: "Directory",
                    id: breadcrump[breadcrump.length - 1].id,
                  },
                ])
              );
            }}
          >
            <MdRefresh className="text-2xl text-mainPrimary" />
          </IconButton>
        </div>
        <div
          className="directory grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 py-4 gap-y-3 
          transition duration-200 ease-in-out
          "
        >
          {isFetching ? (
            <FileSkeleton />
          ) : (
            currentDirectory?.map((item: any) => {
              return (
                <ItemCard
                  key={item.id}
                  {...item}
                  handleFolderClick={handleFolderClick}
                  handleDelete={handleDelete}
                  handleStarToggle={handleStarToggle}
                />
              );
            })
          )}
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
          <div className="bg-white px-10 py-5 rounded-md w-1/3">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">Add Folder</div>

                {/* MUI close button */}
                <IconButton onClick={() => setModal(false)}>
                  <MdClose />
                </IconButton>
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

      <Modal
        open={addFileModal}
        onClose={() => {
          setAddFileModal(false);
        }}
      >
        <Box
          sx={{
            py: "1rem",
            bgcolor: "background.paper",
            border: "2px solid #583DA1",
            boxShadow: 24,
            p: 4,
            display: "grid",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
          }}
        >
          {/* {showFileDropDown && (
            <>
              {!imageUrl ? ( */}
          <FileDropzone
            accept="image/*"
            maxFiles={1}
            onDrop={(e: [File]) => {
              uploadFile(e[0]);
            }}
          />
          {(result.isLoading || awsUrlCall) && (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mainPrimary"></div>
              <p className="text-center mt-2">Uploading</p>
            </div>
          )}
          {/* //     ) : (
          //       <Box
          //         sx={{
          //           gridArea: "1 / 1",
          //           backgroundImage: `url(${imageUrl})`,
          //           backgroundPosition: "center",
          //           backgroundSize: "cover",
          //           borderRadius: 1,
          //           height: 230,
          //           mt: 3,
          //         }}
          //       />
          //     )}{" "}
          //   </>
          // )} */}
        </Box>
      </Modal>
    </div>
  );
}
export default MyFiles;
