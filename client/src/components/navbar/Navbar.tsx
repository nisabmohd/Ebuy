import Search from "./Search";
import cartIcon from "../../assets/cart.png";
import profileIcon from "../../assets/user.png";
import heartIcon from "../../assets/heart.png";
import style from "./navbar.module.css";
import Logo from "./Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";

const profileMenu = [
  {
    id: 1,
    name: "My profile",
    url: "/myprofile",
  },
  {
    id: 2,
    name: "Orders",
    url: "/myorders",
  },
  {
    id: 3,
    name: "Notifications",
    url: "/mynotifications",
  },
  {
    id: 4,
    name: "Logout",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { handleLogoutUser, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleMenuClick(url: string | undefined, id: number) {
    handleClose();
    if (url) navigate(url);
    if (id == 4) {
      handleLogoutUser();
      navigate("/");
    }
  }

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#131921",
        color: "white",
        height: "60px",
      }}
    >
      <Logo />
      <Search />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "22px",
          marginRight: "1vw",
        }}
      >
        <Link
          to="/mywishlist"
          style={{ color: "inherit", textDecoration: "none" }}
          className={style.tab}
        >
          <img style={tabImgStyle} src={heartIcon} alt="" />
          <p className="nav_tab_text">Wishlist</p>
        </Link>
        {isAuthenticated && (
          <>
            <div
              onClick={handleClick}
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              className={style.tab}
            >
              <img style={tabImgStyle} src={profileIcon} alt="" />
              <p className="nav_tab_text">Profile</p>
            </div>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {profileMenu.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                    onClick={() => handleMenuClick(item.url, item.id)}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
        <Link
          to="/mycart"
          style={{
            color: "inherit",
            textDecoration: "none",
            position: "relative",
          }}
          className={style.tab}
        >
          <img style={tabImgStyle} src={cartIcon} alt="" />
          <p className="nav_tab_text">Cart</p>
        </Link>
      </div>
    </nav>
  );
}

const tabImgStyle = {
  width: "20px",
};
