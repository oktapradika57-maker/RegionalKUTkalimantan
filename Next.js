'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // URL CSV dari Google Sheets Anda
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1CrupWIBU3NP49ORN3AxC6ave7SD01ds_odu7NVBOIoI/export?format=csv';

    fetch(csvUrl)
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Filter data agar hanya mengambil yang memiliki nilai angka
            const cleanData = results.data.filter(row => row['Delta Time'] !== null && row['Delta RH'] !== null);
            setData(cleanData);
          }
        });
      });
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Operasional MBP</h1>
      
      <div style={{ height: '400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h3>Korelasi: Delta Time vs Delta RH</h3>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="Delta Time" name="Delta Time" unit=" min" />
            <YAxis type="number" dataKey="Delta RH" name="Delta RH" unit=" %" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Data MBP" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Tabel Data</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ padding: '10px' }}>Month</th>
              <th style={{ padding: '10px' }}>Delta Time</th>
              <th style={{ padding: '10px' }}>Delta RH</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{row.Month}</td>
                <td style={{ padding: '10px' }}>{row['Delta Time']}</td>
                <td style={{ padding: '10px' }}>{row['Delta RH']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
