import { ReactNode } from "react";
type ProfileContainerType = {
  children: ReactNode;
};

export default function ProfileContainer({ children }: ProfileContainerType) {
  return (
    <div
      className="sep_pages"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "55%",
        margin: "auto",
        padding: "38px 0",
        gap: "15px",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}
