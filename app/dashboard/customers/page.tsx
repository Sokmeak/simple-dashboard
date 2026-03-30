import { Metadata } from "next";
import CustomersTable from "@/app/ui/customers/table";
import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data";
export const metadata: Metadata = {
  title: "Customer",
};
export default async function Page() {
  const customers = await fetchFilteredCustomers("");
  return <CustomersTable customers={customers} />;
}
