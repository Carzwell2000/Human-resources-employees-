import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeaveDetailsCards = () => {

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
            <h1 className={`text-4xl font-extrabold text-center mb-10 `}>
                Status  Dashboard
            </h1>

            {/* Leave Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className={`text-3xl font-bold text-center mb-8 `}>
                    Leave Status
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/dashboard/leave-approved">
                        <div className="bg-white rounded shadow p-4 flex items-center space-x-3">
                            <FaCheckCircle className="text-green-600 text-xl" />
                            <div>
                                <p className=" font-bold text-lg">Status</p>
                                <p className=" text-sm">check if your leave is approved here</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/dashboard/leave-declined">
                        <div className="bg-white rounded shadow p-4 flex items-center space-x-3">
                            <FaTimesCircle className="text-red-600 text-xl" />
                            <div>
                                <p className="font-bold text-lg">status</p>
                                <p className="text-sm">check if your leave is declined here</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* ✅ Trace Section (NEW) */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className={`text-3xl font-bold text-center mb-8`}>
                    Trace Records
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/dashboard/trace-records">
                        <div className="bg-white rounded shadow p-4 flex items-center space-x-3">
                            <FaHistory className="text-blue-600 text-xl" />
                            <div>
                                <p className="font-bold text-lg">Trace</p>
                                <p className="text-sm">View your leave tracing history here</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Resignation Section 
            <div className="max-w-4xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-8 `}>
                    Resignation Status
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/dashboard/approved-res">
                        <div className="bg-white rounded shadow p-4 flex items-center space-x-3">
                            <FaCheckCircle className="text-green-600 text-xl" />
                            <div>
                                <p className=" font-bold text-lg">Status</p>
                                <p className="text-sm">check if  your Resignation is approved here </p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/dashboard/declined-res">
                        <div className="bg-white rounded shadow p-4 flex items-center space-x-3">
                            <FaTimesCircle className="text-red-600 text-xl" />
                            <div>
                                <p className=" font-bold text-lg">Status</p>
                                <p className="text-sm">check if your resignation is declined</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>*/}
        </div>
    );
};

export default LeaveDetailsCards;
