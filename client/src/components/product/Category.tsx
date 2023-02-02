import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

const SORT_BY = [
  {
    id: 1,
    text: "Relevance",
    query: "relevance",
  },
  {
    id: 2,
    text: "Popularity",
    query: "popularity",
  },
  {
    id: 3,
    text: "Price - Low to High",
    query: "lowtohigh",
  },
  {
    id: 4,
    text: "Price - High to Low",
    query: "hightolow",
  },
  {
    id: 5,
    text: "Newest First",
    query: "newestfirst",
  },
];

const DEFAULT_RATINGS = [1, 2, 3, 4];

type CategoryProp = {
  handleCustomisation: (param: {
    sortby?: string;
    ratings?: number;
    price?: { low?: number; high?: number };
  }) => void;
  sortby: string | null;
  ratings: number | null;
  price: { low?: number; high?: number };
};

export default function Category({
  handleCustomisation,
  sortby,
  ratings,
  price,
}: CategoryProp) {
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
              <Checkbox
                checked={sortby != null && item.query === sortby}
                onChange={(e) =>
                  handleCustomisation({
                    sortby: e.target.checked ? item.query : "-1",
                  })
                }
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight:
                    sortby != null && item.query === sortby ? "bold" : "normal",
                }}
              >
                {item.text}
              </p>
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
                onClick={() =>
                  handleCustomisation({ ratings: ratings == item ? -1 : item })
                }
                key={item}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                <Rating key={index} value={item} size="small" readOnly={true} />
                {
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: ratings == item ? "bold" : "normal",
                    }}
                  >
                    & above
                  </p>
                }
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
            value={price.low}
            onChange={(e) =>
              handleCustomisation({
                price: {
                  low: parseInt(e.target.value as string),
                  high: price.high,
                },
              })
            }
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
            value={price.high}
            onChange={(e) =>
              handleCustomisation({
                price: {
                  high: parseInt(e.target.value as string),
                  low: price.low,
                },
              })
            }
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
