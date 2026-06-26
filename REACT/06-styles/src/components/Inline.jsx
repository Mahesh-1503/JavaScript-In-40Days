import React from "react";

const Inline = () => {
  const cardStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  };
  return (
    <>
      <div style={cardStyle}>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Quote of the Day</p>
        <p>The only way to do great work is to love what you do.</p>
        <p style={{ color: "#999" }}>- Steve Jobs</p>
      </div>
    </>
  );
};

export default Inline;
