import { Metadata } from "next";
import CustomersTable from "@/app/ui/customers/table";
import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Customer",
};
export default async function Page() {
  const customers = await fetchFilteredCustomers("");
  return (
    <Suspense>
      <CustomersTable customers={customers} />;
    </Suspense>
  );
}
