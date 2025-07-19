import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MousePointer,
  Eye,
} from "lucide-react";

// Animations
const pulse = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled Components
const Container = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  min-height: 100vh;
  padding-bottom: 4rem;
  color: #333;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
  animation: ${slideIn} 0.6s ease-out;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.8s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bg};
  animation: ${(props) => (props.critical ? pulse : "none")} 2s infinite;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: auto;

  ${(props) => {
    switch (props.status) {
      case "critical":
        return `
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
        `;
      case "warning":
        return `
          background: linear-gradient(135deg, #feca57, #ff9ff3);
          color: #2d3748;
          box-shadow: 0 2px 8px rgba(254, 202, 87, 0.3);
        `;
      case "good":
        return `
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
        `;
      default:
        return `
          background: #e2e8f0;
          color: #4a5568;
        `;
    }
  }}
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${(props) => props.color || "#2d3748"};
`;

const MetricLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

const IssuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

const IssueItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 8px;
  background: ${(props) =>
    props.severity === "high"
      ? "rgba(255, 107, 107, 0.1)"
      : props.severity === "medium"
      ? "rgba(254, 202, 87, 0.1)"
      : "rgba(72, 187, 120, 0.1)"};
`;

const ActionsList = styled.div`
  margin-top: 20px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-left: 4px solid
    ${(props) =>
      props.priority === "high"
        ? "#e53e3e"
        : props.priority === "medium"
        ? "#d69e2e"
        : "#38a169"};
  background: ${(props) =>
    props.priority === "high"
      ? "rgba(229, 62, 62, 0.05)"
      : props.priority === "medium"
      ? "rgba(214, 158, 46, 0.05)"
      : "rgba(56, 161, 105, 0.05)"};
`;

const ActionText = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const PriorityLabel = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: auto;

  ${(props) => {
    switch (props.priority) {
      case "high":
        return "background: #feb2b2; color: #c53030;";
      case "medium":
        return "background: #faf089; color: #b7791f;";
      default:
        return "background: #c6f6d5; color: #276749;";
    }
  }}
