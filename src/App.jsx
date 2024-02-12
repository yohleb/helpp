import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from './pages'

import { ErrorrComp } from './components';

// loaders
import { loader as landingLoader } from './pages/Landing';
import {loader as productLoader } from './pages/SingleProduct';
import {loader as productsLoader} from './pages/Products';


const router = createBrowserRouter([
  {
    path: '/',
    element:<HomeLayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorrComp />
      }, 
      {
        path:'products',
        element: <Products />,
        loader: productsLoader

      },
      {
        path:'product/:id',
        element: <SingleProduct />,
        loader: productLoader
      },
      {
        path:'cart',
        element: <Cart />,
      },
      {
        path:'about',
        element: <About />,
      },
      {
        path:'orders',
        element: <Orders />,
      },
      {
        path:'checkout',
        element: <Checkout />,
      }
      
      
    ]
  },
  {
    path: '/login',
    element:<Login />,
    errorElement:<Error />,
  },
  {
    path: '/register',
    element:<Register />,
    errorElement:<Error />,
  }
])

const App = () => {
  return <RouterProvider router={router} />
};
export default App;