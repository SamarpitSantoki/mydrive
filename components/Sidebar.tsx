import { useState } from "react";
import SidebarLinks from "./SidebarLinks";
import { FaStar, FaShare, FaFolder } from "react-icons/fa";

function Sidebar() {
  const [activeLink, setActiveLink] = useState<string>("");

  const tabs = [
    {
      name: "My Files",
      icon: <FaFolder />,
    },
    {
      name: "Shared with me",
      icon: <FaShare />,
    },
    {
      name: "Starred",
      icon: <FaStar />,
    },
  ];
  return (
    <aside className="hidden sticky left-0 top-0 sm:flex flex-col h-screen justify-between items-center gap-4 bg-mainBlack w-40 md:w-56 text-white">
      <div
        className="
        font-semibold
        text-2xl
        pt-3
        pb-4
        border-b-2
        border-mainPrimary
        w-full
        text-center

      "
      >
        SAMAR's Drive
      </div>
      <div className="w-full p-5">
        <ul className="flex flex-col gap-3">
          {tabs.map((tab) => (
            <SidebarLinks
              key={tab.name}
              tab={tab.name}
              icon={tab.icon}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          ))}
        </ul>
      </div>
      <div className="w-full p-5">
        <ul className="flex flex-col gap-3">
          <li
            className={`py-2.5 px-4 hover:bg-mainPrimary rounded-2xl ease-in-out duration-200`}
          >
            Logout
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;
