import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import DefaultLayout from "./layouts/defaultLayout/DefaultLayout";
import AdminListOrders from "./pages/admin/ListOrders";

import CreateOrder from "@/pages/restaurant/CreateOrder";

import ListDriver from "./pages/admin/ListDriver";
import HeaderOnly from "./layouts/headerOnly/HeaderOnly";
import ListRestaurant from "./pages/admin/ListRestaurant";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/logout";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 300, // nhanh
      easing: "ease-out",
      once: true,
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="max-w-[1280px] mx-auto">
        <Routes>
          {/* ------------ router admin ------------------ */}
          <Route element={<Navigate to="listOrder" replace />} path="/" />
          <Route
            element={
              <DefaultLayout>
                <AdminListOrders />
              </DefaultLayout>
            }
            path="/listOrder"
          />
          <Route
            element={
              <DefaultLayout>
                <ListDriver />
              </DefaultLayout>
            }
            path="/listDriver"
          />
          <Route
            element={
              <DefaultLayout>
                <ListRestaurant />
              </DefaultLayout>
            }
            path="/listRestaurant"
          />

          {/*----------- router restaurant ----------------- */}
          <Route
            element={
              <HeaderOnly>
                <CreateOrder />
              </HeaderOnly>
            }
            path="restaurant"
          />
          {/* -----------------auth --------------------- */}
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Logout />} path="/logout" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
