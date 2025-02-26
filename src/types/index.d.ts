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

interface GroupExistSaleDate {
    sale_date: string;
    total_price: number;
    quantity_sold: number;
}

interface GroupByWeek {
    week: string;
    total_price: number;
    quantity_sold: number;
}