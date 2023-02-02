import { Avatar, Rating } from "@mui/material";

type ReviewProps = {
  comment: string;
  images: string[];
  userId: string;
  timestamp: string;
  rating: number;
  username: string;
};

export default function Review({
  comment,
  images,
  rating,
  username,
}: ReviewProps) {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "28px 14px",
        backgroundColor: "rgb(250 250 250)",
      }}
    >
      <div
        className="sameline"
        style={{
          gap: "10px",
          marginBottom: "3px",
          marginLeft: "2px",
          marginTop: "-1px",
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
          {username}
        </p>
      </div>

      <Rating
        value={rating}
        size="small"
        sx={{ marginLeft: "4px", marginTop: "4px" }}
        readOnly
      />
      <p
        style={{
          fontSize: "13px",
          marginTop: "8px",
          width: "98%",
          marginLeft: "5px",
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
          marginLeft: "5px",
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
