import { useState, createContext, useContext, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Private from "./routers/Private";
import toast, { Toaster } from "react-hot-toast";
import ShoppingContext from "./contexts/ShoppingContext";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import Forgot from "./pages/Forgot";
import ProfileLeftBar from "./components/profile/ProfileLeftBar";
import ProfileContainer from "./components/profile/ProfileContainer";

export type contextValueType = {
  handleToast: (message: string, toastType: "error" | "success") => void;
};

const AppContext = createContext<contextValueType | undefined>(undefined);
export function useAppContext() {
  return useContext(AppContext) as contextValueType;
}

function App() {
  const [hideNav, setHideNav] = useState(false);

  function handleToast(message: string, toastType: "error" | "success") {
    toast[toastType](message, {
      style: {
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  const contextValue: contextValueType = useMemo(() => {
    return {
      handleToast,
    };
  }, []);
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
                path="/myorders"
                element={
                  <Private>
                    <ProfileContainer>
                      <ProfileLeftBar />
                      <Orders />
                    </ProfileContainer>
                  </Private>
                }
              />
              <Route
                path="/mynotifications"
                element={
                  <Private>
                    <ProfileContainer>
                      <ProfileLeftBar />
                      <Notifications />
                    </ProfileContainer>
                  </Private>
                }
              />
              <Route
                path="/myprofile"
                element={
                  <Private>
                    <ProfileContainer>
                      <ProfileLeftBar />
                      <Profile />
                    </ProfileContainer>
                  </Private>
                }
              />
              <Route
                path="/mycart"
                element={
                  <Private>
                    <Cart />
                  </Private>
                }
              />
              <Route
                path="/reset"
                element={<Forgot setHideNav={setHideNav} />}
              />
              <Route
                path="/login"
                element={<Login setHideNav={setHideNav} />}
              />
              <Route
                path="/signup"
                element={<Signup setHideNav={setHideNav} />}
              />
            </Routes>
          </div>
        </div>
      </ShoppingContext>
    </AppContext.Provider>
  );
}

export default App;
