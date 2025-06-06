import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
      console.log("Registration Response:", response.data);
      navigate("/signin");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const pixelStyles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      
      .pixel-container {
        font-family: 'Press Start 2P', monospace;
        background: 
          linear-gradient(45deg, 
            #0f0f23 25%, transparent 25%),
          linear-gradient(-45deg, 
            #0f0f23 25%, transparent 25%),
          linear-gradient(45deg, 
            transparent 75%, #0f0f23 75%),
          linear-gradient(-45deg, 
            transparent 75%, #0f0f23 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        background-color: #1a1a2e;
        animation: pixelFloat 4s ease-in-out infinite;
      }
      
      @keyframes pixelFloat {
        0%, 100% { background-position: 0 0, 0 10px, 10px -10px, -10px 0px; }
        50% { background-position: 5px 5px, 5px 15px, 15px -5px, -5px 5px; }
      }
      
      .pixel-box {
        background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
        border: 4px solid #00ff41;
        border-radius: 0;
        box-shadow: 
          0 0 0 2px #00cc33,
          0 0 20px rgba(0, 255, 65, 0.3),
          inset 0 0 20px rgba(0, 255, 65, 0.1);
        position: relative;
        overflow: hidden;
      }
      
      .pixel-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          #00ff41 50%, 
          transparent 100%);
        animation: scanline 2s linear infinite;
      }
      
      @keyframes scanline {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .pixel-title {
        color: #00ff41;
        text-shadow: 
          0 0 5px #00ff41,
          2px 2px 0px #00cc33,
          1px 1px 0px #009922;
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        text-align: center;
        animation: glow 2s ease-in-out infinite alternate;
      }
      
      @keyframes glow {
        from { text-shadow: 0 0 5px #00ff41, 2px 2px 0px #00cc33, 1px 1px 0px #009922; }
        to { text-shadow: 0 0 20px #00ff41, 2px 2px 0px #00cc33, 1px 1px 0px #009922; }
      }
      
      .pixel-input {
        background: #0a0a0a;
        border: 3px solid #333;
        border-radius: 0;
        color: #00d4ff;
        font-family: 'Press Start 2P', monospace;
        font-size: 0.7rem;
        padding: 12px;
        transition: all 0.3s ease;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
      }
      
      .pixel-input:focus {
        border-color: #00ff41;
        box-shadow: 
          inset 0 0 10px rgba(0, 0, 0, 0.8),
          0 0 15px rgba(0, 255, 65, 0.5);
        background: #111;
      }
      
      .pixel-input::placeholder {
        color: #666;
        font-family: 'Press Start 2P', monospace;
        font-size: 0.6rem;
      }
      
      .pixel-button {
        background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);
        border: 3px solid #00ff41;
        border-radius: 0;
        color: #000;
        font-family: 'Press Start 2P', monospace;
        font-size: 0.8rem;
        font-weight: bold;
        padding: 15px;
        transition: all 0.2s ease;
        text-shadow: 1px 1px 0px #00cc33;
        box-shadow: 
          0 4px 0 #00cc33,
          0 8px 15px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .pixel-button:hover {
        background: linear-gradient(135deg, #33ff66 0%, #00ff41 100%);
        transform: translateY(2px);
        box-shadow: 
          0 2px 0 #00cc33,
          0 4px 10px rgba(0, 0, 0, 0.3);
      }
      
      .pixel-button:active {
        transform: translateY(4px);
        box-shadow: 
          0 0 0 #00cc33,
          0 2px 5px rgba(0, 0, 0, 0.3);
      }
      
      .pixel-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.4) 50%, 
          transparent 100%);
        transition: left 0.5s ease;
      }
      
      .pixel-button:hover::before {
        left: 100%;
      }
      
      .pixel-text {
        color: #cccccc;
        font-family: 'Press Start 2P', monospace;
        font-size: 0.6rem;
        text-align: center;
        line-height: 1.5;
      }
      
      .pixel-link {
        color: #00d4ff;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .pixel-link:hover {
        color: #ff6b35;
        text-shadow: 0 0 5px #ff6b35;
      }
      
      .mb-3 { margin-bottom: 1rem; }
      .mb-4 { margin-bottom: 1.5rem; }
      .is-fullwidth { width: 100%; }
      .is-flex { display: flex; }
      .is-justify-content-center { justify-content: center; }
      .is-align-items-center { align-items: center; }
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pixelStyles }} />
      <div
        className="pixel-container is-flex is-justify-content-center is-align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="pixel-box" style={{ width: "384px", padding: "2rem" }}>
          <h2 className="pixel-title">SIGN UP</h2>
          <input
            className="pixel-input mb-3 is-fullwidth"
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="pixel-input mb-3 is-fullwidth"
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pixel-input mb-4 is-fullwidth"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="pixel-button is-fullwidth mb-3" onClick={handleSignUp}>
            REGISTER
          </button>
          <p className="pixel-text">
            SUDAH PUNYA AKUN?{" "}
            <Link to="/signin" className="pixel-link">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;