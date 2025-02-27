export const getCustomers = async () => {
    const response = await fetch('/api/customers')
    if (!response.ok) throw new Error("Lỗi khi tải dữ liệu")
    return response.json()
};