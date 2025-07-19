import React, { useRef, useState } from 'react';
import { Search, Plus, Loader } from 'lucide-react';
import styled from '@emotion/styled';


const SelectWrapper = styled.div`
  /* margin: 1rem; */
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 2px solid #797979;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;

const StyledLabel = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const SearchBarComponent = ({
  url,
  isLoading,
  handleAnalyse
}) => {
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
      padding: '10px 16px',
      
      paddingLeft: '40px',
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
      padding: '14px 24px',
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


  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const handleSubmit = () => {
    const url = inputRef.current.value;
    const strategy = selectRef.current.value;

    if (url.trim()) {
      handleAnalyse(url,strategy );
    }
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
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="https://example.com"
                style={inputStyle}
                 ref={inputRef}
                required
              />
            </div>
          </div>

           <SelectWrapper>
          <StyledLabel htmlFor="my-select">Strategy</StyledLabel>
          <StyledSelect id="my-select" ref={selectRef}>
            <option value="" disabled>Select an option</option>
            <option value="mobile"> 📱 Mobile</option>
            <option value="desktop">💻 Desktop</option>
          </StyledSelect>
        </SelectWrapper>
          
          <button
            type="button"
            disabled={isLoading}
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleSubmit}
          >
           
           
              {isLoading ?  <Loader size={16}  /> : <Plus size={16} />}

              {isLoading ? 'Analysing...' :'Analyse'}
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