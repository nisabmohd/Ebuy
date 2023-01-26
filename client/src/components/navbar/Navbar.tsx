import Search from "./Search";
import cartIcon from "../../assets/cart.png";
import profileIcon from "../../assets/user.png";
import heartIcon from "../../assets/heart.png";
import style from "./navbar.module.css";
import Logo from "./Logo";

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
        <div className={style.tab}>
          <img style={tabImgStyle} src={heartIcon} alt="" />
          <p>Wishlist</p>
        </div>
        <div className={style.tab}>
          <img style={tabImgStyle} src={profileIcon} alt="" />
          <p>Profile</p>
        </div>
        <div className={style.tab}>
          <img style={tabImgStyle} src={cartIcon} alt="" />
          <p>Cart</p>
        </div>
      </div>
    </nav>
  );
}

const tabImgStyle = {
  width: "20px",
};
