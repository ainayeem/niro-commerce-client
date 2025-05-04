"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { NCTable } from "@/components/ui/core/NCTable";
import TablePagination from "@/components/ui/core/NCTable/TablePagination";
import type { IMeta } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ICoupon {
  _id: string;
  code: string;
  discountValue: number;
  endDate: string;
  isActive: boolean;
}

const ManageCoupon = ({ coupons, meta }: { coupons: ICoupon[]; meta: IMeta }) => {
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const router = useRouter();

  const handleView = (coupon: ICoupon) => {
    console.log("Viewing coupon:", coupon);
  };

  const handleDelete = (couponId: string) => {
    console.log("Deleting coupon with ID:", couponId);
  };

  const columns: ColumnDef<ICoupon>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedCoupons([...selectedCoupons, row.original._id]);
            } else {
              setSelectedCoupons(selectedCoupons.filter((id) => id !== row.original._id));
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: "Coupon Code",
      cell: ({ row }) => <span className="font-semibold">{row.original.code}</span>,
    },
    {
      accessorKey: "discount",
      header: "Discount",
      cell: ({ row }) => <span>{row.original.discountValue}%</span>,
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: ({ row }) => <span>{new Date(row.original.endDate).toLocaleDateString()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={row.original.isActive ? "text-green-500" : "text-red-500"}>{row.original.isActive ? "Active" : "Inactive"}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-blue-500" title="View" onClick={() => handleView(row.original)}>
            <Eye className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-green-500" title="Edit" onClick={() => router.push(`/admin/edit-coupon/${row.original._id}`)}>
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-red-500" title="Delete" onClick={() => handleDelete(row.original._id)}>
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5">
      <NCTable columns={columns} data={coupons || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageCoupon;
