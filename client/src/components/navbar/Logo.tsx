import logo from "../../assets/logo.png";
import logoblack from "../../assets/logo_black.png";

type LogoProps = {
  black?: boolean;
  large?: boolean;
};

export default function Logo({ black = false, large = false }: LogoProps) {
  return (
    <div
      className="logo"
      style={{
        marginLeft: "1vw",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: large ? "50px" : "40px", marginRight: "3px" }}
        src={black ? logoblack : logo}
        alt=""
      />
      <p style={{ fontSize: large ? "22px" : "22px", fontWeight: "bold" }}>
        Ebuy &nbsp;
      </p>
    </div>
  );
}