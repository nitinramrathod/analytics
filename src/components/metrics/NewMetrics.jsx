import React from "react";
import styled from "@emotion/styled";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 5rem;
`;

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 5px;
`;

const OverallStatus = styled.div`
  background: ${(props) =>
    props.status === "SLOW"
      ? "#ff4757"
      : props.status === "AVERAGE"
      ? "#ffa502"
      : "#2ed573"};
  padding: 10px 20px;
  border-radius: 25px;
  display: inline-block;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MetricTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
`;

const CategoryBadge = styled.span`
  background: ${(props) =>
    props.category === "FAST"
      ? "#2ed573"
      : props.category === "AVERAGE"
      ? "#ffa502"
      : "#ff4757"};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) =>
    props.category === "FAST"
      ? "#2ed573"
      : props.category === "AVERAGE"
      ? "#ffa502"
      : "#ff4757"};
  margin-bottom: 15px;
`;

const MetricDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Recommendation = styled.div`
  background: ${(props) =>
    props.severity === "critical"
      ? "#ffe6e6"
      : props.severity === "warning"
      ? "#fff3cd"
      : "#d1edff"};
  border-left: 4px solid
    ${(props) =>
      props.severity === "critical"
        ? "#ff4757"
        : props.severity === "warning"
        ? "#ffa502"
        : "#2ed573"};
  padding: 12px;
  border-radius: 0 8px 8px 0;
  margin-top: 15px;
`;

const RecommendationTitle = styled.h4`
  margin: 0 0 8px 0;
  color: ${(props) =>
    props.severity === "critical"
      ? "#c0392b"
      : props.severity === "warning"
      ? "#d68910"
      : "#1e8449"};
  font-size: 0.9rem;
`;

const RecommendationText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #2c3e50;
  line-height: 1.4;
