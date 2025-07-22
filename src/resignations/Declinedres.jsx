import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserDeclinedResignations = () => {
    const [declinedResignations, setDeclinedResignations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { data, error } = await supabase
                    .from('ResignationDeclined')
                    .select('name, status, reason, action_by')
                    .eq('user_id', user.uid); // ✅ Filter by logged-in user's UID

                if (!error) {
                    setDeclinedResignations(data);
                } else {
                    console.error('Supabase error:', error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup listener
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Declined Resignations</h1>
            {loading ? (
                <p>Loading...</p>
            ) : declinedResignations.length === 0 ? (
                <p>No declined resignation responses yet.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Decline Reason</th>
                            <th className="p-2 border">Action By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {declinedResignations.map((item, index) => (
                            <tr key={index}>
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border capitalize text-red-600 font-semibold">{item.status}</td>
                                <td className="p-2 border italic">{item.reason}</td>
                                <td className="p-2 border">{item.action_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserDeclinedResignations;

