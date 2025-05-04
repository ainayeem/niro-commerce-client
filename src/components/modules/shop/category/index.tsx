"use client";

import DeleteConfirmationModal from "@/components/ui/core/NCModal/DeleteConfirmationModal";
import { NCTable } from "@/components/ui/core/NCTable";
import TablePagination from "@/components/ui/core/NCTable/TablePagination";
import { deleteCategory } from "@/services/CategoryService";
import { ICategory, IMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateCategoryModal from "./CreateCategoryModal";

type TCategoriesProps = {
  categories: ICategory[];
  meta: IMeta;
};

const ManageCategories = ({ categories, meta }: TCategoriesProps) => {
  console.log("🚀 ~ ManageCategories ~ meta:", meta);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ICategory) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      console.error((err as Error)?.message);
    }
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
      <DeleteConfirmationModal name={selectedItem} isOpen={isModalOpen} onOpenChange={setModalOpen} onConfirm={handleDeleteConfirm} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageCategories;
