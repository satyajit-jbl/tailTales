import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { GiAnimalHide } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const chartData = [
        { name: 'Donation', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Adopted', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Users', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Reviews', uv: 1890, pv: 4800, amt: 2181 },
    ];

    const chartData2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-4 mt-5">
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <GiAnimalHide className="text-5xl mx-auto text-secondary" />
                    <h3 className="text-lg font-semibold mt-2">Total Pets</h3>
                    <p className="text-2xl font-bold">{data?.pets}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <MdOutlinePets className="text-5xl mx-auto text-secondary" />
                    <h3 className="text-lg font-semibold mt-2">Adopted</h3>
                    <p className="text-2xl font-bold">{data?.adopts}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <FaDollarSign className="text-5xl mx-auto text-secondary" />
                    <h3 className="text-lg font-semibold mt-2">Donations</h3>
                    <p className="text-2xl font-bold">{data?.donation}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <FaUser className="text-5xl mx-auto text-secondary" />
                    <h3 className="text-lg font-semibold mt-2">Users</h3>
                    <p className="text-2xl font-bold">{data?.users}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                {/* Bar Chart */}
                <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-semibold mb-4">Statistics Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="uv" fill="#8884d8">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-semibold mb-4">Donation Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
