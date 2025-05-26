import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function AddNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { accessToken, refreshAccessToken } = useAuth();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/notes`, {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            navigate("/notes");
        } catch (error) {
            console.error("Failed to add note:", error);

            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    await axios.post(`${BASE_URL}/notes`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    navigate("/notes");
                } else {
                    console.error("Failed to refresh token. Redirecting to login.");
                    navigate("/signin");
                }
            }
        }
    }

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
            backgroundPosition: '0 0, 50px 50px'
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
        title: {
            color: '#00ff00',
            textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '32px',
            letterSpacing: '2px'
        },
        label: {
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'block',
            textShadow: '1px 1px 0 #000'
        },
        input: {
            backgroundColor: '#000',
            color: '#00ff00',
            border: '2px solid #00ff00',
            borderRadius: '0',
            padding: '12px',
            fontSize: '14px',
            fontFamily: 'inherit',
            width: '100%',
            boxShadow: 'inset 2px 2px 0 #003300',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#00ffff',
            boxShadow: 'inset 2px 2px 0 #003333, 0 0 10px #00ffff'
        },
        textarea: {
            backgroundColor: '#000',
            color: '#00ff00',
            border: '2px solid #00ff00',
            borderRadius: '0',
            padding: '12px',
            fontSize: '14px',
            fontFamily: 'inherit',
            width: '100%',
            minHeight: '150px',
            resize: 'vertical',
            boxShadow: 'inset 2px 2px 0 #003300',
            outline: 'none'
        },
        buttonSuccess: {
            backgroundColor: '#00ff00',
            color: '#000',
            border: '2px solid #00cc00',
            borderRadius: '0',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            cursor: 'pointer',
            marginRight: '16px',
            boxShadow: '2px 2px 0 #009900',
            transition: 'all 0.1s ease'
        },
        buttonSuccessHover: {
            backgroundColor: '#00cc00',
            transform: 'translate(1px, 1px)',
            boxShadow: '1px 1px 0 #009900'
        },
        buttonLight: {
            backgroundColor: '#666',
            color: '#fff',
            border: '2px solid #999',
            borderRadius: '0',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            cursor: 'pointer',
            boxShadow: '2px 2px 0 #333',
            transition: 'all 0.1s ease'
        },
        buttonLightHover: {
            backgroundColor: '#777',
            transform: 'translate(1px, 1px)',
            boxShadow: '1px 1px 0 #333'
        },
        field: {
            marginBottom: '24px'
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '32px'
        }
    };

    return (
        <div style={pixelStyles.container}>
            <div className="columns mt-6 is-centered">
                <div className="column is-half">
                    <h1 style={pixelStyles.title}>⚡ ADD NEW NOTE ⚡</h1>
                    <form onSubmit={saveNote} style={pixelStyles.box}>
                        <div style={pixelStyles.field}>
                            <label style={pixelStyles.label}>▶ TITLE</label>
                            <div className="control">
                                <input
                                    type="text"
                                    style={pixelStyles.input}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="[ ENTER TITLE HERE ]"
                                    required
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
                        </div>
                        <div style={pixelStyles.field}>
                            <label style={pixelStyles.label}>▶ CONTENT</label>
                            <div className="control">
                                <textarea
                                    style={pixelStyles.textarea}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="[ WRITE YOUR NOTE CONTENT HERE... ]"
                                    rows="6"
                                    required
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
                        </div>
                        <div style={pixelStyles.buttonGroup}>
                            <button 
                                type="submit" 
                                style={pixelStyles.buttonSuccess}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#00cc00';
                                    e.target.style.transform = 'translate(1px, 1px)';
                                    e.target.style.boxShadow = '1px 1px 0 #009900';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#00ff00';
                                    e.target.style.transform = 'translate(0, 0)';
                                    e.target.style.boxShadow = '2px 2px 0 #009900';
                                }}
                            >
                                💾 SAVE NOTE
                            </button>
                            <button 
                                type="button" 
                                style={pixelStyles.buttonLight} 
                                onClick={() => navigate("/notes")}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#777';
                                    e.target.style.transform = 'translate(1px, 1px)';
                                    e.target.style.boxShadow = '1px 1px 0 #333';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#666';
                                    e.target.style.transform = 'translate(0, 0)';
                                    e.target.style.boxShadow = '2px 2px 0 #333';
                                }}
                            >
                                ❌ CANCEL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNote;