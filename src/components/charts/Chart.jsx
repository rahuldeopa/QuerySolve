import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../context/ThemeContext";

export default function Analysis({ title, count, Tags }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const chartOptions = {
        chart: {
            type: 'pie',
            background: 'transparent',
            foreColor: isDark ? '#94a3b8' : '#64748b',
            toolbar: { show: false }
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif',
                color: isDark ? '#f1f5f9' : '#1e293b'
            }
        },
        noData: {
            text: "No activity data in this range",
            align: 'center',
            verticalAlign: 'middle',
            style: {
                color: isDark ? '#64748b' : '#94a3b8',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        labels: Tags,
        theme: {
            mode: isDark ? 'dark' : 'light',
            palette: 'palette1'
        },
        stroke: {
            show: true,
            colors: [isDark ? '#1e293b' : '#ffffff'],
            width: 2
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: isDark ? '#94a3b8' : '#64748b'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#ffffff'],
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif'
            },
            dropShadow: {
                enabled: false
            }
        },
        plotOptions: {
            pie: {
                expandOnClick: true
            }
        }
    };

    return (
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex items-center justify-center min-h-[360px]">
            <div className="w-full">
                <ReactApexChart
                    type="pie"
                    options={chartOptions}
                    series={count && count.length > 0 ? count : []}
                    width="100%"
                    height={320}
                />
            </div>
        </div>
    );
}
