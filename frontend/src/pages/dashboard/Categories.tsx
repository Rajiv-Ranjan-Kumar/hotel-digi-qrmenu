import React from 'react';
import { Card, Badge, Button } from 'flowbite-react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string;
    itemCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const staticCategories: Category[] = [
    {
        id: "cat-1",
        name: "Appetizers",
        description: "Light starters to begin your meal",
        image: "https://via.placeholder.com/300x200?text=Appetizers",
        itemCount: 12,
    },
    {
        id: "cat-2",
        name: "Main Courses",
        description: "Delicious main dishes",
        image: "https://via.placeholder.com/300x200?text=Main+Courses",
        itemCount: 28,
    },
    {
        id: "cat-3",
        name: "Desserts",
        description: "Sweet treats to finish your meal",
        image: "https://via.placeholder.com/300x200?text=Desserts",
        itemCount: 15,
    },
    {
        id: "cat-4",
        name: "Beverages",
        description: "Drinks and refreshments",
        image: "https://via.placeholder.com/300x200?text=Beverages",
        itemCount: 18,
    },
    {
        id: "cat-5",
        name: "Soups",
        description: "Warm and comforting soups",
        image: "https://via.placeholder.com/300x200?text=Soups",
        itemCount: 8,
    },
    {
        id: "cat-6",
        name: "Salads",
        description: "Fresh and healthy options",
        image: "https://via.placeholder.com/300x200?text=Salads",
        itemCount: 10,
    },
];

export const Categories: React.FC = () => {
    const renderCategory = (category: Category): JSX.Element => (
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative overflow-hidden h-48 bg-gray-200">
                {category.image && (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                )}
                <div className="absolute top-3 right-3">
                    <Badge color="info" className="font-semibold">{category.itemCount} items</Badge>
                </div>
            </div>

            <div className="p-5 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    {category.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                    )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <Button
                        size="sm"
                        color="blue"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <PencilSquareIcon className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        color="failure"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <TrashIcon className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Menu Categories</h1>
                        <p className="text-gray-600 mt-2">Manage your restaurant menu categories</p>
                    </div>
                    <Button color="blue" className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        Add Category
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{staticCategories.length}</div>
                        <p className="text-gray-600 text-sm mt-1">Total Categories</p>
                    </Card>
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-green-600">{staticCategories.reduce((s, c) => s + c.itemCount, 0)}</div>
                        <p className="text-gray-600 text-sm mt-1">Total Items</p>
                    </Card>
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{(staticCategories.reduce((s, c) => s + c.itemCount, 0) / staticCategories.length).toFixed(1)}</div>
                        <p className="text-gray-600 text-sm mt-1">Avg Items/Category</p>
                    </Card>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staticCategories.map(renderCategory)}
                </div>
            </div>
        </div>
    );
};

export default Categories;