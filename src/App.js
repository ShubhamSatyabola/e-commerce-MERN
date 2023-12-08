import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignuupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage'

import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchCartByIdAsync } from './features/Cart/cartSlice';
import OrderSuccess from './pages/OrderSuccessPage';

import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync} from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/orderSuccess/:id",
    element: (
      <Protected>
        <OrderSuccess />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  
  useEffect(()=>{
      if(user){
        dispatch(fetchCartByIdAsync(user.id))
        dispatch(fetchLoggedInUserAsync(user.id))
      }
    },[dispatch,user]
  )

  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
