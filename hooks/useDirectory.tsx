import { useState } from "react";

function useDirectory(setModal: any) {
  const [currentDirectory, setCurrentDirectory] = useState<any>({
    id: 1,
    name: "root",
    parentId: null,
    type: "folder",
    size: "145.45 Mb",
  });
  const [breadcrump, setBreadcrump] = useState([
    {
      id: 1,
      name: "root",
    },
  ]);
  const [dummyData, setDummyData] = useState<any>([
    {
      id: 1,
      name: "Folder 1",
      parentId: null,
      type: "folder",
      size: "145.45 Mb",
    },
    {
      id: 1,
      name: "Folder 1",
      parentId: null,
      type: "folder",
      size: "145.45 Mb",
    },
    {
      id: 1,
      name: "Folder 1",
      parentId: null,
      type: "folder",
      size: "145.45 Mb",
    },
    {
      id: 2,
      name: "Folder 2",
      parentId: null,
      type: "folder",
      size: "15.42 Mb",
    },
    {
      id: 3,
      name: "My Image",
      parentId: null,
      type: "image",
      url: "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=1060&t=st=1673513078~exp=1673513678~hmac=f9cb454007aebfafb62acca171c8abd14c4626198d95f33408b2c00f82090e05",
      size: "15.42 Mb",
    },
  ]);
  const [newFolder, setNewFolder] = useState<string>("");

  const handleFolderClick = (item: any) => {
    if (item.type === "folder") {
      setBreadcrump([...breadcrump, item]);
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

    const _newFolder = {
      id: Math.floor(Math.random() * 1000),
      name: newFolder,
      parentId: breadcrump[breadcrump.length - 1].id,
      type: "folder",
      size: "145.45 Mb",
    };

    setDummyData([...dummyData, _newFolder]);
    setNewFolder("");
    setModal(false);
  };

  return {
    currentDirectory,
    setCurrentDirectory,
    breadcrump,
    setBreadcrump,
    dummyData,
    setDummyData,
    newFolder,
    setNewFolder,
    handleFolderClick,
    handleBreadcrumpClick,
    handleFolderAdd,
  };
}
export default useDirectory;
