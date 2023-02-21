import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAppContext } from "../App";
import Loader from "../components/Loader";
import Address from "../components/profile/Address";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export type AddressType = {
  address: string;
  city: string;
  state: string;
  phone: string;
  _id: string;
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
  const { handleToast } = useAppContext();
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
        avatar: data.avatar,
        savedAddress: data.savedAddress as AddressType[],
      };
      setUser(thisUser);
    },
  });

  const { refetch } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/edit`, user),
    queryKey: ["edit", "profile"],
    enabled: false,
    onSuccess: (res) => {
      console.log(res.data);
      handleToast("Successfully updated profile", "success");
    },
    onError: (e) => {
      console.log(e);
    },
  });
  function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleChangeAddress(AddessValue: AddressType) {
    setUser((prev) => {
      return {
        ...prev,
        savedAddress: [
          ...prev.savedAddress.filter((item) => item._id != AddessValue._id),
          AddessValue,
        ],
      };
    });
  }

  function handleAddNewAddress() {
    const address = [...user.savedAddress];
    address.push({
      address: "",
      city: "",
      phone: "",
      state: "",
      _id: new Date().toISOString(),
    });
    setUser((prev) => {
      return { ...prev, savedAddress: address };
    });
  }

  function handleSaveProfile() {
    if (!(user.firstname && user.mobile))
      return handleToast("Every Credentials required", "error");
    for (const item of user.savedAddress)
      if (!(item.address && item.city && item.phone && item.state))
        return handleToast("Every Credentials required", "error");

    refetch();
  }

  function handleDeleteAddress(id: string) {
    setUser((prev) => {
      return {
        ...prev,
        savedAddress: user.savedAddress.filter((item) => item._id != id),
      };
    });
  }

  if (isLoading) return <Loader />;

  return (
    <div
      style={{
        width: "85%",
        borderLeft: "1px solid #f6f6f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2vh 0",
        minHeight: "75vh",
      }}
    >
      <div
        className="container_profile"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <img
          style={{ width: "75px", borderRadius: "12px", marginBottom: "22px" }}
          src={
            user?.avatar ??
            `https://api.dicebear.com/5.x/initials/svg?seed=${
              user?.firstname + " " + user?.lastname
            }`
          }
          alt=""
        />
        <h3
          style={{
            marginBottom: "14px",
            fontFamily: "Poppins",
            fontWeight: "normal",
          }}
        >
          Personal Information
        </h3>
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "14px",
            padding: "28px",
          }}
        >
          <div className="input_profile" style={inputDiv}>
            <label htmlFor="firstname" style={labelStyleProfile}>
              Firstname
            </label>
            <input
              onChange={(e) => handleChangeInputs(e)}
              style={inputStyle}
              name="firstname"
              value={user?.firstname}
              type="text"
              placeholder="Firstname"
              id=""
            />
          </div>
          <div className="input_profile" style={inputDiv}>
            <label htmlFor="lastname" style={labelStyleProfile}>
              Lastname
            </label>
            <input
              style={inputStyle}
              onChange={(e) => handleChangeInputs(e)}
              name="lastname"
              value={user?.lastname}
              type="text"
              placeholder="Lastname"
              id=""
            />
          </div>
          <div className="input_profile" style={inputDiv}>
            <label htmlFor="lastname" style={labelStyleProfile}>
              Email
            </label>
            <input
              onChange={(e) => handleChangeInputs(e)}
              style={inputStyle}
              name="email"
              value={user?.email}
              type="email"
              placeholder="Email"
              id=""
            />
          </div>
          <div className="input_profile" style={inputDiv}>
            <label htmlFor="lastname" style={labelStyleProfile}>
              Phone
            </label>
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
        <h3
          style={{
            margin: "14px 0",
            fontFamily: "Poppins",
            fontWeight: "normal",
          }}
        >
          Saved Address
        </h3>
        <div style={{ maxHeight: "800px", overflowY: "auto" }}>
          {user.savedAddress.map((item) => {
            return (
              <Address
                handleDeleteAddress={handleDeleteAddress}
                key={item._id}
                handlechange={handleChangeAddress}
                phone={item.phone}
                state={item.state}
                address={item.address}
                city={item.city}
                _id={item._id}
              />
            );
          })}
        </div>
        <button
          style={{
            padding: "10px 0",
            fontFamily: "Poppins",
            borderRadius: "7px",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
          onClick={() => handleAddNewAddress()}
        >
          Add address
        </button>
      </div>
      <button
        style={{
          padding: "10px 15px",
          fontFamily: "Poppins",
          borderRadius: "7px",
          border: "none",
          outline: "none",
          cursor: "pointer",
          marginTop: "22px",
          backgroundColor: "green",
          color: "white",
        }}
        onClick={handleSaveProfile}
      >
        Save Profile
      </button>
    </div>
  );
}

export const inputStyle = {
  width: "220px",
  height: "28px",
  padding: "2px 4px",
  border: "none",
  outline: "none",
  fontSize: "13px",
  fontFamily: "Poppins",
};

export const labelStyleProfile = {
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "gray",
  minWidth: "75px",
};

export const inputDiv = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
};
