import { FaFilePdf, FaFolder, FaGripVertical } from "react-icons/fa";
import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { MdDelete, MdLogout, MdPersonAdd, MdSettings } from "react-icons/md";
export function ItemCard(props: {
  id: number;
  name: string;
  nodeType: string;
  nodeSize: number;
  url?: string;
  isStarred: boolean;
  parentId: string | null;
  handleFolderClick: (item: any) => void;
  handleDelete: (item: any) => void;
  handleStarToggle: (id: any, value: boolean) => void;
}) {
  const viewable = ["image/png", "image/jpeg", "image/jpg"];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="relative">
      <div
        className="select-none card flex flex-col bg-white w-44 h-48 rounded-3xl overflow-hidden
    hover:ring-2 hover:ring-mainPrimary hover:after:content hover:after:w-44 hover:after:h-48 hover:after:absolute hover:after:top-0 hover:after:bg-mainPrimary hover:after:opacity-10 hover:after:backdrop-blur-lg hover:after:rounded-3xl"
        onDoubleClick={() => {
          if (props.nodeType !== "folder") {
            setIsPreviewOpen(true);
          }
          props.handleFolderClick(props);
        }}
        onTouchStartCapture={() => {
          props.handleFolderClick(props);
        }}
      >
        <div
          className="cardHeader flex grow items-center justify-end px-5"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${props?.url})`,
          }}
        >
          {!viewable.includes(props.nodeType) && (
            <>
              {props.nodeType === "folder" && (
                <FaFolder
                  style={{
                    flex: 1,
                    placeContent: "start",
                  }}
                  color="#583DA1"
                  size={35}
                />
              )}
              {props.nodeType === "application/pdf" && (
                <FaFilePdf
                  style={{
                    flex: 1,
                    placeContent: "start",
                  }}
                  color="darkred"
                  size={35}
                />
              )}
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                props.handleDelete(props.id);
              }}
            >
              Delete
              <ListItemIcon
                style={{
                  flex: 1,
                  placeContent: "end",
                }}
              >
                <MdDelete fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </Menu>
          {props.isStarred ? (
            <BsStarFill
              size={20}
              onClick={() => {
                props.handleStarToggle(props.id, !props.isStarred);
              }}
              onTouchEndCapture={() => {
                props.handleStarToggle(props.id, !props.isStarred);
              }}
              className="z-10 cursor-pointer text-mainPrimary opacity-80 rounded-full"
            />
          ) : (
            <BsStar
              onClick={() => {
                props.handleStarToggle(props.id, !props.isStarred);
              }}
              onTouchEndCapture={() => {
                props.handleStarToggle(props.id, !props.isStarred);
              }}
              size={20}
              className="z-10 cursor-pointer text-mainPrimary opacity-80 rounded-full"
            />
          )}
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className={"z-10"}
          >
            <BsThreeDotsVertical
              className="text-mainPrimary opacity-80 rounded-full hover:p-1 hover:text-white hover:bg-mainPrimary"
              size={20}
            />
          </IconButton>
        </div>
        <div className="cardContent flex flex-col justify-end px-5 py-4">
          <div className="text-sm font-semibold truncate" title={props.name}>
            {props.name}
          </div>
          <div className="text-xs text-gray-400">{props.parentId}</div>
        </div>
        <div className="cardFooter flex   items-center bg-slate-200 px-5 pb-2">
          <span className="pt-2 flex-1">
            {(props.nodeSize / (1024 * 1024)).toFixed(2) + " mb"}
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
        {/* preview image in whole screen */}
        {isPreviewOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
            onClick={() => {
              setIsPreviewOpen(false);
            }}
          >
            <div className="flex flex-col justify-center items-center h-full">
              {!viewable.includes(props.nodeType) ? (
                <object
                  data={props.url}
                  type="application/pdf"
                  width="600"
                  height="500"
                >
                  <embed src={props.url} width="600px" height="500px" />
                  <p>
                    This browser does not support PDFs. Please download the PDF
                    to view it:
                    <a href={props.url}>Download PDF</a>.
                  </p>
                </object>
              ) : (
                <img
                  src={props.url}
                  alt="preview"
                  className="w-1/2 h-1/2 object-contain"
                />
              )}

              {/* download button */}
              <a
                className="bg-mainPrimary text-white px-4 py-2 rounded-md mt-4"
                href={props.url}
                download
                target={"_blank"}
              >
                Download
              </a>

              <button
                className="bg-mainPrimary text-white px-4 py-2 rounded-md mt-4"
                onClick={() => {
                  setIsPreviewOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
