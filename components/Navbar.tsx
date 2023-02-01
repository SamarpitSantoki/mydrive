import { Box, Modal } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import {
  BsPlusCircleFill,
  BsBarChartFill,
  BsGearFill,
  BsBellFill,
} from "react-icons/bs";
import FileDropzone from "./FileDropzone";

function Navbar() {
  const [addFileModal, setAddFileModal] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [file, setFile] = useState<any>()
  const BUCKET_URL = "https://my-testing-drive.s3.us-east-2.amazonaws.com/";
  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

  return (
    <div className="sticky top-0 z-50 flex items-center md:px-16 h-16 bg-white border-b-2">
      <div
        className="flex items-center cursor-pointer hover:bg-mainPrimary hover:text-offWhite rounded-xl p-1 transition duration-200 ease-in-out"
        onClick={() => {
          setAddFileModal(true);
        }}
      >
        <span className="rounded-full bg-offWhite p-3">
          <BsPlusCircleFill color="#583DA1" />
        </span>
        <span className="ml-3 text-sm font-semibold">Add File</span>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-2 ">
        <span className="flex items-center p-3 border-2 rounded-full">
          <BsBarChartFill color="#583DA1" />
          <span className="ml-3 text-sm font-semibold">Storage Usage</span>
        </span>
        <div className="flex  items-center">
          <span className="rounded-full bg-offWhite p-3">
            <BsGearFill color="#583DA1" />
          </span>
        </div>
        <div className="flex items-center">
          <span className="rounded-full bg-offWhite p-3">
            <BsBellFill color="#583DA1" />
          </span>
        </div>
      </div>
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
            onDrop={(e: [File]) => {}}
          />
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
export default Navbar;
