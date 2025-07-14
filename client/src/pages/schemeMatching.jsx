import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchemeMatching = () => {
    const navigate = useNavigate();

    const schemes = [
        {
            name: "MBC Community Scholarship",
            age: { min: 18, max: 40 },
            community: "MBC",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 50000 },
            isGovEmployee: false,
            description: "Scholarship for individuals belonging to the MBC community with limited income.",
            link:"https://bcmbcmw.tn.gov.in/welfschemes.htm"
        },
        {
            name: "Youth Empowerment Scheme",
            age: { min: 18, max: 30 },
            community: "MBC",
            employmentStatus: "unemployed",
            gender: "Any",
            income: { min: 0, max: 100000 },
            isGovEmployee: false,
            description: "A scheme to provide job opportunities for youth in the MBC community.",
            link:"https://careersngr.com/p-yes-application-form/"
        },
        {
            name: "Government Employee Welfare Scheme",
            age: { min: 22, max: 60 },
            community: "Any",
            employmentStatus: "government",
            gender: "Any",
            income: { min: 0, max: 100000 },
            isGovEmployee: true,
            description: "A welfare scheme for government employees providing extra benefits.",
            link:"https://cgewho.in/"
        },
        {
            name: "Women Empowerment Scheme",
            age: { min: 18, max: 50 },
            community: "Any",
            employmentStatus: "Any",
            gender: "female",
            income: { min: 0, max: 80000 },
            isGovEmployee: false,
            description: "A scheme to empower women in need.",
            link:"https://www.femalestrong.org/sponsor-donate?msclkid=7bb2c80741c61255eb95afe30d1df828&utm_source=bing&utm_medium=cpc&utm_campaign=FS%20-%20Get%20Involved&utm_term=women%20empowerment&utm_content=Women%20Empowerment"
        },
        {
            name: "Lower-Income Housing Scheme",
            age: { min: 18, max: 65 },
            community: "Any",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 30000 },
            isGovEmployee: false,
            description: "Housing scheme for individuals with lower income.",
            link:"https://governmentassistanceonline.com/section-8-housing/?utm_source=Bing_Search&utm_medium=VECTOR_Search&utm_campaign=Search_Gov_Keywords-New_US&utm_content=Section8&utm_term=apply%20for%20low%20income%20housing%20in&msclkid=1cc553206ecc10e7aec134c42230b891"
        },
        {
            name: "Startup India Initiative",
            age: { min: 18, max: 45 },
            community: "Any",
            employmentStatus: "self-employed",
            gender: "Any",
            income: { min: 0, max: 200000 },
            isGovEmployee: false,
            description: "Support and funding for entrepreneurs starting new businesses.",
            link:"https://www.startupindia.gov.in/"
        },
        {
            name: "Pradhan Mantri Awas Yojana",
            age: { min: 21, max: 60 },
            community: "Any",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 180000 },
            isGovEmployee: false,
            description: "Affordable housing scheme for economically weaker sections.",
            link:"https://pmaymis.gov.in/PMAYMIS2_2024/PmayDefault.aspx"
        },
        {
            name: "Kisan Credit Card (KCC) Scheme",
            age: { min: 18, max: 65 },
            community: "Any",
            employmentStatus: "farmer",
            gender: "Any",
            income: { min: 0, max: 100000 },
            isGovEmployee: false,
            description: "Credit facility for farmers to meet their agricultural needs.",
            link:"https://www.myscheme.gov.in/schemes/kcc"
        },
        {
            name: "Janani Suraksha Yojana",
            age: { min: 18, max: 45 },
            community: "Any",
            employmentStatus: "Any",
            gender: "female",
            income: { min: 0, max: 100000 },
            isGovEmployee: false,
            description: "Scheme promoting institutional delivery among pregnant women.",
            link:"https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309"
        },
        {
            name: "Atal Pension Yojana",
            age: { min: 18, max: 40 },
            community: "Any",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 150000 },
            isGovEmployee: false,
            description: "Pension scheme providing financial security after retirement.",
            link:"https://www.npscra.nsdl.co.in/scheme-details.php"
        },
        {
            name: "PM Mudra Yojana",
            age: { min: 18, max: 65 },
            community: "Any",
            employmentStatus: "self-employed",
            gender: "Any",
            income: { min: 0, max: 300000 },
            isGovEmployee: false,
            description: "Loan scheme for small and medium-sized businesses.",
            link: "https://www.myscheme.gov.in/schemes/pmmy"
        },
        {
            name: "Tamil Nadu Marriage Assistance Scheme",
            age: { min: 18, max: 40 },
            community: "Any",
            employmentStatus: "Any",
            gender: "female",
            income: { min: 0, max: 72000 },
            isGovEmployee: false,
            description: "Financial assistance for marriage expenses of women.",
            link: "https://tnsocialwelfare.tn.gov.in/en/specilisationswoman-welfare/marriage-assistance-schemes"
        },
        {
            name: "PM Garib Kalyan Yojana",
            age: { min: 18, max: 65 },
            community: "Any",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 50000 },
            isGovEmployee: false,
            description: "Welfare scheme for providing food and financial assistance to poor households.",
            link: "https://www.india.gov.in/spotlight/pradhan-mantri-garib-kalyan-package-pmgkp"
        },
        {
            name: "https://landreforms.tn.gov.in/UPT.html",
            age: { min: 18, max: 65 },
            community: "Any",
            employmentStatus: "farmer",
            gender: "Any",
            income: { min: 0, max: 200000 },
            isGovEmployee: false,
            description: "Insurance and pension scheme for farmers in Tamil Nadu.",
            link: "https://www.tn.gov.in/scheme/farmer-security"
        },
        {
            name: "PM Jeevan Jyoti Bima Yojana",
            age: { min: 18, max: 50 },
            community: "Any",
            employmentStatus: "Any",
            gender: "Any",
            income: { min: 0, max: 200000 },
            isGovEmployee: false,
            description: "Life insurance scheme for individuals with low annual premiums.",
            link: "https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx"
        }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            income: parseInt(e.target.annual_income.value),
            age: parseInt(e.target.age.value),
            community: e.target.community.value,
            gender: e.target.gender.value.toLowerCase(),
            isGovEmployee: e.target.govt_job.value === "Yes",
            occupation: e.target.employment.value.toLowerCase()
        };

        const matchedSchemes = schemes.filter(scheme => {
            return (
                formData.age >= scheme.age.min &&
                formData.age <= scheme.age.max &&
                (scheme.community === "Any" || scheme.community === formData.community) &&
                (scheme.gender === "Any" || scheme.gender.toLowerCase() === formData.gender) &&
                formData.income >= scheme.income.min &&
                formData.income <= scheme.income.max &&
                scheme.isGovEmployee === formData.isGovEmployee &&
                (scheme.employmentStatus === "Any" || scheme.employmentStatus === formData.occupation)
            );
        });

        localStorage.setItem('matchedSchemes', JSON.stringify(matchedSchemes));
        navigate('/submit');
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url('img/ecg5.gif')`,
    };

    const formContainerStyle = {
        background: 'rgba(255, 255, 255, 0.2)',  // Transparent white with 20% opacity
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '30px',
        width: '100%',
        maxWidth: '600px',
        boxSizing: 'border-box',
        backdropFilter: 'blur(10px)',  // Adds a blur effect for a frosted glass look
        border: '1px solid rgba(255, 255, 255, 0.3)'  // Subtle border for contrast
    };
    

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#ffff',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        background: '#28a745',
        color: 'white',
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    };

    const buttonHoverStyle = {
        background: '#218838',
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <label htmlFor="annual_income" style={labelStyle}>What is your annual income?</label>
                    <input type="number" id="annual_income" name="annual_income" required style={inputStyle} />

                    <label htmlFor="age" style={labelStyle}>What is your age?</label>
                    <input type="number" id="age" name="age" required style={inputStyle} />

                    <label htmlFor="community" style={labelStyle}>Community</label>
                    <select id="community" name="community" required style={inputStyle}>
                        <option value="OC">OC</option>
                        <option value="BC">BC</option>
                        <option value="MBC">MBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="Any">Any</option>
                    </select>

                    <label htmlFor="gender" style={labelStyle}>Gender</label>
                    <select id="gender" name="gender" required style={inputStyle}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="any">Any</option>
                    </select>

                    <label htmlFor="employment" style={labelStyle}>Employment Status</label>
                    <select id="employment" name="employment" required style={inputStyle}>
                        <option value="unemployed">Unemployed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="government">Government</option>
                        <option value="farmer">Farmer</option>
                        <option value="any">Any</option>
                    </select>

                    <label htmlFor="govt_job" style={labelStyle}>Are you a government employee?</label>
                    <select id="govt_job" name="govt_job" required style={inputStyle}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <button 
                        type="submit" 
                        style={buttonStyle} 
                        onMouseOver={e => e.target.style.background = buttonHoverStyle.background}
                        onMouseOut={e => e.target.style.background = buttonStyle.background}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SchemeMatching;
