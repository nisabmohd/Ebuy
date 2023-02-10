import Search from "./Search";
import cartIcon from "../../assets/cart.png";
import profileIcon from "../../assets/user.png";
import heartIcon from "../../assets/heart.png";
import style from "./navbar.module.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <p>Wishlist</p>
        </Link>
        <Link
          to="/myprofile"
          style={{ color: "inherit", textDecoration: "none" }}
          className={style.tab}
        >
          <img style={tabImgStyle} src={profileIcon} alt="" />
          <p>Profile</p>
        </Link>
        <Link
          to="/mycart"
          style={{ color: "inherit", textDecoration: "none" }}
          className={style.tab}
        >
          <img style={tabImgStyle} src={cartIcon} alt="" />
          <p>Cart</p>
        </Link>
      </div>
    </nav>
  );
}

const tabImgStyle = {
  width: "20px",
};
