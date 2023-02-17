import { useEffect, useState } from "react";
import {
  useAddFolderMutation,
  useDeleteItemsMutation,
  useGetDirectoryQuery,
  useToggleStarMutation,
} from "../store/api";

function useDirectory(setModal?: any) {
  const [addFolderMutation, FolderAddResult] = useAddFolderMutation();
  const [deleteItemMutation, ItemDeleteResult] = useDeleteItemsMutation();
  const [toggleItemMutation, ToggleItemResult] = useToggleStarMutation();
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
  const [workingDirectory, setWorkingDirectory] = useState<{
    id: string;
    name: string;
  }>({
    id: "null",
    name: "root",
  });
  const handleFolderClick = (item: any) => {
    if (item.nodeType === "folder") {
      setBreadcrump((prev) => [...prev, item]);
    }
    setWorkingDirectory(item);

    console.log(item);
  };

  const handleBreadcrumpClick = (item: any) => {
    // create a set of breadcrump

    setBreadcrump((prev) => {
      prev.splice(prev.indexOf(item) + 1, prev.length);
      return [...prev];
    });

    console.log("ti", workingDirectory);
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

  const handleDelete = (items: string) => {
    deleteItemMutation({
      id: items,
    });
  };

  const handleStarToggle = (item: string, value: boolean) => {
    toggleItemMutation({
      id: item,
      value,
    });
  };

  useEffect(() => {
    setCurrentDirectory(data?.childs);
  }, [data]);

  return {
    workingDirectory: data,
    currentDirectory,
    setCurrentDirectory,
    breadcrump,
    setBreadcrump,
    newFolder,
    setNewFolder,
    handleFolderClick,
    handleBreadcrumpClick,
    handleFolderAdd,
    handleDelete,
    handleStarToggle,
    isFetching,
  };
}
export default useDirectory;
