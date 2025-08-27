import React from 'react';


const styles = `
.spinner-container {
    text-align: center;
    width: 200px;
    font-family: sans-serif;
    /* Added to center the component on the page */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
}

.ekg-line {
    width: 100%;
    height: auto;
    stroke: #142C2E; 
    stroke-width: 4;
    fill: none;
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: drawLine 2s ease-in-out infinite;
}

.heart-icon {
    font-size: 40px;
    color: #007682;
    animation: beat 1s ease-in-out infinite;
    margin-bottom: 10px;
}

.loading-text {
    margin-top: 10px;
    font-size: 1.2em;
    color: #1d3557;
    font-weight: bold;
    letter-spacing: 2px;
}


@keyframes drawLine {
    0% {
        stroke-dashoffset: 500;
    }
    50% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: -500;
    }
}


@keyframes beat {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}
`;

const EKGSpinner = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="spinner-container">
        <div className="heart-icon">♥</div>
        <svg className="ekg-line" viewBox="0 0 100 20">
          <path d="M 0 10 L 20 10 L 25 5 L 35 15 L 40 10 L 50 10 L 55 5 L 65 15 L 70 10 L 100 10" />
        </svg>
        <div className="loading-text">LOADING...</div>
      </div>
    </>
  );
};

export default EKGSpinner;