import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BsPlusCircleFill,
  BsBarChartFill,
  BsGearFill,
  BsBellFill,
} from "react-icons/bs";
import FileDropzone from "../FileDropzone";
import { useUploadFileMutation } from "../../../store/api";
import { useAppSelector } from "../../../store/hooks";
import useDirectory from "../../../hooks/useDirectory";

function Navbar() {
  const { workingDirectory, breadcrump } = useDirectory();

  useEffect(() => {
    console.log("workingDirectory", workingDirectory, "breadcrump", breadcrump);
  }, [breadcrump]);
  return (
    <div className="sticky top-0 z-50 flex items-center md:px-16 h-16 bg-white border-b-2">
      <div
        className="flex items-center cursor-pointer hover:shadow-inner px-2 py-1 rounded-xl 
        transition duration-100 ease-in-out
        hover:shadow-slate-400 hover:ring-mainPrimary hover:ring-2"
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
    </div>
  );
}
export default Navbar;
