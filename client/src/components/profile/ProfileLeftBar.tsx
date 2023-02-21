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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "22%",
      }}
    >
      {LEFT_TILE_TABS.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            borderBottom: "1px solid #f6f6f6",
            paddingBottom: "14px",
            width: "100%",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
