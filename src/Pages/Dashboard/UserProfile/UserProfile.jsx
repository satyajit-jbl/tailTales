import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <div className="relative">
                    <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full mx-auto border-4 border-yellow-400 shadow-md"
                    />
                </div>
                <h2 className="text-2xl font-bold text-yellow-600 mt-4">{user.displayName}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <div className="mt-4 flex flex-col items-center gap-2">
                    <p className="text-gray-700 font-medium">
                        Email Verified: <span className={`font-bold ${user.emailVerified ? "text-green-600" : "text-red-600"}`}>
                            {user.emailVerified ? "Yes" : "No"}
                        </span>
                    </p>
                    <p className="text-gray-700 font-medium">
                        Phone: <span className="font-bold text-yellow-600">{user.phoneNumber || "N/A"}</span>
                    </p>
                </div>
                <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md transition-all">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;