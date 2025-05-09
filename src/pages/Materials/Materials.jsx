import Loading from "../../component/Loading/Loading";
import { useGetMaterialsQuery } from "../../redux/features/materials/materialsApi";
import MaterialCard from "./MaterialCard";

const MaterialList = () => {
    const { data, isLoading, error } = useGetMaterialsQuery();

    console.log("Materials data:", data);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-500">Failed to load materials.</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Materials List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.Materials?.length > 0 ? (
                        data.Materials.map((material) => (
                            <MaterialCard
                                key={material.Id}
                                material={material}
                            />
                        ))
                    ) : (
                        <p>No materials found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MaterialList;
