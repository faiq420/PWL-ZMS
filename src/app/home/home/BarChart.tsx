"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  metrics: number[];
  dates: string[];
}

const CustomBarChart = ({ metrics = [], dates = [] }: Props) => {
  const [data, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setData(metrics);
    setCategories(dates);
  }, [metrics, dates]);

  const options: any = {
    chart: {
      type: "bar",
      toolbar: {
        show: true,
        tools: {
          download: false, // Hide default download
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [
            {
              icon: `
          <div id="menu-trigger" style="font-size: 18px; cursor: pointer;position:relative">&#8942;</div>
        `,
              index: -1,
              title: "Options",
              class: "custom-menu-icon",
              click: (chart: any, options: any, e: any) => {
                const existing = document.getElementById("download-menu");
                if (existing) {
                  existing.remove();
                  return;
                }

                const trigger = document.getElementById("menu-trigger");
                if (!trigger) return;

                const triggerRect = trigger.getBoundingClientRect();

                const menu = document.createElement("div");
                menu.id = "download-menu";
                menu.style.position = "absolute";
                menu.style.top = `${trigger.offsetHeight + 4}px`; // below the trigger
                menu.style.right = "0";
                menu.style.background = "#fff";
                menu.style.border = "1px solid #ddd";
                menu.style.borderRadius = "4px";
                menu.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                menu.style.padding = "4px 0";
                menu.style.zIndex = "9999";
                menu.style.minWidth = "125px";
                menu.style.color = "#000";
                menu.style.fontWeight = "500";
                menu.style.fontSize = "10px";

                // PNG Option
                const pngItem = document.createElement("div");
                pngItem.textContent = "Download PNG";
                pngItem.style.padding = "8px 16px";
                // pngItem.style.fontSize = "12px";
                pngItem.style.cursor = "pointer";
                pngItem.onmouseenter = () =>
                  (pngItem.style.background = "#eee");
                pngItem.onmouseleave = () =>
                  (pngItem.style.background = "transparent");
                pngItem.onclick = () => {
                  chart?.dataURI().then(({ imgURI }: { imgURI: string }) => {
                    const link = document.createElement("a");
                    link.href = imgURI;
                    link.download = "Visitor Traffic.png";
                    link.click();
                    menu.remove();
                  });
                };

                // CSV Option
                const csvItem = document.createElement("div");
                csvItem.textContent = "Download CSV";
                csvItem.style.padding = "8px 16px";
                // csvItem.style.fontSize = "12px";
                csvItem.style.cursor = "pointer";
                csvItem.onmouseenter = () =>
                  (csvItem.style.background = "#eee");
                csvItem.onmouseleave = () =>
                  (csvItem.style.background = "transparent");
                csvItem.onclick = () => {
                  chart?.exportToCSV?.(); // Optional chaining
                  menu.remove();
                };

                menu.appendChild(pngItem);
                menu.appendChild(csvItem);

                // Append menu *inside* the trigger container for relative positioning
                trigger.style.position = "relative";
                trigger.appendChild(menu);

                // Dismiss menu on outside click
                const cleanup = (evt: MouseEvent) => {
                  if (!menu.contains(evt.target as Node)) {
                    menu.remove();
                    document.removeEventListener("click", cleanup);
                  }
                };
                setTimeout(
                  () => document.addEventListener("click", cleanup),
                  10
                );
              },
            },
          ],
        },
      },

      animations: {
        enabled: true,
      },
      export: {
        csv: { filename: "Visitor-Traffic" },
        svg: { filename: "Visitor-Traffic" },
        png: { filename: "Visitor-Traffic" },
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 0,
        opacity: 1,
        color: "#c44a38", // Matches bottom gradient tone
      },
    },
    legend: {
      show: false, // 🚫 Remove legends
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none", // 🚫 Disable hover visual effect
        },
        style: {
          background: "transparent",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "90%",
        distributed: true,
        backgroundBarColors: ["#000"], // ⛔ remove background fill
        backgroundBarOpacity: 0, // Ensure it's fully transparent
        backgroundBarRadius: 0, // Optional: remove any rounding
        style: { borderBottom: 5 },
        // color: "#228B22",
        track: {
          show: false, // 🚫 disables background behind bars
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: data.map(
          (_, i) => (_ > 2000 ? "#f17865" : "#EDEDED") // lighter highlight
        ),
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 20, 80, 100], // simulates bevel
        colorStops: [
          {
            offset: 0,
            color: "#FF6B57", // top edge — light
            opacity: 1,
          },
          {
            offset: 30,
            color: "#e65c47", // mid-top bevel
            opacity: 1,
          },
          {
            offset: 90,
            color: "#c44a38", // bottom edge — deeper tone
            opacity: 1,
          },
        ],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toLocaleString()}`,
      style: {
        colors: ["#fff"],
        fontWeight: 500,
      },
    },
    colors: data.map(
      (_, i) => (_ > 2000 ? "#FF6B57" : "#EDEDED") // Mar highlighted, others muted
    ),
    xaxis: {
      categories,
      labels: {
        style: {
          fontWeight: (_: number, i: number) => (i === 1 ? 700 : 400), // Feb bolded
        },
      },

      axisBorder: {
        show: false, // ⛔ Hide bottom X-axis line
      },
      axisTicks: {
        show: false, // Optional: also hide small tick marks
      },
    },
    annotations: {
      yaxis: [
        {
          y: (data.reduce((sum, acc) => sum + acc, 0) / data.length).toFixed(),
          //   borderColor: "#FDF6E3",
          border: "none",
          label: {
            text: `Avg ${Number(
              (data.reduce((sum, acc) => sum + acc, 0) / data.length).toFixed()
            ).toLocaleString()}`,
            style: {
              background: "#F4D03F",
              color: "#000",
              fontWeight: 600,
              left: 20,
              padding: {
                left: 6,
                right: 6,
                top: 2,
                bottom: 2,
              },
            },
          },
          strokeDashArray: 2,
        },
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
      //   max: 100,
      //   tickAmount: 5,
    },
    grid: {
      yaxis: {
        lines: { show: false },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Performance",
      data: data.map((val, i) => ({
        x: categories[i],
        y: val,
        fillColor: "#FF6B57", // for individual bar colors
      })),
    },
  ];

  return (
    <ApexCharts options={options} series={series} type="bar" height={250} />
  );
};

export default CustomBarChart;
