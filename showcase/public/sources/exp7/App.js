import React from 'react';
import ProfileCard from './ProfileCard';
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>User Profile</h1>
      <ProfileCard
        name="John Doe"
        bio="A passionate developer with a love for learning and coding."
        profilePicture="https://upload.wikimedia.org/wikipedia/commons/4/45/John_Healey_Official_Cabinet_Portrait%2C_July_2024_%28cropped%29_2.jpg"
        backgroundColor="pink"
      />
    </div>
  );
}
export default App;