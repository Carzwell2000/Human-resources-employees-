// src/components/ResignationForm.js
import React, { useState } from 'react';
import { supabase } from '../Components/supabaseClient';
import { getAuth } from 'firebase/auth';

const ResignationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        employeeId: '',
        department: '',
        resignationDate: '',
        lastDay: '',
        reason: '',
        gender: '',
        phoneNumber: '', // New: Add phone number to state
        email: '',       // New: Add email to state
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const confirmSubmit = () => {
        // Basic validation before showing confirm dialog
        if (
            !formData.fullName ||
            !formData.employeeId ||
            !formData.department ||
            !formData.resignationDate ||
            !formData.lastDay ||
            !formData.reason ||
            !formData.gender ||
            !formData.phoneNumber || // New: Validate phone number
            !formData.email           // New: Validate email
        ) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmSubmit = async () => {
        setIsSubmitting(true);
        setShowConfirm(false);

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert('❌ You must be logged in to submit a resignation.');
            setIsSubmitting(false);
            return;
        }

        const user_id = currentUser.uid;

        const { data, error } = await supabase
            .from('Resignation')
            .insert([
                {
                    full_name: formData.fullName,
                    employee_id: formData.employeeId,
                    department: formData.department,
                    resignation_date: formData.resignationDate,
                    last_day: formData.lastDay,
                    reason: formData.reason,
                    gender: formData.gender,
                    phone_number: formData.phoneNumber, // New: Save to Supabase
                    email: formData.email,               // New: Save to Supabase
                    user_id: user_id,
                }
            ]);

        if (error) {
            console.error('Error submitting resignation:', error);
            alert('❌ Error submitting resignation form. Please try again.');
            setIsSubmitting(false);
            return;
        }

        alert('✅ Resignation form submitted successfully!');
        console.log('Submitted:', data);

        // Clear the form after successful submission
        setFormData({
            fullName: '',
            employeeId: '',
            department: '',
            resignationDate: '',
            lastDay: '',
            reason: '',
            gender: '',
            phoneNumber: '', // New: Clear phone number
            email: '',       // New: Clear email
        });

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-green-500 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resignation Form</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="employeeId" className="block text-gray-700 font-medium mb-1">Employee ID</label>
                        <input
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="department" className="block text-gray-700 font-medium mb-1">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* New: Phone Number Field */}
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                        <input
                            type="tel" // Use type="tel" for phone numbers
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* New: Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input
                            type="email" // Use type="email" for email addresses
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Gender Select */}
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="resignationDate" className="block text-gray-700 font-medium mb-1">Resignation Date</label>
                        <input
                            type="date"
                            id="resignationDate"
                            name="resignationDate"
                            value={formData.resignationDate}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastDay" className="block text-gray-700 font-medium mb-1">Last Day of Employment</label>
                        <input
                            type="date"
                            id="lastDay"
                            name="lastDay"
                            value={formData.lastDay}
                            onChange={handleChange}
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">Reason for Resignation</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="4"
                            className="border rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Please provide your reason for resignation..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="button"
                        onClick={confirmSubmit}
                        disabled={isSubmitting}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Resignation'}
                    </button>
                </form>
            </div>

            {/* --- Notice Section --- */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="font-bold text-lg mb-2">Important Notice Regarding Your Resignation</h3>
                <p className="text-sm leading-relaxed">
                    By submitting this form, you are formally tendering your resignation. Please ensure all information provided is accurate.
                    Upon submission, your departmental manager and Human Resources will be notified. HR will contact you within
                    2-3 business days to discuss your offboarding process, including your final pay, benefits, and return of company property.
                    If you have any immediate questions, please contact HR directly.
                </p>
            </div>
            {/* --- End Notice Section --- */}


            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to submit?</h3>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSubmit}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResignationForm;