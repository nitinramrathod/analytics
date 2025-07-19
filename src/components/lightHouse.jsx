import React, { useState } from 'react';
import { Upload, FileText, Zap, AlertCircle, CheckCircle, TrendingUp, Eye, Shield, Smartphone } from 'lucide-react';

const LighthouseAnalyzer = () => {
  const [report, setReport] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setReport(data);
          analyzeReport(data);
        } catch (error) {
          alert('Invalid JSON file. Please upload a valid Lighthouse report.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJSONInput = (jsonText) => {
    try {
      const data = JSON.parse(jsonText);
      setReport(data);
      analyzeReport(data);
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const analyzeReport = (data) => {
    setLoading(true);
    
    // Extract key metrics and audits
    const categories = data.lhResult?.categories || data.categories || {};
    const audits = data.lhResult?.audits || data.audits || {};
    
    const analysis = {
      scores: {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
      },
      suggestions: generateSuggestions(audits, categories),
      criticalIssues: findCriticalIssues(audits),
      quickWins: findQuickWins(audits)
    };
    
    setAnalysis(analysis);
    setLoading(false);
  };

  const generateSuggestions = (audits, categories) => {
    const suggestions = [];

    // Performance suggestions
    if (audits['first-contentful-paint']?.score < 0.5) {
      suggestions.push({
        category: 'Performance',
        priority: 'High',
        issue: 'Slow First Contentful Paint',
        suggestion: 'Optimize critical rendering path by minimizing CSS and JavaScript blocking resources. Consider using critical CSS inlining and defer non-critical resources.',
        impact: 'Reduces perceived load time by up to 2-3 seconds'
      });
    }

    if (audits['largest-contentful-paint']?.score < 0.5) {
      suggestions.push({
        category: 'Performance',
        priority: 'High',
        issue: 'Slow Largest Contentful Paint',
        suggestion: 'Optimize your largest content element (images, videos, or text blocks). Use WebP images, implement lazy loading, and ensure proper image sizing.',
        impact: 'Improves Core Web Vitals and user experience'
      });
    }

    if (audits['unused-css-rules']?.score < 0.9) {
      suggestions.push({
        category: 'Performance',
        priority: 'Medium',
        issue: 'Unused CSS',
        suggestion: 'Remove unused CSS rules to reduce bundle size. Use tools like PurgeCSS or built-in tree-shaking in modern bundlers.',
        impact: `Can save ${audits['unused-css-rules']?.details?.overallSavingsBytes ? Math.round(audits['unused-css-rules'].details.overallSavingsBytes / 1024) : 'significant'} KB`
      });
    }

    // Accessibility suggestions
    if (audits['color-contrast']?.score < 1) {
      suggestions.push({
        category: 'Accessibility',
        priority: 'High',
        issue: 'Poor Color Contrast',
        suggestion: 'Ensure text has sufficient contrast ratio (4.5:1 for normal text, 3:1 for large text). Use tools like WebAIM Color Contrast Checker.',
        impact: 'Makes content readable for users with visual impairments'
      });
    }

    if (audits['image-alt']?.score < 1) {
      suggestions.push({
        category: 'Accessibility',
        priority: 'High',
        issue: 'Missing Alt Text',
        suggestion: 'Add descriptive alt attributes to all images. For decorative images, use empty alt="" attributes.',
        impact: 'Enables screen readers to describe images to visually impaired users'
      });
    }

    // SEO suggestions
    if (audits['meta-description']?.score < 1) {
      suggestions.push({
        category: 'SEO',
        priority: 'Medium',
        issue: 'Missing Meta Description',
        suggestion: 'Add unique, descriptive meta descriptions (150-160 characters) to improve search engine snippets and click-through rates.',
        impact: 'Can improve search result click-through rates by 10-15%'
      });
    }

    if (audits['document-title']?.score < 1) {
      suggestions.push({
        category: 'SEO',
        priority: 'High',
        issue: 'Missing or Poor Title Tag',
        suggestion: 'Ensure every page has a unique, descriptive title tag (50-60 characters) that includes relevant keywords.',
        impact: 'Critical for search engine rankings and user experience'
      });
    }

    // Best Practices suggestions
    if (audits['is-on-https']?.score < 1) {
      suggestions.push({
        category: 'Security',
        priority: 'Critical',
        issue: 'Not Using HTTPS',
        suggestion: 'Implement HTTPS across your entire site. Obtain an SSL certificate and redirect all HTTP traffic to HTTPS.',
        impact: 'Essential for security, SEO rankings, and user trust'
      });
    }

    return suggestions;
  };

  const findCriticalIssues = (audits) => {
    const critical = [];
    
    if (audits['is-on-https']?.score < 1) {
      critical.push('Not using HTTPS - Security risk');
    }
    if (audits['first-contentful-paint']?.numericValue > 4000) {
      critical.push('Very slow loading time - Users likely abandoning page');
    }
    if (audits['color-contrast']?.score < 0.5) {
      critical.push('Severe accessibility issues - Content unreadable for many users');
    }
    
    return critical;
  };

  const findQuickWins = (audits) => {
    const quickWins = [];
    
    if (audits['meta-description']?.score < 1) {
      quickWins.push('Add meta descriptions - 5 minutes per page');
    }
    if (audits['image-alt']?.score < 1) {
      quickWins.push('Add alt text to images - 2 minutes per image');
    }
    if (audits['document-title']?.score < 1) {
      quickWins.push('Optimize title tags - 3 minutes per page');
    }
    
    return quickWins;
  };

  const getScoreStyle = (score) => {
    if (score >= 90) return { color: '#059669', backgroundColor: '#ecfdf5' };
    if (score >= 50) return { color: '#d97706', backgroundColor: '#fef3c7' };
    return { color: '#dc2626', backgroundColor: '#fee2e2' };
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      Critical: { color: '#991b1b', backgroundColor: '#fef2f2', borderColor: '#fecaca' },
      High: { color: '#ea580c', backgroundColor: '#fff7ed', borderColor: '#fed7aa' },
      Medium: { color: '#ca8a04', backgroundColor: '#fefce8', borderColor: '#fde047' },
      Low: { color: '#1e40af', backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }
    };
    return styles[priority] || styles.Low;
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '1.5rem'
    },
    maxWidth: {
      maxWidth: '72rem',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '2rem'
    },
    uploadCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      textAlign: 'center'
    },
    uploadTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    uploadDesc: {
      color: '#6b7280',
      marginBottom: '1.5rem'
    },
    inputSection: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    fileInput: {
      display: 'block',
      width: '100%',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    textarea: {
      width: '100%',
      height: '8rem',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontFamily: 'inherit'
    },
    orText: {
      color: '#6b7280',
      margin: '1rem 0'
    },
    spinner: {
      width: '2rem',
      height: '2rem',
      border: '4px solid #3b82f6',
      borderTop: '4px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 1rem'
    },
    analysisContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      margin: '0 0 1rem 0'
    },
    scoresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    },
    scoreItem: {
      textAlign: 'center'
    },
    scoreValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      padding: '0.75rem',
      borderRadius: '0.5rem'
    },
    scoreLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0.5rem 0 0 0'
    },
    criticalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      color: '#dc2626',
      margin: '0 0 1rem 0'
    },
    criticalIssue: {
      padding: '0.75rem',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    },
    criticalText: {
      color: '#991b1b',
      fontWeight: '500',
      margin: 0
    },
    quickWinsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      color: '#059669',
      margin: '0 0 1rem 0'
    },
    quickWin: {
      padding: '0.75rem',
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    },
    quickWinText: {
      color: '#166534',
      margin: 0
    },
    suggestionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    suggestionCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1rem'
    },
    suggestionHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    suggestionTitle: {
      fontWeight: '600',
      fontSize: '1.125rem',
      margin: 0
    },
    priorityBadge: {
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      borderRadius: '9999px',
      border: '1px solid'
    },
    categoryText: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0 0 0.5rem 0'
    },
    suggestionText: {
      color: '#374151',
      marginBottom: '0.75rem'
    },
    impactBox: {
      backgroundColor: '#eff6ff',
      border: '1px solid #bfdbfe',
      borderRadius: '0.375rem',
      padding: '0.75rem'
    },
    impactText: {
      fontSize: '0.875rem',
      color: '#1e40af',
      margin: 0
    },
    resetButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4b5563',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonContainer: {
      textAlign: 'center'
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .file-input::file-selector-button {
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: none;
          font-size: 0.875rem;
          font-weight: 600;
          background-color: #eff6ff;
          color: #1d4ed8;
          cursor: pointer;
        }
        .file-input::file-selector-button:hover {
          background-color: #dbeafe;
        }
        .reset-button:hover {
          background-color: #374151;
        }
        .textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        @media (min-width: 768px) {
          .scores-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.header}>
            <h1 style={styles.title}>Lighthouse Report AI Analyzer</h1>
            <p style={styles.subtitle}>
              Upload your Lighthouse report and get AI-powered suggestions for improvement
            </p>
          </div>

          {!report && (
            <div style={styles.uploadCard}>
              <Upload style={{ width: '4rem', height: '4rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
              <h2 style={styles.uploadTitle}>Upload Lighthouse Report</h2>
              <p style={styles.uploadDesc}>
                Upload your JSON report file or paste the JSON data directly
              </p>
              
              <div style={styles.inputSection}>
                <label style={styles.label}>Upload JSON File</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  style={styles.fileInput}
                  className="file-input"
                />
              </div>
              
              <div style={styles.orText}>or</div>
              
              <div style={styles.inputSection}>
                <label style={styles.label}>Paste JSON Data</label>
                <textarea
                  placeholder="Paste your Lighthouse JSON report here..."
                  style={styles.textarea}
                  className="textarea"
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      handleJSONInput(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {loading && (
            <div style={styles.card}>
              <div style={{ textAlign: 'center' }}>
                <div style={styles.spinner}></div>
                <p>Analyzing your Lighthouse report...</p>
              </div>
            </div>
          )}

          {analysis && (
            <div style={styles.analysisContainer}>
              {/* Scores Overview */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  <TrendingUp style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                  Performance Scores
                </h2>
                <div style={styles.scoresGrid} className="scores-grid">
                  <div style={styles.scoreItem}>
                    <div style={{...styles.scoreValue, ...getScoreStyle(analysis.scores.performance)}}>
                      {analysis.scores.performance}
                    </div>
                    <p style={styles.scoreLabel}>
                      <Zap style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                      Performance
                    </p>
                  </div>
                  <div style={styles.scoreItem}>
                    <div style={{...styles.scoreValue, ...getScoreStyle(analysis.scores.accessibility)}}>
                      {analysis.scores.accessibility}
                    </div>
                    <p style={styles.scoreLabel}>
                      <Eye style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                      Accessibility
                    </p>
                  </div>
                  <div style={styles.scoreItem}>
                    <div style={{...styles.scoreValue, ...getScoreStyle(analysis.scores.bestPractices)}}>
                      {analysis.scores.bestPractices}
                    </div>
                    <p style={styles.scoreLabel}>
                      <Shield style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                      Best Practices
                    </p>
                  </div>
                  <div style={styles.scoreItem}>
                    <div style={{...styles.scoreValue, ...getScoreStyle(analysis.scores.seo)}}>
                      {analysis.scores.seo}
                    </div>
                    <p style={styles.scoreLabel}>
                      <Smartphone style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                      SEO
                    </p>
                  </div>
                </div>
              </div>

              {/* Critical Issues */}
              {analysis.criticalIssues.length > 0 && (
                <div style={styles.card}>
                  <h2 style={styles.criticalTitle}>
                    <AlertCircle style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                    Critical Issues
                  </h2>
                  {analysis.criticalIssues.map((issue, index) => (
                    <div key={index} style={styles.criticalIssue}>
                      <p style={styles.criticalText}>{issue}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Wins */}
              {analysis.quickWins.length > 0 && (
                <div style={styles.card}>
                  <h2 style={styles.quickWinsTitle}>
                    <CheckCircle style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                    Quick Wins
                  </h2>
                  {analysis.quickWins.map((win, index) => (
                    <div key={index} style={styles.quickWin}>
                      <p style={styles.quickWinText}>{win}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Detailed Suggestions */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  <FileText style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                  AI-Generated Suggestions
                </h2>
                <div style={styles.suggestionsContainer}>
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} style={styles.suggestionCard}>
                      <div style={styles.suggestionHeader}>
                        <h3 style={styles.suggestionTitle}>{suggestion.issue}</h3>
                        <span style={{...styles.priorityBadge, ...getPriorityStyle(suggestion.priority)}}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p style={styles.categoryText}>Category: {suggestion.category}</p>
                      <p style={styles.suggestionText}>{suggestion.suggestion}</p>
                      <div style={styles.impactBox}>
                        <p style={styles.impactText}>
                          <strong>Expected Impact:</strong> {suggestion.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <div style={styles.buttonContainer}>
                <button
                  style={styles.resetButton}
                  className="reset-button"
                  onClick={() => {
                    setReport(null);
                    setAnalysis(null);
                  }}
                >
                  Analyze Another Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LighthouseAnalyzer;