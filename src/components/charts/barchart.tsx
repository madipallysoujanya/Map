// import React from "react";

// interface BarChartProps {
//   series?: number[];
//   categories?: string[];
// }

// const BarChart: React.FC<BarChartProps> = ({
//   series = [400, 430, 470, 540, 1100],
//   categories = ['Central Area', 'Bukit Merah', 'Central Water ', 'Marine Parade', 'Outram'],
// }) => {
//   const maxValue = Math.max(...series);
//   const barColor = "#7a46fd";

//   return (
//     <div style={{ padding: '10px' }}>
//       <div style={{ marginBottom: '15px' }}>
//         <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#8c9097' }}>
//           Location Distribution
//         </h3>
//       </div>
//       <div style={{ width: '180px' }}>
//         {categories.map((category, index) => {
//           const barWidth = (series[index] / maxValue) * 100;
//           return (
//             <div key={index} style={{ marginBottom: '12px' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   fontSize: '10px',
//                   textAlign: 'right',
//                   color: '#333'
//                 }}>
//                   {category}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{
//                     height: '16px',
//                     backgroundColor: barColor,
//                     width: `${barWidth}%`,
//                     borderRadius: '2px',
//                     transition: 'width 0.3s ease'
//                   }}/>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BarChart;









import React from "react";
import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  series?: number[];
  categories?: string[];
}

const BarChart: React.FC<BarChartProps> = ({
  series = [400, 430, 470, 540, 1100],
  categories = ['Central Area', 'Bukit Merah', 'Central Water ', 'Marine Parade', 'Outram'],
}) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 250,
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
        barHeight: "20%",
        borderRadius: 1,
      },
    },
    colors: ["#7a46fd"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '10px',
        },
      },
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
      width={180}
      height={250}
    />
  );
};

export default BarChart;









// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface BarChartProps {
//   series?: number[];
//   categories?: string[];
// }

// const BarChart: React.FC<BarChartProps> = ({
//   series = [400, 430, 470, 540, 1100,],
//   categories = ['Central Area', 'Bukit Merah', 'Central Water Catchment', 'Marine Parade', 'Outram', ],
// }) => {
//   const chartOptions = {
//     chart: {
//       type: 'bar',
//       height: 351,
//       fontFamily: 'Poppins, Arial, sans-serif',
//       toolbar: {
//         show: false,
//       },
//     },
//     grid: {
//       borderColor: '#f2f6f7',
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         barHeight: "30%",
//         borderRadius: 2,
//       },
//     },
//     // colors: ["blue"],
//     colors: ["#7a46fd"],
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: categories,
//     },
//   };

//   const chartSeries = [
//     {
//       name: 'Sessions',
//       data: series,
//     },
//   ];

//   return (
//     <ReactApexChart
//       options={chartOptions}
//       series={chartSeries}
//       type="bar"
//       width={200}
//       height={351}
//     />
//   );
// };

// export default BarChart;
