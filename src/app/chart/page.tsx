import MyChart from "@/app/chart/components/my-chart"
import CustomersProvider from "@/components/layout/customers-provider"

export default async function ChartPage() {
    return (
        <CustomersProvider>
            <MyChart />
        </CustomersProvider>
    )
}
