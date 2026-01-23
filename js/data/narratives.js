// narratives.js - Narrative content for the application

window.athanorDatabase = window.athanorDatabase || {};

window.athanorDatabase.narratives = {
    welcome: {
        title: "Bem-vindo ao Athanor",
        content: `Você está prestes a embarcar em uma jornada única que combina a sabedoria ancestral da alquimia com os insights modernos da psicologia junguiana e os mistérios da física quântica.

O Athanor (forno alquímico) é mais que uma aplicação - é um laboratório para a alma. Aqui, você explorará arquétipos, realizará transmutações simbólicas e descobrirá padrões ocultos em sua própria psique.

Lembre-se: na alquimia, o processo é o produto. Cada combinação, cada descoberta, é um passo em sua jornada de autoconhecimento.`
    },
    
    archetypeDiscovery: {
        title: "Descoberta Arquetípica",
        templates: [
            "Você encontrou o arquétipo do {archetype}. Na psicologia junguiana, este representa {description}. Na alquimia, corresponde à fase da {alchemical}.",
            "O {archetype} se revela a você. {quote}",
            "{scientific} Esta é a analogia quântica para este arquétipo."
        ]
    },
    
    transmutationSuccess: {
        title: "Transmutação Realizada",
        templates: [
            "✨ Síntese alcançada! {fusionName} emerge da combinação de {elements}. {fusionDescription}",
            "🧪 Operação completa! Você descobriu {result}. Na tradição alquímica, este corresponde a {alchemicalMeaning}.",
            "🌀 Emaranhamento quântico estabelecido! {fusionName} representa {psychologicalInsight}."
        ]
    },
    
    progression: {
        levelUp: [
            "Parabéns! Você alcançou o nível {level}: {levelName}. Novas possibilidades de transmutação se abrem.",
            "A jornada continua... Com o nível {level}, você desbloqueia {unlocks}.",
            "Cada nível é um degrau na escada alquímica. No nível {level}, você tem acesso a {newCapabilities}."
        ],
        
        milestone: [
            "🎯 Marco alcançado! {milestoneDescription}",
            "Na alquimia, a paciência é virtude. Você completou {number} transmutações.",
            "O cadinho do tempo transforma. Sua jornada já dura {time} e conta com {transmutations} transmutações."
        ]
    },
    
    insights: [
        "A verdadeira transmutação não é do chumbo em ouro, mas da ignorância em sabedoria.",
        "Jung dizia: 'Quem olha para fora, sonha; quem olha para dentro, desperta.'",
        "Na física quântica, o observador afeta o observado. Na psicologia, a consciência transforma o inconsciente.",
        "A alquimia é a arte da transformação. A psicanálise, a ciência da compreensão. Ambas são jornadas para o Self.",
        "Os arquétipos são como constelações no céu noturno da psique - pontos de luz que revelam padrões no escuro.",
        "Cada combinação que você descobre é uma nova palavra no idioma secreto da alma.",
        "O caldeirão alquímico é metáfora para a mente - contém todos os elementos, esperando pelo fogo da consciência.",
        "Na superposição quântica, todas as possibilidades coexistem. Na psique, todos os potenciais aguardam atualização.",
        "A sombra não é inimiga, mas professora. O que rejeitamos contém chaves para nossa totalidade.",
        "O tempo no laboratório alquímico não é linear - é espiralado, como o processo de individuação."
    ],
    
    alchemicalStages: {
        nigredo: {
            name: "Nigredo",
            description: "A obra ao negro. Putrefação, dissolução da matéria prima. Corresponde ao confronto com a sombra.",
            symbol: "🌑",
            color: "#000000"
        },
        albedo: {
            name: "Albedo",
            description: "A obra ao branco. Purificação, lavagem, branqueamento. Corresponde à iluminação inicial.",
            symbol: "⚪",
            color: "#ffffff"
        },
        citrinitas: {
            name: "Citrinitas",
            description: "A obra ao amarelo. Amadurecimento, fermentação. Corresponde ao desenvolvimento do Self.",
            symbol: "🟡",
            color: "#fbbf24"
        },
        rubedo: {
            name: "Rubedo",
            description: "A obra ao vermelho. Unificação, perfeição. Corresponde à realização da totalidade.",
            symbol: "🔴",
            color: "#dc2626"
        }
    },
    
    quantumConcepts: {
        superposition: {
            name: "Superposição",
            description: "Estado onde todas as possibilidades coexistem até a observação. Analogia psicológica: potencial puro do inconsciente.",
            symbol: "🌀",
            color: "#00e5ff"
        },
        entanglement: {
            name: "Emaranhamento",
            description: "Conexão instantânea entre partículas separadas. Analogia psicológica: sincronicidade e conexões arquetípicas.",
            symbol: "🔗",
            color: "#9d4edd"
        },
        uncertainty: {
            name: "Incerteza",
            description: "Limite fundamental no conhecimento simultâneo de propriedades. Analogia psicológica: limites da introspecção.",
            symbol: "❓",
            color: "#8b5cf6"
        },
        observer: {
            name: "Observador",
            description: "Consciência que afeta o sistema observado. Analogia psicológica: atenção que transforma conteúdos.",
            symbol: "👁️",
            color: "#ec4899"
        }
    },
    
    dailyQuotes: [
        {
            quote: "A psique não é do hoje; sua história abrange milhões de anos.",
            author: "Carl Gustav Jung",
            context: "Sobre a profundidade temporal do inconsciente coletivo"
        },
        {
            quote: "Aquilo a que você resiste, persiste.",
            author: "Carl Gustav Jung",
            context: "Sobre a integração da sombra"
        },
        {
            quote: "A verdadeira alquimia não transforma chumbo em ouro, mas a alma humana.",
            author: "Paracelso",
            context: "Sobre o propósito espiritual da alquimia"
        },
        {
            quote: "Tudo que somos é resultado do que pensamos.",
            author: "Buda",
            context: "Sobre o poder da mente"
        },
        {
            quote: "A primeira gota de orvalho cai da mesma forma que o dilúvio.",
            author: "Provérbio alquímico",
            context: "Sobre a unidade do micro e macrocosmo"
        },
        {
            quote: "Não é a consciência dos homens que determina seu ser, mas, ao contrário, seu ser social que determina sua consciência.",
            author: "Karl Marx",
            context: "Sobre a relação entre matéria e consciência"
        },
        {
            quote: "A imaginação é mais importante que o conhecimento.",
            author: "Albert Einstein",
            context: "Sobre a criatividade científica"
        },
        {
            quote: "O Self não é apenas o centro, mas também a circunferência que abrange tanto a consciência quanto o inconsciente.",
            author: "Carl Gustav Jung",
            context: "Sobre a totalidade psíquica"
        }
    ],
    
    tutorialSteps: [
        {
            title: "A Jornada Começa",
            content: "Bem-vindo ao Athanor. Esta jornada combina psicologia junguiana, alquimia e física quântica para explorar sua psique através de transmutações simbólicas.",
            action: "Explore os arquétipos no painel esquerdo"
        },
        {
            title: "Os Arquétipos",
            content: "Arquétipos são padrões universais do inconsciente coletivo. Cada um representa um aspecto fundamental da experiência humana.",
            action: "Clique em um arquétipo para aprender sobre ele"
        },
        {
            title: "O Caldeirão",
            content: "O caldeirão alquímico é onde a transmutação ocorre. Arraste arquétipos para aqui para combiná-los.",
            action: "Arraste dois arquétipos para o caldeirão"
        },
        {
            title: "O Labirinto Quântico",
            content: "O labirinto representa sua jornada de autoconhecimento. Desenhe caminhos para conectar arquétipos e ativar transmutações.",
            action: "Desenhe um caminho no labirinto"
        },
        {
            title: "Transmutação",
            content: "Quando combina arquétipos, cria novas sínteses. Cada transmutação revela insights sobre si mesmo.",
            action: "Complete sua primeira transmutação"
        },
        {
            title: "O Diário Alquímico",
            content: "Seu diário registra todas as transmutações e insights. Revise-o para ver seu progresso na jornada.",
            action: "Abra seu diário"
        },
        {
            title: "Conquistas",
            content: "Conquistas marcam marcos em sua jornada alquímica. Cada uma representa um nível de maestria.",
            action: "Verifique suas conquistas"
        },
        {
            title: "Jornada Contínua",
            content: "A alquimia é processo contínuo. Continue explorando combinações e descobrindo novos aspectos de si mesmo.",
            action: "Continue sua jornada"
        }
    ]
};

console.log('✅ Banco de dados narrativo carregado');