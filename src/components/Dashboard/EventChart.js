import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataContext } from "../../dataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EventChart() {
  const { events } = useContext(DataContext);

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  let datesOfWeek = [];
  let diabetologyWeek = [];
  let orthopaedicsWeek = [];
  let cardiologyWeek = [];

  const getDataOfWeek = () => {
    let currentDate = new Date(startOfWeek);
    while (currentDate <= endOfWeek) {
      datesOfWeek.push(new Date(currentDate));
      let diabetology = 0;
      let orthopaedics = 0;
      let cardiology = 0;
      events.forEach((ele) => {
        if (new Date(ele.start).toDateString() === currentDate.toDateString()) {
          if (ele.DepartmentName === "Diabetology") {
            diabetology++;
          } else if (ele.DepartmentName === "Orthopedics") {
            orthopaedics++;
          } else if (ele.DepartmentName === "Cardiology") {
            cardiology++;
          }
        }
      });
      diabetologyWeek.push(diabetology);
      orthopaedicsWeek.push(orthopaedics);
      cardiologyWeek.push(cardiology);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  getDataOfWeek();

  const labels = datesOfWeek.map((ele) => ele.toDateString().slice(4, 10));
  const tickColor = labels.map((ele) =>
    ele === new Date().toDateString().slice(4, 10) ? "red" : "blue"
  );
  // console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: "Diabetology",
        data: diabetologyWeek,
        borderColor: "#ea7a57",
        backgroundColor: "#ea7a57",
        tension: 0.4,
        borderWidth: 1,
        pointStyle: false,
      },
      {
        label: "Orthopedics",
        data: orthopaedicsWeek,
        borderColor: "#fec200",
        backgroundColor: "#fec200",
        tension: 0.4,
        borderWidth: 1,
        pointStyle: false,
      },
      {
        label: "Cardiology",
        data: cardiologyWeek,
        borderColor: "#00bdae",
        backgroundColor: "#00bdae",
        tension: 0.4,
        borderWidth: 1,
        pointStyle: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of Patients",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        suggestedMax: 4,
      },
      x: {
        title: {
          display: true,
          text: "Days of week",
        },
        ticks: {
          color: tickColor,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Consultation",
      },
    },
  };

  return <Line options={options} data={data} />;
}

//Week event counter
// const DataAndLabel = {};
// const weekLabels = weeksEvents.map((val) => {
//   let date = new Date(val.start);
//   let temp = `${date.toDateString().slice(4, 10)}`;
//   return temp;
// });

// weeksEvents.forEach((num) => {
//   let date = new Date(num.start);
//   let temp = `${date.toDateString().slice(4, 10)}`;
//   DataAndLabel[temp] = DataAndLabel[temp] ? DataAndLabel[temp] + 1 : 1;
// });
// function sortObj(obj) {
//   return Object.keys(obj)
//     .sort()
//     .reduce(function (result, key) {
//       result[key] = obj[key];
//       return result;
//     }, {});
// }
// sortObj(DataAndLabel);
// //console.log("counts", DataAndLabel);

// const data = {
//   labels: [...new Set(weekLabels.sort())],
//   datasets: [
//     {
//       label: "Patients",
//       data: Object.values(sortObj(DataAndLabel)),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       tension: 0.4,
//     },
//   ],
// };
