import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '../styles/lineChart.css'; // Import the CSS file

// Register the required components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const transactions = useSelector(state => state.transaction.transactions);

  // Filter expenses
  const expenses = transactions.filter(transaction => transaction.type === 'expense');

  // Calculate total expenses for each month
  const expensesByMonth = expenses.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString('default', { month: 'long' });
    const amount = transaction.amount;

    acc[month] = (acc[month] || 0) + amount;

    return acc;
  }, {});

  // Extract labels (months) and data (total expenses)
  const labels = Object.keys(expensesByMonth);
  const data = Object.values(expensesByMonth);

  // Generate random colors
  const randomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16); // Generates random hexadecimal color
  };

  // Assign random colors to each dataset
  const backgroundColors = labels.map(() => randomColor());

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Expenses',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the default legend
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
          text: 'Total Expenses',
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <div className="line-chart-wrapper">
        <div className="line-chart">
          <h2 className='heading'>Total Expenses Over Months</h2>
          <Line data={chartData} options={options} />
        </div>
        <div className="legend">
          {labels.map((label, index) => (
            <div key={index}>
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: backgroundColors[index],
                  marginRight: '8px',
                }}
              ></span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
