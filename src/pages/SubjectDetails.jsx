import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { medicinaData } from '../data/medicinaData';

export function SubjectDetails() {
    const { id } = useParams();

    // Função auxiliar para encontrar a matéria em todos os ciclos
    const findSubject = (id) => {
        const allCycles = [medicinaData.cicloBasico, medicinaData.cicloClinico, medicinaData.internato];
        for (const cycle of allCycles) {
            const subject = cycle.subjects.find(s => s.id === id);
            if (subject) return subject;
        }
        return null;
    };

    const subject = findSubject(id);

    if (!subject) {
        return (
            <div className="container section text-center">
                <h2>Matéria não encontrada</h2>
                <Link to="/" className="btn btn-primary">Voltar para Home</Link>
            </div>
        );
    }

    return (
        <div className="subject-details">
            <div className="container section">
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-accent)' }}>
                    ← Voltar
                </Link>

                <header style={{ marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>{subject.title}</h1>
                    {subject.content?.intro && (
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>{subject.content.intro}</p>
                    )}
                </header>

                {subject.content ? (
                    <div className="content-grid" style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
                        {subject.content.sections.map((section, index) => (
                            <div key={index} className="card" style={{ padding: 'var(--spacing-lg)' }}>
                                <h2 style={{ color: 'var(--color-accent)', fontSize: '2rem' }}>{section.title}</h2>
                                <div style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', color: 'var(--color-text-main)', marginBottom: 'var(--spacing-md)' }}>
                                    {section.text}
                                </div>
                                {section.tags && (
                                    <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {section.tags.map(tag => (
                                            <span key={tag} style={{
                                                background: 'rgba(56, 189, 248, 0.1)',
                                                color: 'var(--color-accent)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="cta-box section text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Gostou do resumo?</h3>
                            <p style={{ marginBottom: 'var(--spacing-md)' }}>Adquira o material completo com mapas mentais e questões comentadas.</p>
                            <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                                Comprar Resumo Completo
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center section">
                        <p>Conteúdo em desenvolvimento para esta matéria.</p>
                        <button className="btn btn-outline" style={{ marginTop: 'var(--spacing-md)' }}>
                            Avise-me quando estiver disponível
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
