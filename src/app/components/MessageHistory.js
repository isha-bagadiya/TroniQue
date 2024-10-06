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
  };

  // const parseData = (content) => {
  //   const lines = content.split("\n");

  //   const parsedData = lines
  //     .filter((line) => line.trim() !== "" && line.includes("-")) // Filter non-empty lines with '-'
  //     .map((line) => {
  //       // Find the last dash (-) in the line
  //       const lastDashIndex = line.lastIndexOf("-");

  //       // Split the line at the last dash
  //       let name = line.slice(0, lastDashIndex).trim();
  //       let value = line.slice(lastDashIndex + 1).trim(); // The value part after the last dash

  //       // Ensure value is valid and extract numeric value
  //       name = name.replace(/^\d+\.\s*/, "").trim(); // Remove leading numbers from name
  //       value = parseFloat(value.replace(/[^\d.]/g, "")) || 0; // Extract numeric value from value part

  //       console.log({ name, value });
  //       return { name, value };
  //     });

  //   // Check if any item has a value greater than 0
  //   const hasValidValue = parsedData.some((item) => item.value > 0);

  //   // If no valid value, return null
  //   return hasValidValue ? parsedData : null;
  // };

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

        // Check if the line contains both ':' and '-'
        if (colonIndex !== -1 && dashIndex !== -1) {
          // If ':' comes before '-', slice between them
          if (colonIndex < dashIndex) {
            name = line.slice(colonIndex + 1, dashIndex).trim();
            value = line.slice(dashIndex + 1).trim();
          } else {
            // If '-' comes before ':', use the dash as separator
            name = line.slice(0, dashIndex).trim();
            value = line.slice(dashIndex + 1).trim();
          }
        } else if (dashIndex !== -1) {
          // If only '-' is present
          name = line.slice(0, dashIndex).trim();
          value = line.slice(dashIndex + 1).trim();
        } else if (colonIndex !== -1) {
          // If only ':' is present
          name = line.slice(0, colonIndex).trim();
          value = line.slice(colonIndex + 1).trim();
        } else {
          // This case shouldn't occur due to the filter, but just in case
          name = line.trim();
          value = "0";
        }

        // Ensure value is valid and extract numeric value
        name = name.replace(/^\d+\.\s*/, "").trim(); // Remove leading numbers from name
        value = parseFloat(value.replace(/[^\d.]/g, "")) || 0; // Extract numeric value from value part

        console.log({ name, value });
        return { name, value };
      });

    // Check if any item has a value greater than 0
    const hasValidValue = parsedData.some((item) => item.value > 0);

    // If no valid value, return null
    return hasValidValue ? parsedData : null;
  };

  // const getChartOptions = (data) => ({
  //   chart: {
  //     type: "line",
  //     height: 400,
  //     toolbar: {
  //       show: true,
  //       offsetX: 0,
  //       offsetY: 0,
  //       tools: {
  //         download: true,
  //         selection: true,
  //         zoom: true,
  //         zoomin: true,
  //         zoomout: true,
  //         pan: true,
  //         reset: true,
  //       },
  //       export: {
  //         csv: {
  //           filename: undefined,
  //           columnDelimiter: ",",
  //           headerCategory: "category",
  //           headerValue: "value",
  //           categoryFormatter(x) {
  //             return new Date(x).toDateString();
  //           },
  //         },
  //         svg: {
  //           filename: undefined,
  //         },
  //         png: {
  //           filename: undefined,
  //         },
  //       },
  //       autoSelected: "zoom",
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "55%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   xaxis: {
  //     categories: data.map((item) => item.name),
  //     labels: {
  //       rotate: -45,
  //       trim: false,
  //       style: {
  //         fontSize: "12px",
  //       },
  //     },
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Value",
  //     },
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val;
  //       },
  //     },
  //   },
  //   title: {
  //     text: "Message Analytics",
  //     align: "left",
  //   },
  // });

  const getChartOptions = (data) => ({
    chart: {
      type: "line",
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
    colors: ['#DE082D'], 
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        rotate: 0,
        trim: false,
        style: {
          fontSize: "10px",
        },
        formatter: function (value) {
          return value.length > 5 ? value.substr(0, 5) + "..." : value;
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
    theme: 'dark',
    y: {
      formatter: function (val) {
        return val;
      },
    },
    x: {
      
    }
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
