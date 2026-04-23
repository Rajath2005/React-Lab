import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, bio, profilePicture, backgroundColor }) => {

    const inlineStyles = {
        backgroundColor: backgroundColor || '#f0f0f0',
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    };

    const [isHovered, setIsHovered] = useState(false);

    const hoverStyles = {
        backgroundColor: isHovered ? '#e0e0e0' : inlineStyles.backgroundColor,
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            className="profile-card"
            style={{ ...inlineStyles, ...hoverStyles }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={profilePicture} alt="Profile" className="profile-image" />
            <h2>{name}</h2>
            <p>{bio}</p>
        </div>
    );
};

export default ProfileCard;