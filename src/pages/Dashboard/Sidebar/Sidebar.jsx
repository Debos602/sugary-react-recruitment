import { useState } from "react";
import { FaShoppingCart, FaTachometerAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { MdOutlineBakeryDining } from "react-icons/md";

const Sidebar = () => {
    const [activeRoute, setActiveRoute] = useState("/dashboard");
    const navigate = useNavigate();

    // রুট পরিবর্তনের ফাংশন
    const handleRouteChange = (route) => {
        setActiveRoute(`/dashboard/${route}`);
        navigate(`/dashboard/${route}`);
    };

    // লিঙ্ক স্টাইল ক্লাস জেনারেটর
    const getLinkClasses = (route) => {
        const baseClasses =
            "flex items-center py-3 px-2 my-2 space-x-4 rounded cursor-pointer transition-colors";
        const isActive = activeRoute.includes(route);
        return `${baseClasses} ${
            isActive
                ? "bg-gray-950 text-white"
                : "hover:bg-gray-950 hover:text-white"
        }`;
    };

    return (
        <div className="bg-gray-100 text-gray-950 text-base w-16 md:min-w-[300px] border-r border-gray-950 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <div className="sticky top-0 left-0">
                <div className="flex items-center justify-center h-16 md:h-24 bg-gray-950">
                    <Link
                        to="/dashboard"
                        className="flex items-center text-white"
                    >
                        <MdOutlineBakeryDining size={40} className="mr-2" />
                        <span className="text-2xl font-bold">Bloom&Tech</span>
                    </Link>
                </div>
                <ul className="flex flex-col mt-5 text-xl mx-1 md:px-4">
                    <li>
                        <Link
                            to="/dashboard"
                            className={getLinkClasses("dashboard")}
                            onClick={() => handleRouteChange("")}
                        >
                            <FaTachometerAlt />
                            <span className="hidden md:inline text-[16px] font-semibold">
                                Dashboard Overview
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/products"
                            className={getLinkClasses("products")}
                            onClick={() => handleRouteChange("products")}
                        >
                            <FaShoppingCart />
                            <span className="hidden md:inline text-[16px] font-semibold">
                                Products
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/users"
                            className={getLinkClasses("users")}
                            onClick={() => handleRouteChange("users")}
                        >
                            <FaUser />
                            <span className="hidden md:inline text-[16px] font-semibold">
                                Users
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
