type IncDecType = {
  quantity: number;
  inc: (id: string) => void;
  dec: (id: string) => void;
  id: string;
};
export default function IncDec({ quantity, inc, dec, id }: IncDecType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <button onClick={() => dec(id)} style={btnStyle}>
        -
      </button>
      <p style={{ fontSize: "13px", fontFamily: "Poppins" }}>{quantity}</p>
      <button onClick={() => inc(id)} style={btnStyle}>
        +
      </button>
    </div>
  );
}
const btnStyle = {
  width: "25px",
  height: "25px",
  border: "none",
  outline: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: "Poppins",
};
