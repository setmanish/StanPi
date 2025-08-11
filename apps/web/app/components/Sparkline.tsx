"use client";

import * as React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}

// Renders a very small SVG line chart. Scaling math keeps the tiny graph
// representative regardless of the input range.
export default function Sparkline({
  data,
  width = 100,
  height = 24,
  stroke = '#2563eb',
  fill,
}: SparklineProps) {
  // Guard against empty data arrays. When no points are supplied, render a blank
  // SVG at the intended size so the surrounding layout retains its spacing.
  if (!data.length) return <svg width={width} height={height} />;

  // Determine min/max to scale values into the SVG's height
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // avoid divide-by-zero
  const step = width / (data.length - 1);

  // Convert each data point into x/y coordinates
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  // Build the SVG path string. "M" moves to the first point then "L" lines to the rest.
  const path = `M${points.join(' L')}`;

  // Optional area fill closes the path to the bottom of the chart
  const area = fill ? `${path} L ${width},${height} L 0,${height} Z` : undefined;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {fill && <path d={area} fill={fill} opacity={0.2} />}
      <path d={path} stroke={stroke} strokeWidth={1} fill="none" />
    </svg>
  );
}
