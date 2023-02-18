import { Link } from "react-router-dom";

const LEFT_TILE_TABS = [
  {
    id: 1,
    name: "Profile",
    link: "/myprofile",
  },
  {
    id: 2,
    name: "Orders",
    link: "/myorders",
  },
  {
    id: 3,
    name: "Notifications",
    link: "/mynotifications",
  },
];

export default function ProfileLeftBar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {LEFT_TILE_TABS.map((item) => (
        <Link key={item.id} to={item.link}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
