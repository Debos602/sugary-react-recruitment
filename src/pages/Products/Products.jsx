import { useState, useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "./Product.css"; // Ensure you have this CSS file for custom styles
import { toast } from "sonner";
import { gsap } from "gsap";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for details modal
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
    const modalRef = useRef(null);
    const cardRefs = useRef([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch product data from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("product.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setProducts(data);
                gsap.from(cardRefs.current, {
                    opacity: 1,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.9,
                    ease: "power2.out",
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Get all unique keys from the product data
    const getAllKeys = () => {
        const keys = new Set();
        products.forEach((product) => {
            if (product.data) {
                Object.keys(product.data).forEach((key) => keys.add(key));
            }
        });
        return Array.from(keys);
    };

    // Handle clicks outside the modal to close it
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false);
            setIsDetailsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen || isDetailsModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen, isDetailsModalOpen]);

    // Handle form submission to add a new product
    const onSubmit = async (data) => {
        const lastProduct = products[products.length - 1];
        const lastId = lastProduct ? parseInt(lastProduct.id) : 0;
        const newId = (lastId + 1).toString(); // Increment the last ID

        const newProduct = {
            id: newId,
            name: data.name,
            data: keys.reduce((acc, key) => {
                if (data[key]) {
                    acc[key] = data[key];
                }
                return acc;
            }, {}),
        };

        try {
            const response = await fetch(
                "https://api.restful-api.dev/objects",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const result = await response.json();
            setProducts((prev) => [...prev, result]); // Update state with the new product
            reset(); // Reset the form
            toast.success("Product added successfully!");
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error adding product:", error);
            setError(error.message);
        }
    };

    // Find a single product by ID
    const findProductById = async (id) => {
        try {
            const response = await fetch(
                `https://api.restful-api.dev/objects/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }
            const product = await response.json();
            setSelectedProduct(product); // Set the selected product
            setIsDetailsModalOpen(true); // Open the details modal
            toast.success(`Product found: ${product.name}`);
        } catch (error) {
            console.error("Error finding product:", error);
            toast.error("Failed to find product");
        }
    };

    // Delete a product by ID
    const deleteProductById = async (id) => {
        try {
            const response = await fetch(
                `https://api.restful-api.dev/objects/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            // Remove the deleted product from the state
            setProducts((prev) => prev.filter((product) => product.id !== id));
            toast.success("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };

    const keys = getAllKeys(); // Get all unique keys for table columns

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex  flex-col sm:flex-row items-center justify-between w-full max-w-[calc(100vw-315px)]">
                <h1 className="text-2xl font-bold mb-6 text-gray-950">
                    Products
                </h1>
                <button
                    className="border btn px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Product
                </button>
            </div>

            {/* Full-screen overlay modal for adding a product */}
            {isModalOpen && (
                <div className="overlay">
                    <dialog
                        id="my_modal_4"
                        className="modal modal-open shadow-xl rounded-xl"
                        open
                    >
                        <div
                            className="modal-box w-full max-w-5xl p-5"
                            ref={modalRef}
                        >
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="py-4"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-[18px] font-semibold text-gray-950">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            {...register("name", {
                                                required:
                                                    "Product name is required",
                                            })}
                                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Dynamic input fields for the first 2 keys */}
                                    {keys.slice(0, 2).map((key) => (
                                        <div className="mb-4" key={key}>
                                            <label className="block text-[18px] font-semibold text-gray-950">
                                                {key}
                                            </label>
                                            <input
                                                type="text"
                                                name={key}
                                                {...register(key)}
                                                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="modal-action flex justify-between">
                                    <button
                                        type="submit"
                                        className="btn bg-gray-950 border border-gray-950 duration-300 hover:bg-white text-white hover:text-gray-950 px-2 py-2 rounded"
                                    >
                                        Add Product
                                    </button>
                                    <button
                                        type="button"
                                        className="btn bg-gray-950 border border-gray-950 duration-300 hover:bg-white text-white hover:text-gray-950 px-2 py-2 rounded"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
            )}

            {/* Full-screen overlay modal for product details */}
            {isDetailsModalOpen && (
                <div className="overlay">
                    <dialog
                        id="my_modal_5"
                        className="modal modal-open shadow-xl rounded-xl "
                        open
                    >
                        <div
                            className="modal-box w-full max-w-7xl p-5"
                            ref={modalRef}
                        >
                            <div className="py-4">
                                <h2 className="text-2xl font-bold mb-6 text-gray-950">
                                    Product Details
                                </h2>
                                {selectedProduct && (
                                    <div className="space-y-4">
                                        <p>
                                            <strong>ID:</strong>{" "}
                                            {selectedProduct.id}
                                        </p>
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {selectedProduct.name}
                                        </p>
                                        {Object.entries(
                                            selectedProduct.data || {}
                                        ).map(([key, value]) => (
                                            <p key={key}>
                                                <strong>{key}:</strong> {value}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn bg-gray-950 border border-gray-950 duration-300 hover:bg-white text-white hover:text-gray-950 px-2 py-2 rounded"
                                    onClick={() => setIsDetailsModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {/* Product Table */}
            <div className="overflow-x-auto max-w-full">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="w-full">
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 min-w-[60px] bg-gray-950 border-b border-gray-200 text-left text-[18px] font-semibold text-gray-100">
                                ID
                            </th>
                            <th className="py-2 px-4 min-w-[200px] bg-gray-950 border-b border-gray-200 text-left text-[18px] font-semibold text-gray-100">
                                Name
                            </th>
                            {keys.slice(0, 10).map((key, index) => (
                                // for the first index min width should be 200px and for the rest of them width should be 100px

                                <th
                                    key={key}
                                    className={`py-2 ${
                                        index === 0
                                            ? "min-w-[150px]"
                                            : "min-w-[100px]"
                                    } bg-gray-950 px-4 border-b border-gray-200 text-left text-[18px] font-semibold text-gray-100`}
                                >
                                    {key}
                                </th>
                            ))}
                            <th className="py-2 px-4 bg-gray-950 border-b border-gray-200 text-left text-[18px] font-semibold text-gray-100">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-50"
                                ref={(el) => (cardRefs.current[index] = el)}
                            >
                                <td className="py-2 px-4 border-b border-gray-200 text-[18px] text-gray-950">
                                    {index + 1}.
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-[18px] text-gray-950">
                                    {product.name}
                                </td>
                                {keys.slice(0, 10).map((key) => (
                                    <td
                                        key={key}
                                        className="py-2 px-4 border-b border-gray-200 text-[18px] text-gray-950"
                                    >
                                        {product.data
                                            ? product.data[key] || "N/A"
                                            : "N/A"}
                                    </td>
                                ))}
                                {/* Action Buttons */}
                                <td className="py-4 px-4 border-b border-gray-200 text-[18px] text-gray-950 flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        onClick={() =>
                                            deleteProductById(product.id)
                                        }
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        onClick={() =>
                                            findProductById(product.id)
                                        }
                                    >
                                        Find
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Products;
