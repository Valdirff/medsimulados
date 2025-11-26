import { enare2024Questions } from './enare2024Data';
import { amrigs2024Questions } from './amrigs2024Data';
import { usp2023Questions } from './usp2023Data';

export const examsData = [
    {
        id: "enare-2024-real",
        title: "ENARE 2024/2025 - Acesso Direto (Prova Real)",
        institution: "ENARE",
        year: 2024,
        description: "Prova completa oficial (Tipo 1 - Branca). 100 Questões Comentadas.",
        questionsCount: 100,
        timeLimit: 240,
        questions: enare2024Questions
    },
    {
        id: "amrigs-2024",
        title: "AMRIGS 2024 - Acesso Direto",
        institution: "AMRIGS",
        year: 2024,
        description: "Prova completa oficial. 100 Questões Comentadas.",
        questionsCount: 100,
        timeLimit: 300,
        questions: amrigs2024Questions
    },
    {
        id: "usp-2023-1",
        title: "USP-SP 2023 - Acesso Direto",
        institution: "USP-SP",
        year: 2023,
        description: "Prova de Acesso Direto da USP-SP 2023. 120 Questões.",
        questionsCount: 120,
        timeLimit: 300,
        questions: usp2023Questions
    }
];
