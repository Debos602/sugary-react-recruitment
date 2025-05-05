import { useState, useEffect } from "react";
import MultiAxisLineChart from "../../../component/LineChart/LineChart";
import DoughnutChartGray from "../../../component/DoughnutChartGray/DoughnutChartGray";

const DashboardOverview = () => {
    const [user, setUser] = useState({ name: "Debos Das", country: "USA" }); // Replace with dynamic user data
    const [quickActions, setQuickActions] = useState([
        {
            title: "My Tasks",
            description: "View and manage your tasks",
            color: "blue",
            data: [],
        },
        {
            title: "Upcoming Events",
            description: "Check your upcoming events",
            color: "green",
            data: [],
        },
        {
            title: "Notifications",
            description: "View new notifications",
            color: "purple",
            data: [],
        },
        {
            title: "Support",
            description: "Contact support or view FAQs",
            color: "red",
            data: [],
        },
    ]);

    // Static country data
    const userCountryData = [
        { country: "USA", population: 331002651, gdp: 21427700 },
        { country: "China", population: 1439323776, gdp: 14722731 },
        { country: "Japan", population: 126476461, gdp: 5081770 },
        { country: "Germany", population: 83783942, gdp: 3845630 },
        { country: "India", population: 1380004385, gdp: 2875142 },
    ];

    useEffect(() => {
        // Fetch dynamic data (replace with actual API calls)
        setUser({ name: "John Doe", country: "USA" }); // Example user data
        setQuickActions([
            {
                title: "My Tasks",
                description: "5 pending tasks",
                color: "blue",
                data: ["Task A", "Task B"],
            },
            {
                title: "Upcoming Events",
                description: "3 upcoming events",
                color: "green",
                data: ["Meeting", "Conference"],
            },
            {
                title: "Notifications",
                description: "2 new notifications",
                color: "purple",
                data: ["Reminder", "New Message"],
            },
            {
                title: "Support",
                description: "Help center available",
                color: "red",
                data: [],
            },
        ]);
    }, []);

    return (
        <div className="px-6 py-8 bg-gray-100">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white shadow-md p-4 rounded-md">
                <div className="text-2xl font-semibold text-gray-800">
                    Welcome, {user.name}!
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-8 gap-6">
                <div className="col-span-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer"
                            >
                                <div
                                    className={`text-lg font-semibold text-${action.color}-600`}
                                >
                                    {action.title}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {action.description}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-100 p-6 rounded-md shadow-xl mt-8">
                        <MultiAxisLineChart />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="bg-gray-100 rounded-md shadow-xl">
                        <DoughnutChartGray />
                    </div>
                </div>
            </div>

            {/* Country Data Table */}
            <div className="bg-white p-6 rounded-md shadow-md mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Country Data
                </h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                                Country
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                                Population
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                                GDP (USD)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCountryData.map((data, index) => (
                            <tr
                                key={index}
                                className={
                                    data.country === user.country
                                        ? "bg-blue-50"
                                        : ""
                                }
                            >
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    {data.country}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    {data.population.toLocaleString()}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    ${data.gdp.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOverview;
