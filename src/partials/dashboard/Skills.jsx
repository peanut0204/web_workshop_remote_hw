import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

import React, { useEffect, useState } from 'react';
// Import utilities
import { useCookies } from "react-cookie";
import { tailwindConfig } from "../../utils/Utils";
// import { skills } from "../../data/mockData";
import useSkills from "../../hooks/dashboard/useSkills";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Skills() {
  const [cookies] = useCookies(["studentId"]);
  const { studentId } = cookies;

  
  console.log("in skills ID", studentId);
  
  // const { APIlabels, APIvalues } = useSkills(studentId);
  // const studentId = "B11000000";

  const [skills, setSkills] = useState({});
  useEffect(() => {
    // Call useSkills with the desired studentId
    useSkills(studentId)
      .then((response) => {
        // Handle the data received from the API
        setSkills(response);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, [studentId]);
  console.log("skills 2", skills)
  const labels= Object.keys(skills);
  const values= Object.values(skills);
  // const { labels, values } = skills;
  
  console.log("skills 2 val", values)

  const chartData = {
    labels,
    datasets: [
      {
        label: "能力值",
        data: values,
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="flex bg-white">
      <header className="px-5 pt-5">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Skills
        </h2>
      </header>
      {studentId ? (
        <div className="flex align-center flex-col px-28  bg-white">
          <div className="text-center my-4">學號：{studentId}</div>
          
          <Radar data={chartData} />
        </div>
      ) : (
        <div className="pt-20 text-center">尚未輸入數值，請先送出右方表單</div>
      )}
    </div>
  );
}

export default Skills;
