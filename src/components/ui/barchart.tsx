'use client';

import React from 'react';

type BarChartData = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartData[];
  width: number;
  height: number;
};

export default function BarChart({ data, width, height }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = width / data.length;

  return (
    <svg width={width} height={height} className="border rounded">
      {/* Y-Axis */}
      <line x1="40" y1="10" x2="40" y2={height - 30} stroke="#888888" />
      {/* X-Axis */}
      <line x1="40" y1={height - 30} x2={width} y2={height - 30} stroke="#888888" />

      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * (height - 50); // Subtract padding
        return (
          <g key={i} transform={`translate(${i * barWidth + 40}, ${height - 30 - barHeight})`}>
            {/* Bar */}
            <rect
              width={barWidth - 10}
              height={barHeight}
              fill="#adfa1d"
              rx={4}
              ry={4}
            />
            {/* Label */}
            <text
              x={barWidth / 2 - 5}
              y={barHeight + 15}
              textAnchor="middle"
              fontSize="10"
              fill="#888888"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
