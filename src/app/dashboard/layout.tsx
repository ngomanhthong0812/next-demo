import { getCustomers } from "@/services/get-customers"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { ReactNode } from "react"

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    )
}

export default DashboardLayout