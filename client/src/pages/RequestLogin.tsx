import { useNavigate } from "react-router-dom";
import avatarImg from "../assets/login.png";

type RequestLoginPageProps = {
  page: string;
};
export default function RequestLogin({ page }: RequestLoginPageProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "55%",
        margin: "auto",
        padding: "18px 0",
        gap: "18px",
        paddingTop: "8vh",
      }}
    >
      <h3>Please Login</h3>
      <p>Login to view items in your {page.slice(3)}.</p>
      <img src={avatarImg} style={{ width: "70px" }} alt="" />
      <button
        onClick={() => navigate("/login")}
        style={{
          backgroundColor: "#febd69",
          color: "white",
          width: "200px",
          height: "28px",
          border: "none",
          outline: "none",
          borderRadius: "3px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}
