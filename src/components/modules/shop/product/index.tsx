"use client";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/core/NCModal/DeleteConfirmationModal";
import { NCTable } from "@/components/ui/core/NCTable";
import { deleteProduct } from "@/services/ProductService";
import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ManageProducts = ({ products }: { products: IProduct[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();

  const handleView = (product: IProduct) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = (data: IProduct) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image src={row.original.imageUrls[0]} alt={row.original.name} width={40} height={40} className="w-8 h-8 rounded-full" />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Ofter Price",
      cell: ({ row }) => <span>$ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-blue-500" title="View" onClick={() => handleView(row.original)}>
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() => router.push(`/user/shop/products/update-product/${row.original._id}`)}
          >
            <Edit className="w-5 h-5" />
          </button>

          <button className="text-gray-500 hover:text-red-500" title="Delete" onClick={() => handleDelete(row.original)}>
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/user/shop/products/add-product")} size="sm">
            Add Product <Plus />
          </Button>
        </div>
      </div>
      <NCTable columns={columns} data={products || []} />

      <DeleteConfirmationModal name={selectedItem} isOpen={isModalOpen} onOpenChange={setModalOpen} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default ManageProducts;
