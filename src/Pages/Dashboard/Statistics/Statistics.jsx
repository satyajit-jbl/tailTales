import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { GiAnimalHide } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const {data} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    return (
        <div className='w-11/12 mt-5 mx-auto'>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    {/* <FaDollarSign className="text-5xl"></FaDollarSign> */}
                    <GiAnimalHide className="text-5xl" />
                    
                    </div>
                    <div className="stat-title">Total Pets</div>
                    <div className="stat-value">{data?.pets}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    {/* <FaDollarSign className="text-5xl"></FaDollarSign> */}
                    <MdOutlinePets className="text-5xl"></MdOutlinePets>
                    </div>
                    <div className="stat-title">Adopted</div>
                    <div className="stat-value">{data?.adopts}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaDollarSign className="text-5xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Donation</div>
                    <div className="stat-value">{data?.donation}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaUser className="text-5xl"></FaUser>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{data?.users}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                
            </div>
        </div>
    );
};

export default Statistics;