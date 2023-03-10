import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import Footer from "../components/Footer";
import Logo from "../components/navbar/Logo";
import { useAuth, UserType } from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export default function Login({
  setHideNav,
}: {
  setHideNav: (val: boolean) => void;
}) {
  const navigate = useNavigate();
  const [_, setLocalUser] = useLocalStorage<UserType | undefined>(
    "user",
    undefined
  );
  const [__, setLocalCart] = useLocalStorage<any>("cart", undefined);
  const [___, setlocalRefreshToken] = useLocalStorage<string | undefined>(
    "refresh_token",
    undefined
  );
  const [____, setlocalAccessToken] = useLocalStorage<string | undefined>(
    "access_token",
    undefined
  );
  const { handleToast } = useAppContext();
  const { handleLoginUser } = useAuth();
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [makeLoginRequest, setMakeLoginRequest] = useState(false);

  useEffect(() => {
    setHideNav(true);
  }, []);

  useQuery({
    queryFn: () => httpRequest.post(`${url}/auth/signin`, credentials),
    queryKey: ["login"],
    enabled: makeLoginRequest,
    onSuccess: (res) => {
      console.log(res.data);
      setLocalUser(res.data.user as UserType);
      setLocalCart([]);
      setlocalRefreshToken(res.data.refresh_token);
      setlocalAccessToken(res.data.access_token);
      handleLoginUser(res.data.user as UserType);
      setHideNav(false);
      navigate("/");
    },
  });

  async function handleLogin() {
    if (!credentials.emailOrPhone || !credentials.password) {
      handleToast("All credentials required", "error");
    }
    setMakeLoginRequest(true);
  }
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
            placeholder="Mobile or email"
            type="text"
            value={credentials.emailOrPhone}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, emailOrPhone: e.target.value };
              })
            }
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
            placeholder="Your account password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
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
          onClick={handleLogin}
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
        <Link
          to={"/reset"}
          style={{
            width: "90%",
            margin: "auto",
            fontSize: "13px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Forgot password?
        </Link>
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
        onClick={() => navigate("/signup")}
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
      <Footer />
    </div>
  );
}