`;

const COLORS = ["#2ed573", "#ffa502", "#ff4757"];

const PageSpeedDashboard = ({ data = null }) => {
  // Example usage:
  // <PageSpeedDashboard data={yourPageSpeedData} />
  // OR
  // <PageSpeedDashboard /> (uses default data shown below)

  // Default data structure - you can pass your JSON here
  const defaultData = {
    loadingExperience: {
      id: "https://www.dnsbank.in/",
      metrics: {
        CUMULATIVE_LAYOUT_SHIFT_SCORE: {
          percentile: 37,
          distributions: [
            { min: 0, max: 10, proportion: 0.7067 },
            { min: 10, max: 25, proportion: 0.0155 },
            { min: 25, proportion: 0.2778 },
          ],
          category: "SLOW",
        },
        EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
          percentile: 611,
          distributions: [
            { min: 0, max: 800, proportion: 0.806 },
            { min: 800, max: 1800, proportion: 0.1156 },
            { min: 1800, proportion: 0.0784 },
          ],
          category: "FAST",
        },
        FIRST_CONTENTFUL_PAINT_MS: {
          percentile: 1792,
          distributions: [
            { min: 0, max: 1800, proportion: 0.7506 },
            { min: 1800, max: 3000, proportion: 0.1402 },
            { min: 3000, proportion: 0.1093 },
          ],
          category: "FAST",
        },
        INTERACTION_TO_NEXT_PAINT: {
          percentile: 168,
          distributions: [
            { min: 0, max: 200, proportion: 0.8086 },
            { min: 200, max: 500, proportion: 0.1594 },
            { min: 500, proportion: 0.032 },
          ],
          category: "FAST",
        },
        LARGEST_CONTENTFUL_PAINT_MS: {
          percentile: 2941,
          distributions: [
            { min: 0, max: 2500, proportion: 0.6786 },
            { min: 2500, max: 4000, proportion: 0.1688 },
            { min: 4000, proportion: 0.1526 },
          ],
          category: "AVERAGE",
        },
      },
      overall_category: "SLOW",
      initial_url: "https://www.dnsbank.in/",
    },
  };

  const metrics = (data || defaultData).loadingExperience.metrics;
  const overallCategory = (data || defaultData).loadingExperience
    .overall_category;
  const url = (data || defaultData).loadingExperience.initial_url;

  const getMetricInfo = (metricKey) => {
    const info = {
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        title: "Layout Shift Score",
        unit: "/100",
        description:
          "Measures visual stability. Lower scores mean content doesn't jump around unexpectedly.",
        goodThreshold: 10,
        recommendation: {
          severity:
            metrics[metricKey].category === "SLOW" ? "critical" : "info",
          title:
            metrics[metricKey].category === "SLOW"
              ? "⚠️ Critical Issue"
              : "✅ Good Score",
          text:
            metrics[metricKey].category === "SLOW"
              ? "Your content shifts too much during loading. Fix: Set dimensions for images/ads, avoid inserting content above existing content, use CSS transforms instead of changing layout properties."
              : "Great! Your content stays stable during loading, providing a smooth user experience.",
        },
      },
      EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
        title: "Time to First Byte",
        unit: "ms",
        description:
          "How quickly your server responds. This is your server performance indicator.",
        goodThreshold: 800,
        recommendation: {
          severity:
            metrics[metricKey].category === "SLOW"
              ? "critical"
              : metrics[metricKey].category === "AVERAGE"
              ? "warning"
              : "info",
          title:
            metrics[metricKey].category === "FAST"
              ? "🚀 Excellent Server Speed"
              : "⚡ Server Optimization Needed",
          text:
            metrics[metricKey].category === "FAST"
              ? "Your server responds very quickly! This provides an excellent foundation for fast loading."
              : "Optimize your server: Use a CDN, upgrade hosting, optimize database queries, enable server-side caching, minimize server processing time.",
        },
      },
      FIRST_CONTENTFUL_PAINT_MS: {
        title: "First Contentful Paint",
        unit: "ms",
        description:
          "When users first see any content. Critical for perceived performance.",
        goodThreshold: 1800,
        recommendation: {
          severity:
            metrics[metricKey].category === "SLOW"
              ? "critical"
              : metrics[metricKey].category === "AVERAGE"
              ? "warning"
              : "info",
          title:
            metrics[metricKey].category === "FAST"
              ? "⚡ Fast Initial Loading"
              : "🐌 Slow First Paint",
          text:
            metrics[metricKey].category === "FAST"
              ? "Users see content quickly! This creates a great first impression."
              : "Speed up first content: Optimize images, minimize CSS/JS, use a CDN, enable browser caching, consider server-side rendering.",
        },
      },
      INTERACTION_TO_NEXT_PAINT: {
        title: "Interaction Response",
        unit: "ms",
        description:
          "How quickly the page responds to user clicks/taps. Lower is better for user experience.",
        goodThreshold: 200,
        recommendation: {
          severity:
            metrics[metricKey].category === "SLOW" ? "critical" : "info",
          title:
            metrics[metricKey].category === "FAST"
              ? "👆 Responsive Interactions"
              : "🐌 Slow Interactions",
          text:
            metrics[metricKey].category === "FAST"
              ? "Your site responds quickly to user interactions! Users will feel the site is snappy and responsive."
              : "Improve responsiveness: Reduce JavaScript execution time, avoid long-running tasks, optimize event handlers, use web workers for heavy computations.",
        },
      },
      LARGEST_CONTENTFUL_PAINT_MS: {
        title: "Largest Content Paint",
        unit: "ms",
        description:
          'When the main content finishes loading. This is what users consider "loaded".',
        goodThreshold: 2500,
        recommendation: {
          severity:
            metrics[metricKey].category === "SLOW"
              ? "critical"
              : metrics[metricKey].category === "AVERAGE"
              ? "warning"
              : "info",
          title:
            metrics[metricKey].category === "AVERAGE"
              ? "🔄 Room for Improvement"
              : metrics[metricKey].category === "FAST"
              ? "🎯 Great Loading Speed"
              : "🚨 Very Slow Loading",
          text:
            metrics[metricKey].category === "AVERAGE"
              ? "Your main content loads at average speed. Optimize largest images, preload key resources, improve server response times."
              : metrics[metricKey].category === "FAST"
              ? "Excellent! Your main content loads quickly, giving users fast access to what they need."
              : "Critical: Main content takes too long. Optimize large images, lazy load non-critical content, improve hosting performance.",
        },
      },
    };
    return info[metricKey];
  };

  const renderCumulativeLayoutShift = () => {
    const metric = metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;
    const info = getMetricInfo("CUMULATIVE_LAYOUT_SHIFT_SCORE");

    const distributionData = metric.distributions.map((dist, index) => ({
      name:
        index === 0
          ? "Good (0-10)"
          : index === 1
          ? "Needs Work (10-25)"
          : "Poor (25+)",
      value: Math.round(dist.proportion * 100),
      percentage: dist.proportion,
    }));

    return (
      <MetricCard>
        <MetricHeader>
          <MetricTitle>{info.title}</MetricTitle>
          <CategoryBadge category={metric.category}>
            {metric.category}
          </CategoryBadge>
        </MetricHeader>
        <MetricValue category={metric.category}>
          {metric.percentile}
          {info.unit}
        </MetricValue>
        <MetricDescription>{info.description}</MetricDescription>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Users"]} />
          </PieChart>
        </ResponsiveContainer>

        <Recommendation severity={info.recommendation.severity}>
          <RecommendationTitle severity={info.recommendation.severity}>
            {info.recommendation.title}
          </RecommendationTitle>
          <RecommendationText>{info.recommendation.text}</RecommendationText>
        </Recommendation>
      </MetricCard>
    );
  };

  const renderTimeToFirstByte = () => {
    const metric = metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE;
    const info = getMetricInfo("EXPERIMENTAL_TIME_TO_FIRST_BYTE");

    const distributionData = metric.distributions.map((dist, index) => ({
      range:
        index === 0
          ? "Fast (0-800ms)"
          : index === 1
          ? "Average (800-1800ms)"
          : "Slow (1800ms+)",
      percentage: Math.round(dist.proportion * 100),
      users: Math.round(dist.proportion * 100),
    }));

    return (
      <MetricCard>
        <MetricHeader>
          <MetricTitle>{info.title}</MetricTitle>
          <CategoryBadge category={metric.category}>
            {metric.category}
          </CategoryBadge>
        </MetricHeader>
        <MetricValue category={metric.category}>
          {metric.percentile}
          {info.unit}
        </MetricValue>
        <MetricDescription>{info.description}</MetricDescription>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={distributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" tick={{ fontSize: 10 }} />
            <YAxis
              label={{
                value: "% of Users",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip formatter={(value) => [`${value}%`, "Users"]} />
            <Bar dataKey="percentage" fill="#8884d8">
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Recommendation severity={info.recommendation.severity}>
          <RecommendationTitle severity={info.recommendation.severity}>
            {info.recommendation.title}
          </RecommendationTitle>
          <RecommendationText>{info.recommendation.text}</RecommendationText>
        </Recommendation>
      </MetricCard>
    );
  };

  const renderFirstContentfulPaint = () => {
    const metric = metrics.FIRST_CONTENTFUL_PAINT_MS;
    const info = getMetricInfo("FIRST_CONTENTFUL_PAINT_MS");

    const distributionData = metric.distributions.map((dist, index) => ({
      name: index === 0 ? "Fast" : index === 1 ? "Average" : "Slow",
      value: Math.round(dist.proportion * 100),
      fill: COLORS[index],
    }));

    return (
      <MetricCard>
        <MetricHeader>
          <MetricTitle>{info.title}</MetricTitle>
          <CategoryBadge category={metric.category}>
            {metric.category}
          </CategoryBadge>
        </MetricHeader>
        <MetricValue category={metric.category}>
          {metric.percentile}
          {info.unit}
        </MetricValue>
        <MetricDescription>{info.description}</MetricDescription>

        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={distributionData}
          >
            <RadialBar dataKey="value" cornerRadius={10} />
            <Tooltip formatter={(value) => [`${value}%`, "Users"]} />
          </RadialBarChart>
        </ResponsiveContainer>

        <Recommendation severity={info.recommendation.severity}>
          <RecommendationTitle severity={info.recommendation.severity}>
            {info.recommendation.title}
          </RecommendationTitle>
          <RecommendationText>{info.recommendation.text}</RecommendationText>
        </Recommendation>
      </MetricCard>
    );
  };

  const renderInteractionToNextPaint = () => {
    const metric = metrics.INTERACTION_TO_NEXT_PAINT;
    const info = getMetricInfo("INTERACTION_TO_NEXT_PAINT");

    const distributionData = metric.distributions.map((dist, index) => ({
      category:
        index === 0
          ? "Good (0-200ms)"
          : index === 1
          ? "Needs Improvement (200-500ms)"
          : "Poor (500ms+)",
      percentage: Math.round(dist.proportion * 100),
    }));

    return (
      <MetricCard>
        <MetricHeader>
          <MetricTitle>{info.title}</MetricTitle>
          <CategoryBadge category={metric.category}>
            {metric.category}
          </CategoryBadge>
        </MetricHeader>
        <MetricValue category={metric.category}>
          {metric.percentile}
          {info.unit}
        </MetricValue>
        <MetricDescription>{info.description}</MetricDescription>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={distributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 10 }} />
            <YAxis
              label={{ value: "% Users", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => [`${value}%`, "Users"]} />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>

        <Recommendation severity={info.recommendation.severity}>
          <RecommendationTitle severity={info.recommendation.severity}>
            {info.recommendation.title}
          </RecommendationTitle>
          <RecommendationText>{info.recommendation.text}</RecommendationText>
        </Recommendation>
      </MetricCard>
    );
  };

  return (
    <Container>
      <Header>
        <Title>PageSpeed Performance Dashboard</Title>
        <Subtitle>{url}</Subtitle>
        <OverallStatus status={overallCategory}>
          Overall Status: {overallCategory}
        </OverallStatus>
      </Header>

      <GridContainer>
        {renderCumulativeLayoutShift()}
        {renderTimeToFirstByte()}
        {renderFirstContentfulPaint()}
        {renderInteractionToNextPaint()}
      </GridContainer>
    </Container>
  );
};

export default PageSpeedDashboard;
