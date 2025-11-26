import React from 'react';
import { Link } from 'react-router-dom';
import { examsData } from '../data/examsData';

export function ExamDashboard() {
    return (
        <div className="dashboard section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Portal de Simulados</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                        Treine com provas reais de residência médica. Comentários baseados em evidências.
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    {examsData.map(exam => (
                        <div key={exam.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <span className="badge" style={{
                                    background: 'var(--color-primary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.8rem',
                                    marginRight: '0.5rem'
                                }}>
                                    {exam.institution}
                                </span>
                                <span className="badge" style={{
                                    background: 'var(--color-secondary)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.8rem'
                                }}>
                                    {exam.year}
                                </span>
                            </div>

                            <h3 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-main)' }}>{exam.title}</h3>
                            <p style={{ marginBottom: 'var(--spacing-md)', flex: 1 }}>{exam.description}</p>

                            <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    <div>📚 {exam.questionsCount} Questões</div>
                                    <div>⏱️ {exam.timeLimit} min</div>
                                </div>
                                <Link to={`/simulador/${exam.id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                                    Iniciar Prova
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
