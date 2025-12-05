// src/pages/DrawStrawsScreen.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, People, Trophy, ArrowClockwise } from "react-bootstrap-icons";
import { Helmet } from "react-helmet";
import "../assets/css/DrawStraws.css";

const DrawStrawsScreen = () => {
    const location = useLocation();
    const [playerCount, setPlayerCount] = useState(4);
    const [gamePhase, setGamePhase] = useState("setup"); // setup, playing, result
    const [straws, setStraws] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [loserIndex, setLoserIndex] = useState(null);
    const [revealedStraws, setRevealedStraws] = useState([]);

    // URL-dən ?r=... parametrini götürürük
    const searchParams = new URLSearchParams(location.search);
    const businessName = searchParams.get("r");

    const getLink = (path) => {
        if (!businessName) return path;
        return path.includes("?")
            ? `${path}&r=${businessName}`
            : `${path}?r=${businessName}`;
    };

    // Oyunu başlat
    const startGame = useCallback(() => {
        // Bir qısa çöp təyin et (random index)
        const shortStrawIndex = Math.floor(Math.random() * playerCount);

        // Çöpləri yarat
        const newStraws = Array.from({ length: playerCount }, (_, index) => ({
            id: index,
            isShort: index === shortStrawIndex,
            isRevealed: false,
            pickedBy: null,
        }));

        // Çöpləri qarışdır
        for (let i = newStraws.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newStraws[i], newStraws[j]] = [newStraws[j], newStraws[i]];
        }

        setStraws(newStraws);
        setCurrentPlayer(1);
        setLoserIndex(null);
        setRevealedStraws([]);
        setGamePhase("playing");
    }, [playerCount]);

    // Çöp seç
    const pickStraw = (strawIndex) => {
        if (straws[strawIndex].isRevealed) return;

        const updatedStraws = straws.map((straw, idx) =>
            idx === strawIndex
                ? { ...straw, isRevealed: true, pickedBy: currentPlayer }
                : straw
        );

        setStraws(updatedStraws);
        setRevealedStraws([...revealedStraws, strawIndex]);

        // Qısa çöp çəkilibsə
        if (updatedStraws[strawIndex].isShort) {
            setLoserIndex(currentPlayer);
            setGamePhase("result");
        } else {
            // Sonuncu oyunçu qalıbsa (avtomatik olaraq o uduzur)
            if (currentPlayer === playerCount) {
                // Son çöp qısa olmalıdır
                const lastStraw = updatedStraws.find(s => !s.isRevealed);
                if (lastStraw) {
                    setLoserIndex(currentPlayer);
                    setGamePhase("result");
                }
            } else {
                setCurrentPlayer(currentPlayer + 1);
            }
        }
    };

    // Oyunu sıfırla
    const resetGame = () => {
        setGamePhase("setup");
        setStraws([]);
        setCurrentPlayer(1);
        setLoserIndex(null);
        setRevealedStraws([]);
    };

    return (
        <Container fluid className="p-0 draw-straws-screen">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Qısa Çöpü Çək - UniPOS</title>
            </Helmet>

            {/* Header */}
            <div className="draw-straws-header">
                <Link to={getLink("/")} className="back-btn">
                    <ArrowLeft size={24} />
                </Link>
                <h5 className="header-title">🥢 Qısa Çöpü Çək</h5>
                <div style={{ width: "24px" }}></div>
            </div>

            {/* Setup Phase */}
            {gamePhase === "setup" && (
                <div className="setup-phase">
                    <div className="setup-card">
                        <div className="setup-icon">
                            <People size={60} />
                        </div>
                        <h3>Neçə nəfər oynayır?</h3>
                        <p className="setup-desc">
                            Masa ətrafında neçə nəfər var? Hesabı kimin ödəyəcəyini müəyyən edək!
                        </p>

                        <div className="player-counter">
                            <Button
                                variant="outline-primary"
                                className="counter-btn"
                                onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
                                disabled={playerCount <= 2}
                            >
                                −
                            </Button>
                            <div className="player-count-display">
                                <span className="count-number">{playerCount}</span>
                                <span className="count-label">nəfər</span>
                            </div>
                            <Button
                                variant="outline-primary"
                                className="counter-btn"
                                onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
                                disabled={playerCount >= 10}
                            >
                                +
                            </Button>
                        </div>

                        <Button className="start-game-btn" onClick={startGame}>
                            🎮 Oyuna Başla
                        </Button>
                    </div>
                </div>
            )}

            {/* Playing Phase */}
            {gamePhase === "playing" && (
                <div className="playing-phase">
                    <div className="current-player-info">
                        <span className="player-label">Növbə:</span>
                        <span className="player-number">Oyunçu {currentPlayer}</span>
                    </div>

                    <div className="instruction-text">
                        Bir çöp seç və taleyini öyrən! 🤞
                    </div>

                    <div className="straws-container">
                        {straws.map((straw, index) => (
                            <div
                                key={straw.id}
                                className={`straw-wrapper ${straw.isRevealed ? "revealed" : "hidden"} ${straw.isRevealed && straw.isShort ? "short" : ""
                                    }`}
                                onClick={() => !straw.isRevealed && pickStraw(index)}
                            >
                                <div className="straw-top">
                                    {straw.isRevealed ? (
                                        <span className="picked-by">#{straw.pickedBy}</span>
                                    ) : (
                                        <span className="pick-me">?</span>
                                    )}
                                </div>
                                <div className="straw-body">
                                    <div className="straw-stick"></div>
                                    {straw.isRevealed && (
                                        <div className={`straw-bottom ${straw.isShort ? "short" : "long"}`}>
                                            {straw.isShort ? "💔" : "✓"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="progress-info">
                        <span>{revealedStraws.length} / {playerCount} çöp seçildi</span>
                    </div>
                </div>
            )}

            {/* Result Phase */}
            {gamePhase === "result" && (
                <div className="result-phase">
                    <div className="result-card">
                        <div className="result-emoji">😱</div>
                        <h2 className="result-title">Hesab Sahibi Tapıldı!</h2>

                        <div className="loser-display">
                            <Trophy size={40} className="trophy-icon" />
                            <span className="loser-text">Oyunçu {loserIndex}</span>
                        </div>

                        <p className="result-message">
                            Qısa çöpü çəkdiniz! Bu dəfə hesab sizdən! 💸
                        </p>

                        <div className="result-actions">
                            <Button
                                variant="outline-primary"
                                className="play-again-btn"
                                onClick={resetGame}
                            >
                                <ArrowClockwise className="me-2" />
                                Yenidən Oyna
                            </Button>

                            <Link to={getLink("/")} className="back-to-menu-btn">
                                Menyuya Qayıt
                            </Link>
                        </div>
                    </div>

                    {/* Confetti Effect */}
                    <div className="confetti-container">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181'][Math.floor(Math.random() * 5)],
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default DrawStrawsScreen;
