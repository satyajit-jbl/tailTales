import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Pages/Shared/secret";
import PrivateRoutes from "./PrivateRoutes";
import AddPet from "../Pages/AddPet/AddPet";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'pet',
            element: <PrivateRoutes><PetListing></PetListing></PrivateRoutes>,
        },
        {
            path: 'donation',
            element: <DonationCampaigns></DonationCampaigns>,
        },
        {
            path: 'login',
            element: <Login></Login>,
        },
        {
            path: 'signup',
            element:<SignUp></SignUp>,
        },
        {
            path: 'secret',
            element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
        },
        {
            path: 'AddPet',
            element: <AddPet></AddPet>
        }
       

      ]
    },
  ]);