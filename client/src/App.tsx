import { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Private from "./routers/Private";

function App() {
  const [hideNav] = useState(() => {
    const page = document.location.pathname;
    return page === "/signup" || page === "/login";
  });

  return (
    <div className="App">
      {!hideNav && <Navigation />}
      <div
        style={{
          width: "100%",
          margin: "auto",
          height: `calc(100% - ${hideNav ? 0 : 75}px)`,
          overflowY: "scroll",
        }}
      >
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/mywishlist"
            element={
              <Private>
                <Login />
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
