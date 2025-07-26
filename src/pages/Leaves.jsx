// src/components/LeaveApplicationForm.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../Components/supabaseClient';
import { getAuth } from 'firebase/auth';

const LeaveApplicationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        employeeId: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        address: '',
        applicationDate: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        replacementName: '',
        replacementEmail: '',
        replacementPhone: '',
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({ ...prev, applicationDate: today }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                alert('You must be logged in to submit a leave application.');
                return;
            }

            const uid = user.uid;

            const { error: leaveError } = await supabase
                .from('Leaves')
                .insert([{
                    user_id: uid,
                    name: formData.name,
                    gender: formData.gender,
                    employee_id: formData.employeeId,
                    position: formData.position,
                    department: formData.department,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    application_date: formData.applicationDate,
                    leavetype: formData.leaveType,
                    startdate: formData.startDate,
                    enddate: formData.endDate,
                    reason: formData.reason,
                    status: 'pending'
                }]);

            if (leaveError) throw leaveError;

            const { error: replacementError } = await supabase
                .from('Replacement')
                .insert([{
                    name: formData.replacementName,
                    email: formData.replacementEmail,
                    phone: formData.replacementPhone
                }]);

            if (replacementError) throw replacementError;

            alert('Leave application submitted successfully!');

            const today = new Date().toISOString().split('T')[0];
            setFormData({
                name: '',
                gender: '',
                employeeId: '',
                position: '',
                department: '',
                email: '',
                phone: '',
                address: '',
                applicationDate: today,
                leaveType: '',
                startDate: '',
                endDate: '',
                reason: '',
                replacementName: '',
                replacementEmail: '',
                replacementPhone: '',
            });
        } catch (error) {
            console.error('Error submitting leave application:', error);
            alert(`Error: ${error.message || 'Could not submit application.'}`);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-green-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee Leave Application</h2>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Details</h3>

                    {/* Personal Details - Row of 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Gender Select */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Employee ID Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Employee ID:</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Position Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Position:</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Department Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Address Input */}
                        <div className="lg:col-span-1"> {/* Adjust to span only 1 column in lg, or remove if you want it to wrap */}
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                    </div>

                    {/* Leave Details - Row of 3 */}
                    <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Leave Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                        {/* Application Date Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Application Date:</label>
                            <input
                                type="date"
                                name="applicationDate"
                                value={formData.applicationDate}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* Type of Leave Select */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Type of Leave:</label>
                            <select
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            >
                                <option value="">Select Leave Type</option>
                                <option value="annual">Annual Leave</option>
                                <option value="sick">Sick Leave</option>
                                <option value="casual">Casual Leave</option>
                                <option value="maternity">Maternity Leave</option>
                                <option value="paternity">Paternity Leave</option>
                                <option value="unpaid">Unpaid Leave</option>
                            </select>
                        </div>

                        {/* Start Date Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>

                        {/* End Date Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                        {/* Reason for Leave (this is a textarea, so it often looks better spanning full width) */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Reason for Leave:</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows="4"
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            ></textarea>
                        </div>
                    </div>


                    {/* Acting During Leave - Row of 3 */}
                    <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Acting During Leave</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {/* Replacement Name Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
                            <input
                                type="text"
                                name="replacementName"
                                value={formData.replacementName}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Replacement Email Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                name="replacementEmail"
                                value={formData.replacementEmail}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Replacement Phone Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                            <input
                                type="tel"
                                name="replacementPhone"
                                value={formData.replacementPhone}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveApplicationForm;
