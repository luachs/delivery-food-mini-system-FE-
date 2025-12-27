import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Admin from "./pages/admin/Admin";
import DefaultLayout from "./layouts/defaultLayout/DefaultLayout";
import AdminListOrders from "./pages/admin/ListOrders";

import CreateOrder from "@/pages/restaurant/CreateOrder";

import ListDriver from "./pages/admin/ListDriver";
import HeaderOnly from "./layouts/headerOnly/HeaderOnly";
import ListRestaurant from "./pages/admin/ListRestaurant";

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
