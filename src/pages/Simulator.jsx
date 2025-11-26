import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { examsData } from '../data/examsData';

export function Simulator() {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [answers, setAnswers] = useState({}); // Armazena respostas para revisão futura

    useEffect(() => {
        const idToLoad = examId || "enare-2024-real";
        const foundExam = examsData.find(e => e.id === idToLoad);
        if (foundExam) {
            setExam(foundExam);
        }
    }, [examId]);

    if (!exam) {
        return <div className="container section text-center">Carregando prova...</div>;
    }

    const currentQuestion = exam.questions[currentQuestionIndex];

    const handleOptionClick = (optionId) => {
        if (isAnswered) return;
        setSelectedOption(optionId);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;

        setIsAnswered(true);
        const isCorrect = selectedOption === currentQuestion.correctOption;

        if (isCorrect) {
            setScore(score + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: {
                selected: selectedOption,
                correct: isCorrect
            }
        }));
    };

    const handleNext = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < exam.questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    if (showScore) {
        return (
            <div className="container section text-center">
                <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Resultado: {exam.title}</h2>
                <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-xl)' }}>
                    <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: 'var(--spacing-sm)' }}>
                        {score}/{exam.questions.length}
                    </div>
                    <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-lg)' }}>
                        Aproveitamento: {Math.round((score / exam.questions.length) * 100)}%
                    </p>

                    <div className="flex justify-between" style={{ gap: '1rem' }}>
                        <Link to="/" className="btn btn-outline" style={{ flex: 1, textDecoration: 'none' }}>
                            Voltar ao Menu
                        </Link>
                        <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ flex: 1 }}>
                            Refazer Prova
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="simulator section">
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Header do Simulador */}
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{exam.title}</h2>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{exam.institution} • {exam.year}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                            Questão {currentQuestionIndex + 1}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)' }}> / {exam.questions.length}</span>
                    </div>
                </div>

                {/* Barra de Progresso */}
                <div style={{ width: '100%', height: '4px', background: 'var(--color-border)', borderRadius: '2px', marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{
                        width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%`,
                        height: '100%',
                        background: 'var(--color-accent)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                    }} />
                </div>

                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    {/* Área e Enunciado */}
                    <span className="badge" style={{ background: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', marginBottom: '1rem', display: 'inline-block' }}>
                        {currentQuestion.area}
                    </span>

                    <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-lg)', lineHeight: '1.6' }}>
                        {currentQuestion.text}
                    </p>

                    {/* Imagens da Questão */}
                    {currentQuestion.images && currentQuestion.images.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'var(--spacing-lg)' }}>
                            {currentQuestion.images.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc.startsWith('http') ? imgSrc : `${import.meta.env.BASE_URL}${imgSrc}`}
                                    alt={`Imagem ${index + 1} da questão`}
                                    style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="options-grid" style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                        {currentQuestion.options.map(option => {
                            let optionClass = 'option-btn';

                            if (selectedOption === option.id) {
                                optionClass += ' selected';
                            }

                            if (isAnswered) {
                                if (option.id === currentQuestion.correctOption) {
                                    optionClass += ' correct';
                                } else if (selectedOption === option.id && selectedOption !== currentQuestion.correctOption) {
                                    optionClass += ' wrong';
                                }
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    className={optionClass}
                                    disabled={isAnswered}
                                >
                                    <span style={{ fontWeight: 'bold', marginRight: '0.75rem', color: 'var(--color-accent)', minWidth: '25px' }}>{option.id.toUpperCase()})</span>
                                    <span>{option.text}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Ações e Feedback */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: 'var(--spacing-lg)' }}>
                        {currentQuestionIndex > 0 && (
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setCurrentQuestionIndex(prev => prev - 1);
                                    setIsAnswered(false);
                                    setSelectedOption(null);
                                }}
                                style={{ flex: 1, padding: '1rem' }}
                            >
                                ← Voltar
                            </button>
                        )}

                        {!isAnswered ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!selectedOption}
                                style={{ flex: 2, padding: '1rem', fontSize: '1.1rem', opacity: !selectedOption ? 0.5 : 1 }}
                            >
                                Confirmar Resposta
                            </button>
                        ) : (
                            <div className="feedback-section" style={{ flex: 2, animation: 'fadeIn 0.5s' }}>
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'var(--color-background)',
                                    borderLeft: `4px solid ${selectedOption === currentQuestion.correctOption ? '#4ade80' : '#f87171'}`,
                                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                                    marginBottom: 'var(--spacing-md)'
                                }}>
                                    <h4 style={{ color: selectedOption === currentQuestion.correctOption ? '#4ade80' : '#f87171', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                        {selectedOption === currentQuestion.correctOption ? '✅ Resposta Correta!' : '❌ Resposta Incorreta'}
                                    </h4>
                                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{currentQuestion.comment}</p>
                                </div>
                                <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%', padding: '1rem' }}>
                                    {currentQuestionIndex < exam.questions.length - 1 ? 'Próxima Questão →' : 'Finalizar Prova'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
