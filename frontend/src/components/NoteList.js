import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "";
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userEmail}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }}); 
      setUserName(res.data.data.name);
      localStorage.setItem("userName", res.data.data.name);
    } catch (error) {
      setUserName("");
    }
  }

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setNotes(res.data.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);

      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken !== "kosong") {
          const res = await axios.get(`${BASE_URL}/notes`, {
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

  const handleLogout = async () => {
    const confirmLogout = window.confirm(`
╔════════════════════════════════════════╗
║           🚪 LOGOUT CONFIRM 🚪         ║
║                                        ║
║    ARE YOU SURE YOU WANT TO LOGOUT?    ║
║                                        ║
║      YOU WILL RETURN TO LOGIN SCREEN   ║
╚════════════════════════════════════════╝
    `);
    
    if (confirmLogout) {
      await logout();
      localStorage.removeItem("userName");
      navigate("/signin");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter(note =>  
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
    if (userEmail && !userName) fetchUser();
  }, [userEmail]);

  // Add blinking animation for loading state
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.3; }
      }
      @keyframes glow {
        0%, 100% { text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 0 10px #00ff00; }
        50% { text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 0 20px #00ff00, 0 0 30px #00ff00; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Pixel Art Styles
  const pixelStyles = {
    container: {
      fontFamily: '"Courier New", "Monaco", "Lucida Console", monospace',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh'
    },
    navbar: {
      backgroundColor: '#000',
      border: '0',
      borderBottom: '4px solid #00ff00',
      padding: '16px 24px',
      boxShadow: '0 4px 0 #009900',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navbarBrand: {
      color: '#00ff00',
      fontSize: '20px',
      fontWeight: 'bold',
      textShadow: '2px 2px 0 #000',
      animation: 'glow 2s infinite'
    },
    logoutButton: {
      backgroundColor: '#ff0033',
      color: '#fff',
      border: '2px solid #cc0022',
      borderRadius: '0',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #990011',
      transition: 'all 0.1s ease'
    },
    mainContent: {
      backgroundColor: '#2a2a2a',
      backgroundImage: `
        radial-gradient(circle at 25px 25px, #444 2px, transparent 2px),
        radial-gradient(circle at 75px 75px, #444 2px, transparent 2px)
      `,
      backgroundSize: '100px 100px',
      backgroundPosition: '0 0, 50px 50px',
      padding: '32px',
      minHeight: 'calc(100vh - 80px)'
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
      padding: '32px'
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative',
      minWidth: '300px'
    },
    searchInput: {
      backgroundColor: '#000',
      color: '#00ff00',
      border: '2px solid #00ff00',
      borderRadius: '0',
      padding: '12px 12px 12px 40px',
      fontSize: '14px',
      fontFamily: 'inherit',
      width: '100%',
      boxShadow: 'inset 2px 2px 0 #003300',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#00ff00',
      fontSize: '16px'
    },
    addButton: {
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
    table: {
      width: '100%',
      backgroundColor: '#000',
      border: '2px solid #00ff00',
      borderCollapse: 'separate',
      borderSpacing: '0'
    },
    tableHeader: {
      backgroundColor: '#003300',
      color: '#00ff00',
      padding: '16px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: '1px solid #00ff00',
      textAlign: 'left'
    },
    tableCell: {
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '12px 16px',
      border: '1px solid #333',
      fontSize: '14px'
    },
    tableCellHover: {
      backgroundColor: '#2a2a2a'
    },
    seeButton: {
      backgroundColor: '#00ff00',
      color: '#000',
      border: '2px solid #00cc00',
      borderRadius: '0',
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      boxShadow: '1px 1px 0 #009900',
      transition: 'all 0.1s ease'
    },
    noDataText: {
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
      fontSize: '16px'
    },
    loadingText: {
      color: '#00ff00',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      animation: 'blink 1s infinite'
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
      <nav style={pixelStyles.navbar}>
        <span style={pixelStyles.navbarBrand}>
          👋 HELLO, {userName.toUpperCase() || "USER"} !
        </span>
        <button 
          onClick={handleLogout} 
          style={pixelStyles.logoutButton}
          onMouseEnter={(e) => handleButtonHover(e, '#cc0022', '#990011')}
          onMouseLeave={(e) => handleButtonLeave(e, '#ff0033', '#990011')}
        >
          🚪 LOGOUT
        </button>
      </nav>

      <div style={pixelStyles.mainContent}>
        <div className="container">
          <div style={pixelStyles.box}>
            <div style={pixelStyles.controlsContainer}>
              <div style={pixelStyles.searchContainer}>
                <span style={pixelStyles.searchIcon}>🔍</span>
                <input
                  style={pixelStyles.searchInput}
                  type="text"
                  placeholder="[ SEARCH NOTES... ]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ffff';
                    e.target.style.boxShadow = 'inset 2px 2px 0 #003333, 0 0 10px #00ffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#00ff00';
                    e.target.style.boxShadow = 'inset 2px 2px 0 #003300';
                  }}
                />
              </div>
              <Link 
                to={'add'} 
                style={pixelStyles.addButton}
                onMouseEnter={(e) => handleButtonHover(e, '#0077cc', '#005599')}
                onMouseLeave={(e) => handleButtonLeave(e, '#0099ff', '#005599')}
              >
                ➕ ADD NOTE
              </Link>
            </div>

            <table style={pixelStyles.table}>
              <thead>
                <tr>
                  <th style={pixelStyles.tableHeader}>📋 TITLE</th>
                  <th style={{...pixelStyles.tableHeader, width: "150px"}}>⚡ ACTION</th>
                </tr>
              </thead>
              <tbody>
                {notes.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{...pixelStyles.tableCell, ...pixelStyles.loadingText}}>
                      LOADING NOTES...
                    </td>
                  </tr>
                ) : filteredNotes.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{...pixelStyles.tableCell, ...pixelStyles.noDataText}}>
                      ❌ NO NOTES FOUND
                    </td>
                  </tr>
                ) : (
                  filteredNotes.map((note) => (
                    <tr 
                      key={note.id}
                      onMouseEnter={(e) => {
                        const cells = e.currentTarget.querySelectorAll('td');
                        cells.forEach(cell => {
                          cell.style.backgroundColor = '#2a2a2a';
                        });
                      }}
                      onMouseLeave={(e) => {
                        const cells = e.currentTarget.querySelectorAll('td');
                        cells.forEach(cell => {
                          cell.style.backgroundColor = '#1a1a1a';
                        });
                      }}
                    >
                      <td style={pixelStyles.tableCell}>{note.title}</td>
                      <td style={pixelStyles.tableCell}>
                        <Link 
                          to={`detail/${note.id}`} 
                          style={pixelStyles.seeButton}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#00cc00';
                            e.target.style.transform = 'translate(1px, 1px)';
                            e.target.style.boxShadow = '0px 0px 0 #009900';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#00ff00';
                            e.target.style.transform = 'translate(0, 0)';
                            e.target.style.boxShadow = '1px 1px 0 #009900';
                          }}
                        >
                          👁️ SEE
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteList;