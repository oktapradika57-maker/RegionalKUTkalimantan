'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gunakan URL export CSV dari Google Sheets Anda
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1CrupWIBU3NP49ORN3AxC6ave7SD01ds_odu7NVBOIoI/export?format=csv';

    fetch(csvUrl)
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          }
        });
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Operasional MBP</h1>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="Delta Time" name="Delta Time" />
            <YAxis type="number" dataKey="Delta RH" name="Delta RH" />
            <Tooltip />
            <Scatter data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
