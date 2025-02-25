import { MyChart } from "@/components/my-chart";
import { MyTable } from "@/components/my-table";

import { v4 as uuid } from 'uuid'

export default function Home() {
  const chartData: ChartData[] = [
    { id: uuid(), month: "January", desktop: 186, mobile: 80 },
    { id: uuid(), month: "February", desktop: 305, mobile: 200 },
    { id: uuid(), month: "March", desktop: 237, mobile: 120 },
    { id: uuid(), month: "April", desktop: 73, mobile: 190 },
    { id: uuid(), month: "May", desktop: 209, mobile: 130 },
    { id: uuid(), month: "June", desktop: 214, mobile: 140 },
  ]

  return (
    <div className="max-w-5xl m-auto py-10">
      <MyChart chartData={chartData} />
      <MyTable chartData={chartData} />
    </div>
  );
}

