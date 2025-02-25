'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useMockData from '@/hooks/use_mockData'

export default function MyTable() {
    const { data } = useMockData()
    return (
        <Table>
            <TableCaption>A list of your recent chart.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sale ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity Sold</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Sale Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Store Location</TableHead>
                    <TableHead className="text-right">Employee Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((employee) => (
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
    )
}
