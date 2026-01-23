// fusions.js - Database of alchemical fusions

window.athanorDatabase = window.athanorDatabase || {};

window.athanorDatabase.fusions = {
    // Elemental Combinations
    'agua,fogo': {
        id: 'vapor',
        name: 'Vapor da Alma',
        description: 'Equilíbrio entre emoção e ação - a capacidade de transformar sentimentos em movimento consciente.',
        result: 'Névoa Quântica',
        icon: '💨',
        color: '#ff9f1c',
        properties: ['adaptabilidade', 'transformação', 'purificação emocional'],
        difficulty: 'medium',
        narrative: 'Quando a água do inconsciente encontra o fogo da consciência, surge o vapor que eleva. Esta névoa quântica representa o estado liminar entre sentir e agir, onde emoções se transformam em movimento sem perder sua essência fluida. Jung chamaria isso de "transcendência da função", onde opostos psicológicos encontram síntese.',
        scientific: 'Mudança de fase: líquido para gasoso. Na física quântica, estados de superposição que mantêm propriedades de múltiplos estados base.',
        psychological: 'Integração afeto-cognição. Capacidade de usar emoções como informação para ação consciente.',
        level: 1,
        xp: 100
    },
    
    'terra,ar': {
        id: 'poeira',
        name: 'Poeira Cósmica',
        description: 'Materialização de ideias - dar forma concreta ao pensamento abstrato.',
        result: 'Matéria Prima',
        icon: '💫',
        color: '#a78bfa',
        properties: ['criação', 'manifestação', 'concretização'],
        difficulty: 'medium',
        narrative: 'Da união entre a terra material e o ar mental, nasce a poeira cósmica - a substância primordial que pode tomar qualquer forma. Esta é a quintessência da criatividade: a capacidade de fazer descer do reino das ideias para o mundo da forma. Cada grão contém um universo de possibilidades.',
        scientific: 'Poeira estelar como origem dos elementos. Na cosmologia, a nucleossíntese estelar que cria matéria a partir de processos mentais cósmicos.',
        psychological: 'Função transcendente ativa. Realização prática de insights psicológicos.',
        level: 1,
        xp: 100
    },
    
    'agua,terra': {
        id: 'lama',
        name: 'Lama Primordial',
        description: 'Fecundidade e potencial de vida - onde a estrutura encontra a fluidez para criar.',
        result: 'Argila da Criação',
        icon: '🪨',
        color: '#16a34a',
        properties: ['fecundidade', 'potencial', 'formação'],
        difficulty: 'easy',
        narrative: 'Da lama primordial emergiu a vida. Esta combinação representa o útero criativo onde estruturas (terra) tornam-se maleáveis através da emoção (água). É o barro do qual o Self é moldado, contendo em si tanto a memória da forma quanto a promessa de transformação.',
        scientific: 'Origem da vida em fontes hidrotermais. A emergência de complexidade a partir de interações simples em meio aquoso com minerais.',
        psychological: 'Self em gestação. Estados psíquicos onde conteúdos inconscientes começam a tomar forma consciente.',
        level: 1,
        xp: 80
    },
    
    'fogo,ar': {
        id: 'tempestade',
        name: 'Tempestade de Ideias',
        description: 'Inspiração incandescente - onde o pensamento se torna paixão criativa.',
        result: 'Fogo Sagrado',
        icon: '⚡',
        color: '#f59e0b',
        properties: ['inspiração', 'criatividade', 'revelação'],
        difficulty: 'hard',
        narrative: 'Quando o fogo da vontade encontra o ar da mente, nasce a tempestade perfeita da criatividade. Relâmpagos de insight iluminam paisagens internas antes escuras. Este é o fogo prometeico que rouba dos deuses a centelha da criação para entregá-la à humanidade.',
        scientific: 'Plasma e descargas elétricas na atmosfera. Estados da matéria onde partículas carregadas criam fenômenos emergentes complexos.',
        psychological: 'Inspiração como fenômeno psicofisiológico. Estados de fluxo (flow) onde criatividade e execução se fundem.',
        level: 2,
        xp: 150
    },
    
    // Triple Combinations
    'agua,fogo,terra': {
        id: 'geiser',
        name: 'Gêiser da Alma',
        description: 'Expressão espontânea de conteúdo inconsciente - erupção criativa regulada.',
        result: 'Água Termal',
        icon: '🌋',
        color: '#ea580c',
        properties: ['expressão', 'purificação', 'renovação'],
        difficulty: 'hard',
        narrative: 'Do profundo da terra, aquecido pelo fogo interior, a água emocional irrompe em jatos de expressão autêntica. Este gêiser representa a capacidade de canalizar forças psíquicas profundas em expressão criativa consciente e estruturada.',
        scientific: 'Sistemas geotérmicos. Troca de energia entre diferentes camadas da realidade física/psíquica.',
        psychological: 'Expressão simbólica de conteúdos arquetípicos. Arte como terapia alquímica.',
        level: 3,
        xp: 200
    },
    
    'ar,terra,fogo': {
        id: 'vidro',
        name: 'Vidro da Visão',
        description: 'Clareza obtida através do fogo - onde a experiência se transforma em sabedoria cristalina.',
        result: 'Lente da Percepção',
        icon: '🔮',
        color: '#0ea5e9',
        properties: ['clareza', 'visão', 'sabedoria'],
        difficulty: 'hard',
        narrative: 'Areia (terra) fundida pelo fogo e soprada pelo ar torna-se vidro - material que deixa passar a luz enquanto mantém forma. Esta é a metáfora perfeita para a consciência refinada: transparente o suficiente para ver a verdade, sólida o suficiente para manter estrutura.',
        scientific: 'Vidro como sólido amorfo. Estado da matéria que desafia categorizações simples, assim como estados de consciência liminares.',
        psychological: 'Função transcendental cristalizada. Padrões de insight que se tornam estruturas duradouras de compreensão.',
        level: 3,
        xp: 200
    },
    
    // Spirit Combinations
    'agua,espirito': {
        id: 'orvalho',
        name: 'Orvalho Cósmico',
        description: 'Graça que desce do espiritual para o emocional - bênção inconsciente.',
        result: 'Água Benta',
        icon: '🌦️',
        color: '#60a5fa',
        properties: ['graça', 'purificação', 'conexão espiritual'],
        difficulty: 'medium',
        narrative: 'Quando o espírito toca as águas emocionais, forma-se o orvalho - gotas de significado que condensam do vazio. Cada gota é um microcosmo, refletindo o todo em sua completude. Esta água abençoada cura não por ação, mas por presença.',
        scientific: 'Condensação e formação de orvalho. Processos de emergência onde o global se manifesta no local.',
        psychological: 'Experiências numinosas na vida emocional. Momentos onde o divino toca o humano através do afeto.',
        level: 2,
        xp: 150
    },
    
    'fogo,espirito': {
        id: 'fenix',
        name: 'Fênix Interior',
        description: 'Renascimento através do fogo espiritual - morte do velho ego para nascimento do Self.',
        result: 'Cinzas da Transformação',
        icon: '🔥',
        color: '#f97316',
        properties: ['renascimento', 'transformação radical', 'transcendência'],
        difficulty: 'very hard',
        narrative: 'A fênix que renasce de suas próprias cinzas é o arquétipo máximo da transformação alquímica. Este fogo não destrói, mas revela a essência imortal através da destruição do transitório. A morte do ego é o nascimento do Self.',
        scientific: 'Processos irreversíveis de transformação de fase. Pontos de não-retorno em sistemas complexos.',
        psychological: 'Experiências de transformação pessoal radical. Crises que levam a novos níveis de integração.',
        level: 4,
        xp: 300
    },
    
    // Shadow Work
    'sombra,luz': {
        id: 'crepusculo',
        name: 'Crepúsculo da Alma',
        description: 'Integração consciente do inconsciente - onde luz e sombra dançam em equilíbrio.',
        result: 'Luz Penumbral',
        icon: '🌓',
        color: '#7c3aed',
        properties: ['integração', 'equilíbrio', 'consciência expandida'],
        difficulty: 'very hard',
        narrative: 'No crepúsculo, luz e sombra se fundem sem anular uma à outra. Esta luz penumbral permite ver tanto o que está iluminado quanto o que permanece nas sombras - aceitação da totalidade do ser, sem julgamento.',
        scientific: 'Dualidade onda-partícula. A complementaridade fundamental da realidade quântica.',
        psychological: 'Integração da sombra. Processo de tornar consciente conteúdos psíquicos anteriormente rejeitados.',
        level: 4,
        xp: 300
    },
    
    'caos,ordem': {
        id: 'fractal',
        name: 'Ordem no Caos',
        description: 'Padrões que emergem da aleatoriedade - beleza da complexidade organizada.',
        result: 'Fractal da Realidade',
        icon: '🌀',
        color: '#db2777',
        properties: ['complexidade', 'emergência', 'padrão'],
        difficulty: 'hard',
        narrative: 'Do caos aparente emergem padrões infinitamente complexos e belos. Este fractal representa a descoberta de que ordem e desordem são duas faces da mesma realidade - que a complexidade nasce da interação de regras simples com aleatoriedade.',
        scientific: 'Fractais e teoria do caos. Padrões que se repetem em diferentes escalas em sistemas dinâmicos.',
        psychological: 'Estruturas psíquicas que emergem da interação entre determinação e liberdade.',
        level: 3,
        xp: 200
    },
    
    // Advanced Quadruple Combinations
    'agua,fogo,terra,ar': {
        id: 'quintaessencia',
        name: 'Quinta Essência',
        description: 'A união perfeita dos quatro elementos - a pedra filosofal da psique.',
        result: 'Pedra Filosofal',
        icon: '💎',
        color: '#fbbf24',
        properties: ['totalidade', 'perfeição', 'transmutação'],
        difficulty: 'master',
        narrative: 'A lendária Quinta Essência que os alquimistas buscavam não era substância física, mas estado de ser. Esta fusão representa a integração completa dos aspectos fundamentais da psique, resultando na capacidade de transmutar sofrimento em sabedoria, limitação em potencial.',
        scientific: 'Teoria do tudo hipotética. Busca por unificação das forças fundamentais da física.',
        psychological: 'Individuação completa. Realização do Self como totalidade psíquica integrada.',
        level: 5,
        xp: 500
    },
    
    'tempo,espirito,sombra,luz': {
        id: 'eternidade',
        name: 'Momento Eterno',
        description: 'Transcendência do tempo linear - experiência do eterno no agora.',
        result: 'Ponto do Agora',
        icon: '⌛',
        color: '#6d28d9',
        properties: ['eternidade', 'presença', 'transcendência'],
        difficulty: 'master',
        narrative: 'Quando tempo, espírito, sombra e luz se fundem, o momento presente expande-se para conter a eternidade. Não é fuga do tempo, mas imersão tão profunda no agora que o tempo linear dissolve-se em significado puro.',
        scientific: 'Tempo psicológico vs tempo físico. A relatividade da experiência temporal em estados alterados de consciência.',
        psychological: 'Experiências de tempo sagrado. Momentos onde o eterno irrompe no temporal.',
        level: 5,
        xp: 500
    }
};

// Fusion discovery progression
window.athanorDatabase.fusionProgression = {
    levels: {
        1: { name: 'Aprendiz', fusoesNecessarias: 3, unlocks: ['elemental'] },
        2: { name: 'Adepto', fusoesNecessarias: 8, unlocks: ['triple', 'spirit'] },
        3: { name: 'Mago', fusoesNecessarias: 15, unlocks: ['shadow', 'advanced'] },
        4: { name: 'Arquimago', fusoesNecessarias: 25, unlocks: ['quadruple'] },
        5: { name: 'Alquimista Supremo', fusoesNecessarias: 40, unlocks: ['master'] }
    },
    
    categories: {
        'elemental': ['agua,fogo', 'terra,ar', 'agua,terra', 'fogo,ar'],
        'triple': ['agua,fogo,terra', 'ar,terra,fogo'],
        'spirit': ['agua,espirito', 'fogo,espirito'],
        'shadow': ['sombra,luz', 'caos,ordem'],
        'quadruple': ['agua,fogo,terra,ar'],
        'master': ['tempo,espirito,sombra,luz']
    }
};

console.log('✅ Banco de dados de fusões carregado');