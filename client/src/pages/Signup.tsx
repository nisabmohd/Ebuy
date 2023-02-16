import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import Footer from "../components/Footer";
import Logo from "../components/navbar/Logo";
import { useAuth, UserType } from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export default function Signup({
  setHideNav,
}: {
  setHideNav: (val: boolean) => void;
}) {
  const navigate = useNavigate();
  const { handleToast } = useAppContext();
  const { handleLoginUser } = useAuth();
  const [localUser, setLocalUser] = useLocalStorage<UserType | undefined>(
    "user",
    undefined
  );
  const [localCart, setLocalCart] = useLocalStorage<any>("cart", undefined);
  const [localRefreshToken, setlocalRefreshToken] = useLocalStorage<
    string | undefined
  >("refresh_token", undefined);
  const [localAccessToken, setlocalAccessToken] = useLocalStorage<
    string | undefined
  >("access_token", undefined);

  const [credentials, setCredentials] = useState({
    mobile: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  useEffect(() => {
    setHideNav(true);
  }, []);

  const { refetch } = useQuery({
    queryFn: () => httpRequest.post(`${url}/auth/signup`, credentials),
    queryKey: ["login"],
    enabled: false,
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
  function handleSingup() {
    if (
      credentials.mobile &&
      credentials.firstname &&
      credentials.password &&
      credentials.password.length >= 6
    )
      refetch();
    else handleToast("All credentials required", "error");
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
          Sign up
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
            First name
            <span
              style={{
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "-8px",
                marginLeft: "5px",
              }}
            >
              *
            </span>
          </p>
          <input
            type="text"
            value={credentials.firstname}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, firstname: e.target.value };
              })
            }
            placeholder="Your first name"
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
            Last name
          </p>
          <input
            value={credentials.lastname}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, lastname: e.target.value };
              })
            }
            type="text"
            placeholder="Your last name"
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
            Mobile number
            <span
              style={{
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "-8px",
                marginLeft: "5px",
              }}
            >
              *
            </span>
          </p>
          <input
            value={credentials.mobile}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, mobile: e.target.value };
              })
            }
            type="text"
            placeholder="Your mobile number"
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
            <span
              style={{
                fontWeight: "normal",
                fontSize: "16px",
                marginBottom: "-8px",
                marginLeft: "5px",
              }}
            >
              *
            </span>
          </p>
          <input
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            type="password"
            placeholder="At least 6 characters"
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
          onClick={handleSingup}
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
          Sign up
        </button>
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
          style={{ backgroundColor: "#c8c8c8", height: "1px", width: "21%" }}
          className="line"
        ></div>
        <p style={{ fontSize: "13px" }}>Already have an account?</p>
        <div
          style={{ backgroundColor: "#c8c8c8", height: "1px", width: "21%" }}
          className="line"
        ></div>
      </div>
      <button
        onClick={() => navigate("/login")}
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
        Sign in
      </button>
      <Footer />
    </div>
  );
}
