import React from 'react';
import { Link } from 'react-router-dom';

export function SubjectCard({ subject }) {
    return (
        <div className="card">
            <h3 style={{ color: 'var(--color-accent)' }}>{subject.title}</h3>
            <ul style={{ listStyle: 'none', marginTop: 'var(--spacing-sm)' }}>
                {subject.topics.map((topic, index) => (
                    <li key={index} style={{
                        marginBottom: '0.5rem',
                        color: 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>▹</span>
                        {topic}
                    </li>
                ))}
            </ul>
            <Link to={`/subject/${subject.id}`} className="btn btn-outline" style={{ width: '100%', marginTop: 'var(--spacing-md)', textDecoration: 'none' }}>
                Ver Resumos
            </Link>
        </div>
    );
}
