'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Pastikan URL CSV Anda sudah diset "Publish to web"
    const csvUrl = 'URL_CSV_GOOGLE_SHEETS_ANDA';

    fetch(csvUrl)
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => setData(results.data)
        });
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Operasional MBP</h1>

      {/* Bagian Grafik */}
      <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
        <h3>Analisa Perbandingan: Delta Time vs Delta RH</h3>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="Delta Time" name="Delta Time" unit="m" />
            <YAxis type="number" dataKey="Delta RH" name="Delta RH" unit="%" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Korelasi Data" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Bagian Tabel */}
      <table border="1" style={{ marginTop: '40px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Delta Time</th>
            <th>Delta RH</th>
            <th>Jumlah Liter</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Month}</td>
              <td>{row['Delta Time']}</td>
              <td>{row['Delta RH']}</td>
              <td>{row['Jumlah Liter']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
