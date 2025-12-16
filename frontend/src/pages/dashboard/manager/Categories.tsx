import { useState, type JSX } from "react";
import SearchInput from "../../../utils/elements/SearchBox";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import FilterSelect from "../../../utils/elements/FilterSelect";
import PrimaryButton from "../../../utils/elements/PrimaryButton";
import Pagination from "../../../utils/elements/Pagination";
import Table from "../../../utils/elements/Table";



type ManagerCategory = {
  id: string;
  name: string;
  image: string;
  items: number;
  status: "Active" | "Inactive";
};

const ALL_DATA: ManagerCategory[] = [
  {
    id: "c1",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1601924582975-7e670818f8d8",
    items: 12,
    status: "Active",
  },
  {
    id: "c2",
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1603899124575-1ec3a5e9e74f",
    items: 8,
    status: "Active",
  },
  {
    id: "c3",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853",
    items: 10,
    status: "Inactive",
  },
  {
    id: "c4",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc",
    items: 14,
    status: "Active",
  },
];




const columns = [
  { key: "image", label: "Category", width: "80px" },
  { key: "name", label: "Category Name" },
  { key: "items", label: "Total Items" },
  { key: "status", label: "Status" }
];



const actions = [
  {
    icon: <PencilSquareIcon className="w-5 h-5" />,
    onClick: (row: any) => console.log("Edit", row)
  },
  {
    icon: <TrashIcon className="w-5 h-5 text-red-400" />,
    onClick: (row: any) => console.log("Delete", row)
  }
];




export default function ManagerCategories(): JSX.Element {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [page, setPage] = useState(1);

  const PER_PAGE = 4;

  const filtered = ALL_DATA.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);





  return (
    <div className="p-1 bg-(--primary-bg-color) min-h-screen text-(--primary-text-color)">

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

        <SearchInput 
          placeholder="Search categories..." 
          searchValue={search} 
          setSearchValue={setSearch}
        />

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Filter */}
          <FilterSelect
            value={filter}
            setValue={(value) => setFilter(value as "All" | "Active" | "Inactive")}
            options={["All", "Active", "Inactive"]}
          />

          {/* Add Category */}
          <PrimaryButton 
            label="Add Category"
            icon={<PlusIcon className="w-5 h-5" />}
            onClick={() => console.log("Add clicked")}
          />
        </div>
      </div>

      {/* MAIN CARD */}
      <Table 
        columns={columns} 
        data={paginated} 
        actions={actions}
        loading={false}
      />

      {/* Pagination */}
      <div className="w-full">
        <Pagination 
          page={page} 
          totalPages={totalPages} 
          onChange={setPage} 
        />
      </div>

    </div>
  );
}
