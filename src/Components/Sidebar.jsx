import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const activeLinkClasses = "bg-teal-600 text-white font-semibold";
    const normalLinkClasses = "text-gray-300 hover:bg-teal-700 hover:text-white";

    return (
        <div className="w-74 bg-gray-800 text-white p-5 h-screen fixed top-0 left-0 shadow-lg">
            <div className="text-center mb-8 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-teal-400">Employee Dashboard</h2>
            </div>
            <ul className="space-y-3">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/leaves"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Apply leave
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/resignation"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Resigner
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/change-password"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Change password
                    </NavLink>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
