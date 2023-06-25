import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const Barchart = ({ data }) => {
  const myData = [
    {
      ...data,
    },
  ];
  return (
    <BarChart width={730} height={250} data={myData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis name="name" />
      <YAxis />
      <Legend />
      {Object.keys(myData[0]).map((objectKey) => (
        <Bar dataKey={`${objectKey}`} key={objectKey} fill="#8884d8" />
      ))}
    </BarChart>
  );
};

export default Barchart;
