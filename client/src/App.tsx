import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import SubNav from "./components/navbar/SubNav";
function App() {
  return (
    <div className="App">
      <Navbar />
      <SubNav />
      <div
        style={{
          width: "100%",
          margin: "auto",
          height: "calc(100% - (75px))",
          overflowY: "scroll",
        }}
      >
        <Routes>
          <Route path="/products" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
