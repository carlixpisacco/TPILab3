import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import MainPage from './components/mainPage/MainPage';
import SellProduct from './components/sellProduct/SellProduct'
import ProductDetails from './components/productDetails/ProductDetails'
import NotFound from './components/notFound/NotFound'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import Login from './components/login/Login'
import RegisterForm from './components/registerForm/RegisterForm'
import PreRegisterForm from "./components/preRegisterForm/PreRegisterForm";
import Protected from "./components/protected/Protected";
import EditProduct from "./components/editProduct/EditProduct";
import Profile from "./components/profile/Profile";
import UserCard from "./components/userCard/UserCard"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
    },

    {
      path: "product/:id",
      element: <ProductDetails/>,
    },

    {
      path: "/addProduct",
      element: (
         <Protected>
          <SellProduct/>
        </Protected>
    ),
    },

    
    {
      path: "/shoppingCart",
      element: (
      <Protected>
        <ShoppingCart/>
      </Protected>
    ),
    },

    
    {
      path: "/login",
      element: <Login/>,
    },

    {
      path: "/registerForm",
      element: <RegisterForm />,
    },

    {
      path: "/preRegister",
      element: <PreRegisterForm/>,
    },

    {
      path: "/editProduct/:id", 
      element: (
        <Protected>
          <EditProduct />
        </Protected>
      ),
    },
    {
      path: "/profile",
      element: <Profile/>,
    },

    {
      path: "/userCard",
      element: <UserCard />

    },

    {
      path: "*",
      element: <NotFound />,
    },

  ]);

  return (
      <div>
         {<RouterProvider router={router} />}
      </div>
  )
}

export default App

