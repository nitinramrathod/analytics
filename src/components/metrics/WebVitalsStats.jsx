import React from "react";
import styled from "@emotion/styled";

const categoryColors = {
  FAST: "#4caf50", // green
  AVERAGE: "#ff9800", // orange
  SLOW: "#f44336", // red
};

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  padding: 20px;
  background: #f9fafc;
`;

const StatCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 6px 0;
  color: #333;
`;

const StatValue = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ category }) => categoryColors[category] || "#333"};
`;

const StatCategory = styled.div`
  font-size: 14px;
  color: ${({ category }) => categoryColors[category] || "#555"};
  font-weight: 500;
  margin-top: 4px;
`;

const StatDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 8px;
`;

const ProgressWrapper = styled.div`
  margin-top: 10px;
  height: 8px;
  background: #eee;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ value }) => value}%;
  background: ${({ color }) => color};
  transition: width 0.3s ease;
`;

// Metric info + thresholds
const metricInfo = {
  CUMULATIVE_LAYOUT_SHIFT_SCORE: {
    label: "Layout Shifts",
    desc: "Measures visual stability – lower is better",
    thresholds: [0.1, 0.25], // fast, avg
  },
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
    label: "Time to First Byte",
    desc: "How quickly the server responds",
    thresholds: [800, 1800],
  },
  FIRST_CONTENTFUL_PAINT_MS: {
    label: "First Contentful Paint",
    desc: "When content first appears on screen",
    thresholds: [1800, 3000],
  },
  INTERACTION_TO_NEXT_PAINT: {
    label: "Interaction Response",
    desc: "How quickly page reacts to user input",
    thresholds: [200, 500],
  },
};

// ✅ Calculate goodness (0-100%) + bar color
function getGoodnessAndColor(value, thresholds) {
  const [fast, avg] = thresholds;

  if (value <= fast) {
    return { goodness: 100, color: categoryColors.FAST };
  }
  if (value <= avg) {
    // Map between fast→avg → 100→50
    const ratio = (value - fast) / (avg - fast);
    const goodness = 100 - ratio * 50;
    return { goodness, color: categoryColors.AVERAGE };
  }
  // Beyond avg → degrade from 50→0
  const slowRatio = (value - avg) / avg;
  const goodness = Math.max(0, 50 - slowRatio * 50);
  return { goodness, color: categoryColors.SLOW };
}

const WebVitalsStats = ({ metrics }) => {
  const relevantMetrics = [
    "CUMULATIVE_LAYOUT_SHIFT_SCORE",
    "EXPERIMENTAL_TIME_TO_FIRST_BYTE",
    "FIRST_CONTENTFUL_PAINT_MS",
    "INTERACTION_TO_NEXT_PAINT",
  ];

  return (
    <StatsWrapper>
      {relevantMetrics.map((key) => {
        const metric = metrics[key];
        const { label, desc, thresholds } = metricInfo[key];
        const value = metric?.percentile ?? 0;
        const category = metric?.category ?? "SLOW";

        // Get normalized progress + dynamic bar color
        const { goodness, color } = getGoodnessAndColor(value, thresholds);

        return (
          <StatCard key={key}>
            <StatTitle>{label}</StatTitle>
            <StatValue category={category}>
              {value}
              {key.includes("CLS") ? "" : " ms"}
            </StatValue>
            <StatCategory category={category}>{category}</StatCategory>

            <ProgressWrapper>
              <ProgressBar value={goodness} color={color} />
            </ProgressWrapper>

            <StatDescription>{desc}</StatDescription>
          </StatCard>
        );
      })}
    </StatsWrapper>
  );
};

export default WebVitalsStats;
