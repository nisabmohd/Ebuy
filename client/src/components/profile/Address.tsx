import { useState } from "react";
import { AddressType } from "../../pages/Profile";

type AddressTypeProps = AddressType & {
  handlechange: (val: AddressType) => void;
};

export default function Address({
  address,
  phone,
  state,
  city,
  _id,
  handlechange,
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
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "18px",
      }}
    >
      <input
        name="address"
        placeholder="Address"
        onChange={handlechangeInputs}
        value={AddessValue.address}
        type="text"
      />
      <input
        name="phone"
        placeholder="phone"
        onChange={handlechangeInputs}
        value={AddessValue.phone}
        type="text"
      />
      <input
        name="state"
        placeholder="state"
        onChange={handlechangeInputs}
        value={AddessValue.state}
        type="text"
      />
      <input
        name="city"
        placeholder="city"
        onChange={handlechangeInputs}
        value={AddessValue.city}
        type="text"
      />
    </li>
  );
}
