'use client'
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface Employee {
    sale_id: number;
    customer_name: string;
    product_name: string;
    quantity_sold: number;
    unit_price: number;
    total_price: number;
    sale_date: string;
    payment_method: string;
    store_location: string
    employee_name: string;
}

interface GroupedData {
    sale_date: string;
    total_price: number;
    unit_price: number;
}

export default function useMockData(limit: null | number = null) {
    const [data, setData] = useState<Employee[]>([]);
    const [groupedData, setGroupedData] = useState<GroupedData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/MOCK_DATA.csv');
            const reader = response.body?.getReader();
            const result = await reader?.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result?.value);
            const parsedData = Papa.parse<Employee>(csv, { header: true });
            setData(parsedData.data.slice(0, limit || parsedData.data.length))
        }

        fetchData();
    }, []);

    const groupData = (data: Employee[]) => {
        const grouped = data.reduce((acc, employee) => {
            const { sale_date, total_price, unit_price } = employee;

            if (acc[sale_date]) {
                acc[sale_date].total_price += total_price;
                acc[sale_date].unit_price += unit_price;
            } else {
                acc[sale_date] = { total_price, unit_price };
            }

            return acc;
        }, {} as Record<string, { total_price: number; unit_price: number }>);

        return Object.entries(grouped).map(([sale_date, values]) => ({
            sale_date,
            total_price: values.total_price,
            unit_price: values.unit_price
        }));
    };

    useEffect(() => {
        if (data.length > 0) {
            setGroupedData(groupData(data))
        }
    }, [data]);

    return { data, groupedData }
}
