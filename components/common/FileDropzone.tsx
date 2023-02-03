import { useDropzone } from "react-dropzone";
import {
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import bytesToSize from "../../helpers/byteToSize";

import { FaCopy, FaCross } from "react-icons/fa";

const FileDropzone = (props: any) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    ...other
  } = props;

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  } as any);

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            "& img": {
              width: 100,
            },
          }}
        >
          <img alt="Select file" src={"/undraw_add_file2_gvbb.svg"} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            {`Select file${maxFiles && maxFiles === 1 ? "" : "s"}`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              {`Drop file${maxFiles && maxFiles === 1 ? "" : "s"}`}{" "}
              <Link underline="always">browse</Link> thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {(files as any)?.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {(files as any)?.map((file: any) => (
              <ListItem
                key={(file as any).path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <FaCopy />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2",
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    onClick={() => onRemove && onRemove(file)}
                  >
                    <FaCross />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            {/* <Button onClick={onRemoveAll} size="small" type="button">
              Remove All
            </Button>
            <Button
              onClick={onUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </Button> */}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default FileDropzone;

interface IFileDropzone {
  accept?: String[] | String;
  disabled?: Boolean;
  files?: File[] | File;
  getFilesFromEvent?: Function;
  maxFiles?: Number;
  maxSize?: Number;
  minSize?: Number;
  noClick?: Boolean;
  noDrag?: Boolean;
  noDragEventsBubbling?: Boolean;
  noKeyboard?: Boolean;
  onDrop?: Function;
  onDropAccepted?: Function;
  onDropRejected?: Function;
  onFileDialogCancel?: Function;
  onRemove?: Function;
  onRemoveAll?: Function;
  onUpload?: Function;
  preventDropOnDocument?: Boolean;
}
