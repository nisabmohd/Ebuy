import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CATEGORIES = [
  {
    id: 1,
    category: "Mobile",
    url: "mobile",
  },
  {
    id: 2,
    category: "Fashion",
    categories: [
      { id: 21, category: "Mens Shirts/T-shirts", url: "fashion-men-shirts" },
      { id: 22, category: "Mens Pants", url: "fashion-men-pants" },
      { id: 23, category: "Mens Footwears", url: "fashion-men-footwears" },
      { id: 24, category: "Mens Misc", url: "fashion-men-misc" },
      { id: 25, category: "Womens Tops", url: "fashion-women-shirts" },
      { id: 26, category: "Womens Pants", url: "fashion-women-pants" },
      { id: 27, category: "Makeups", url: "fashion-women-makeups" },
      { id: 28, category: "Women Footwears", url: "fashion-women-footwears" },
      { id: 29, category: "Womens Misc", url: "fashion-women-misc" },
    ],
  },
  {
    id: 3,
    category: "Electronics",
    categories: [
      { id: 31, category: "TV/Monitors", url: "electronics-tv-monitor" },
      { id: 32, category: "Laptops", url: "electronics-laptops" },
      { id: 33, category: "Computers", url: "electronics-computers" },
      { id: 34, category: "Tablets", url: "electronics-tablets" },
      { id: 35, category: "Others", url: "electronics-others" },
    ],
  },
  {
    id: 4,
    category: "Groceries",
    url: "groceries",
  },
  {
    id: 5,
    category: "Home",
    url: "home",
  },
  {
    id: 6,
    category: "Appliance",
    url: "appliance",
  },
];
export default function SubNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [dropdown, setDropdoen] = useState<number>(-1);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        height: "32px",
        width: "100%",
        backgroundColor: "#232f3e",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginLeft: "34px",
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
          gap: "25px",
          fontSize: "13.5px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            {typeof category.categories === "object" ? (
              <>
                <div
                  key={category.categories.toString()}
                  onClick={(e) => {
                    setDropdoen(category.id);
                    handleClick(e);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <p>{category.category}</p>
                  <ArrowDropDownIcon />
                </div>
                <Menu
                  key={category.id}
                  PaperProps={{ sx: { width: "200px" } }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={dropdown == category.id && open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {category.categories.map((item) => (
                    <MenuItem
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "13px",
                        color: "#3e3e3e",
                        fontWeight: "bold",
                      }}
                      key={item.id}
                      onClick={() => {
                        handleClose();
                        navigate(`products?category=${item.url}`);
                      }}
                    >
                      {item.category}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Link
                key={category.id}
                to={`/products?category=${category.url}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {category.category}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
