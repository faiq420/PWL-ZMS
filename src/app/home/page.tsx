"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "@/components/utils/Headings/Heading";
import Paragraph from "@/components/utils/Headings/Paragraph";
import Subheading from "@/components/utils/Headings/Subheading";
import { changeDateFormat } from "@/Helper/DateFormats";
import { Calendar, PawPrintIcon as Paw, Ticket, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";
// import Chart from "react-apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Card = {
  label: string;
  metrics: number;
  icon: React.ReactNode;
  colorCode: string;
};

export default function DashboardPage() {
  const [chartParams, setChartParams] = useState<{
    dates: string[];
  }>({ dates: [] });
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [cards, setCards] = useState<Card[]>([
    {
      label: "Total Visitors Today",
      metrics: 1248,
      colorCode:
        "text-white bg-gradient-to-b from-main-skyBlue to-[#195A84]/90",
      icon: <Users className="h-4 w-4 text-black" />,
    },
    {
      label: "Ticket Sales",
      metrics: 1248,
      colorCode:
        "text-white bg-gradient-to-b from-main-jungleGreen to-[#00674A]/90",
      icon: <Ticket className="h-4 w-4 text-black" />,
    },
    {
      label: "Animal Count",
      metrics: 573,
      colorCode:
        "text-white bg-gradient-to-b from-main-sunshineYellow to-[#9E7F02]/90",
      icon: <Paw className="h-4 w-4 text-black" />,
    },
    {
      label: "Upcoming Events",
      metrics: 7,
      colorCode:
        "text-white bg-gradient-to-b from-main-softRed to-[#78150A]/90",
      icon: <Calendar className="h-4 w-4 text-black" />,
    },
  ]);
  // const [cardData, setCardData] = useState<
  //   { heading: string; analytic: number; desc: string; icon: any }[]
  // >([]);
  const   options: any = {
    chart: {
      type: "line",
      zoom: { enabled: true },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [],
        },
      },
      export: {
        csv: { filename: "Visitor-Traffic" },
        svg: { filename: "Visitor-Traffic" },
        png: { filename: "Visitor-Traffic" },
      },
    },
    colors: ["#925C06"],
    xaxis: {
      categories: chartParams.dates.map((x: string) => changeDateFormat(x)),
      title: { text: "Month" },
      labels: {
        rotate: -30,
      },
    },
    yaxis: {
      title: { text: "Visitor Count" },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 4,
      colors: ["#925C06"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
  };

  useEffect(() => {
    const visitorTrafficData = [
      { date: "2025-04-01T00:00:00.000Z", count: 1200 },
      { date: "2025-04-02T00:00:00.000Z", count: 1500 },
      { date: "2025-04-03T00:00:00.000Z", count: 1800 },
      { date: "2025-04-04T00:00:00.000Z", count: 2200 },
      { date: "2025-04-05T00:00:00.000Z", count: 2000 },
      { date: "2025-04-06T00:00:00.000Z", count: 2500 },
      { date: "2025-04-07T00:00:00.000Z", count: 2700 },
      { date: "2025-04-08T00:00:00.000Z", count: 3000 },
      { date: "2025-04-09T00:00:00.000Z", count: 2800 },
      { date: "2025-04-10T00:00:00.000Z", count: 3200 },
      { date: "2025-04-11T00:00:00.000Z", count: 3400 },
      { date: "2025-04-12T00:00:00.000Z", count: 3600 },
      { date: "2025-04-13T00:00:00.000Z", count: 3200 },
      { date: "2025-04-14T00:00:00.000Z", count: 400 },
    ];

    const dates = visitorTrafficData.map((item) => item.date);
    const counts = visitorTrafficData.map((item) => item.count);

    setChartParams({ dates });
    setSeries([
      {
        name: "Visitor Traffic",
        data: counts,
      },
    ]);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 py-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold tracking-tight uppercase ">Dashboard</h2>
  </div>

  <div className="bg-white backdrop-blur-lg rounded-xl p-4 border ">
    <Subheading text="Activity Metrics" className="text-lg " />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-5">
      {cards.map((card: Card, index: number) => (
        <div
          key={index}
          className=" backdrop-blur-sm rounded-lg p-4 transition-all duration-300"
        >
          <div className="flex gap-2 items-center ">
            {card.icon}
            <p className="text-sm font-medium">{card.label}</p>
          </div>
          <p className=" font-semibold text-lg ml-7">
            {card.metrics.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <div className="col-span-4 bg-white rounded-xl p-6 ">
      <div className=" font-semibold text-lg">Visitor Traffic</div>
      <div className="text-sm pb-4">
        Visitor count over the past 02 weeks
      </div>
      <div className="pl-2">
        <Chart options={options} series={series} type="line" height={350} />
      </div>
    </div>

    <div className="col-span-3 bg-white rounded-xl p-6 ">
      <div className=" font-semibold text-lg">Popular Exhibits</div>
      <div className=" text-sm pb-4">
        Most visited exhibits this month
      </div>
      <div className="space-y-4">
        {[
          "African Safari",
          "Penguin Cove",
          "Reptile House",
          "Primate Paradise",
          "Aquatic World",
        ].map((exhibit, i) => (
          <div key={exhibit} className="flex items-center">
            <div className="w-[30%] text-sm ">{exhibit}</div>
            <div className="w-[55%] h-2 bg-main-safariBrown/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-main-safariBrown/80 rounded-full"
                style={{ width: `${90 - i * 12}%` }}
              />
            </div>
            <div className="w-[15%] text-right text-sm ">
              {90 - i * 12}%
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}
