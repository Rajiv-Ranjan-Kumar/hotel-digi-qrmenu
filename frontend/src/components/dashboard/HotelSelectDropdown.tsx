import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { motion } from "framer-motion";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import type { AppDispatch, RootState } from "../../store/store";
import type { Hotel } from "../../types/hotel";
import { setBranches } from "../../store/slice/branchSlice";





export default function HotelSelectDropdown() {
    const { hotels, count } = useSelector((state: RootState) => state.hotels);
    const dispatch = useDispatch<AppDispatch>();
    
    const [selectedHotel, setSelectedHotel] = useState<Hotel>();





    // Set first hotel as default
    useEffect(() => {
        if (count > 0 && hotels?.[0]) {
            setSelectedHotel(hotels[0]);
        }
    }, [hotels, count]);





    // Dispatch branches whenever selected hotel changes
    useEffect(() => {
        if (!selectedHotel) return;
        const brancheges = selectedHotel.branches;
        dispatch(setBranches(brancheges ?? []));
    }, [selectedHotel, dispatch]);





    // Single hotel or no hotels
    if (count <= 1) {
        const singleHotelName = count === 1 ? hotels?.[0].name : "";
        return (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--primary-bg-color)/40 text-(--primary-text-color) shadow-sm">
                <BuildingOffice2Icon className="w-5 h-5 text-(--accent-color)" />
                <span className="font-medium">{singleHotelName || "No Hotel"}</span>
            </div>
        );
    }



    

    // Dropdown for multiple hotels
    return (
        <Dropdown
            placement="bottom-end"
            className="mt-1 w-52 bg-(--primary-bg-color) border border-(--accent-color)/20 shadow-xl rounded-b-xl overflow-hidden"
            renderTrigger={() => (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--primary-bg-color)/40 hover:bg-(--accent-color)/20 text-(--primary-text-color) shadow-sm cursor-pointer"
                >
                    <BuildingOffice2Icon className="w-5 h-5 text-(--accent-color)" />
                    <span className="font-medium">{selectedHotel?.name || "Select Hotel"}</span>
                </motion.button>
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="py-1"
            >
                <div className="px-4 py-2 text-sm font-semibold text-(--primary-text-color) border-b border-(--accent-color)/20">
                    Choose Hotel
                </div>

                <div className="py-4 max-h-56 my-auto overflow-y-auto no-scrollbar
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-(--secondary-bg-color)
                    [&::-webkit-scrollbar-thumb]:bg-(--accent-color)
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    scrollbar-thin"
                >
                    {hotels?.map((hotel) => (
                        <button
                            key={hotel.id}
                            onClick={() => setSelectedHotel(hotel)}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-(--primary-text-color) transition cursor-pointer
                                ${selectedHotel?.id === hotel.id ? "bg-(--accent-color)/20 font-semibold" : "hover:bg-(--accent-color)/10"}`}
                        >
                            <BuildingOffice2Icon className="w-4 h-4 text-(--accent-color)" />
                            {hotel.name}
                        </button>
                    ))}
                </div>
            </motion.div>
        </Dropdown>
    );
}
