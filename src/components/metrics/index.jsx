// utils/metricsData.js
export function formatDistributions(distributions) {
  return distributions.map((d, i) => ({
    range: d.max ? `${d.min} - ${d.max}` : `${d.min}+`,
    proportion: +(d.proportion * 100).toFixed(2), // convert to %
  }));
}
