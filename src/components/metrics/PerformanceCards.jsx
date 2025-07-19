import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: center;
  background: #f8fafc;
  // min-height: 100vh;
  align-items: center;
  margin-bottom: 4.5rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-width: 200px;
  flex: 1;
  max-width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

const ChartContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
`;

const CircularSvg = styled.svg`
  transform: rotate(-90deg);
  width: 120px;
  height: 120px;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 8;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease-in-out;
  stroke: ${(props) => props.color};
`;

const ScoreText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const MetricTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  text-transform: capitalize;
`;

const MetricIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const StatusText = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const getColorAndStatus = (score) => {
  if (score >= 90) return { color: "#10b981", status: "Excellent" };
  if (score >= 70) return { color: "#f59e0b", status: "Good" };
  if (score >= 50) return { color: "#ef4444", status: "Needs Work" };
  return { color: "#dc2626", status: "Poor" };
};

const getIcon = (metric) => {
  const icons = {
    performance: "⚡",
    accessibility: "♿",
    "best-practices": "✅",
    seo: "🔍",
  };
  return icons[metric.toLowerCase()] || "📊";
};

const CircularProgress = ({ score, color }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <CircularSvg>
      <CircleBackground cx="60" cy="60" r={radius} />
      <CircleProgress
        cx="60"
        cy="60"
        r={radius}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        color={color}
      />
    </CircularSvg>
  );
};

const MetricCard = ({ metric, score }) => {
  const { color, status } = getColorAndStatus(score);
  const icon = getIcon(metric);

  return (
    <Card>
      <MetricIcon>{icon}</MetricIcon>
      <MetricTitle>{metric.replace("-", " ")}</MetricTitle>
      <ChartContainer>
        <CircularProgress score={score} color={color} />
        <ScoreText color={color}>{score}</ScoreText>
      </ChartContainer>
      <StatusText color={color}>{status}</StatusText>
    </Card>
  );
};

// Function to extract and transform PageSpeed Insights API data
const extractMetricsFromPageSpeedData = (apiResponse) => {
  try {
    // Navigate to the lighthouse results in the API response
    const categories = apiResponse?.lighthouseResult?.categories;

    if (!categories) {
      console.warn("No lighthouse categories found in API response");
      return null;
    }

    // Extract scores and convert from 0-1 scale to 0-100 scale
    const metrics = {};

    if (categories.performance) {
      metrics.performance = Math.round(categories.performance.score * 100);
    }

    if (categories.accessibility) {
      metrics.accessibility = Math.round(categories.accessibility.score * 100);
    }

    if (categories["best-practices"]) {
      metrics["best-practices"] = Math.round(
        categories["best-practices"].score * 100
      );
    }

    if (categories.seo) {
      metrics.seo = Math.round(categories.seo.score * 100);
    }

    return metrics;
  } catch (error) {
    console.error("Error extracting metrics from PageSpeed data:", error);
    return null;
  }
};

const PerformanceCards = ({ apiResponse = null }) => {
  // Default demo data if no API response is passed
  const defaultData = {
    performance: 85,
    accessibility: 92,
    "best-practices": 78,
    seo: 96,
  };

  // Extract metrics from API response or use default data
  const metricsData = apiResponse
    ? extractMetricsFromPageSpeedData(apiResponse) || defaultData
    : defaultData;

  return (
    <Container>
      {Object.entries(metricsData).map(([metric, score]) => (
        <MetricCard key={metric} metric={metric} score={score} />
      ))}
    </Container>
  );
};

export default PerformanceCards;
