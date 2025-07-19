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

// Analysis functions
const analyzeMetrics = (data) => {
  const insights = {
    performance: { status: "good", issues: [], actions: [] },
    engagement: { status: "good", issues: [], actions: [] },
    conversion: { status: "good", issues: [], actions: [] },
    traffic: { status: "good", issues: [], actions: [] },
  };

  // Bounce Rate Analysis
  if (data.bounceRate > 70) {
    insights.engagement.status = "critical";
    insights.engagement.issues.push({
      severity: "high",
      text: `Bounce rate is critically high at ${data.bounceRate}%`,
    });
    insights.engagement.actions.push({
      priority: "high",
      text: "Improve page loading speed and content relevance",
    });
    insights.engagement.actions.push({
      priority: "high",
      text: "Review landing page design and call-to-actions",
    });
  } else if (data.bounceRate > 50) {
    insights.engagement.status = "warning";
    insights.engagement.issues.push({
      severity: "medium",
      text: `Bounce rate is above average at ${data.bounceRate}%`,
    });
    insights.engagement.actions.push({
      priority: "medium",
      text: "Optimize content to better match user intent",
    });
  }

  // Session Duration Analysis
  const avgSessionMinutes = data.avgSessionDuration / 60;
  if (avgSessionMinutes < 1) {
    insights.engagement.status =
      insights.engagement.status === "critical" ? "critical" : "warning";
    insights.engagement.issues.push({
      severity: "medium",
      text: `Very short average session duration (${avgSessionMinutes.toFixed(
        1
      )} minutes)`,
    });
    insights.engagement.actions.push({
      priority: "medium",
      text: "Add engaging content and internal linking",
    });
  }

  // Conversion Rate Analysis
  if (data.conversionRate < 2) {
    insights.conversion.status = "critical";
    insights.conversion.issues.push({
      severity: "high",
      text: `Conversion rate is very low at ${data.conversionRate}%`,
    });
    insights.conversion.actions.push({
      priority: "high",
      text: "A/B test landing pages and checkout process",
    });
    insights.conversion.actions.push({
      priority: "high",
      text: "Review and optimize conversion funnel",
    });
  } else if (data.conversionRate < 5) {
    insights.conversion.status = "warning";
    insights.conversion.issues.push({
      severity: "medium",
      text: `Conversion rate could be improved (${data.conversionRate}%)`,
    });
    insights.conversion.actions.push({
      priority: "medium",
      text: "Optimize call-to-action buttons and forms",
    });
  }

  // Page Load Time Analysis
  if (data.pageLoadTime > 3) {
    insights.performance.status = "critical";
    insights.performance.issues.push({
      severity: "high",
      text: `Page load time is too slow (${data.pageLoadTime}s)`,
    });
    insights.performance.actions.push({
      priority: "high",
      text: "Optimize images and enable compression",
    });
    insights.performance.actions.push({
      priority: "high",
      text: "Implement CDN and caching strategies",
    });
  } else if (data.pageLoadTime > 2) {
    insights.performance.status = "warning";
    insights.performance.issues.push({
      severity: "medium",
      text: `Page load time could be faster (${data.pageLoadTime}s)`,
    });
    insights.performance.actions.push({
      priority: "medium",
      text: "Minify CSS/JS and optimize server response",
    });
  }

  // Traffic Source Analysis
  if (data.organicTrafficPercent < 30) {
    insights.traffic.status = "warning";
    insights.traffic.issues.push({
      severity: "medium",
      text: `Low organic traffic percentage (${data.organicTrafficPercent}%)`,
    });
    insights.traffic.actions.push({
      priority: "medium",
      text: "Improve SEO strategy and content marketing",
    });
    insights.traffic.actions.push({
      priority: "low",
      text: "Research and target high-value keywords",
    });
  }

  return insights;
};

const GoogleAnalyticsInsights = ({ analyticsData }) => {
  // Default data structure for demonstration
  const defaultData = {
    sessions: 15420,
    bounceRate: 65,
    avgSessionDuration: 180, // in seconds
    pageViews: 45680,
    conversionRate: 3.2,
    pageLoadTime: 2.8,
    organicTrafficPercent: 45,
    returningVisitorPercent: 35,
  };

  const data = analyticsData || defaultData;
  const insights = analyzeMetrics(data);

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
            <CardTitle>Performance</CardTitle>
            <StatusBadge status={insights.performance.status}>
              {insights.performance.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.performance.status === "critical" ? "#e53e3e" : "#2d3748"
            }
          >
            {data.pageLoadTime}s
          </MetricValue>
          <MetricLabel>Average Page Load Time</MetricLabel>

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

        {/* Engagement Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.engagement.status)}
              critical={insights.engagement.status === "critical"}
            >
              {getStatusIcon(insights.engagement.status)}
            </IconWrapper>
            <CardTitle>User Engagement</CardTitle>
            <StatusBadge status={insights.engagement.status}>
              {insights.engagement.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.engagement.status === "critical" ? "#e53e3e" : "#2d3748"
            }
          >
            {data.bounceRate}%
          </MetricValue>
          <MetricLabel>Bounce Rate</MetricLabel>

          {insights.engagement.issues.length > 0 && (
            <IssuesList>
              {insights.engagement.issues.map((issue, index) => (
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
            {insights.engagement.actions.map((action, index) => (
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

        {/* Conversion Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.conversion.status)}
              critical={insights.conversion.status === "critical"}
            >
              {getStatusIcon(insights.conversion.status)}
            </IconWrapper>
            <CardTitle>Conversions</CardTitle>
            <StatusBadge status={insights.conversion.status}>
              {insights.conversion.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.conversion.status === "critical" ? "#e53e3e" : "#2d3748"
            }
          >
            {data.conversionRate}%
          </MetricValue>
          <MetricLabel>Conversion Rate</MetricLabel>

          {insights.conversion.issues.length > 0 && (
            <IssuesList>
              {insights.conversion.issues.map((issue, index) => (
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
            {insights.conversion.actions.map((action, index) => (
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

        {/* Traffic Card */}
        <Card>
          <CardHeader>
            <IconWrapper
              bg={getStatusColor(insights.traffic.status)}
              critical={insights.traffic.status === "critical"}
            >
              {getStatusIcon(insights.traffic.status)}
            </IconWrapper>
            <CardTitle>Traffic Sources</CardTitle>
            <StatusBadge status={insights.traffic.status}>
              {insights.traffic.status}
            </StatusBadge>
          </CardHeader>

          <MetricValue
            color={
              insights.traffic.status === "critical" ? "#e53e3e" : "#2d3748"
            }
          >
            {data.organicTrafficPercent}%
          </MetricValue>
          <MetricLabel>Organic Traffic</MetricLabel>

          {insights.traffic.issues.length > 0 && (
            <IssuesList>
              {insights.traffic.issues.map((issue, index) => (
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
            {insights.traffic.actions.map((action, index) => (
              <ActionItem key={index} priority={action.priority}>
                <Eye size={16} />
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
