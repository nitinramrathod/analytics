import React, {useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Calendar,
  Filter,
} from "lucide-react";
import SearchBarComponent from "./SearchBar";
import { fetchPageSpeed } from "./common";
import { MetricsDashboard } from "./metrics/Metrics";
import PageSpeedDashboard from "./metrics/NewMetrics";
import WebVitalsStats from "./metrics/WebVitalsStats";
import PerformanceCards from "./metrics/PerformanceCards";
import WebsiteAnalyticsInsights from "./insights/WebsiteAnalyticsInsights";

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7d");

  // Sample data
  const metrics = [
    {
      title: "Performance",
      value: "$24,563",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "#059669",
    },
    {
      title: "Accessibility",
      value: "8,452",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "#2563eb",
    },
    {
      title: "Best Practices",
      value: "1,234",
      change: "-3.1%",
      trend: "down",
      icon: ShoppingCart,
      color: "#ea580c",
    },
    {
      title: "SEO",
      value: "3.4%",
      change: "+0.8%",
      trend: "up",
      icon: TrendingUp,
      color: "#7c3aed",
    },
  ];

  const revenueData = [
    { name: "Jan", revenue: 4000, users: 2400 },
    { name: "Feb", revenue: 3000, users: 1398 },
    { name: "Mar", revenue: 2000, users: 9800 },
    { name: "Apr", revenue: 2780, users: 3908 },
    { name: "May", revenue: 1890, users: 4800 },
    { name: "Jun", revenue: 2390, users: 3800 },
    { name: "Jul", revenue: 3490, users: 4300 },
  ];

  const trafficData = [
    { name: "Organic", value: 45, color: "#3B82F6" },
    { name: "Direct", value: 25, color: "#10B981" },
    { name: "Social", value: 20, color: "#F59E0B" },
    { name: "Email", value: 10, color: "#8B5CF6" },
  ];

  const activityData = [
    { time: "00:00", users: 120 },
    { time: "04:00", users: 80 },
    { time: "08:00", users: 300 },
    { time: "12:00", users: 450 },
    { time: "16:00", users: 380 },
    { time: "20:00", users: 250 },
  ];

  // Style objects
  const styles = {
    container: {
      backgroundColor: "#f9fafb",
      // padding: "1.5rem",
    },
    maxWidthContainer: {
      maxWidth: "80rem",
      margin: "0 auto",
    },
    header: {
      marginBottom: "2rem",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "700",
      color: "#111827",
      margin: "0",
    },
    subtitle: {
      color: "#6b7280",
      marginTop: "0.25rem",
      marginBottom: "0",
    },
    headerControls: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    filterContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
    },
    select: {
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "0.875rem",
    },
    filterButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "#2563eb",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.15s ease-in-out",
    },
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    metricCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
      transition: "box-shadow 0.15s ease-in-out",
    },
    metricHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    iconContainer: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      background: "#f9fafb",
    },
    trendBadge: {
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.25rem 0.5rem",
      borderRadius: "9999px",
    },
    metricTitle: {
      color: "#6b7280",
      fontSize: "0.875rem",
      fontWeight: "500",
      margin: "0",
    },
    metricValue: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#111827",
      margin: "0.25rem 0 0 0",
    },
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "2rem",
      marginBottom: "2rem",
    },
    chartCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
    },
    chartHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    chartTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#111827",
      margin: "0",
    },
    legend: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      fontSize: "0.875rem",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    legendDot: {
      width: "0.75rem",
      height: "0.75rem",
      borderRadius: "50%",
    },
    legendText: {
      color: "#6b7280",
    },
    trafficGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      marginTop: "1rem",
    },
    trafficItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    trafficValue: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#111827",
      marginLeft: "auto",
    },
    activityHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    activityTitleContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    activityDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
  };

  // Add media query styles
  const mediaStyles = `
    @media (min-width: 768px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .metrics-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      .charts-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    .metric-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .filter-button:hover {
      background: #1d4ed8;
    }
  `;

  const [analytics, setAnalytics] = useState({});
  const [url, setUrl] = useState("https://www.dnsbank.in");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  


    
    async function fetchData(url, strategy) {  
      setIsLoading(true)  
      const data = await fetchPageSpeed(url, strategy );
      console.log('data', data);
      if(!data){
        setError(true)
      }
      setAnalytics(data)
      setIsLoading(false)  

    }
  

  const handleAnalyse = (url, strategy )=>{
    fetchData(url, strategy);
  }


  return (
    <div style={styles.container}>
      <style>{mediaStyles}</style>
      <div style={styles.maxWidthContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.title}>Analytics Dashboard</h1>
              <p style={styles.subtitle}>
                Track your website performance and metrics
              </p>
            </div>

            <div style={styles.headerControls}>
              <div style={styles.filterContainer}>
                <Calendar size={16} color="#6b7280" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={styles.select}
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 3 months</option>
                </select>
              </div>
              <button style={styles.filterButton} className="filter-button">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
        </div>

        
      </div>
      <div>
          <SearchBarComponent
            handleAnalyse={handleAnalyse}
            isLoading={isLoading}
            url={url}
          ></SearchBarComponent>
        </div>

        {/* Metrics Cards */}

        {/* {analytics?.loadingExperience?.metrics && (
          <MetricsDashboard metrics={analytics.loadingExperience.metrics} />
        )} */}
        {/* {analytics?.loadingExperience?.metrics && (
          <WebVitalsStats metrics={analytics.loadingExperience.metrics} />
        )} */}
        
        {analytics?.loadingExperience?.metrics && (
          <PerformanceCards metrics={analytics} />
        )}

        {analytics?.loadingExperience?.metrics && (
          <PageSpeedDashboard data={analytics} />
        )}

        {analytics?.loadingExperience?.metrics && (
          <WebsiteAnalyticsInsights data={analytics} />
        )}
    </div>
  );
};

export default Dashboard;
