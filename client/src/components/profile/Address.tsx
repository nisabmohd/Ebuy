import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import {
  AddressType,
  inputDiv,
  inputStyle,
  labelStyleProfile,
} from "../../pages/Profile";
import { IconButton } from "@mui/material";

type AddressTypeProps = AddressType & {
  handlechange: (val: AddressType) => void;
  handleDeleteAddress: (id: string) => void;
};

export default function Address({
  address,
  phone,
  state,
  city,
  _id,
  handlechange,
  handleDeleteAddress,
}: AddressTypeProps) {
  const [AddessValue, setAddressValue] = useState({
    address,
    phone,
    state,
    city,
    _id,
  });
  function handlechangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    handlechange(AddessValue);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        marginBottom: "18px",
        border: "1px solid #e0e0e0",
        borderRadius: "14px",
        padding: "28px",
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
        onClick={() => handleDeleteAddress(_id)}
      >
        <DeleteOutline
          sx={{
            fontSize: "18px",
          }}
        />
      </IconButton>
      <div className="input_profile" style={inputDiv}>
        <label htmlFor="lastname" style={labelStyleProfile}>
          Street
        </label>
        <input
          style={inputStyle}
          name="address"
          placeholder="Address"
          onChange={handlechangeInputs}
          value={AddessValue.address}
          type="text"
        />
      </div>
      <div className="input_profile" style={inputDiv}>
        <label htmlFor="lastname" style={labelStyleProfile}>
          Phone
        </label>
        <input
          name="phone"
          style={inputStyle}
          placeholder="phone"
          onChange={handlechangeInputs}
          value={AddessValue.phone}
          type="text"
        />
      </div>
      <div className="input_profile" style={inputDiv}>
        <label htmlFor="lastname" style={labelStyleProfile}>
          Phone
        </label>
        <input
          name="state"
          style={inputStyle}
          placeholder="state"
          onChange={handlechangeInputs}
          value={AddessValue.state}
          type="text"
        />
      </div>
      <div className="input_profile" style={inputDiv}>
        <label htmlFor="lastname" style={labelStyleProfile}>
          Phone
        </label>
        <input
          name="city"
          placeholder="city"
          style={inputStyle}
          onChange={handlechangeInputs}
          value={AddessValue.city}
          type="text"
        />
      </div>
    </div>
  );
}
