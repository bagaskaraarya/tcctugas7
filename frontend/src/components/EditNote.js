import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";
import useAuth from '../auth/UseAuth';

function EditNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
        } catch (error) {
            console.error("Failed to fetch note:", error);
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    const response = await axios.get(`${BASE_URL}/notes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    setTitle(response.data.data.title);
                    setContent(response.data.data.content);
                } else {
                    navigate("/signin");
                }
            }
        }
    };

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/notes/${id}`, {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            navigate(`/notes/detail/${id}`);
        } catch (error) {
            console.error("Failed to update note:", error);
            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken !== "kosong") {
                    await axios.patch(`${BASE_URL}/notes/${id}`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    });
                    navigate(`/notes/detail/${id}`);
                } else {
                    navigate("/signin");
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
            backgroundPosition: '0 0, 50px 50px'
        },
        box: {
            backgroundColor: '#1a1a1a',
            border: '4px solid #ff8800',
            borderRadius: '0',
            boxShadow: `
                0 0 0 2px #000,
                4px 4px 0 #cc6600,
                8px 8px 0 #aa4400
            `,
            padding: '32px'
        },
        title: {
            color: '#ff8800',
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
            color: '#ff8800',
            border: '2px solid #ff8800',
            borderRadius: '0',
            padding: '12px',
            fontSize: '14px',
            fontFamily: 'inherit',
            width: '100%',
            boxShadow: 'inset 2px 2px 0 #442200',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#ffaa00',
            boxShadow: 'inset 2px 2px 0 #553300, 0 0 10px #ffaa00'
        },
        textarea: {
            backgroundColor: '#000',
            color: '#ff8800',
            border: '2px solid #ff8800',
            borderRadius: '0',
            padding: '12px',
            fontSize: '14px',
            fontFamily: 'inherit',
            width: '100%',
            minHeight: '150px',
            resize: 'vertical',
            boxShadow: 'inset 2px 2px 0 #442200',
            outline: 'none'
        },
        buttonSuccess: {
            backgroundColor: '#ff8800',
            color: '#000',
            border: '2px solid #cc6600',
            borderRadius: '0',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            cursor: 'pointer',
            marginRight: '16px',
            boxShadow: '2px 2px 0 #aa4400',
            transition: 'all 0.1s ease'
        },
        buttonSuccessHover: {
            backgroundColor: '#cc6600',
            transform: 'translate(1px, 1px)',
            boxShadow: '1px 1px 0 #aa4400'
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
        },
        loadingText: {
            color: '#ff8800',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            animation: 'blink 1s infinite'
        }
    };

    // Add blinking animation for loading state
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div style={pixelStyles.container}>
            <div className="columns mt-6 is-centered">
                <div className="column is-half">
                    <h1 style={pixelStyles.title}>🔧 EDIT NOTE MODE 🔧</h1>
                    
                    {!title && !content ? (
                        <div style={pixelStyles.loadingText}>
                            LOADING NOTE DATA...
                        </div>
                    ) : (
                        <form onSubmit={updateNote} style={pixelStyles.box}>
                            <div style={pixelStyles.field}>
                                <label style={pixelStyles.label}>▶ TITLE</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        style={pixelStyles.input}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="[ EDIT THE TITLE ]"
                                        required
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#ffaa00';
                                            e.target.style.boxShadow = 'inset 2px 2px 0 #553300, 0 0 10px #ffaa00';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#ff8800';
                                            e.target.style.boxShadow = 'inset 2px 2px 0 #442200';
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
                                        placeholder="[ EDIT THE CONTENT ]"
                                        rows="6"
                                        required
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#ffaa00';
                                            e.target.style.boxShadow = 'inset 2px 2px 0 #553300, 0 0 10px #ffaa00';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#ff8800';
                                            e.target.style.boxShadow = 'inset 2px 2px 0 #442200';
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={pixelStyles.buttonGroup}>
                                <button 
                                    type="submit" 
                                    style={pixelStyles.buttonSuccess}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#cc6600';
                                        e.target.style.transform = 'translate(1px, 1px)';
                                        e.target.style.boxShadow = '1px 1px 0 #aa4400';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#ff8800';
                                        e.target.style.transform = 'translate(0, 0)';
                                        e.target.style.boxShadow = '2px 2px 0 #aa4400';
                                    }}
                                >
                                    🔄 UPDATE NOTE
                                </button>
                                <button 
                                    type="button" 
                                    style={pixelStyles.buttonLight} 
                                    onClick={() => navigate(`/notes/detail/${id}`)}
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditNote;