'use client'
import { useEffect, useState } from 'react';
export default function useGroupData(data: Customer[]) {
    const [groupedData, setGroupedData] = useState<GroupByWeek[]>([]);

    const groupExistSaleDate = (data: Customer[]) => {
        const grouped = data.reduce((acc, customer) => {
            const { sale_date, total_price, quantity_sold } = customer;

            if (acc[sale_date]) {
                acc[sale_date].total_price = Number(acc[sale_date].total_price) + Number(total_price);
                acc[sale_date].quantity_sold = Number(acc[sale_date].quantity_sold) + Number(quantity_sold);
            } else {
                acc[sale_date] = {
                    total_price: Number(total_price),
                    quantity_sold: Number(quantity_sold)
                };
            }

            return acc;
        }, {} as Record<string, { total_price: number; quantity_sold: number }>);

        return Object.entries(grouped).map(([sale_date, values]) => ({
            sale_date,
            total_price: values.total_price,
            quantity_sold: values.quantity_sold
        }));
    };

    const groupByWeek = (data: GroupExistSaleDate[]) => {
        // Sắp xếp theo ngày tăng dần
        data.sort((a, b) => new Date(a.sale_date).getTime() - new Date(b.sale_date).getTime());

        let weeks: GroupByWeek[] = [];
        let currentWeek: any = [];
        let currentMonday: any = null;
        let totalPrice = 0;
        let quantitySold = 0;

        data.forEach(item => {
            let date = new Date(item.sale_date);

            // Tìm ngày Thứ Hai của tuần hiện tại
            if (!currentMonday || date < currentMonday) {
                currentMonday = new Date(date);
                currentMonday.setDate(currentMonday.getDate() - ((currentMonday.getDay() + 6) % 7)); // Lùi về Thứ Hai
            }

            // Nếu ngày hiện tại cách xa tuần hiện tại => tạo tuần mới
            if (currentWeek.length > 0 && date >= new Date(currentMonday.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                weeks.push({
                    week: 'W' + (weeks.length + 1),
                    total_price: totalPrice,
                    quantity_sold: Math.floor(quantitySold)
                });

                currentWeek = [];
                totalPrice = 0
                quantitySold = 0
                currentMonday = new Date(date);
                currentMonday.setDate(currentMonday.getDate() - ((currentMonday.getDay() + 6) % 7)); // Lùi về Thứ Hai
            }

            totalPrice += item.total_price
            quantitySold += item.quantity_sold


            currentWeek.push(item);
        });

        if (currentWeek.length > 0) {
            weeks.push({
                week: 'W' + (weeks.length + 1),
                total_price: totalPrice,
                quantity_sold: quantitySold
            });
        }

        return weeks;
    }


    useEffect(() => {
        if (data?.length > 0) {
            setGroupedData(groupByWeek(groupExistSaleDate(data)))
        }
    }, [data]);

    return { data, groupedData }
}