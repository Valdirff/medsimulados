import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="header">
            <div className="container flex justify-between items-center" style={{ height: '80px' }}>
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>CamilamedSimulados</h1>
                    </Link>
                </div>
                <nav className="nav flex items-center">
                    <Link to="/" className="nav-link" style={{ color: 'var(--color-text-muted)' }}>Provas</Link>
                    <a href="#" className="nav-link" style={{ color: 'var(--color-text-muted)' }}>Desempenho</a>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Área do Aluno
                    </button>
                </nav>
            </div>
        </header>
    );
}