`;

// Helper function to parse PageSpeed API response
const parsePageSpeedData = (apiResponse) => {
  if (!apiResponse || !apiResponse.lighthouseResult) {
    return null;
  }

  const lighthouse = apiResponse.lighthouseResult;
  const audits = lighthouse.audits || {};

  return {
    performanceScore: Math.round(
      (lighthouse.categories?.performance?.score || 0) * 100
    ),
    accessibilityScore: Math.round(
      (lighthouse.categories?.accessibility?.score || 0) * 100
    ),
    bestPracticesScore: Math.round(
      (lighthouse.categories?.["best-practices"]?.score || 0) * 100
    ),
    seoScore: Math.round((lighthouse.categories?.seo?.score || 0) * 100),

    // Core Web Vitals
    lcp: audits["largest-contentful-paint"]?.numericValue
      ? Math.round(audits["largest-contentful-paint"].numericValue)
      : null,
    fid: audits["max-potential-fid"]?.numericValue
      ? Math.round(audits["max-potential-fid"].numericValue)
      : null,
    cls: audits["cumulative-layout-shift"]?.numericValue
      ? Math.round(audits["cumulative-layout-shift"].numericValue * 1000) / 1000
      : null,
    fcp: audits["first-contentful-paint"]?.numericValue
      ? Math.round(audits["first-contentful-paint"].numericValue)
      : null,

    // Other metrics
    speedIndex: audits["speed-index"]?.numericValue
      ? Math.round(audits["speed-index"].numericValue)
      : null,
    tti: audits["interactive"]?.numericValue
      ? Math.round(audits["interactive"].numericValue)
      : null,
    totalBlockingTime: audits["total-blocking-time"]?.numericValue
      ? Math.round(audits["total-blocking-time"].numericValue)
      : null,

    // Opportunities and diagnostics
    opportunities: lighthouse.audits
      ? Object.values(lighthouse.audits)
          .filter(
            (audit) =>
              audit.details &&
              audit.details.type === "opportunity" &&
              audit.numericValue > 100
          )
          .sort((a, b) => b.numericValue - a.numericValue)
          .slice(0, 5)
      : [],

    diagnostics: lighthouse.audits
      ? Object.values(lighthouse.audits)
          .filter(
            (audit) =>
              audit.score !== null &&
              audit.score < 1 &&
              audit.title &&
              audit.description
          )
          .sort((a, b) => a.score - b.score)
          .slice(0, 5)
      : [],
  };
};

// Analysis functions for PageSpeed data
const analyzeMetrics = (apiResponse) => {
  const data = parsePageSpeedData(apiResponse);

  if (!data) {
    return {
      performance: {
        status: "warning",
        issues: [
          { severity: "medium", text: "Unable to parse PageSpeed data" },
        ],
        actions: [],
      },
      coreWebVitals: { status: "warning", issues: [], actions: [] },
      seo: { status: "warning", issues: [], actions: [] },
      accessibility: { status: "warning", issues: [], actions: [] },
    };
  }

  const insights = {
    performance: { status: "good", issues: [], actions: [] },
    coreWebVitals: { status: "good", issues: [], actions: [] },
    seo: { status: "good", issues: [], actions: [] },
    accessibility: { status: "good", issues: [], actions: [] },
  };

  // Performance Score Analysis
  if (data.performanceScore < 50) {
    insights.performance.status = "critical";
    insights.performance.issues.push({
      severity: "high",
      text: `Performance score is critically low (${data.performanceScore}/100)`,
    });
    insights.performance.actions.push({
      priority: "high",
      text: "Optimize images and eliminate render-blocking resources",
    });
    insights.performance.actions.push({
      priority: "high",
      text: "Implement lazy loading and code splitting",
    });
  } else if (data.performanceScore < 90) {
    insights.performance.status = "warning";
    insights.performance.issues.push({
      severity: "medium",
      text: `Performance score needs improvement (${data.performanceScore}/100)`,
    });
    insights.performance.actions.push({
      priority: "medium",
      text: "Minify CSS/JS and optimize server response times",
    });
  }

  // Core Web Vitals Analysis
  if (data.lcp && data.lcp > 2500) {
    insights.coreWebVitals.status = "critical";
    insights.coreWebVitals.issues.push({
      severity: "high",
      text: `LCP is too slow (${(data.lcp / 1000).toFixed(
        1
      )}s) - Target: <2.5s`,
    });
    insights.coreWebVitals.actions.push({
      priority: "high",
      text: "Optimize largest contentful paint element",
    });
  } else if (data.lcp && data.lcp > 1500) {
    insights.coreWebVitals.status = "warning";
    insights.coreWebVitals.issues.push({
      severity: "medium",
      text: `LCP could be faster (${(data.lcp / 1000).toFixed(
        1
      )}s) - Target: <2.5s`,
    });
  }

  if (data.cls && data.cls > 0.1) {
    insights.coreWebVitals.status =
      insights.coreWebVitals.status === "critical" ? "critical" : "warning";
    insights.coreWebVitals.issues.push({
      severity: data.cls > 0.25 ? "high" : "medium",
      text: `CLS is too high (${data.cls}) - Target: <0.1`,
    });
    insights.coreWebVitals.actions.push({
      priority: data.cls > 0.25 ? "high" : "medium",
      text: "Set explicit dimensions for images and ads",
    });
  }

  if (data.fid && data.fid > 100) {
    insights.coreWebVitals.status =
      insights.coreWebVitals.status === "critical" ? "critical" : "warning";
    insights.coreWebVitals.issues.push({
      severity: "medium",
      text: `FID is too high (${data.fid}ms) - Target: <100ms`,
    });
    insights.coreWebVitals.actions.push({
      priority: "medium",
      text: "Reduce JavaScript execution time",
    });
  }

  // SEO Score Analysis
  if (data.seoScore < 80) {
    insights.seo.status = data.seoScore < 60 ? "critical" : "warning";
    insights.seo.issues.push({
      severity: data.seoScore < 60 ? "high" : "medium",
      text: `SEO score needs improvement (${data.seoScore}/100)`,
    });
    insights.seo.actions.push({
      priority: data.seoScore < 60 ? "high" : "medium",
      text: "Add meta descriptions and optimize title tags",
    });
    insights.seo.actions.push({
      priority: "medium",
      text: "Improve semantic HTML structure",
    });
  }

  // Accessibility Score Analysis
  if (data.accessibilityScore < 80) {
    insights.accessibility.status =
      data.accessibilityScore < 60 ? "critical" : "warning";
    insights.accessibility.issues.push({
      severity: data.accessibilityScore < 60 ? "high" : "medium",
      text: `Accessibility score needs improvement (${data.accessibilityScore}/100)`,
    });
    insights.accessibility.actions.push({
      priority: data.accessibilityScore < 60 ? "high" : "medium",
      text: "Add alt text to images and improve color contrast",
    });
    insights.accessibility.actions.push({
      priority: "medium",
      text: "Ensure keyboard navigation and ARIA labels",
    });
  }

  // Add specific opportunities as actions
  data.opportunities.forEach((opportunity) => {
    const savingsMs = opportunity.numericValue;
    if (savingsMs > 500) {
      insights.performance.actions.push({
        priority: savingsMs > 1000 ? "high" : "medium",
        text: opportunity.title + ` (Save ~${(savingsMs / 1000).toFixed(1)}s)`,
      });
    }
  });

  return insights;
};

const GoogleAnalyticsInsights = ({ pageSpeedData }) => {
  // Default PageSpeed API response structure for demonstration
  const defaultData = {
    lighthouseResult: {
      categories: {
        performance: { score: 0.75 },
        accessibility: { score: 0.85 },
        "best-practices": { score: 0.9 },
        seo: { score: 0.88 },
      },
      audits: {
        "largest-contentful-paint": { numericValue: 2200 },
        "first-contentful-paint": { numericValue: 1100 },
        "cumulative-layout-shift": { numericValue: 0.15 },
        "max-potential-fid": { numericValue: 85 },
        "speed-index": { numericValue: 3200 },
        interactive: { numericValue: 4500 },
        "total-blocking-time": { numericValue: 350 },
      },
    },
  };

  const apiResponse = pageSpeedData || defaultData;
  console.log(apiResponse);
  const data = parsePageSpeedData(apiResponse);
  const insights = analyzeMetrics(apiResponse);

  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <XCircle size={24} />;
      case "warning":
        return <AlertTriangle size={24} />;
      case "good":
        return <CheckCircle size={24} />;
      default:
        return <Eye size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "linear-gradient(135deg, #ff6b6b, #ee5a52)";
      case "warning":
        return "linear-gradient(135deg, #feca57, #ff9ff3)";
      case "good":
        return "linear-gradient(135deg, #48bb78, #38a169)";
      default:
        return "linear-gradient(135deg, #4299e1, #3182ce)";
    }
  };

  return (
    <Container>
      <Header>
        <Title>Website Analytics Insights</Title>
        <Subtitle>AI-powered analysis of your Google Analytics data</Subtitle>
      </Header>

      <Grid>
        {/* Performance Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.performance.status)}
              critical={insights.performance.status === "critical"}
            >
              {getStatusIcon(insights.performance.status)}
            </IconWrapper>
            <CardTitle>Performance Score</CardTitle>
            <StatusBadge status={insights.performance.status}>
              {insights.performance.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.performance.status === "critical" ? "#e53e3e" : "#2d3748"
            }
          >
            {data?.performanceScore || 0}/100
          </MetricValue>
          <MetricLabel>Google PageSpeed Score</MetricLabel>

          {insights.performance.issues.length > 0 && (
            <IssuesList>
              {insights.performance.issues.map((issue, index) => (
                <IssueItem key={index} severity={issue.severity}>
                  <AlertTriangle
                    size={16}
                    color={issue.severity === "high" ? "#e53e3e" : "#d69e2e"}
                  />
                  {issue.text}
                </IssueItem>
              ))}
            </IssuesList>
          )}

          <ActionsList>
            {insights.performance.actions.map((action, index) => (
              <ActionItem key={index} priority={action.priority}>
                <MousePointer size={16} />
                <ActionText>{action.text}</ActionText>
                <PriorityLabel priority={action.priority}>
                  {action.priority}
                </PriorityLabel>
              </ActionItem>
            ))}
          </ActionsList>
        </Card>

        {/* Core Web Vitals Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.coreWebVitals.status)}
              critical={insights.coreWebVitals.status === "critical"}
            >
              {getStatusIcon(insights.coreWebVitals.status)}
            </IconWrapper>
            <CardTitle>Core Web Vitals</CardTitle>
            <StatusBadge status={insights.coreWebVitals.status}>
              {insights.coreWebVitals.status}
            </StatusBadge>
          </CardHeader>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <MetricValue
                color={
                  data?.lcp > 2500
                    ? "#e53e3e"
                    : data?.lcp > 1500
                    ? "#d69e2e"
                    : "#38a169"
                }
                style={{ fontSize: "1.2rem" }}
              >
                {data?.lcp ? `${(data.lcp / 1000).toFixed(1)}s` : "N/A"}
              </MetricValue>
              <MetricLabel style={{ fontSize: "0.8rem" }}>LCP</MetricLabel>
            </div>
            <div style={{ flex: 1 }}>
              <MetricValue
                color={data?.cls > 0.1 ? "#e53e3e" : "#38a169"}
                style={{ fontSize: "1.2rem" }}
              >
                {data?.cls ? data.cls.toFixed(3) : "N/A"}
              </MetricValue>
              <MetricLabel style={{ fontSize: "0.8rem" }}>CLS</MetricLabel>
            </div>
            <div style={{ flex: 1 }}>
              <MetricValue
                color={data?.fid > 100 ? "#d69e2e" : "#38a169"}
                style={{ fontSize: "1.2rem" }}
              >
                {data?.fid ? `${data.fid}ms` : "N/A"}
              </MetricValue>
              <MetricLabel style={{ fontSize: "0.8rem" }}>FID</MetricLabel>
            </div>
          </div>

          {insights.coreWebVitals.issues.length > 0 && (
            <IssuesList>
              {insights.coreWebVitals.issues.map((issue, index) => (
                <IssueItem key={index} severity={issue.severity}>
                  <TrendingDown
                    size={16}
                    color={issue.severity === "high" ? "#e53e3e" : "#d69e2e"}
                  />
                  {issue.text}
                </IssueItem>
              ))}
            </IssuesList>
          )}

          <ActionsList>
            {insights.coreWebVitals.actions.map((action, index) => (
              <ActionItem key={index} priority={action.priority}>
                <Clock size={16} />
                <ActionText>{action.text}</ActionText>
                <PriorityLabel priority={action.priority}>
                  {action.priority}
                </PriorityLabel>
              </ActionItem>
            ))}
          </ActionsList>
        </Card>

        {/* SEO Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.seo.status)}
              critical={insights.seo.status === "critical"}
            >
              {getStatusIcon(insights.seo.status)}
            </IconWrapper>
            <CardTitle>SEO Score</CardTitle>
            <StatusBadge status={insights.seo.status}>
              {insights.seo.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={insights.seo.status === "critical" ? "#e53e3e" : "#2d3748"}
          >
            {data?.seoScore || 0}/100
          </MetricValue>
          <MetricLabel>Search Engine Optimization</MetricLabel>

          {insights.seo.issues.length > 0 && (
            <IssuesList>
              {insights.seo.issues.map((issue, index) => (
                <IssueItem key={index} severity={issue.severity}>
                  <TrendingDown
                    size={16}
                    color={issue.severity === "high" ? "#e53e3e" : "#d69e2e"}
                  />
                  {issue.text}
                </IssueItem>
              ))}
            </IssuesList>
          )}

          <ActionsList>
            {insights.seo.actions.map((action, index) => (
              <ActionItem key={index} priority={action.priority}>
                <TrendingUp size={16} />
                <ActionText>{action.text}</ActionText>
                <PriorityLabel priority={action.priority}>
                  {action.priority}
                </PriorityLabel>
              </ActionItem>
            ))}
          </ActionsList>
        </Card>

        {/* Accessibility Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.accessibility.status)}
              critical={insights.accessibility.status === "critical"}
            >
              {getStatusIcon(insights.accessibility.status)}
            </IconWrapper>
            <CardTitle>Accessibility</CardTitle>
            <StatusBadge status={insights.accessibility.status}>
              {insights.accessibility.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.accessibility.status === "critical"
                ? "#e53e3e"
                : "#2d3748"
            }
          >
            {data?.accessibilityScore || 0}/100
          </MetricValue>
          <MetricLabel>Web Accessibility</MetricLabel>

          {insights.accessibility.issues.length > 0 && (
            <IssuesList>
              {insights.accessibility.issues.map((issue, index) => (
                <IssueItem key={index} severity={issue.severity}>
                  <AlertTriangle
                    size={16}
                    color={issue.severity === "high" ? "#e53e3e" : "#d69e2e"}
                  />
                  {issue.text}
                </IssueItem>
              ))}
            </IssuesList>
          )}

          <ActionsList>
            {insights.accessibility.actions.map((action, index) => (
              <ActionItem key={index} priority={action.priority}>
                <Users size={16} />
                <ActionText>{action.text}</ActionText>
                <PriorityLabel priority={action.priority}>
                  {action.priority}
                </PriorityLabel>
              </ActionItem>
            ))}
          </ActionsList>
        </Card>
      </Grid>
    </Container>
  );
};

export default GoogleAnalyticsInsights;
