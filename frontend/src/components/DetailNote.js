import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function DetailNote() {
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken, refreshAccessToken } = useAuth();

  useEffect(() => {
    getNoteById();
  }, []);

  const getNoteById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setNotes(response.data.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);

      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          const res = await axios.get(`${BASE_URL}/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          });
          setNotes(res.data.data);
        } else {
          console.error("Failed to refresh token. Redirect to login.");
        }
      }
    }
  };

  const deleteNote = async (id) => {
    // Pixel-style confirmation dialog
    const confirmDelete = window.confirm(`
╔════════════════════════════════════════╗
║           ⚠️  WARNING! ⚠️              ║
║                                        ║
║    ARE YOU SURE YOU WANT TO DELETE     ║
║           THIS NOTE?                   ║
║                                        ║
║    THIS ACTION CANNOT BE UNDONE!       ║
╚════════════════════════════════════════╝
    `);
    
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      navigate("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);

      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          await axios.delete(`${BASE_URL}/notes/${id}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          });
          navigate("/notes");
        } else {
          console.error("Failed to refresh token. Redirect to login.");
        }
      }
    }
  };

  // Pixel Art Styles
  const pixelStyles = {
    container: {
      fontFamily: '"Courier New", "Monaco", "Lucida Console", monospace',
      backgroundColor: '#2a2a2a',
      minHeight: '100vh',
      backgroundImage: `
        radial-gradient(circle at 25px 25px, #444 2px, transparent 2px),
        radial-gradient(circle at 75px 75px, #444 2px, transparent 2px)
      `,
      backgroundSize: '100px 100px',
      backgroundPosition: '0 0, 50px 50px',
      padding: '32px 16px'
    },
    box: {
      backgroundColor: '#1a1a1a',
      border: '4px solid #00ff00',
      borderRadius: '0',
      boxShadow: `
        0 0 0 2px #000,
        4px 4px 0 #00cc00,
        8px 8px 0 #009900
      `,
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      color: '#00ff00',
      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '32px',
      letterSpacing: '1px',
      border: '2px solid #00ff00',
      padding: '16px',
      backgroundColor: '#000'
    },
    contentBox: {
      backgroundColor: '#000',
      border: '2px solid #00ff00',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: 'inset 2px 2px 0 #003300',
      minHeight: '200px'
    },
    contentText: {
      color: '#fff',
      fontSize: '16px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    buttonEdit: {
      backgroundColor: '#0099ff',
      color: '#fff',
      border: '2px solid #0077cc',
      borderRadius: '0',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #005599',
      transition: 'all 0.1s ease'
    },
    buttonDelete: {
      backgroundColor: '#ff0033',
      color: '#fff',
      border: '2px solid #cc0022',
      borderRadius: '0',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #990011',
      transition: 'all 0.1s ease'
    },
    buttonBack: {
      backgroundColor: '#666',
      color: '#fff',
      border: '2px solid #999',
      borderRadius: '0',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #333',
      transition: 'all 0.1s ease'
    },
    infoLabel: {
      color: '#00ffff',
      fontSize: '12px',
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'block',
      textShadow: '1px 1px 0 #000'
    }
  };

  const handleButtonHover = (e, hoverColor, shadowColor) => {
    e.target.style.backgroundColor = hoverColor;
    e.target.style.transform = 'translate(1px, 1px)';
    e.target.style.boxShadow = `1px 1px 0 ${shadowColor}`;
  };

  const handleButtonLeave = (e, normalColor, shadowColor) => {
    e.target.style.backgroundColor = normalColor;
    e.target.style.transform = 'translate(0, 0)';
    e.target.style.boxShadow = `2px 2px 0 ${shadowColor}`;
  };

  return (
    <div style={pixelStyles.container}>
      <div className="container">
        <div style={pixelStyles.box}>
          <h1 style={pixelStyles.title}>
            📋 {notes.title || "LOADING..."}
          </h1>

          <div style={pixelStyles.contentBox}>
            <label style={pixelStyles.infoLabel}>▶ NOTE CONTENT:</label>
            <div style={pixelStyles.contentText}>
              {notes.content || "Loading content..."}
            </div>
          </div>

          <div style={pixelStyles.buttonContainer}>
            <Link 
              to={`../../edit/${notes.id}`} 
              style={pixelStyles.buttonEdit}
              onMouseEnter={(e) => handleButtonHover(e, '#0077cc', '#005599')}
              onMouseLeave={(e) => handleButtonLeave(e, '#0099ff', '#005599')}
            >
              ✏️ EDIT
            </Link>
            <button
              onClick={() => deleteNote(notes.id)}
              style={pixelStyles.buttonDelete}
              onMouseEnter={(e) => handleButtonHover(e, '#cc0022', '#990011')}
              onMouseLeave={(e) => handleButtonLeave(e, '#ff0033', '#990011')}
            >
              🗑️ DELETE
            </button>
            <Link 
              to="/notes" 
              style={pixelStyles.buttonBack}
              onMouseEnter={(e) => handleButtonHover(e, '#777', '#333')}
              onMouseLeave={(e) => handleButtonLeave(e, '#666', '#333')}
            >
              🔙 BACK TO NOTES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailNote;