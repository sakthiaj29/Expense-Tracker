import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import '../styles/donutChart.css'; // Import the CSS file

const DonutChart = () => {
  const transactions = useSelector(state => state.transaction.transactions);

  // Calculate total expenses
  const totalExpenses = transactions.reduce((total, transaction) => {
    if (transaction.type === 'expense') {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  // Calculate expenses by category and their percentage
  const categoryExpenses = transactions.reduce((categories, transaction) => {
    if (transaction.type === 'expense') {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    }
    return categories;
  }, {});

  // Fixed background colors (add more colors if necessary)
  const fixedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#F4D03F', '#9B59B6', '#E67E22', '#1ABC9C', '#F39C12', '#D35400', '#8E44AD', '#3498DB', '#2ECC71', '#E74C3C', '#16A085', '#F1C40F'
  ];


  // Ensure the number of colors matches the number of categories
  const backgroundColors = Object.keys(categoryExpenses).map((_, index) => fixedColors[index % fixedColors.length]);

  const data = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: backgroundColors, // Use the fixed colors
      },
    ],
  };

  const options = {
    cutout: '60%', // This creates the inner gap
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="doughnut-chart">
        <Doughnut data={data} options={options} />
      </div>
      <div className="legend-container">
        {data.labels.map((label, index) => (
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
  );
};

export default DonutChart;
