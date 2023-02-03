import { Box, Skeleton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";

function FileSkeleton() {
  return (
    <Box sx={{ pt: 0.5 }}>
      <div
        className="select-none card flex flex-col bg-white w-44 h-48 rounded-3xl overflow-hidden
    hover:ring-2 hover:ring-mainPrimary "
      >
        <div
          className="cardHeader flex grow items-center justify-between px-5"
          style={{
            backgroundSize: "cover",
          }}
        >
          <FaFolder color="#583DA1" size={35} />
          <BsThreeDotsVertical color="#FAFAFA" size={25} />
        </div>
        <div className="cardContent flex flex-col justify-end px-5 py-4">
          <div className="text-sm font-semibold">
            <Skeleton />
          </div>
          <div className="text-xs text-gray-400">
            <Skeleton />
          </div>
        </div>
        <div className="cardFooter flex   items-center bg-slate-200 px-5 pb-2">
          <span className="pt-2 flex-1">
            {" "}
            <Skeleton />
          </span>
          {/* placeholder for show profiles of shared peoples */}
          <div className="relative w-10">
            <div className="flex items-center absolute -top-2 -right-2">
              <img
                src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-default-male-avatar-png-image_5939655.jpg"
                alt="profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div className="flex items-center absolute -top-2 -right-0">
              <img
                src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-default-male-avatar-png-image_5939655.jpg"
                alt="profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            {/* <img
            src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-default-male-avatar-png-image_5939655.jpg"
            alt="profile"
            className="w-6 h-6 rounded-full"
          /> */}
          </div>
        </div>
      </div>
    </Box>
  );
}
export default FileSkeleton;
