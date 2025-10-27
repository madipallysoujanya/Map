
import React from "react";
import ReactApexChart from "react-apexcharts";

interface PieChartProps {
  series?: number[];
  labels?: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  series = [18.4, 35.3, 11.2, 15.6, 10.5],
  labels = ["0-14", "15-24", "25-54", "55-64", "65 and above"],
}) => {
  const chartOptions = {
    chart: { height: 280, type: "donut" },
    plotOptions: { pie: { startAngle: -90, endAngle: 270 } },
    dataLabels: { enabled: false },
    fill: { type: "gradient" },
    legend: { show: false },
    colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
    labels: labels,
    title: {
      text: "Age Demographics",
      align: "left",
      style: { fontSize: "13px", fontWeight: "bold", color: "#8c9097" }
    },
    responsive: [{
      breakpoint: 480,
      options: { chart: { height: 250 } }
    }]
  };

  const CustomLegend = () => {
    const firstLine = labels.slice(0, 3);
    const secondLine = labels.slice(3);

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: '8px',
        gap: '6px',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {firstLine.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '10px', height: '10px',
                backgroundColor: chartOptions.colors[i], borderRadius: '50%'
              }}/>
              <span style={{ color: '#333', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {secondLine.map((label, i) => (
            <div key={i+3} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '10px', height: '10px',
                backgroundColor: chartOptions.colors[i+3], borderRadius: '50%'
              }}/>
              <span style={{ color: '#333', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="donut"
        height={280}
      />
      <CustomLegend />
    </div>
  );
};

export default PieChart;








// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface PieChartProps {
//   series?: number[];
//   labels?: string[];
// }

// const PieChart: React.FC<PieChartProps> = ({
//   series = [18.4, 35.3, 11.2, 15.6, 10.5],
//   labels = ["0-14", "15-24", "25-54", "55-64", "65 and above"],
// }) => {
//   const chartOptions = {
//     chart: { height: 280, type: "donut" },
//     plotOptions: { pie: { startAngle: -90, endAngle: 270 } },
//     dataLabels: { enabled: false },
//     fill: { type: "gradient" },
//     legend: { show: false },
//     colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
//     labels: labels,
//     title: {
//       text: "Age Demographics",
//       align: "left",
//       style: { fontSize: "13px", fontWeight: "bold", color: "#8c9097" }
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: { chart: { height: 250 } }
//     }]
//   };

//   const CustomLegend = () => {
//     const firstLine = labels.slice(0, 3);
//     const secondLine = labels.slice(3);

//     return (
//       <div style={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center',
//         marginTop: '8px',
//         gap: '6px',
//         fontSize: '11px'
//       }}>
//         <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
//           {firstLine.map((label, i) => (
//             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <div style={{
//                 width: '10px', height: '10px',
//                 backgroundColor: chartOptions.colors[i], borderRadius: '50%'
//               }}/>
//               <span style={{ color: '#333', whiteSpace: 'nowrap' }}>
//                 {label} - {series[i]}%
//               </span>
//             </div>
//           ))}
//         </div>
//         <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
//           {secondLine.map((label, i) => (
//             <div key={i+3} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <div style={{
//                 width: '10px', height: '10px',
//                 backgroundColor: chartOptions.colors[i+3], borderRadius: '50%'
//               }}/>
//               <span style={{ color: '#333', whiteSpace: 'nowrap' }}>
//                 {label} - {series[i+3]}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <ReactApexChart
//         options={chartOptions}
//         series={series}
//         type="donut"
//         height={280}
//       />
//       <CustomLegend />
//     </div>
//   );
// };

// export default PieChart;









// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface PieChartProps {
//   series?: number[];
//   labels?: string[];
// }

// const PieChart: React.FC<PieChartProps> = ({
//   series = [18.4, 35.3, 11.2, 15.6, 10.5],
//   labels = ["0-14", "15-24", "25-54", "55-64", "65 and above"],
// }) => {
//   const chartOptions = {
//     chart: {
//       height: 300,
//       type: "donut",
//     },
//     plotOptions: {
//       pie: {
//         startAngle: -90,
//         endAngle: 270,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "gradient",
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       formatter: function (val: string, opts: any) {
//         return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
//       },
//       labels: {
//         useSeriesColors: false,
//       },
//     },
//     colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
//     labels: labels,
//     title: {
//       text: "Age Demographics",
//       align: "left",
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold",
//         color: "#8c9097",
//       },
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: "bottom"
//         }
//       }
//     }]
//   };

//   // Custom legend component for 2-line layout
//   const CustomLegend = () => {
//     const midPoint = Math.ceil(labels.length / 2);
//     const firstLineLabels = labels.slice(0, midPoint);
//     const secondLineLabels = labels.slice(midPoint);

//     return (
//       <div className="custom-legend" style={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center',
//         marginTop: '10px',
//         gap: '5px'
//       }}>
//         <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
//           {firstLineLabels.map((label, index) => (
//             <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <div 
//                 style={{
//                   width: '12px',
//                   height: '12px',
//                   backgroundColor: chartOptions.colors[index],
//                   borderRadius: '50%'
//                 }}
//               />
//               <span style={{ fontSize: '12px', color: '#333' }}>
//                 {label} - {series[index]}%
//               </span>
//             </div>
//           ))}
//         </div>
//         <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
//           {secondLineLabels.map((label, index) => (
//             <div key={index + midPoint} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <div 
//                 style={{
//                   width: '12px',
//                   height: '12px',
//                   backgroundColor: chartOptions.colors[index + midPoint],
//                   borderRadius: '50%'
//                 }}
//               />
//               <span style={{ fontSize: '12px', color: '#333' }}>
//                 {label} - {series[index + midPoint]}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <ReactApexChart
//         options={{
//           ...chartOptions,
//           legend: {
//             ...chartOptions.legend,
//             show: false // Hide default legend
//           }
//         }}
//         series={series}
//         type="donut"
//         height={300}
//       />
//       <CustomLegend />
//     </div>
//   );
// };

// export default PieChart;














// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface PieChartProps {
//   series?: number[];
//   labels?: string[];
// }

// const PieChart: React.FC<PieChartProps> = ({
//   series = [18.4, 35.3, 11.2, 15.6, 10.5],
//   labels = ["0-14", "15-24", "25-54", "55-64", "65 and above"],
// }) => {
//   const chartOptions = {
//     chart: {
//       height: 350, // Increased height
//       type: "donut",
//     },
//     plotOptions: {
//       pie: {
//         startAngle: -90,
//         endAngle: 270,
//         donut: {
//           size: '65%', // Increased donut size
//         }
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: 'dark',
//         type: "horizontal",
//         shadeIntensity: 0.5,
//         gradientToColors: undefined,
//         inverseColors: true,
//         opacityFrom: 1,
//         opacityTo: 1,
//         stops: [0, 100]
//       }
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       formatter: function (val: string, opts: any) {
//         return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
//       },
//       labels: {
//         useSeriesColors: false,
//       },
//     },
//     // Darker colors
//     colors: ["#5a2fc2", "#b01a8b", "#b8730e", "#1e8c4d", "#0080b3"],
//     labels: labels,
//     title: {
//       text: "Age Demographics",
//       align: "left",
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold",
//         color: "#8c9097",
//       },
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           height: 300,
//         },
//         legend: {
//           position: "bottom"
//         }
//       }
//     }]
//   };

//   // Custom legend component for 2-line layout
//   const CustomLegend = () => {
//     const midPoint = Math.ceil(labels.length / 2);
//     const firstLineLabels = labels.slice(0, midPoint);
//     const secondLineLabels = labels.slice(midPoint);

//     return (
//       <div className="custom-legend" style={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center',
//         marginTop: '15px',
//         gap: '8px'
//       }}>
//         <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
//           {firstLineLabels.map((label, index) => (
//             <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <div 
//                 style={{
//                   width: '14px',
//                   height: '14px',
//                   backgroundColor: chartOptions.colors[index],
//                   borderRadius: '50%',
//                   border: '1px solid #fff',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//                 }}
//               />
//               <span style={{ fontSize: '13px', color: '#333', fontWeight: '500' }}>
//                 {label} - {series[index]}%
//               </span>
//             </div>
//           ))}
//         </div>
//         <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
//           {secondLineLabels.map((label, index) => (
//             <div key={index + midPoint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <div 
//                 style={{
//                   width: '14px',
//                   height: '14px',
//                   backgroundColor: chartOptions.colors[index + midPoint],
//                   borderRadius: '50%',
//                   border: '1px solid #fff',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//                 }}
//               />
//               <span style={{ fontSize: '13px', color: '#333', fontWeight: '500' }}>
//                 {label} - {series[index + midPoint]}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: '10px' }}>
//       <ReactApexChart
//         options={{
//           ...chartOptions,
//           legend: {
//             ...chartOptions.legend,
//             show: false // Hide default legend
//           }
//         }}
//         series={series}
//         type="donut"
//         height={350} // Increased height
//       />
//       <CustomLegend />
//     </div>
//   );
// };

// export default PieChart;













// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface PieChartProps {
//   series?: number[];
//   labels?: string[];
// }

// const PieChart: React.FC<PieChartProps> = ({
//   series = [18.4, 35.3, 11.2, 15.6, 10.5],
//   labels = ["0-14", "15-24", "25-54", "55-64", "65 and above"],
// }) => {
//   const chartOptions = {
//     chart: {
//       height: 300,
//       type: "donut",
//     },
//     plotOptions: {
//       pie: {
//         startAngle: -90,
//         endAngle: 270,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "gradient",
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       formatter: function (val: string, opts: any) {
//         return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
//       },
//     },
//     colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
//     labels: labels,
//     title: {
//       text: "Age Demographics",
//       align: "left",
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold",
//         color: "#8c9097",
//       },
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: "bottom"
//         }
//       }
//     }]
//   };

//   return (
//     <ReactApexChart
//       options={chartOptions}
//       series={series}
//       type="donut"
//       height={300}
//     />
//   );
// };

// export default PieChart;








// import React from "react";
// import ReactApexChart from "react-apexcharts";

// interface PieChartProps {
//   series?: number[];
//   labels?: string[];
// }

// const PieChart: React.FC<PieChartProps> = ({
//   series = [44, 55, 41, 17, 15],
//   labels = ["Team A", "Team B", "Team C", "Team D", "Team E"],
// }) => {
//   const chartOptions = {
//     chart: {
//       height: 300,
//       type: "donut",
//     },
//     plotOptions: {
//       pie: {
//         startAngle: -90,
//         endAngle: 270,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "gradient",
//     },
//     legend: {
//       position: "bottom",
//       formatter: function (val: string, opts: any) {
//         return val + " - " + opts.w.globals.series[opts.seriesIndex];
//       },
//     },
//     // 
//     colors: ["#7a46fd", "#e03db4", "#e5971a", "#28b870", "#00b0e6"],
//     labels: labels,
//     title: {
//       text: "Gradient Donut with Custom Start-angle",
//       align: "left",
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold",
//         color: "#8c9097",
//       },
//     },
//   };

//   return (
//     <ReactApexChart
//       options={chartOptions}
//       series={series}
//       type="donut"
//       height={300}
//     />
//   );
// };

// export default PieChart;
