import HoizontalCard from "../components/product/HoizontalCard";
import { useState } from "react";

export default function Wishlist() {
  const [wishlists, setWishlists] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "55%",
        margin: "auto",
        padding: "38px 0",
      }}
    >
      <h3>Your Wishlist</h3>
      <div
        className="products_hor_card"
        style={{ display: "flex", flexDirection: "column", paddingTop: "28px" }}
      >
        <HoizontalCard
          discountedPrice={1999}
          orignalprice={2999}
          image="https://m.media-amazon.com/images/I/41hVC-zcFEL._SS135_.jpg"
          productId="187668uyfgubjfgfgfgj"
          name="boAt Wave Edge with 1.85' HD Display, Advanced Bluetooth Calling Chip,
        Functional Crown, 100+ Sports Modes,Widget Control,AI Voice
        Assistance,Inbuilt Games, IP68(Active Black)"
          ratings={3}
          reviewCount={122}
          key={1}
        />
        <HoizontalCard
          discountedPrice={999}
          orignalprice={1459}
          image="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12067994/2021/2/20/12e81dbb-58c8-484f-a7fa-9eb8b3de6c1b1613802166531-HIGHLANDER-Men-Black-Sneakers-4941613802164746-1.jpg"
          productId="187668uyfgubjfgfgfgj"
          name="Highlander Men Woven Sneakers"
          ratings={4}
          reviewCount={122}
          key={14}
        />
        <HoizontalCard
          discountedPrice={26999}
          orignalprice={32999}
          image="https://m.media-amazon.com/images/I/41Pn3umtB8L._SX300_SY300_QL70_FMwebp_.jpg"
          productId="187668uyfgubjfgfgfgj"
          name="Redmi K50i 5G (Stealth Black, 8GB RAM, 256GB Storage) | Flagship Mediatek Dimensity 8100 Processor | 144Hz Liquid FFS Display | Alexa Built-in"
          ratings={4}
          reviewCount={555}
          key={1444}
        />
      </div>
    </div>
  );
}
