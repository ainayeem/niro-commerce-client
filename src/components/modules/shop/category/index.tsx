"use client";

import { NCTable } from "@/components/ui/core/NCTable";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import CreateCategoryModal from "./CreateCategoryModal";

type TCategoriesProps = {
  categories: ICategory[];
};

const ManageCategories = ({ categories }: TCategoriesProps) => {
  const handleDelete = (data: ICategory) => {
    console.log(data);
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div className="font-semibold">Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image src={row.original.icon} alt={row.original.name} width={40} height={40} className="w-8 h-8 rounded-full" />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div className="font-semibold">isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-600 border bg-green-100 w-14 text-center px-1 rounded-full">True</p>
          ) : (
            <p className="text-red-600 border bg-red-100 w-14 text-center px-1 rounded-full">False</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="font-semibold">Action</div>,
      cell: ({ row }) => (
        <button className="text-red-500" title="Delete" onClick={() => handleDelete(row.original)}>
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <NCTable data={categories} columns={columns} />
    </div>
  );
};

export default ManageCategories;
