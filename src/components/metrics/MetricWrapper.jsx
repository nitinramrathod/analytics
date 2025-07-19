import React from "react";
import { MetricBarChart } from "./BarChart";
import { formatDistributions } from ".";

export const CLSChart = ({ metric }) => {
  const data = formatDistributions(metric.distributions);
  return (
    <MetricBarChart
      title="Cumulative Layout Shift"
      data={data}
      percentile={metric.percentile}
      category={metric.category}
    />
  );
};

export const TTFBChart = ({ metric }) => {
  const data = formatDistributions(metric.distributions);
  return (
    <MetricBarChart
      title="Time to First Byte"
      data={data}
      percentile={metric.percentile}
      category={metric.category}
    />
  );
};

export const FCPChart = ({ metric }) => {
  const data = formatDistributions(metric.distributions);
  return (
    <MetricBarChart
      title="First Contentful Paint"
      data={data}
      percentile={metric.percentile}
      category={metric.category}
    />
  );
};

export const INPChart = ({ metric }) => {
  const data = formatDistributions(metric.distributions);
  return (
    <MetricBarChart
      title="Interaction to Next Paint"
      data={data}
      percentile={metric.percentile}
      category={metric.category}
    />
  );
};

export const LCPChart = ({ metric }) => {
  const data = formatDistributions(metric.distributions);
  return (
    <MetricBarChart
      title="Largest Contentful Paint"
      data={data}
      percentile={metric.percentile}
      category={metric.category}
    />
  );
};
