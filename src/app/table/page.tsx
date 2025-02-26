import CustomersProvider from "@/components/layout/customers-provider"
import MyTable from "@/app/table/components/my-table"

export default async function TablePage() {
    return (
        <CustomersProvider>
            <MyTable />
        </CustomersProvider>
    )
}
