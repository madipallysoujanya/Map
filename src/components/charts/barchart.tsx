









import React from "react";
import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  series?: number[];
  categories?: string[];
}

const BarChart: React.FC<BarChartProps> = ({
  series = [400, 430, 470, 540, 1100,],
  categories = ['New Deal', 'Qualified Deal', 'Renewal Deal', 'Referral Deal', 'Won Deal', ],
}) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 351,
      fontFamily: 'Poppins, Arial, sans-serif',
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: '#f2f6f7',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        borderRadius: 2,
      },
    },
    // colors: ["blue"],
    colors: ["#985ffd"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
  };

  const chartSeries = [
    {
      name: 'Sessions',
      data: series,
    },
  ];

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      width={200}
      height={351}
    />
  );
};

export default BarChart;
