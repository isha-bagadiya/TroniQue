import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ai from "../../../public/AI.svg";
import user from "../../../public/USER.svg";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MessageHistory = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const [viewMode, setViewMode] = useState({});
  const [chartLoading, setChartLoading] = useState({});


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleViewMode = (index) => {
    setViewMode((prev) => ({
      ...prev,
      [index]: prev[index] === "analytics" ? "content" : "analytics",
    }));
    if (!chartLoading[index]) {
      setChartLoading((prev) => ({ ...prev, [index]: true }));
      // Simulate loading time
      setTimeout(() => {
        setChartLoading((prev) => ({ ...prev, [index]: false }));
      }, 1000);
    }
  };

  const ChartLoader = () => (
    <div className="flex justify-center items-center h-[300px] bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DE082D]"></div>
    </div>
  );

  const parseData = (content) => {
    const lines = content.split("\n");

    const parsedData = lines
      .slice(1) // Skip the first line
      .filter(
        (line) =>
          line.trim() !== "" && (line.includes("-") || line.includes(":"))
      ) // Filter non-empty lines with '-' or ':'
      .map((line) => {
        let name, value;

        const colonIndex = line.lastIndexOf(":");
        const dashIndex = line.lastIndexOf("-");

        if (colonIndex > dashIndex) {
          // Use colon as separator
          name = line.slice(0, colonIndex).trim();
          value = line.slice(colonIndex + 1).trim();
        } else {
          // Use dash as separator
          name = line.slice(0, dashIndex).trim();
          value = line.slice(dashIndex + 1).trim();
        }

        // Ensure value is valid and extract numeric value
        name = name.replace(/^\d+\.\s*/, "").trim(); // Remove leading numbers from name
        value = parseFloat(value.replace(/[^\d.]/g, "")) || 0; // Extract numeric value from value part

        return { name, value };
      });

    // Check if any item has a value greater than 0
    const hasValidValue = parsedData.some((item) => item.value > 0);

    // If no valid value, return null
    return hasValidValue ? parsedData : null;
  };

  const getChartOptions = (data) => ({
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        export: {
          csv: {
            filename: data,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            categoryFormatter(x) {
              return new Date(x).toDateString();
            },
          },
          svg: {
            filename: data,
          },
          png: {
            filename: data,
          },
        },
        autoSelected: "zoom",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false, // Disabled to reduce clutter
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#DE082D"],
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        rotate: 0,
        trim: false,
        style: {
          fontSize: "10px",
        },
        formatter: function (value) {
          return value.length > 5 ? value.substr(0, 6) + "..." : value;
        },
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const dataPoint = data[dataPointIndex];
        return `
          <div class="bg-gray-800 text-white rounded-md p-2 w-44">
            <div class="font-semibold mb-1 break-words text-wrap">${dataPoint.name}</div>
            <div class="break-words">Value: ${dataPoint.value}</div>
          </div>
        `;
      },
    },
    title: {
      text: "Message Analytics",
      align: "left",
    },
  });

  const getChartSeries = (data) => [
    {
      name: "Value",
      data: data.map((item) => item.value),
    },
  ];

  return (
    <div className="w-full h-full p-4 space-y-4 font-sans">
      {messages.map((message, index) => {
        const parsedData = parseData(message.content);
        return (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 items-end ${
                message.type === "user"
                  ? "justify-start flex-row-reverse ml-auto"
                  : "justify-start flex-row mr-auto"
              }`}
            >
              <div className="flex items-center justify-center rounded-full border border-white border-opacity-10 overflow-hidden w-[35px] h-[35px]">
                {message.type == "user" ? (
                  <Image src={user} alt="icon" width={35} height={35}></Image>
                ) : (
                  <Image src={ai} alt="icon" width={50} height={50}></Image>
                )}
              </div>
              <div
                className={`max-w-[70%] w-auto p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-gradient-to-tl from-[#DE082D] to-[#FB5C78] rounded-br-none"
                    : "border border-black bg-[#1c1919] text-gray-200 rounded-bl-none flex flex-col justify-end"
                }`}
              >
                <ReactMarkdown className="text-sm break-words">
                  {message.content}
                </ReactMarkdown>
                {message.type === "ai" && parsedData && (
                  <>
                    <div className="mt-[20px] ml-auto">
                      <button
                        onClick={() => toggleViewMode(index)}
                        className="border border-[#FB5C78] px-2 py-1 mt-2 ml-auto text-xs text-[#FB5C78] rounded-full hover:font-semibold transition-colors"
                      >
                        {viewMode[index] === "analytics"
                          ? "Close Analytics"
                          : "Open Analytics"}
                      </button>
                    </div>
                    {viewMode[index] === "analytics" && (
                      <div className="mt-2 mx-auto border rounded-lg p-4  bg-white w-full max-w-[500px] overflow-x-auto">
                        <Chart
                          options={getChartOptions(parsedData)}
                          series={getChartSeries(parsedData)}
                          type="bar"
                          height={300}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageHistory;
