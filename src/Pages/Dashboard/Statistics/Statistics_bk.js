import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { GiAnimalHide } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';



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
    })

    //custom shape

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //for pie chart

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    const chartData = [
        { name: 'Donation', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Adopted', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Donations', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Users', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Reviews', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Donation', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const chartData2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];


    return (
        <div className='w-11/12 mt-5 mx-auto'>
            <div className="stats shadow">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 shadow"> */}
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
            <div className="flex flex-col md:flex-row mt-10">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={chartData2}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData2.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>


        </div>
    );
};

export default Statistics;