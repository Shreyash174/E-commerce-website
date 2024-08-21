import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import User from "./Pages/Admin/User";
import Orders from "./Pages/user/Orders";
import Profile from "./Pages/user/Profile";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import CartPage from "./Pages/CartPage";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import SearchPage from "./Pages/SearchPage";
import ProductDetails from "./Pages/ProductDetails";
import AdminOrders from "./Pages/Admin/AdminOrders";


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard />} />     
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/user" element={<User/>} />
        <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
