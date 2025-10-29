import React, { useState, useEffect } from 'react';
import { supabase } from '../Components/supabaseClient';
import auth from '../Components/firebaseConfig'; // Firebase auth

const TraceRecords = () => {
    const [traceData, setTraceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTraceData();
    }, []);

    const fetchTraceData = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.warn("⚠️ User not logged in");
            setLoading(false);
            return;
        }

        const userId = currentUser.uid;

        // ✅ Fetch only the tracing column where user_id matches
        const { data, error } = await supabase
            .from('Trace')
            .select('tracing')
            .eq('user_id', userId)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching Trace records:', error);
        } else {
            setTraceData(data);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
                    Trace Records
                </h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : traceData.length === 0 ? (
                    <p className="text-center text-gray-500">No trace records found.</p>
                ) : (
                    <div className="space-y-3">
                        {traceData.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-sm hover:bg-gray-100 transition"
                            >
                                <p className="text-gray-800">{item.tracing}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TraceRecords;
