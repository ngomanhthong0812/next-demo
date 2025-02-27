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
    const [displayedItems, setDisplayedItems] = useState<Customer[]>()

    const [isSort, setIsSort] = useState(false)
    const [colSort, setColSort] = useState('')
    const [search, setSearch] = useState('')

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState<number>(0)

    useEffect(() => {
        const limit = 10
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        const currenData = tableData?.length > 0 || search ? tableData : data
        setDisplayedItems(currenData?.slice(startIndex, endIndex))
        setTotalPage(Math.ceil(currenData?.length / limit))
    }, [page, tableData, data])

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch()
        }, 500)

        return () => clearTimeout(timeout)
    }, [search])

    useEffect(() => {
        handleSort([...tableData])
    }, [isSort, colSort])

    const handleSearch = () => {
        if (search.trim()) {
            let newData = [...data]
                ?.filter(customer =>
                    customer.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                    customer.product_name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a: Customer, b: Customer) => isSort ? a.quantity_sold - b.quantity_sold : b.quantity_sold - a.quantity_sold)
            setTableData(newData)
            handleSort(newData)
        } else {
            setTableData(data)
            handleSort(data)
        }
        setPage(1);
    }

    const handleSort = (data: Customer[]) => {
        const sortedData = data ? [...data] : []
        const compareFn = (a: Customer, b: Customer) => {
            if (colSort === 'sale_date') {
                return isSort
                    ? new Date(a.sale_date).getTime() - new Date(b.sale_date).getTime()
                    : new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime()
            } else {
                const fieldA = a[colSort as keyof Customer]?.toString().toLowerCase()
                const fieldB = b[colSort as keyof Customer]?.toString().toLowerCase()
                return isSort ? fieldA.localeCompare(fieldB) : fieldB?.localeCompare(fieldA);
            }
        };
        sortedData.sort(compareFn)
        setTableData(sortedData)
    }

    const handleChangeColSort = (value: string) => {
        if (colSort === value) {
            setIsSort(prev => !prev)
        } else {
            setIsSort(true)
            setColSort(value)
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
                        <TableHead onClick={() => handleChangeColSort('customer_name')}>
                            <div className="flex items-center">
                                Customer Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead onClick={() => handleChangeColSort('product_name')}>
                            <div className="flex items-center">
                                Product Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead>Quantity Sold</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead onClick={() => handleChangeColSort('sale_date')}>
                            <div className="flex items-center">
                                Sale Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Store Location</TableHead>
                        <TableHead className="text-right">Employee Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedItems?.map((customer) => (
                        <TableRow key={customer.sale_id}>
                            <TableCell className="font-medium">{customer.sale_id}</TableCell>
                            <TableCell>{customer.customer_name}</TableCell>
                            <TableCell>{customer.product_name}</TableCell>
                            <TableCell>{customer.quantity_sold}</TableCell>
                            <TableCell>{customer.unit_price}</TableCell>
                            <TableCell>{customer.total_price}</TableCell>
                            <TableCell>{customer.sale_date}</TableCell>
                            <TableCell>{customer.payment_method}</TableCell>
                            <TableCell>{customer.store_location}</TableCell>
                            <TableCell className="text-right">{customer.employee_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
            {totalPage > 1 && (
                <MyPagination page={page} totalPage={totalPage} setPage={setPage} />
            )
            }
        </>
    )
}
