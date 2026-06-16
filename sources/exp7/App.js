import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User Profile</h1>

      <ProfileCard
        name="John Doe"
        bio="A passionate developer with a love for learning and coding."
        profilePicture="https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_hybrid&w=740&q=80"
        backgroundColor="pink"
      />
    </div>
  );
}

export default App;