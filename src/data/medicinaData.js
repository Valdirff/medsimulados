export const medicinaData = {
  cicloBasico: {
    title: "Ciclo Básico",
    description: "Fundamentos essenciais para a prática médica.",
    subjects: [
      {
        id: "morfologia",
        title: "Morfologia",
        topics: [
          "Anatomia Sistêmica",
          "Histologia dos Tecidos",
          "Embriologia Humana",
          "Neuroanatomia"
        ],
        content: {
          intro: "A Morfologia engloba o estudo da forma e estrutura do corpo humano, integrando Anatomia, Histologia e Embriologia.",
          sections: [
            {
              title: "Anatomia Humana",
              text: "A Anatomia é a ciência que estuda a estrutura macroscópica do corpo humano. O estudo inicia-se pela **Posição Anatômica**: corpo ereto, face voltada para frente, membros superiores estendidos ao longo do tronco com as palmas das mãos voltadas para frente, e pés paralelos. \n\nOs **Planos Anatômicos** são fundamentais para a descrição: \n- **Plano Sagital**: divide o corpo em direita e esquerda.\n- **Plano Frontal (Coronal)**: divide em anterior (ventral) e posterior (dorsal).\n- **Plano Transversal (Axial)**: divide em superior (cranial) e inferior (caudal).\n\nO **Esqueleto** é dividido em Axial (crânio, coluna vertebral, costelas, esterno) e Apendicular (membros superiores e inferiores, cíngulos).",
              tags: ["Planos e Eixos", "Esqueleto", "Sistemas"]
            },
            {
              title: "Histologia",
              text: "Estuda os tecidos biológicos. Existem 4 tecidos fundamentais:\n\n1. **Tecido Epitelial**: Células justapostas, pouca matriz extracelular. Funções: revestimento (pele, mucosas) e secreção (glândulas). É avascular.\n2. **Tecido Conjuntivo**: Muita matriz extracelular, células diversas (fibroblastos, macrófagos). Funções: sustentação, preenchimento, transporte (sangue), defesa. Tipos: Propriamente dito, Adiposo, Cartilaginoso, Ósseo.\n3. **Tecido Muscular**: Células contráteis (miócitos). Tipos: Estriado Esquelético (voluntário), Estriado Cardíaco (involuntário), Liso (involuntário).\n4. **Tecido Nervoso**: Neurônios (transmissão de impulsos) e células da glia (suporte e nutrição).",
              tags: ["Tecidos Básicos", "Microscopia"]
            },
            {
              title: "Embriologia",
              text: "Estuda o desenvolvimento desde a fecundação até o nascimento.\n\n- **1ª Semana**: Fecundação (ampola da tuba), Clivagem (zigoto -> mórula -> blastocisto), Implantação (nidação) no endométrio.\n- **2ª Semana**: Formação do disco bilaminar (epiblasto e hipoblasto).\n- **3ª Semana**: Gastrulação (formação das 3 camadas germinativas: Ectoderma, Mesoderma, Endoderma) e Neurulação (formação do tubo neural, primórdio do SNC).",
              tags: ["Desenvolvimento", "Fases Iniciais"]
            }
          ]
        }
      },
      {
        id: "fisiologia",
        title: "Fisiologia Humana",
        topics: [
          "Fisiologia Celular",
          "Neurofisiologia",
          "Cardiovascular e Respiratório",
          "Renal e Digestório"
        ]
      },
      {
        id: "bioquimica",
        title: "Bioquímica e Genética",
        topics: [
          "Metabolismo Energético",
          "Biologia Molecular",
          "Genética Médica",
          "Imunologia Básica"
        ]
      },
      {
        id: "patologia",
        title: "Patologia e Farmaco",
        topics: [
          "Processos Patológicos",
          "Farmacocinética",
          "Farmacodinâmica",
          "Mecanismos de Agressão e Defesa"
        ]
      }
    ]
  },
  cicloClinico: {
    title: "Ciclo Clínico",
    description: "Aplicação prática dos conhecimentos nas especialidades.",
    subjects: [
      {
        id: "clinica-medica",
        title: "Clínica Médica",
        topics: [
          "Cardiologia",
          "Pneumologia",
          "Gastroenterologia",
          "Nefrologia"
        ]
      },
      {
        id: "cirurgia",
        title: "Cirurgia Geral",
        topics: [
          "Trauma e Emergência",
          "Cirurgia Abdominal",
          "Pré e Pós-operatório",
          "Técnica Cirúrgica"
        ]
      },
      {
        id: "pediatria",
        title: "Pediatria",
        topics: [
          "Puericultura",
          "Neonatologia",
          "Doenças da Infância",
          "Emergências Pediátricas"
        ]
      },
      {
        id: "ginecologia",
        title: "Ginecologia e Obstetrícia",
        topics: [
          "Pré-natal",
          "Parto e Puerpério",
          "Ginecologia Endócrina",
          "Oncologia Ginecológica"
        ]
      }
    ]
  },
  internato: {
    title: "Internato",
    description: "Prática intensiva e preparação para a residência.",
    subjects: [
      {
        id: "rodizio-clinica",
        title: "Rodízio de Clínica",
        topics: [
          "Visitas em Enfermaria",
          "Ambulatório",
          "Plantões em Emergência",
          "Discussão de Casos"
        ]
      },
      {
        id: "rodizio-cirurgia",
        title: "Rodízio de Cirurgia",
        topics: [
          "Centro Cirúrgico",
          "Pequenos Procedimentos",
          "Trauma",
          "Urgências Cirúrgicas"
        ]
      },
      {
        id: "saude-coletiva",
        title: "Saúde Coletiva",
        topics: [
          "Medicina de Família",
          "Epidemiologia",
          "Gestão em Saúde",
          "Saúde Mental"
        ]
      }
    ]
  }
};
