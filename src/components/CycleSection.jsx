import React from 'react';
import { SubjectCard } from './SubjectCard';

export function CycleSection({ cycle }) {
    return (
        <section className="section">
            <div className="container">
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{ marginBottom: '0.5rem' }}>{cycle.title}</h2>
                    <p style={{ fontSize: '1.1rem' }}>{cycle.description}</p>
                </div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    {cycle.subjects.map(subject => (
                        <SubjectCard key={subject.id} subject={subject} />
                    ))}
                </div>
            </div>
        </section>
    );
}
