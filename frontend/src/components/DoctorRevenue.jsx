import React from "react";
import { useUserContext } from "../contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { getAllFactures, getDoctorFactures } from "../api/facture";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";

// Register necessary Chart.js plugins
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement
);
const DoctorRevenue = () => {
  const { userToken } = useUserContext();
  const { data: factures } = useQuery({
    queryFn: () => getDoctorFactures(userToken),
    queryKey: ["factures"],
    onSuccess: (data) => console.log("doctor factures", data),
  });

  const prepareChartData = () => {
    if (factures && factures.length > 0) {
      const data = factures.reduce((result, facture) => {
        if (facture.isPaid) {
          const month = new Date(facture.createdAt).getMonth();
          const revenue = result[month] || 0;
          result[month] = revenue + facture.price;
        }
        return result;
      }, {});

      const labels = Object.keys(data).map((month) => {
        const monthIndex = parseInt(month);
        const frenchMonth = new Intl.DateTimeFormat("fr", {
          month: "long",
        }).format(new Date(0, monthIndex, 0));
        return frenchMonth;
      });

      const revenueData = Object.values(data);

      return {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
        options: {
          scales: {
            y: {
              ticks: {
                callback: (value) => `${value} DH`,
              },
            },
          },
        },
      };
    }

    return null;
  };

  const chartData = prepareChartData();

  return (
    <>
      <div className="my-4">
        <h4>Votre revenu par mois</h4>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => `${value} DH`,
                  },
                },
              },
            }}
          />
        ) : (
          <div>No revenue data available.</div>
        )}
      </div>
      {/* ... rest of your code ... */}
    </>
  );
};

export default DoctorRevenue;
