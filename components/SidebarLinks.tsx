function SidebarLinks(props: {
  tab: string;
  icon: JSX.Element;
  activeLink: string;
  setActiveLink: (tab: string) => void;
}) {
  return (
    <li
      className={`flex items-center gap-2 py-2.5 px-4 hover:bg-mainPrimary text-offWhite hover:text-white rounded-2xl ${
        props.tab === props.activeLink ? "bg-mainPrimary" : null
      } ease-in-out duration-200 cursor-pointer`}
      onClick={() => props.setActiveLink(props.tab)}
    >
      {props.icon}
      {props.tab}
    </li>
  );
}
export default SidebarLinks;
