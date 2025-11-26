import { enare2024Questions } from './enare2024Data';

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
        id: "usp-2023-1",
        title: "USP-SP 2023 - Acesso Direto",
        institution: "USP-SP",
        year: 2023,
        description: "Prova da Universidade de São Paulo. Foco em casos clínicos complexos.",
        questionsCount: 5,
        timeLimit: 15,
        questions: [
            {
                id: 1,
                area: "Clínica Médica",
                text: "Paciente com fibrilação atrial valvar (estenose mitral moderada). Qual o anticoagulante de escolha?",
                options: [
                    { id: "a", text: "Rivaroxabana" },
                    { id: "b", text: "Dabigatrana" },
                    { id: "c", text: "Varfarina" },
                    { id: "d", text: "Aspirina" },
                    { id: "e", text: "Enoxaparina" }
                ],
                correctOption: "c",
                comment: "Na FA valvar (estenose mitral moderada a grave ou prótese mecânica), os NOACs (novos anticoagulantes orais) são contraindicados. A droga de escolha é a Varfarina (antagonista da vitamina K)."
            }
        ]
    }
];
