import { useEffect, useState } from "react";
import { useAddFolderMutation, useGetDirectoryQuery } from "../store/api";

function useDirectory(setModal: any) {
  const [addFolderMutation, result] = useAddFolderMutation();

  const [breadcrump, setBreadcrump] = useState([
    {
      id: "null",
      name: "root",
    },
  ]);
  const { data, isFetching, isError } = useGetDirectoryQuery(
    breadcrump[breadcrump.length - 1].id
  );
  const [currentDirectory, setCurrentDirectory] = useState<any>(data?.childs);
  const [newFolder, setNewFolder] = useState<string>("");

  const handleFolderClick = (item: any) => {
    if (item.nodeType === "folder") {
      setBreadcrump((prev) => [...prev, item]);
    }
    console.log(item);
  };

  const handleBreadcrumpClick = (item: any) => {
    // create a set of breadcrump

    setBreadcrump((prev) => {
      prev.splice(prev.indexOf(item) + 1, prev.length);
      return [...prev];
    });

    console.log(item);
  };

  const handleFolderAdd = () => {
    // add a new folder
    addFolderMutation({
      name: newFolder,
      parentId: breadcrump[breadcrump.length - 1].id,
    });
    setNewFolder("");
    setModal(false);
  };

  useEffect(() => {
    setCurrentDirectory(data?.childs);
  }, [data]);

  return {
    currentDirectory,
    setCurrentDirectory,
    breadcrump,
    setBreadcrump,
    newFolder,
    setNewFolder,
    handleFolderClick,
    handleBreadcrumpClick,
    handleFolderAdd,
    isFetching,
  };
}
export default useDirectory;
