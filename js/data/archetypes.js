// archetypes.js - Database of archetypes

window.athanorDatabase = window.athanorDatabase || {};

window.athanorDatabase.archetypes = {
    agua: {
        id: 'agua',
        title: 'O Curador',
        subtitle: 'Arquétipo da Emoção',
        description: 'Representa o inconsciente, a fluidez emocional e a capacidade de cura através da aceitação. A água dissolve fronteiras e permite o fluxo entre consciência e inconsciência.',
        scientific: 'Analogia quântica: Superfluidez - estado da matéria sem viscosidade onde a informação flui sem resistência.',
        psychological: 'Carl Jung: "A água é o símbolo mais comum do inconsciente. O lago da alma." Representa o Self em formação.',
        alchemical: 'Fase da Solutio (dissolução). Onde estruturas rígidas do ego se dissolvem para revelar verdades mais profundas.',
        icon: '🌊',
        color: '#3b82f6',
        element: 'water',
        properties: ['emoção', 'cura', 'adaptabilidade', 'intuição', 'profundidade'],
        related: ['fogo', 'terra', 'ar', 'espirito'],
        quotes: [
            'A água molha tudo sem esforço, seguindo o caminho da menor resistência.',
            'No mais profundo do inconsciente, encontramos a fonte de toda cura.'
        ]
    },
    
    fogo: {
        id: 'fogo',
        title: 'O Herói',
        subtitle: 'Arquétipo da Vontade',
        description: 'Energia transformadora, paixão e capacidade de ação consciente. O fogo purifica através da destruição do desnecessário, criando espaço para o novo.',
        scientific: 'Entropia e transformação de energia. O fogo representa a segunda lei da termodinâmica em ação: transformação irreversível.',
        psychological: 'Força do Ego e determinação. O arquétipo do Herói que enfrenta desafios com coragem e propósito.',
        alchemical: 'Fase da Calcinatio. Purificação pelo fogo, redução à essência através da queima de impurezas.',
        icon: '🔥',
        color: '#ef4444',
        element: 'fire',
        properties: ['vontade', 'transformação', 'paixão', 'purificação', 'ação'],
        related: ['agua', 'terra', 'ar', 'espirito'],
        quotes: [
            'Do caos das chamas nasce a luz da consciência.',
            'Todo herói carrega uma faísca que pode incendiar mundos.'
        ]
    },
    
    terra: {
        id: 'terra',
        title: 'O Sábio',
        subtitle: 'Arquétipo da Materialização',
        description: 'Estabilidade, concretização e conexão com o físico. A terra representa a manifestação, a paciência e a sabedoria que vem do enraizamento.',
        scientific: 'Estados sólidos da matéria. Estruturas cristalinas que emergem do caos, representando ordem e previsibilidade.',
        psychological: 'Arquétipo do Animus/Anima integrado. Capacidade de dar forma concreta a insights abstratos.',
        alchemical: 'Fase da Coagulatio. Solidificação, cristalização de insights em sabedoria aplicável.',
        icon: '🌍',
        color: '#22c55e',
        element: 'earth',
        properties: ['estabilidade', 'manifestação', 'paciência', 'sabedoria', 'realidade'],
        related: ['agua', 'fogo', 'ar', 'espirito'],
        quotes: [
            'Toda montanha começou como um grão de areia que permaneceu.',
            'A sabedoria não é conhecimento, mas raízes que alcançam o centro.'
        ]
    },
    
    ar: {
        id: 'ar',
        title: 'O Visionário',
        subtitle: 'Arquétipo do Intelecto',
        description: 'Pensamento abstrato, comunicação e expansão mental. O ar representa a mente, a criatividade e a capacidade de transcender limitações materiais.',
        scientific: 'Estados gasosos e teoria da informação. O ar como meio de transmissão, representando comunicação e difusão de ideias.',
        psychological: 'Função pensamento (Jung). Capacidade de análise, síntese e criação de estruturas conceituais.',
        alchemical: 'Fase da Sublimatio. Elevação, transformação do sólido em gasoso sem passar pelo líquido.',
        icon: '💨',
        color: '#8b5cf6',
        element: 'air',
        properties: ['intelecto', 'comunicação', 'expansão', 'criatividade', 'liberdade'],
        related: ['agua', 'fogo', 'terra', 'espirito'],
        quotes: [
            'As ideias mais leves são as que voam mais alto.',
            'A mente é o vento que molda as dunas da realidade.'
        ]
    },
    
    espirito: {
        id: 'espirito',
        title: 'O Transcendente',
        subtitle: 'Arquétipo da Unificação',
        description: 'Conexão com o divino e integração dos opostos. O espírito representa a quintessência, o ponto de união onde dualidades se dissolvem.',
        scientific: 'Campo unificado hipotético. A busca por uma teoria que unifique todas as forças fundamentais.',
        psychological: 'Self (Jung). A totalidade psíquica, centro unificador da personalidade.',
        alchemical: 'Quintessência. A quinta essência que transcende os quatro elementos.',
        icon: '✨',
        color: '#ec4899',
        element: 'spirit',
        properties: ['unificação', 'transcendência', 'totalidade', 'essência', 'sagrado'],
        related: ['agua', 'fogo', 'terra', 'ar'],
        quotes: [
            'O espírito não está no mundo, o mundo está no espírito.',
            'Na união dos opostos encontramos o círculo completo.'
        ]
    },
    
    sombra: {
        id: 'sombra',
        title: 'A Sombra',
        subtitle: 'Arquétipo do Inconsciente',
        description: 'Aspectos negados, reprimidos ou desconhecidos do Self. A sombra contém potencial tanto destrutivo quanto criativo.',
        scientific: 'Matéria escura. O que não vemos mas cujos efeitos sentimos, representando o desconhecido influente.',
        psychological: 'Sombra (Jung). Aspectos da personalidade rejeitados pela consciência egoica.',
        alchemical: 'Nigredo. A obra ao negro, putrefação necessária para o renascimento.',
        icon: '🌑',
        color: '#6b7280',
        element: 'shadow',
        properties: ['inconsciente', 'potencial', 'integração', 'transformação', 'misterio'],
        related: ['luz', 'agua', 'fogo'],
        quotes: [
            'A sombra mais longa é lançada pela luz mais brilhante.',
            'No que negamos, encontramos nosso maior poder.'
        ]
    },
    
    luz: {
        id: 'luz',
        title: 'A Iluminadora',
        subtitle: 'Arquétipo da Consciência',
        description: 'Consciência expandida, insight e revelação. A luz ilumina o desconhecido, revelando padrões e conexões ocultas.',
        scientific: 'Fótons e dualidade onda-partícula. A luz como mediadora entre observador e observado.',
        psychological: 'Ego iluminado. Consciência que se expande para incluir conteúdos antes inconscientes.',
        alchemical: 'Albedo. A obra ao branco, purificação e iluminação.',
        icon: '☀️',
        color: '#fbbf24',
        element: 'light',
        properties: ['consciência', 'revelação', 'clareza', 'insight', 'verdade'],
        related: ['sombra', 'espirito', 'ar'],
        quotes: [
            'A verdadeira luz não cega, mas permite ver na escuridão.',
            'Cada insight é uma fenda por onde entra a luz do entendimento.'
        ]
    },
    
    tempo: {
        id: 'tempo',
        title: 'O Alquimista',
        subtitle: 'Arquétipo da Transformação',
        description: 'Processo, mudança e a sabedoria da paciência. O tempo é o fogo no qual queimamos para nos transformar.',
        scientific: 'Entropia e seta do tempo. A irreversibilidade dos processos e a direcionalidade da transformação.',
        psychological: 'Processo de individuação. A jornada ao longo do tempo em direção à totalidade.',
        alchemical: 'Operação completa. O ciclo completo de transformação que requer tempo para amadurecer.',
        icon: '⏳',
        color: '#8b5cf6',
        element: 'time',
        properties: ['processo', 'paciência', 'transformação', 'ciclo', 'maturidade'],
        related: ['espirito', 'terra', 'fogo'],
        quotes: [
            'O tempo não passa, transforma.',
            'A paciência é o cadinho onde a alma amadurece.'
        ]
    },
    
    caos: {
        id: 'caos',
        title: 'O Caótico',
        subtitle: 'Arquétipo da Potencialidade',
        description: 'Desordem criativa, potencial puro e indeterminação. O caos precede toda criação, contendo infinitas possibilidades.',
        scientific: 'Teoria do caos e atratores estranhos. Ordem emergente da desordem, sensibilidade às condições iniciais.',
        psychological: 'Inconsciente coletivo em seu estado bruto. Fonte de arquétipos e potencial criativo.',
        alchemical: 'Prima Materia. A matéria prima indiferenciada, fonte de todas as possibilidades.',
        icon: '🌀',
        color: '#dc2626',
        element: 'chaos',
        properties: ['potencial', 'criatividade', 'indeterminação', 'emergência', 'liberdade'],
        related: ['ordem', 'espirito', 'ar'],
        quotes: [
            'Do caos nascem as estrelas e as ideias.',
            'Na desordem máxima, encontramos a liberdade total.'
        ]
    },
    
    ordem: {
        id: 'ordem',
        title: 'O Arquiteto',
        subtitle: 'Arquétipo da Estrutura',
        description: 'Padrões, leis e estruturas que dão forma ao caos. A ordem é o princípio organizador que permite a existência.',
        scientific: 'Leis fundamentais e constantes universais. As regularidades que tornam o universo compreensível.',
        psychological: 'Princípio de realidade. Estruturas psíquicas que organizam a experiência.',
        alchemical: 'Fixação. Estabilização das transformações em formas duradouras.',
        icon: '📐',
        color: '#3b82f6',
        element: 'order',
        properties: ['estrutura', 'lei', 'padrão', 'organização', 'estabilidade'],
        related: ['caos', 'terra', 'ar'],
        quotes: [
            'A ordem não é prisão, mas o cadinho da criação.',
            'Nas estruturas mais rígidas, encontramos a liberdade da previsibilidade.'
        ]
    }
};

console.log('✅ Banco de dados de arquétipos carregado');