import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeaveDetailsCards = ({
    approvedLeaves = 0,
    declinedLeaves = 0,
    approvedResignations = 0,
    declinedResignations = 0,
}) => {
    const primaryTextColor = 'text-indigo-800';
    const approvedCardStyles = 'bg-green-600 text-white';
    const rejectedCardStyles = 'bg-red-600 text-white';

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
            <h1 className={`text-4xl font-extrabold text-center mb-10 ${primaryTextColor}`}>
                Dashboard Overview
            </h1>

            {/* Leave Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className={`text-3xl font-bold text-center mb-8 ${primaryTextColor}`}>
                    Leave Status
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/dashboard/leave-approved">
                        <div className={`${approvedCardStyles} flex items-center p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105`}>
                            <FaCheckCircle className="text-4xl opacity-75 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90">Approved Leaves</p>
                                <p className="text-3xl font-extrabold mt-1">{approvedLeaves}</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/dashboard/leave-declined">
                        <div className={`${rejectedCardStyles} flex items-center p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105`}>
                            <FaTimesCircle className="text-4xl opacity-75 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90">Declined Leaves</p>
                                <p className="text-3xl font-extrabold mt-1">{declinedLeaves}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Resignation Section */}
            <div className="max-w-4xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-8 ${primaryTextColor}`}>
                    Resignation Status
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/dashboard/approved-res">
                        <div className={`${approvedCardStyles} flex items-center p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105`}>
                            <FaCheckCircle className="text-4xl opacity-75 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90">Resignation Approved</p>
                                <p className="text-3xl font-extrabold mt-1">{approvedResignations}</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/dashboard/declined-res">
                        <div className={`${rejectedCardStyles} flex items-center p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105`}>
                            <FaTimesCircle className="text-4xl opacity-75 mr-4 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90">Resignation Declined</p>
                                <p className="text-3xl font-extrabold mt-1">{declinedResignations}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetailsCards;
