import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {Chart, ArcElement} from 'chart.js'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

import { format } from 'date-fns';
import '../styles/barChart.css';
Chart.register(ArcElement);

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const chartRef = useRef(null); // Reference to the chart instance

  const monthlyIncome = useSelector(state => state.transaction.monthlyIncome);
  const monthlyExpense = useSelector(state => state.transaction.monthlyExpense);

  const months = Object.keys(monthlyIncome);

  // Format month names using date-fns format function
  const formattedMonths = months.map(month => format(new Date(month), 'MMMM'));

  const data = {
    labels: formattedMonths,
    datasets: [
      {
        label: 'Income',
        data: months.map(month => monthlyIncome[month] || 0),
        backgroundColor: '#36A2EB',
        hoverBackgroundColor: '#36A2EB',
      },
      {
        label: 'Expense',
        data: months.map(month => monthlyExpense[month] || 0),
        backgroundColor: '#FF6384',
        hoverBackgroundColor: '#FF6384',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels:{
          boxWidth: 10,
          style:'normal'
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };

  useEffect(() => {
    // Destroy the existing chart instance before rendering a new one
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [monthlyIncome, monthlyExpense]);

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-wrapper">
        <div className="bar-chart">
          <h2 className='heading'>Income vs Expenses by Month</h2>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
