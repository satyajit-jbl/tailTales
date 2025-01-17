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
import Dashboard from "../Layout/Dashboard";
import { path } from "framer-motion/client";
import MyAddedPets from "../Pages/Dashboard/MyAddedPets/MyAddedPets";
import PetDetails from "../Pages/PetDetails/PetDetails";
import Users from "../Pages/Dashboard/Users/Users";


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
            path: 'petDetails/:id',
            element: <PetDetails></PetDetails>
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
        // {
        //     path: 'AddPet',
        //     element: <AddPet></AddPet>
        // },
        {
            path: 'dashboard',
            element: <Dashboard></Dashboard>,
            children:[
                {
                    path: 'AddPet',
                    element: <PrivateRoutes><AddPet></AddPet></PrivateRoutes>
                },
                {
                    path: 'myAddedPets',
                    element: <PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes>
                },


                //admin routes
                {
                    path: 'users',
                    element: <Users></Users>
                }
            ]
        }
        
       

      ]
    },
    // {
    //     path: 'dashboard',
    //     element: <Dashboard></Dashboard>,
    //     children:[
    //         {
    //             path: 'AddPet',
    //             element: <AddPet></AddPet>
    //         }
    //     ]
    // }
  ]);