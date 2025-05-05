import { useState } from "react";

import { FaShoppingCart, FaTachometerAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
const Sidebar = () => {
    const [activeRoute, setActiveRoute] = useState("/");
    const navigate = useNavigate();

    // Function to handle route change
    const handleRouteChange = (route) => {
        setActiveRoute(route); // Update active route
        navigate(`/${route}`); // Navigate to the selected route
    };
    const getLinkClasses = (route) => {
        const baseClasses =
            "flex items-center py-3 px-2 my-2 space-x-4 rounded cursor-pointer transition-colors";
        const activeClasses =
            route === activeRoute
                ? "bg-gray-950 text-white"
                : "hover:bg-gray-950 hover:text-white";

        return `${baseClasses} ${activeClasses}`;
    };
    return (
        <div className="bg-gray-100 text-gray-950 text-base w-16 md:min-w-[300px] border-r border-gray-950 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <div className="sticky top-0 left-0">
                <div className="flex items-center justify-center h-16 md:h-24 bg-gray-950 ">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            className="p-4 object-cover"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <ul className="flex flex-col mt-5 text-xl mx-1 md:px-4">
                    <Link
                        onClick={() => handleRouteChange("/")}
                        to="/"
                        className={getLinkClasses("/")}
                    >
                        <FaTachometerAlt />
                        <span className="hidden md:inline text-[16px] font-semibold">
                            Dashboard Overview
                        </span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("products")}
                        to="/products"
                        className={getLinkClasses("products")}
                    >
                        <FaShoppingCart />
                        <span className="hidden md:inline text-[16px] font-semibold">
                            Products
                        </span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("users")}
                        to="/users"
                        className={getLinkClasses("users")}
                    >
                        <FaUser />
                        <span className="hidden md:inline text-[16px] font-semibold">
                            Users
                        </span>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
