export const questionsData = [
    {
        id: 1,
        area: "Clínica Médica",
        institution: "ENARE",
        year: 2024,
        question: "Paciente de 55 anos, hipertenso e diabético, chega à emergência com dor torácica opressiva há 2 horas. Eletrocardiograma mostra supradesnivelamento do segmento ST em V1 a V4. Qual a parede acometida e a artéria provável culpada?",
        options: [
            { id: "a", text: "Parede Inferior - Artéria Coronária Direita" },
            { id: "b", text: "Parede Anterior - Artéria Descendente Anterior" },
            { id: "c", text: "Parede Lateral - Artéria Circunflexa" },
            { id: "d", text: "Parede Posterior - Artéria Coronária Direita" }
        ],
        correctOption: "b",
        comment: "O supradesnivelamento de ST de V1 a V4 indica infarto de parede ANTERIOR (ou anterosseptal). A artéria responsável pela irrigação dessa parede é a Descendente Anterior (DA). A parede inferior (DII, DIII, aVF) geralmente é irrigada pela Coronária Direita."
    },
    {
        id: 2,
        area: "Cirurgia Geral",
        institution: "USP-SP",
        year: 2023,
        question: "Segundo o ATLS 10ª edição, qual a primeira medida a ser tomada no atendimento inicial ao politraumatizado?",
        options: [
            { id: "a", text: "Avaliação do nível de consciência (Glasgow)" },
            { id: "b", text: "Controle de hemorragias exsanguinantes (X)" },
            { id: "c", text: "Manutenção de vias aéreas com controle cervical (A)" },
            { id: "d", text: "Exposição com controle de hipotermia (E)" }
        ],
        correctOption: "b",
        comment: "A 10ª edição do ATLS introduziu o 'X' antes do ABCDE. O 'X' refere-se ao controle de hemorragias externas exsanguinantes graves, que devem ser contidas imediatamente antes mesmo da via aérea, pois são a principal causa de morte evitável imediata."
    },
    {
        id: 3,
        area: "Pediatria",
        institution: "SUS-SP",
        year: 2024,
        question: "Lactente de 2 meses comparece à UBS para vacinação de rotina. Quais vacinas devem ser administradas nesta idade, conforme o PNI vigente?",
        options: [
            { id: "a", text: "BCG e Hepatite B" },
            { id: "b", text: "Penta, VIP, Pneumo-10 e Rotavírus" },
            { id: "c", text: "Meningo C, Pneumo-10 e Febre Amarela" },
            { id: "d", text: "Tríplice Viral e Hepatite A" }
        ],
        correctOption: "b",
        comment: "Aos 2 meses, o calendário do PNI recomenda: Pentavalente (DTP+Hib+HepB), VIP (Poliomielite Inativada), Pneumocócica 10-valente e Rotavírus Humano."
    },
    {
        id: 4,
        area: "Ginecologia",
        institution: "ENARE",
        year: 2023,
        question: "Mulher de 25 anos, sexarca aos 16, apresenta citologia oncótica com Lesão Intraepitelial de Alto Grau (HSIL/NIC II-III). Qual a conduta imediata mais adequada?",
        options: [
            { id: "a", text: "Repetir citologia em 6 meses" },
            { id: "b", text: "Realizar Colposcopia com biópsia" },
            { id: "c", text: "Histerectomia total" },
            { id: "d", text: "Cauterização do colo uterino" }
        ],
        correctOption: "b",
        comment: "Diante de um resultado de HSIL (Lesão de Alto Grau), a conduta mandatória é a investigação diagnóstica com Colposcopia. Se houver lesão visível, realiza-se biópsia para confirmação histopatológica antes de qualquer tratamento excisional."
    },
    {
        id: 5,
        area: "Preventiva",
        institution: "UNICAMP",
        year: 2024,
        question: "Qual princípio do SUS garante que todo cidadão tem direito ao atendimento, independentemente de cor, raça, religião ou condição social?",
        options: [
            { id: "a", text: "Integralidade" },
            { id: "b", text: "Equidade" },
            { id: "c", text: "Universalidade" },
            { id: "d", text: "Descentralização" }
        ],
        correctOption: "c",
        comment: "A Universalidade é o princípio doutrinário que garante o acesso à saúde a TODOS os cidadãos, sem qualquer tipo de discriminação ou barreira de acesso. A saúde é direito de todos e dever do Estado."
    }
];
