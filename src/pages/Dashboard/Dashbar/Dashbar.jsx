import { useState, useEffect, useRef } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Dashbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="sticky top-0 z-50 max-w-full mx-auto px-5 py-4 bg-gray-200 border-b">
            <div className="text-gray-950 text-[14px] md:text-[18px] border-amber-950 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-amber-50">
                <h1 className="font-bold">Dashboard</h1>
                <div className="flex items-center gap-6">
                    <div className="relative" ref={searchRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`px-4 py-2 border rounded-full focus:outline-none transition-all duration-300 ${
                                    searchOpen
                                        ? "w-64 opacity-100"
                                        : "w-0 opacity-0"
                                } md:w-64 md:opacity-100`}
                            />
                            <FaSearch
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer md:hidden"
                                onClick={toggleSearch}
                            />
                        </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-6">
                            <IoNotifications className="text-2xl cursor-pointer" />
                            <div
                                className="text-xl md:text-5xl cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <RxAvatar />
                            </div>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 top-[55px] mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                                <Link
                                    to="#"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <CgProfile />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <CiSettings />
                                    Settings
                                </Link>
                                <Link
                                    to="#"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <RiLogoutCircleRLine />
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashbar;
