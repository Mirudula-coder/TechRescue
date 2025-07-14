import React from 'react';

const Submit = () => {
    const matchedSchemes = JSON.parse(localStorage.getItem('matchedSchemes')) || [];

    const handleApply = (schemeLink) => {
        if (schemeLink) {
            window.open(schemeLink, '_blank');  // Open the scheme link in a new tab
        } else {
            alert("No link available for this scheme.");
        }
    };

    const containerStyle = {
        width: '90%',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center'
    };

    const headingStyle = {
        fontSize: '28px',
        marginBottom: '20px'
    };

    const listStyle = {
        listStyle: 'none',
        padding: '0'
    };

    const itemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
    };

    const buttonContainer = {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '-55px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: '0.3s',
        borderRadius: '5px'
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049'
    };

    const modelStyle = {
        fontWeight: 'bold',
        fontSize: '20px',
        marginBottom: '5px'
    };

    const descriptionStyle = {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Matching Schemes</h1>
            {matchedSchemes.length > 0 ? (
                <ul style={listStyle}>
                    {matchedSchemes.map((scheme, index) => (
                        <li key={index} style={itemStyle}>
                            <span style={modelStyle}>{scheme.name}</span>
                            <p style={descriptionStyle}>{scheme.description}</p>
                            <div style={buttonContainer}>
                                <button
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                                    onClick={() => handleApply(scheme.link)}
                                >
                                    Apply
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No matching schemes found.</p>
            )}
        </div>
    );
};

export default Submit;
