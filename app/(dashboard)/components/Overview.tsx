'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    total: 1200,
  },
  {
    name: 'Feb',
    total: 1100,
  },
  {
    name: 'Mar',
    total: 1300,
  },
  {
    name: 'Apr',
    total: 1400,
  },
  {
    name: 'May',
    total: 1350,
  },
  {
    name: 'Jun',
    total: 1500,
  },
];

const Overview = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
