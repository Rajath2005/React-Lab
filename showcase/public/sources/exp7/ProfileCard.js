import React, { useState } from "react";

const ProfileCard = ({ name, bio, profilePicture, backgroundColor }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                backgroundColor: isHovered ? "#e0e0e0" : backgroundColor,
                textAlign: "center",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
                margin: "auto",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <img
                src={profilePicture}
                alt="Profile"
                style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%"
                }}
            />

            <h2>{name}</h2>
            <p>{bio}</p>

        </div>
    );
};

export default ProfileCard;