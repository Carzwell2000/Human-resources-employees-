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

                    {/* Name Input */}
                    <div className="mb-4">
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
                    <div className="mb-4">
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

                    {/* Rest of your inputs */}
                    {[
                        { label: "Employee ID", name: "employeeId" },
                        { label: "Position", name: "position" },
                        { label: "Department", name: "department" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Phone Number", name: "phone", type: "tel" },
                        { label: "Address", name: "address" }
                    ].map(({ label, name, type = "text" }) => (
                        <div className="mb-4" key={name}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                    ))}

                    {/* Leave Details */}
                    <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Leave Details</h3>
                    <div className="mb-4">
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

                    <div className="mb-4">
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

                    <div className="mb-4">
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

                    <div className="mb-4">
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

                    <div className="mb-6">
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

                    {/* Acting During Leave */}
                    <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Acting During Leave</h3>
                    {[
                        { label: "Full Name", name: "replacementName" },
                        { label: "Email", name: "replacementEmail", type: "email" },
                        { label: "Phone Number", name: "replacementPhone", type: "tel" }
                    ].map(({ label, name, type = "text" }) => (
                        <div className="mb-4" key={name}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="shadow border rounded w-full py-2 px-3"
                            />
                        </div>
                    ))}

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
