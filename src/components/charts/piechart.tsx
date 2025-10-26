import React from "react";
import ReactApexChart from "react-apexcharts";

interface PieChartProps {
  series?: number[];
  labels?: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  series = [44, 55, 41, 17, 15],
  labels = ["Team A", "Team B", "Team C", "Team D", "Team E"],
}) => {
  const chartOptions = {
    chart: {
      height: 300,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      formatter: function (val: string, opts: any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    // 
    colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
    labels: labels,
    title: {
      text: "Gradient Donut with Custom Start-angle",
      align: "left",
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        color: "#8c9097",
      },
    },
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={series}
      type="donut"
      height={300}
    />
  );
};

export default PieChart;
