import { Avatar, Rating } from "@mui/material";

type ReviewProps = {
  comment: string;
  images: string[];
  userId: string;
  timestamp: string;
  rating: number;
};

export default function Review({ comment, images, rating }: ReviewProps) {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        borderRadius: "16px",
        padding: "25px 0",
      }}
    >
      <div
        className="sameline"
        style={{
          gap: "10px",
          marginBottom: "3px",
          marginLeft: "18px",
          marginTop: "-9px",
        }}
      >
        <Avatar sx={{ width: 32, height: 32 }} />
        <p
          style={{
            color: "black",
            fontSize: "14px",
            fontWeight: "light",
            fontFamily: "Poppins",
          }}
        >
          Nisab Mohd
        </p>
      </div>

      <Rating
        value={rating}
        size="small"
        sx={{ marginLeft: "18px", marginTop: "4px" }}
        readOnly
      />
      <p
        style={{
          fontSize: "13px",
          marginTop: "8px",
          width: "90%",
          marginLeft: "18px",
          color: "#3a3a3a",
          fontFamily: "Poppins",
        }}
      >
        {comment}
      </p>
      <div
        className="iamges"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          marginLeft: "18px",
          marginTop: "14px",
        }}
      >
        {images.map((image) => (
          <img
            key={image}
            style={{
              width: "65px",
              height: "65px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
