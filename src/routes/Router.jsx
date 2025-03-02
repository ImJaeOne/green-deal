import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/Main';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import ProductRegistration from '../pages/ProductRegistration';
import MyPage from '../pages/MyPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/layout/Layout';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: '/product',
          element: <ProductList />,
        },
        {
          path: '/product/detail/:id',
          element: <ProductDetail />,
        },
        // 로그인 했을 때만 접근 가능
        {
          element: <PrivateRoute />,
          children: [
            {
              path: '/product/registration',
              element: <ProductRegistration />,
            },
            {
              path: '/mypage',
              element: <MyPage />,
            },
          ],
        },
        // 로그인 하지 않았을 때만 접근 가능
        {
          element: <PublicRoute />,
          children: [
            {
              path: '/signin',
              element: <SignIn />,
            },
            {
              path: '/signup',
              element: <SignUp />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
