import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";



interface SearchInputProps {
    placeholder?: string;
    searchValue: string;
    setSearchValue: (value: string) => void;
}



const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search...", searchValue, setSearchValue }) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };



    
    return (
        <div className="relative w-full max-w-sm h-12">
            <MagnifyingGlassIcon
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 -mt-0.5 text-(--secondary-text-color)"
            />

            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="
                    w-full pl-10 pr-3 py-2 rounded-lg 
                    bg-(--secondary-bg-color)
                    border border-(--secondary-text-color)/20
                    focus:outline-none 
                    focus:ring-2 focus:ring-(--accent-color)
                    text-(--primary-text-color)
                "
            />
        </div>
    );
};

export default SearchInput;
