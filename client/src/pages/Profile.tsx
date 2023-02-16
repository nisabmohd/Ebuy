import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../components/Loader";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

type AddressType = {
  address: string;
  city: string;
  state: string;
  phone: string;
};

type UserType = {
  firstname: string;
  lastname?: string;
  email?: string;
  mobile: string;
  avatar: string;
  savedAddress: AddressType[];
};

export default function Profile() {
  const [user, setUser] = useState<UserType>({
    firstname: "",
    lastname: "",
    avatar: "",
    mobile: "",
    savedAddress: [],
    email: "",
  });
  const { isLoading } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/myprofile`),
    queryKey: ["myprofile"],
    onSuccess: ({ data }) => {
      const thisUser: UserType = {
        firstname: data.firstname,
        lastname: data.lastname ?? "",
        email: data.email ?? "",
        mobile: data.mobile,
        avatar:
          data.avatar ??
          `https://api.dicebear.com/5.x/initials/svg?seed=${data.firstname}`,
        savedAddress: data.savedAddress as AddressType[],
      };
      setUser(thisUser);
    },
  });

  function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSaveProfile() {}

  if (isLoading) return <Loader />;

  return (
    <div
      className="sep_pages"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "55%",
        margin: "auto",
        padding: "38px 0",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div className="left">
        <img
          style={{ width: "100px", borderRadius: "8px" }}
          src={user?.avatar}
          alt=""
        />
      </div>
      <div
        className="right"
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          onChange={(e) => handleChangeInputs(e)}
          style={inputStyle}
          name="firstname"
          value={user?.firstname}
          type="text"
          placeholder="Firstname"
          id=""
        />
        <input
          style={inputStyle}
          onChange={(e) => handleChangeInputs(e)}
          name="lastname"
          value={user?.lastname}
          type="text"
          placeholder="Lastname"
          id=""
        />
        <input
          onChange={(e) => handleChangeInputs(e)}
          style={inputStyle}
          name="email"
          value={user?.email}
          type="email"
          placeholder="Email"
          id=""
        />
        <input
          onChange={(e) => handleChangeInputs(e)}
          style={inputStyle}
          name="mobile"
          value={user?.mobile}
          type="mobile"
          placeholder="Mobile"
          id=""
        />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "220px",
  height: "28px",
  padding: "2px 4px",
};
