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
import { useEffect, useState } from "react"
import { Button } from "./ui/button";

interface IProps {
    chartData: ChartData[]
}

export function MyTable({ chartData }: IProps) {
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const newTotal = chartData.reduce((total, chart) => total + (chart.desktop + chart.mobile), 0)
        setTotal(newTotal)
    }, [chartData])
    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                variant={"secondary"}
                className="my-5"
            >{!open ? 'Open' : 'Close'} Table</Button>
            {open &&
                (<Table>
                    <TableCaption>A list of your recent chart.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Month</TableHead>
                            <TableHead>Desktop</TableHead>
                            <TableHead>Mobile</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chartData.map((chart: ChartData) => (
                            <TableRow key={chart.id}>
                                <TableCell className="font-medium">{chart.month}</TableCell>
                                <TableCell>{chart.desktop}</TableCell>
                                <TableCell>{chart.mobile}</TableCell>
                                <TableCell className="text-right">{chart.desktop + chart.mobile}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>)
            }
        </>
    )
}
