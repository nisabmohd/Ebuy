import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

const SORT_BY = [
  {
    id: 1,
    text: "Relevance",
  },
  {
    id: 2,
    text: "Popularity",
  },
  {
    id: 3,
    text: "Price - Low to High",
  },
  {
    id: 4,
    text: "Price - High to Low",
  },
  {
    id: 5,
    text: "Newest First",
  },
];

const DEFAULT_RATINGS = [1, 2, 3, 4];

export default function Category() {
  return (
    <div style={{ width: "300px", marginRight: "1.8vw", paddingTop: "24px" }}>
      <div className="sortby">
        <h4 style={{ marginLeft: "8px", textTransform: "uppercase" }}>
          Sort By
        </h4>
        {SORT_BY.map((item) => {
          return (
            <div
              key={item.id}
              className="checkopt"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "-10px",
              }}
            >
              <Checkbox />
              <p style={{ fontSize: "14px" }}>{item.text}</p>
            </div>
          );
        })}
      </div>
      <div className="rating">
        <h4
          style={{
            marginLeft: "4px",
            marginTop: "35px",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          Customer Ratings
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          {DEFAULT_RATINGS.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  marginLeft: "8px",
                }}
              >
                <Rating key={index} value={item} size="small" readOnly={true} />
                {<p style={{ fontSize: "14px" }}>& above</p>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rangeSlider">
        <h4
          style={{
            marginLeft: "4px",
            marginTop: "35px",
            marginBottom: "7px",
            textTransform: "uppercase",
          }}
        >
          price
        </h4>
        <div
          className="slects"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          <Select
            style={{ fontSize: "14px" }}
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={500}
            // onChange={handleChange}
          >
            <MenuItem style={{ fontSize: "14px" }} value={500}>
              ₹500
            </MenuItem>
            <MenuItem style={{ fontSize: "14px" }} value={1000}>
              ₹1000
            </MenuItem>
            <MenuItem style={{ fontSize: "14px" }} value={5000}>
              ₹5000
            </MenuItem>
          </Select>
          <p style={{ fontSize: "14px" }}>to</p>
          <Select
            style={{ fontSize: "14px" }}
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10000}
            // onChange={handleChange}
          >
            <MenuItem style={{ fontSize: "14px" }} value={10000}>
              ₹10000
            </MenuItem>
            <MenuItem style={{ fontSize: "14px" }} value={50000}>
              ₹50000
            </MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}
