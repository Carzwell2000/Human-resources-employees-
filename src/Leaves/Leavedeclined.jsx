// src/components/DeclinedTable.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';
import { getAuth } from 'firebase/auth';

const DeclinedTable = () => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeclinedReplies = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('Declined')
            .select('user_id, name, status, reason, action_by')
            .eq('user_id', user.uid)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching declined replies:', error);
        } else {
            setReplies(data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchDeclinedReplies();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading declined replies...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 mt-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Declined Leave Applications</h2>
            {replies.length === 0 ? (
                <p className="text-gray-500">No declined leave replies found.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Reason</th>
                            <th className="p-2 border">Action By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {replies.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border capitalize">{item.status}</td>
                                <td className="p-2 border">{item.reason}</td>
                                <td className="p-2 border">{item.action_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeclinedTable;
