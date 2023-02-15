import { useState, createContext, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Private from "./routers/Private";
import toast, { Toaster } from "react-hot-toast";
import { useAuth, userType } from "./contexts/AuthContext";
import ShoppingContext from "./contexts/ShoppingContext";

export type contextValueType = {
  handleToast: (message: string, toastType: "error" | "success") => void;
};

const AppContext = createContext<contextValueType | undefined>(undefined);
export function useAppContext() {
  return useContext(AppContext) as contextValueType;
}

function App() {
  const [hideNav, setHideNav] = useState(false);
  const { handleLoginUser } = useAuth();
  const contextValue: contextValueType = {
    handleToast,
  };

  function handleToast(message: string, toastType: "error" | "success") {
    toast[toastType](message);
  }

  return (
    <AppContext.Provider value={contextValue}>
      <ShoppingContext>
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
            <Toaster />
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/mywishlist"
                element={
                  <Private>
                    <Wishlist />
                  </Private>
                }
              />
              <Route
                path="/login"
                element={<Login setHideNav={setHideNav} />}
              />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </ShoppingContext>
    </AppContext.Provider>
  );
}

export default App;
