import React from 'react';

export function Footer() {
    return (
        <footer className="footer section" style={{ borderTop: '1px solid var(--color-border)', marginTop: 'var(--spacing-xl)' }}>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)' }}>MedResumos</h3>
                        <p style={{ fontSize: '0.9rem' }}>&copy; 2024 Todos os direitos reservados.</p>
                    </div>
                    <div className="flex">
                        <a href="#" style={{ color: 'var(--color-text-muted)' }}>Termos</a>
                        <a href="#" style={{ color: 'var(--color-text-muted)' }}>Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
