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
import { param, path } from "framer-motion/client";
import MyAddedPets from "../Pages/Dashboard/MyAddedPets/MyAddedPets";
import PetDetails from "../Pages/PetDetails/PetDetails";
import Users from "../Pages/Dashboard/Users/Users";
import CreateDonation from "../Pages/Dashboard/CreateDonation/CreateDonation"
import ErrorPage from "../Components/Errorpage/Errorpage";
import AdminRoute from "./AdminRoute";
import MyDonationCampaigns from "../Pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import AllDonationCampaigns from "../Pages/AllDonationCampaigns/AllDonationCampaigns";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import MyDonations from "../Pages/Dashboard/MyDonations/MyDonations";
import AdoptionRequests from "../Pages/AdoptionRequests/AdoptionRequests";
import AllPets from "../Pages/Dashboard/AllPets/AllPets";
import UpdatePet from "../Pages/Dashboard/UpdatePet/UpdatePet";
import UpdateMyDonationCampaign from "../Pages/Dashboard/UpdateMyDonationCampaign/UpdateMyDonationCampaign";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import ContactPage from "../Pages/ContactPage/ContactPage";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";


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
            // element: <PrivateRoutes><PetListing></PetListing></PrivateRoutes>,
            element:<PetListing></PetListing>,
        },
        {
            path: 'petDetails/:id',
            element: <PetDetails></PetDetails>
        },
        {
            path: 'donationCampaigns',
            element: <PrivateRoutes><DonationCampaigns></DonationCampaigns></PrivateRoutes>,
        },
        {
            path: 'donationDetails/:id',
            element: <DonationDetails></DonationDetails>,
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
            path: 'contact',
            element: <ContactPage></ContactPage>
        },
        {
            path: 'privacy',
            element: <PrivacyPolicy></PrivacyPolicy>
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
                    path: 'createDonation',
                    element: <PrivateRoutes><CreateDonation></CreateDonation></PrivateRoutes>
                },
                {
                    path: 'myDonationCampaigns',
                    element: <PrivateRoutes><MyDonationCampaigns></MyDonationCampaigns></PrivateRoutes>
                },
                // {
                //     path: 'donationCampaigns',
                //     element: <PrivateRoutes><DonationCampaigns></DonationCampaigns></PrivateRoutes>
                // },
                {
                    path: 'AddPet',
                    element: <PrivateRoutes><AddPet></AddPet></PrivateRoutes>
                },
                {
                    path: 'UpdatePet/:id',
                    element: <PrivateRoutes><UpdatePet></UpdatePet></PrivateRoutes>,
                    loader: ({params})=> fetch(`https://12-b10-assignment-satyajit-server.vercel.app/pets/${params.id}`)
                },
                {
                    path: 'update-DonationCampaign/:id',
                    element: <PrivateRoutes><UpdateMyDonationCampaign></UpdateMyDonationCampaign></PrivateRoutes>,
                    loader: ({params})=> fetch(`https://12-b10-assignment-satyajit-server.vercel.app/donations/${params.id}`)
                },
                {
                    path: 'myDonation',
                    element: <PrivateRoutes><MyDonations></MyDonations></PrivateRoutes>
                },
                {
                    path: 'myAddedPets',
                    element: <PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes>
                },
                {
                    path: 'adoptionRequest',
                    element: <PrivateRoutes><AdoptionRequests></AdoptionRequests></PrivateRoutes>
                },
                {
                    path: 'userProfile',
                    element: <PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>
                },


                //admin routes
                {
                    path: 'users',
                    element: <AdminRoute><Users></Users></AdminRoute>
                },
                {
                    path: 'allPets',
                    element: <AdminRoute><AllPets></AllPets></AdminRoute>
                },
                {
                    path: 'allDonationCampaigns',
                    element: <AdminRoute><AllDonationCampaigns></AllDonationCampaigns></AdminRoute>
                },
                {
                    path: 'statistics',
                    // element: <AdminRoute><AllDonationCampaigns></AllDonationCampaigns></AdminRoute>
                    element: <Statistics></Statistics>
                }
            ]
        }
        
       

      ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
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