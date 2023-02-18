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
        avatar:
          data.avatar ??
          `https://api.dicebear.com/5.x/initials/svg?seed=${
            data.firstname + data.lastname
          }`,
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

  if (isLoading) return <Loader />;

  return (
    <div
      style={{
        width: "85%",
        border: "1px solid #dadada",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5vh 0",
        borderRadius: "11px",
        minHeight: "75vh",
      }}
    >
      <div
        className="container_profile"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "100px", borderRadius: "8px" }}
          src={user?.avatar}
          alt=""
        />
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
        <h3>Saved Address</h3>
        <ul>
          {user.savedAddress.map((item) => {
            return (
              <Address
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
        </ul>
        <button onClick={() => handleAddNewAddress()}>Add address</button>
      </div>
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
}

const inputStyle = {
  width: "220px",
  height: "28px",
  padding: "2px 4px",
};
