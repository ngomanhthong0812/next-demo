'use client'
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ArrowUpDown } from "lucide-react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import MyPagination from "@/components/my-pagination"
import { Input } from "@/components/ui/input"
import { getCustomers } from "@/services/get-customers"

export default function MyTable() {
    const { data } = useQuery({
        queryKey: ['customers'],
        queryFn: () => getCustomers(),
    })

    const [tableData, setTableData] = useState<Customer[]>([])
    const [displayedItems, setDisplayedItems] = useState<Customer[]>();

    const [isSort, setIsSort] = useState(false)
    const [search, setSearch] = useState('')

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    useEffect(() => {
        const limit = 100
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        setDisplayedItems(tableData?.slice(startIndex, endIndex))
        setTotalPage(Math.ceil(tableData?.length / limit))
    }, [page, tableData])

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch()
        }, 500)

        return () => clearTimeout(timeout)
    }, [search, data])

    useEffect(() => {
        if (isSort) {
            setTableData([...tableData]
                ?.sort((a: Customer, b: Customer) => a.quantity_sold - b.quantity_sold))
        } else {
            handleSearch()
        }
    }, [isSort])

    const handleSearch = () => {
        if (search.trim()) {
            let newData = [...data]
            if (isSort) {
                newData = [...newData]
                    ?.sort((a: Customer, b: Customer) => a.quantity_sold - b.quantity_sold)
                    .filter(customer =>
                        customer.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                        customer.product_name.toLowerCase().includes(search.toLowerCase())
                    )
            } else {
                newData = [...data]
                    ?.filter(customer =>
                        customer.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                        customer.product_name.toLowerCase().includes(search.toLowerCase())
                    )
            }
            setPage(1)
            setTableData(newData)
        } else {
            setIsSort(false)
            setTableData(data)
        }
    }

    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Tìm kiếm theo tên sản phẩm và tên khách hàng"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableCaption>A list of your recent chart.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sale ID</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead onClick={() => setIsSort(prev => !prev)}>
                            <div className="flex items-center">
                                Quantity Sold
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Sale Date</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Store Location</TableHead>
                        <TableHead className="text-right">Employee Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedItems?.map((employee) => (
                        <TableRow key={employee.sale_id}>
                            <TableCell className="font-medium">{employee.sale_id}</TableCell>
                            <TableCell>{employee.customer_name}</TableCell>
                            <TableCell>{employee.product_name}</TableCell>
                            <TableCell>{employee.quantity_sold}</TableCell>
                            <TableCell>{employee.unit_price}</TableCell>
                            <TableCell>{employee.total_price}</TableCell>
                            <TableCell>{employee.sale_date}</TableCell>
                            <TableCell>{employee.payment_method}</TableCell>
                            <TableCell>{employee.store_location}</TableCell>
                            <TableCell className="text-right">{employee.employee_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {totalPage > 1 && (
                <MyPagination page={page} totalPage={totalPage} setPage={setPage} />
            )}
        </>
    )
}
