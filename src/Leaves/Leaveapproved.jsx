import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserApprovedLeaves = () => {
    const [approvedLeaves, setApprovedLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { data, error } = await supabase
                    .from('Approved')
                    .select('name, status, action_by')
                    .eq('user_id', user.uid);

                if (!error) {
                    setApprovedLeaves(data);
                } else {
                    console.error('Supabase error:', error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe(); // clean up listener
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Approved Leaves</h1>
            {loading ? (
                <p>Loading...</p>
            ) : approvedLeaves.length === 0 ? (
                <p>No approved leaves yet.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedLeaves.map((leave, index) => (
                            <tr key={index}>
                                <td className="p-2 border">{leave.name}</td>
                                <td className="p-2 border capitalize text-green-500">{leave.status}</td>
                                <td className="p-2 border">{leave.action_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserApprovedLeaves;
