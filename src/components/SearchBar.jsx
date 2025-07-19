import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const SearchBarComponent = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) {
      console.log('Adding URL:', url);
      // Add your URL handling logic here
      alert(`URL added: ${url}`);
      setUrl(''); // Clear input after submission
    }
  };

  const styles = {
    container: {
    backgroundColor: '#f9fafb',
    marginBottom: '2.5rem'
    },
    wrapper: {
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-end',
      flexWrap: 'wrap'
    },
    inputContainer: {
      flex: '1',
      minWidth: '280px'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '44px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#111827',
      backgroundColor: '#fff',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease-in-out',
      boxSizing: 'border-box'
    },
    inputFocused: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      zIndex: 1,
      color: '#6b7280'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: '#3b82f6',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      whiteSpace: 'nowrap'
    },
    buttonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  };

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const inputStyle = {
    ...styles.input,
    ...(isInputFocused ? styles.inputFocused : {})
  };

  const buttonStyle = {
    ...styles.button,
    ...(isButtonHovered && url.trim() ? styles.buttonHover : {}),
    ...(!url.trim() ? styles.buttonDisabled : {})
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>Add URL</h1>
        
        <div style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="url-input" style={styles.label}>
              Website URL
            </label>
            <div style={styles.inputWrapper}>
              <Search size={18} style={styles.searchIcon} />
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="https://example.com"
                style={inputStyle}
                required
              />
            </div>
          </div>
          
          <button
            type="button"
            disabled={!url.trim()}
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleSubmit}
          >
            <Plus size={16} />
            Add URL
          </button>
        </div>
        
        {/* Example URLs for demonstration */}
        {/* <div style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Recent URLs:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['https://github.com', 'https://stackoverflow.com', 'https://developer.mozilla.org'].map((exampleUrl, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#374151',
                fontFamily: 'monospace'
              }}>
                {exampleUrl}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBarComponent;