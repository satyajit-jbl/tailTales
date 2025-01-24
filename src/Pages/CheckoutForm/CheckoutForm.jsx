import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
// import useCart from '../../../hooks/useCart';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import useDonationAmt from '../../hooks/useDonationAmt';



const CheckoutForm = ({ donationAmount,petname,currentAmount, id,maxDonation, petImage }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId]= useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // const [cart, refetch]= useCart();
    // const[donationByUser, loading, refetch] = useDonationAmt();
    // const totalPrice = cart.reduce((total, item) => total+item.price, 0);
    // const donationAmount = donationAmount;
    // console.log(donationAmount, petname);
    const navigate = useNavigate();

    useEffect(()=>{
       if(donationAmount>0 ){
        const res = axiosSecure.post('/create-payment-intent', {donationAmount: donationAmount})
       .then(res=>{
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
       })
       } 
    //    if(donationAmount<=0 ){
    //     alert("must be greater then 0")
    //    } else if(donationAmount > maxDonation){
    //     alert("input less")
    //    } else
    //     {
    //     const res = axiosSecure.post('/create-payment-intent', {donationAmount: donationAmount})
    //    .then(res=>{
    //     console.log(res.data.clientSecret);
    //     setClientSecret(res.data.clientSecret)
    //    })
    //    } 
    //    else {alert("wrong value")}
    },[axiosSecure, donationAmount])

    const handleSubmit = async (event) => {
        event.preventDefault();

      

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            // console.log('payment error', error);
            setError(error.message)
        }
        else{
            // console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }

            }
        })
        if(confirmError){
            // console.log('cofirm error');
        }
        else{
            // console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const donationInfo = {
                    id: id,
                    petName: petname,
                    petImage: petImage,
                    email: user.email,
                    donationAmount: parseFloat(donationAmount),
                    // currentAmount: parseFloat(currentAmount+donationAmount),
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to
                    // cartIds: cart.map(item=> item._id),
                    // menuItemIds: cart.map(item=>item.menuId),
                    // status: 'pending'
                    
                    
                    
                }
                const res = await axiosSecure.post('/payments', donationInfo);
                // console.log('donation payment saved', res.data);
                // refetch();
                if(res.data?.donationResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment done successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/myDonation');
                }
            }
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            ></CardElement>
            <button className='btn btn-sm btn-primary mt-6' type='submit' disabled={!stripe || !clientSecret}>
            {/* <button className='btn btn-sm btn-primary' type='submit' disabled={!stripe}> */}
                Pay
            </button>
            <p className='text-red-600'> {error}</p>
            {transactionId && <p className='text-green-700'>Your Transaction id: {transactionId}</p>}

        </form>
    );
};

export default CheckoutForm;