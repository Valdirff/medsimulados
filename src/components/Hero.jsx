import React from 'react';

export function Hero() {
    return (
        <section className="section flex items-center justify-between" style={{ minHeight: '80vh', paddingTop: 'var(--spacing-xl)' }}>
            <div className="container grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>
                        Domine a Medicina <br />
                        <span style={{ color: 'var(--color-accent)' }}>Sem Complicação</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)', maxWidth: '500px' }}>
                        Resumos completos e didáticos do Ciclo Básico ao Internato.
                        Otimize seus estudos e foque no que realmente importa.
                    </p>
                    <div className="flex">
                        <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            Começar Agora
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                            Ver Amostra Grátis
                        </button>
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                    height: '400px',
                    background: 'var(--gradient-glow)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    opacity: 0.5,
                    zIndex: -1
                }}>
                    {/* Placeholder para imagem ou ilustração 3D futura */}
                </div>
            </div>
        </section>
    );
}
