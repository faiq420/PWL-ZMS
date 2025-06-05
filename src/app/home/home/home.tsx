"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Paragraph from "@/components/utils/Headings/Paragraph";
import GreenArrow from "@/public/assets/menu/greenArrowHead.svg";
import RedArrow from "@/public/assets/menu/redArrowHead.svg";
import { changeDateFormat, formatISOStringDate } from "@/Helper/DateFormats";
import { Calendar, PawPrintIcon as Paw, Ticket, Users } from "lucide-react";
import dynamic from "next/dynamic";
import {useEffect, useState } from "react";
import Image from "next/image";
import CustomBarChart from "./BarChart";
import { motion } from "framer-motion";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Card = {
  label: string;
  metrics: number;
  icon: React.ReactNode;
  colorCode: string;
  previousCount: number;
};

export default function Home() {
  const [chartParams, setChartParams] = useState<{
    dates: string[];
  }>({ dates: [] });
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [cards, setCards] = useState<Card[]>([
    {
      label: "Visitors Today",
      metrics: 1248,
      previousCount: 1100,
      colorCode:
        "text-white bg-gradient-to-b from-main-skyBlue to-[#195A84]/90",
      icon: <Users className="h-4 w-4 text-black" />,
    },
    {
      label: "Ticket Sales",
      metrics: 1248,
      previousCount: 1100,
      colorCode:
        "text-white bg-gradient-to-b from-main-jungleGreen to-[#00674A]/90",
      icon: <Ticket className="h-4 w-4 text-black" />,
    },
    {
      label: "Animal Count",
      metrics: 573,
      previousCount: 573,
      colorCode:
        "text-white bg-gradient-to-b from-main-sunshineYellow to-[#9E7F02]/90",
      icon: <Paw className="h-4 w-4 text-black" />,
    },
    {
      label: "Upcoming Events",
      metrics: 7,
      previousCount: 9,
      colorCode:
        "text-white bg-gradient-to-b from-main-softRed to-[#78150A]/90",
      icon: <Calendar className="h-4 w-4 text-black" />,
    },
  ]);
  const [years, setYears] = useState<string[]>([]);
  const months = [
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "Apr", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "July" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];
  const [weeks, setWeeks] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()].value
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedWeek, setSelectedWeek] = useState<string>(
    (() => {
      const date = new Date();
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfMonth = date.getDate();
      const adjustedDay = dayOfMonth + startOfMonth.getDay(); // account for offset
      return Math.ceil(adjustedDay / 7).toString();
    })()
  );
  const [visitorDateRange, setVisitorDateRange] = useState({
    start: "",
    end: "",
  });
  const [healthSummary, setHealthSummary] = useState([
    { label: "Healthy", count: 365, color: "bg-green-500" },
    { label: "Under Monitoring", count: 52, color: "bg-yellow-500" },
    { label: "Under Treatment", count: 6, color: "bg-amber-500" },
    { label: "Critical", count: 2, color: "bg-red-500" },
  ]);
  const [barData, setBarData] = useState<{
    metrics: number[];
    dates: string[];
  }>({
    metrics: [],
    dates: [],
  });

  // const [cardData, setCardData] = useState<
  //   { heading: string; analytic: number; desc: string; icon: any }[]
  // >([]);
  const options: any = {
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
    colors: ["#5DADE2"],
    xaxis: {
      categories: chartParams.dates.map(
        (x: string) => changeDateFormat(x).split(",")[0]
      ),
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
      colors: ["#5DADE2"],
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
    const YEARS = [];
    for (let i = new Date().getFullYear(); i >= 2025; i--) {
      YEARS.push(i.toString());
    }
    setYears(YEARS);
  }, []);

  function GetChartData(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const visitorTrafficData = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      visitorTrafficData.push({
        date: new Date(d).toISOString().split("T")[0] + "T00:00:00.000Z",
        count: Math.floor(Math.random() * (3500 - 500 + 1)) + 500,
      });
    }

    const dates = visitorTrafficData.map((item) => item.date);
    const counts = visitorTrafficData.map((item) => item.count);

    setBarData({
      metrics: counts,
      dates: dates.map((d) => {
        return changeDateFormat(d).split(",")[0];
      }),
    });
    setChartParams({ dates });
    setSeries([
      {
        name: "Visitor Traffic",
        data: counts,
      },
    ]);
  }

  useEffect(() => {
    if (selectedMonth != "" && selectedYear != "") {
      setWeeks(
        Array.from(
          { length: getMaxWeeksInMonth(selectedMonth, Number(selectedYear)) },
          (_, i) => i + 1
        )
      );
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (selectedMonth != "" && selectedYear != "" && selectedWeek != "") {
      const { start, end } = getWeekDateRange(
        selectedMonth,
        Number(selectedYear),
        Number(selectedWeek)
      );
      GetChartData(start, end);
      setVisitorDateRange({ start, end });
    }
  }, [selectedWeek, selectedMonth, selectedYear]);

  const getMaxWeeksInMonth = (monthStr: string, year: number) => {
    const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth(); // 0-based index
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const weeks = Math.ceil(totalDays / 7);
    return weeks;
  };

  const getWeekDateRange = (monthStr: string, year: number, week: number) => {
    const monthIndex = new Date(`${monthStr} 1, ${year}`).getMonth(); // 0-based
    const startDay = (week - 1) * 7 + 1;
    const totalDays = new Date(year, monthIndex + 1, 0).getDate(); // last day of the month
    const endDay = Math.min(startDay + 6, totalDays);

    const format = (y: number, m: number, d: number) =>
      `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    return {
      start: format(year, monthIndex, startDay),
      end: format(year, monthIndex, endDay),
    };
  };

  return (
    <div className="flex-1 space-y-4 font-poppins">
      <div className="">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-main-secondaryText text-xs font-medium">
          <span className="text-black">Welcome,</span> Let's manage the
          sanctuaries.
        </p>
      </div>

      <div className="bg-white backdrop-blur-lg rounded-xl p-4 border ">
        <Paragraph
          text="Activity Metrics"
          className="text-base tracking-normal font-medium"
        />
        <p className="text-xs text-main-secondaryText">
          {changeDateFormat(formatISOStringDate(new Date()))}
        </p>
        <hr className="bg-main-borderColor mt-8" />
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card: Card, index: number) => (
            <div
              key={index}
              className={`pt-4 ${
                index != cards.length - 1 &&
                "border-r border-r-main-borderColor"
              } transition-all duration-300 space-y-2`}
            >
              <div className="flex items-center ">
                {/* {card.icon} */}
                <p className="text-[12px] font-medium text-main-secondaryText">
                  {card.label}
                </p>
              </div>
              <div className="flex space-x-5">
                <p className="font-medium text-xl">
                  {card.metrics.toLocaleString()}
                </p>
                <div
                  className={`py-1 px-2 flex items-center space-x-2 font-medium rounded-md ${
                    card.previousCount > card.metrics
                      ? "border-[1.5px] bg-[#FAF0EE]  border-[#EFBDB4] text-red-600 text-[10px]"
                      : "border-[1.5px] bg-[#EAF8E9] border-[#CCFCCA] text-green-600 text-[10px]"
                  }`}
                >
                  <p className="mb-0">
                    {card.previousCount > card.metrics
                      ? (card.metrics / card.previousCount).toFixed(2)
                      : (card.previousCount / card.metrics).toFixed(2)}
                    %
                  </p>
                  <Image
                    src={
                      card.previousCount > card.metrics ? RedArrow : GreenArrow
                    }
                    height={6}
                    width={6}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-4 bg-white rounded-xl p-6 ">
          <div className="flex justify-between items-center gap-2">
            <div className="">
              <p className="font-medium tracking-tighter text-nowrap text-lg">
                Visitor Traffic
              </p>
              {visitorDateRange.start != "" && visitorDateRange.end != "" && (
                <p className="text-[10px] text-main-secondaryText">
                  {/*Active Date Range:  */}
                  {changeDateFormat(visitorDateRange.start)} -{" "}
                  {changeDateFormat(visitorDateRange.end)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year: string, index: number) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(
                    (
                      month: { value: string; label: string },
                      index: number
                    ) => (
                      <SelectItem key={index} value={month.value}>
                        {month.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Week" />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map((week: number, index: number) => (
                    <SelectItem key={index} value={week.toString()}>
                      Week-0{week}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pl-2">
            {/* <Chart options={options} series={series} type="line" height={350} /> */}
            <CustomBarChart metrics={barData.metrics} dates={barData.dates} />
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-xl p-6 ">
          <div className=" font-medium tracking-tighter text-lg">
            Health Summary
          </div>
          <div className=" text-xs pb-4">
            Overall animal's count by health status
          </div>
          <div className="space-y-4 text-sm">
            {healthSummary.map((item, i) => {
              const total = healthSummary.reduce(
                (sum, item) => sum + item.count,
                0
              );
              const percent =
                total === 0 ? 0 : ((item.count / total) * 100).toFixed(1);

              return (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <span className="font-medium italic text-gray-500 text-xs">
                      {percent}%
                    </span>
                  </div>

                  {/* group wrapper */}
                  <div className="relative group mt-2">
                    {/* tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center px-2 py-1 text-xs text-white bg-gray-800 rounded shadow z-10">
                      {item.count} / {total}
                    </div>

                    {/* progress bar container */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="space-y-4">
            {[
              "African Safari",
              "Penguin Cove",
              "Reptile House",
              "Primate Paradise",
              "Aquatic World",
            ].map((exhibit, i) => (
              <div key={exhibit} className="flex items-center">
                <div className="w-[30%] text-sm ">{exhibit}</div>
                <div className="w-[55%] h-2 bg-main-skyBlue/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-main-skyBlue/80 rounded-full"
                    style={{ width: `${90 - i * 12}%` }}
                  />
                </div>
                <div className="w-[15%] text-right text-sm ">
                  {90 - i * 12}%
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
