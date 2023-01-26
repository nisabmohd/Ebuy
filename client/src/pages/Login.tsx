import Logo from "../components/navbar/Logo";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "6vh",
      }}
    >
      <Logo black={true} large={true} />
      <div
        className="_box_login"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "325px",
          marginTop: "15px",
          border: "1px solid #e0dede",
          borderRadius: "4px",
          padding: "15px 0",
          gap: "12px",
          paddingBottom: "25px",
        }}
      >
        <h2
          style={{
            width: "90%",
            margin: "auto",
            fontFamily: "Poppins",
            fontWeight: "500",
          }}
        >
          Sign in
        </h2>

        <div
          className="input"
          style={{
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Email or phone number
          </p>
          <input
            type="email"
            style={{
              height: "29px",
              borderRadius: "4px",
              border: "1px solid #e0dede",
              outline: "none",
              paddingLeft: "5px",
            }}
          />
        </div>
        <div
          className="input"
          style={{
            width: "90%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Password
          </p>
          <input
            type="password"
            style={{
              height: "29px",
              borderRadius: "4px",
              border: "1px solid #e0dede",
              outline: "none",
              paddingLeft: "5px",
            }}
          />
        </div>
        <button
          style={{
            width: "90%",
            margin: "auto",
            backgroundColor: "#febd69",
            padding: "6px 0",
            outline: "none",
            border: "1px solid #bab4b4",
            borderRadius: "4px",
            marginBottom: "18px",
            marginTop: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Sign in
        </button>
        <p
          style={{
            width: "90%",
            margin: "auto",
            fontSize: "13px",
          }}
        >
          Forgot password?
        </p>
      </div>
      <div
        className="linebar"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "325px",
          justifyContent: "space-between",
          margin: "18px 0",
        }}
      >
        <div
          style={{ backgroundColor: "#c8c8c8", height: "1px", width: "33%" }}
          className="line"
        ></div>
        <p style={{ fontSize: "13px" }}>New to Ebuy?</p>
        <div
          style={{ backgroundColor: "#c8c8c8", height: "1px", width: "33%" }}
          className="line"
        ></div>
      </div>
      <button
        style={{
          backgroundColor: "#d1d1d1",
          padding: "7px 0",
          width: "325px",
          fontWeight: "bold",
          borderRadius: "2px",
          outline: "none",
          marginTop: "15px",
          border: "1px solid gray",
          cursor: "pointer",
        }}
      >
        Create new account
      </button>
    </div>
  );
}
