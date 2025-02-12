document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("mainMenu");

    // Configuração completa do Menu Hamburguer
    menuIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    menu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});

const RELACOES_ALQUIMICAS = {
    agua: {
        simbolos: ["triquetra"],
        labirintos: ["espiral"],
        combinações: {
            fogo: { 
                mensagem: "Vapor da Purificação 💧🔥", 
                efeito: "aquecerLabirinto" 
            }
        }
    },
    fogo: {
        simbolos: ["ouroboros"],
        labirintos: ["cristal"],
        combinações: {
            ar: { 
                mensagem: "Chama Cósmica 🔥🌪️", 
                efeito: "acelerarLabirinto" 
            }
        }
    },
    terra: {
        simbolos: ["arvore"],
        labirintos: ["hexagono"],
        combinações: {
            ar: { 
                mensagem: "Terremoto Mental 🌪️🌍", 
                efeito: "adicionarObstaculos" 
            }
        }
    },
    ar: {
        simbolos: ["caduceu"],
        labirintos: ["mandala"],
        combinações: {
            agua: { 
                mensagem: "Névoa do Saber 🌪️💧", 
                efeito: "suavizarLabirinto" 
            }
        }
    }
};

class TutorialDinamico {
    constructor() {
        this.passos = {
            1: "Selecione um arquétipo clicando em sua carta",
            2: "Ative um símbolo alquímico correspondente",
            3: "Observe as mudanças no caldeirão e nos labirintos",
            4: "Use as novas propriedades para resolver desafios"
        };
        this.passoAtual = 1;
    }

    iniciar() {
        if (!localStorage.getItem("tutorialCompleto")) {
            this.mostrarProximoPasso();
        }
    }

    mostrarProximoPasso() {
        if (this.passoAtual > 4) {
            localStorage.setItem("tutorialCompleto", "true");
            return;
        }

        const popup = this.criarPopup(this.passos[this.passoAtual]);
        document.body.appendChild(popup);

        anime({
            targets: popup,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 500,
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: popup,
                        opacity: 0,
                        duration: 500,
                        complete: () => {
                            popup.remove();
                            this.passoAtual++;
                            this.mostrarProximoPasso();
                        }
                    });
                }, 3000);
            }
        });
    }

    criarPopup(mensagem) {
        const popup = document.createElement("div");
        popup.className = "popup-tutorial";
        popup.innerHTML = `
            <div class="seta-tutorial"></div>
            <p>${mensagem}</p>
        `;
        return popup;
    }
}

class GerenciadorAssets {
    constructor() {
        this.cache = new Map();
    }

    async carregarTexturas() {
        try {
            const texturas = [
                { nome: "agua"},
                { nome: "fogo"}
            ];

            await Promise.all(texturas.map(async textura => {
                const resposta = await fetch(textura.url);
                const blob = await resposta.blob();
                this.cache.set(textura.nome, URL.createObjectURL(blob));
            }));
        } catch (erro) {
            console.error("Erro no carregamento:", erro);
        }
    }
}

class RenderizadorLabirinto {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.fatorEscala = window.devicePixelRatio || 1;
        this.configurarResolucao();
    }

    configurarResolucao() {
        this.canvas.width = this.canvas.offsetWidth * this.fatorEscala;
        this.canvas.height = this.canvas.offsetHeight * this.fatorEscala;
        this.ctx.scale(this.fatorEscala, this.fatorEscala);
    }

    desenharLabirinto(pontos) {
        this.ctx.beginPath();
        pontos.forEach((ponto, index) => {
            if (index === 0) this.ctx.moveTo(ponto.x, ponto.y);
            else this.ctx.lineTo(ponto.x, ponto.y);
        });
        this.ctx.stroke();
    }
}

class JogoAlquimia {
    constructor() {
        this.arquetiposAtivos = new Set();
        this.simbolosAtivos = new Set();
        this.tempoInicial = Date.now();
        this.temporizadorInterval = null;
        this.canvas = document.getElementById("labyrinthCanvas");
        this.renderizador = new RenderizadorLabirinto(this.canvas);
        this.ctx = this.renderizador.ctx;
        this.labirintos = {
            chartres: this.criarLabirintoChartres.bind(this),
            cristal: this.criarLabirintoCristal.bind(this),
            espiral: this.criarLabirintoEspiral.bind(this),
            mandala: this.criarLabirintoMandala.bind(this),
            hexagono: this.criarLabirintoHexagonal.bind(this)
        };
        this.assets = new GerenciadorAssets();
        this.tutorial = new TutorialDinamico();
        this.init();
    }

    async init() {
        await this.assets.carregarTexturas();
        this.configurarEventosArrasto();
        this.configurarArquetipos();
        this.configurarSimbolos();
        this.configurarLabirinto();
        this.configurarTemporizador();
        this.configurarReinicio();
        this.labirintos.chartres();
        this.tutorial.iniciar();
    }

    configurarEventosArrasto() {
        document.querySelectorAll(".card-arquetipo, .simbolo").forEach(elemento => {
            elemento.setAttribute("draggable", true);
            
            elemento.addEventListener("dragstart", e => {
                e.dataTransfer.setData("tipo", elemento.classList.contains("card-arquetipo") ? "arquetipo" : "simbolo");
                e.dataTransfer.setData("elemento", elemento.dataset.elemento || elemento.dataset.simbolo);
            });
        });

        document.querySelectorAll(".slot").forEach(slot => {
            slot.addEventListener("dragover", e => e.preventDefault());
            
            slot.addEventListener("drop", e => {
                e.preventDefault();
                const tipo = e.dataTransfer.getData("tipo");
                const valor = e.dataTransfer.getData("elemento");
                
                if (tipo === "arquetipo") {
                    this.arquetiposAtivos.add(valor);
                    slot.style.backgroundImage = `url(${this.assets.cache.get(valor)})`;
                } else {
                    this.simbolosAtivos.add(valor);
                    slot.style.backgroundImage = `url(${this.assets.cache.get(valor)})`;
                }
                
                this.verificarCombinacao();
            });
        });
    }

    verificarCombinacao() {
        const [arquetipo] = this.arquetiposAtivos;
        const [simbolo] = this.simbolosAtivos;
        
        if (!arquetipo || !simbolo) return;

        const relacao = RELACOES_ALQUIMICAS[arquetipo];
        const combinacaoValida = relacao.simbolos.includes(simbolo);

        if (combinacaoValida) {
            this.ativarEfeitoCombinado(arquetipo, simbolo);
            this.revelarLabirintoRelacionado(arquetipo);
        } else {
            this.mostrarConflitoAlquimico(arquetipo, simbolo);
        }
    }

    ativarEfeitoCombinado(arquetipo, simbolo) {
        const mensagem = RELACOES_ALQUIMICAS[arquetipo].combinações[simbolo]?.mensagem;
        this.mostrarMensagemAlquimia(mensagem);
        this.aplicarEfeitoVisual(arquetipo);
    }

    aplicarEfeitoVisual(elemento) {
        const textura = this.assets.cache.get(elemento);
        this.canvas.style.backgroundImage = `url(${textura})`;
        
        switch(elemento) {
            case 'agua':
                this.canvas.style.filter = "hue-rotate(180deg)";
                break;
            case 'fogo':
                this.canvas.style.animation = "pulsacao-fogo 1s infinite";
                break;
            case 'terra':
                this.canvas.style.backgroundSize = "contain";
                break;
            case 'ar':
                this.ctx.globalCompositeOperation = "lighter";
                break;
        }
    }

    revelarLabirintoRelacionado(arquetipo) {
        const labirintos = RELACOES_ALQUIMICAS[arquetipo].labirintos;
        const select = document.getElementById("selecionarLabirinto");
        
        labirintos.forEach(labirinto => {
            if (![...select.options].some(opt => opt.value === labirinto)) {
                const option = new Option(
                    `${this.obterIconeLabirinto(labirinto)} ${this.formatarNomeLabirinto(labirinto)}`,
                    labirinto
                );
                select.add(option);
            }
        });
    }

    obterIconeLabirinto(labirinto) {
        const icones = {
            espiral: "🌀",
            cristal: "🔮",
            mandala: "🕉️",
            hexagono: "📐"
        };
        return icones[labirinto] || "🌌";
    }

    formatarNomeLabirinto(labirinto) {
        return labirinto.charAt(0).toUpperCase() + labirinto.slice(1);
    }

    // Implementações completas dos labirintos
    criarLabirintoChartres() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.moveTo(centerX - 150, centerY - 100);
        this.ctx.bezierCurveTo(
            centerX - 50, centerY - 200,
            centerX + 50, centerY + 200,
            centerX + 150, centerY - 100
        );
        this.ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    criarLabirintoCristal() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const lados = 8;
        const raio = 100;
        const centro = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        };

        for (let i = 0; i < lados; i++) {
            const angulo = (i * (360 / lados)) * Math.PI / 180;
            const x = centro.x + Math.cos(angulo) * raio;
            const y = centro.y + Math.sin(angulo) * raio;

            this.ctx.moveTo(centro.x, centro.y);
            this.ctx.lineTo(x, y);

            if (i % 2 === 0) {
                this.ctx.arc(x, y, 30, 0, Math.PI * 2);
            }
        }
        this.ctx.stroke();
    }

    criarLabirintoEspiral() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const centro = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        };
        let raio = 10;

        for (let i = 0; i < 500; i++) {
            const angulo = 0.1 * i;
            const x = centro.x + (raio + angulo) * Math.cos(angulo);
            const y = centro.y + (raio + angulo) * Math.sin(angulo);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            raio += 0.1;
        }
        this.ctx.stroke();
    }

    criarLabirintoMandala() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
        this.ctx.lineWidth = 3;

        const centro = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        const camadas = 8;

        for (let i = 0; i < camadas; i++) {
            this.ctx.beginPath();
            this.ctx.arc(centro.x, centro.y, 30 + (i * 30), 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(centro.x - 100 + (i * 15), centro.y);
            this.ctx.lineTo(centro.x + 100 - (i * 15), centro.y);
            this.ctx.stroke();
        }
    }

    criarLabirintoHexagonal() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
        this.ctx.lineWidth = 3;

        const lados = 6;
        const raio = 120;
        const centro = { x: this.canvas.width / 2, y: this.canvas.height / 2 };

        this.ctx.beginPath();
        for (let i = 0; i <= lados; i++) {
            const angulo = (i * 2 * Math.PI / lados) - Math.PI / 2;
            const x = centro.x + raio * Math.cos(angulo);
            const y = centro.y + raio * Math.sin(angulo);

            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        for (let i = 0; i < lados; i++) {
            const angulo = (i * 2 * Math.PI / lados) - Math.PI / 2;
            const x = centro.x + (raio / 2) * Math.cos(angulo);
            const y = centro.y + (raio / 2) * Math.sin(angulo);

            this.ctx.beginPath();
            this.ctx.moveTo(centro.x, centro.y);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    configurarArquetipos() {
        document.querySelectorAll(".card-arquetipo").forEach(card => {
            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
                const elemento = card.dataset.elemento;

                if (card.classList.contains("flipped")) {
                    this.arquetiposAtivos.add(elemento);
                    this.mostrarEfeitoFusao(card);
                } else {
                    this.arquetiposAtivos.delete(elemento);
                }

                this.verificarCombinacao();
            });
        });
    }

    mostrarEfeitoFusao(elemento) {
        const clone = elemento.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.opacity = "0";
        clone.style.transform = "scale(0)";
        document.body.appendChild(clone);

        const retangulo = elemento.getBoundingClientRect();
        const caldeirao = document.getElementById("caldeiraoAlquimico");
        const destino = caldeirao.getBoundingClientRect();

        anime({
            targets: clone,
            opacity: [0, 1],
            scale: [0, 1.5],
            top: [`${retangulo.top}px`, `${destino.top}px`],
            left: [`${retangulo.left}px`, `${destino.left}px`],
            duration: 1000,
            easing: "easeInOutQuad",
            complete: () => clone.remove()
        });
    }

    configurarSimbolos() {
        document.querySelectorAll(".simbolo").forEach(simbolo => {
            simbolo.addEventListener("click", () => {
                simbolo.classList.toggle("ativo");
                const tipo = simbolo.dataset.simbolo;
                const elemento = simbolo.dataset.elemento;

                if (simbolo.classList.contains("ativo")) {
                    const svg = this.generateSymbol(tipo);
                    simbolo.style.backgroundImage = `url("data:image/svg+xml;utf8,${svg}")`;
                    this.simbolosAtivos.add(elemento);
                } else {
                    simbolo.style.backgroundImage = "";
                    this.simbolosAtivos.delete(elemento);
                }

                this.verificarCombinacao();
            });
        });
    }

    generateSymbol(tipo) {
        const symbols = {
            ouroboros: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2c3e50" stroke-width="3"/>
                <path d="M30 50Q50 30 70 50Q50 70 30 50" fill="none" stroke="#d4b192" stroke-width="3"/>
            </svg>`,
            caduceu: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5v90M45 20l10-15 10 15M45 80l10 15 10-15" 
                      stroke="#2c3e50" stroke-width="3" fill="none"/>
            </svg>`,
            triquetra: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20a30 30 0 0 1 30 30 30 30 0 0 1-30 30 30 30 0 0 1-30-30 30 30 0 0 1 30-30m0 15a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15" 
                      stroke="#2c3e50" stroke-width="3" fill="none"/>
            </svg>`,
            arvore: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 95V50M50 50Q30 30 50 10Q70 30 50 50M40 35L50 25 60 35M45 45L50 40 55 45" 
                      stroke="#2c3e50" stroke-width="3" fill="none"/>
            </svg>`
        };

        return encodeURIComponent(symbols[tipo])
            .replace(/'/g, "%27")
            .replace(/"/g, "%22");
    }

    mostrarConflitoAlquimico(arquetipo, simbolo) {
        const mensagem = `Combinação perigosa! ${arquetipo} + ${simbolo} = Caos 🔥💥`;
        this.mostrarMensagemAlquimia(mensagem);
        this.ctx.fillStyle = "#ff4444";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.labirintos[document.getElementById("selecionarLabirinto").value]();
        }, 1000);
    }

    mostrarMensagemAlquimia(mensagem) {
        const legenda = document.getElementById("legendaAlquimia");
        legenda.textContent = mensagem;
        legenda.style.animation = "none";
        legenda.offsetHeight;
        legenda.style.animation = "pulsarTexto 1.5s infinite";
    }

    configurarLabirinto() {
        this.canvas.width = 600;
        this.canvas.height = 400;

        document.getElementById("selecionarLabirinto").addEventListener("change", (event) => {
            this.labirintos[event.target.value]();
            this.canvas.classList.remove("concluido");
            this.tempoInicial = Date.now();
        });

        this.configurarEventosCanvas();
    }

    configurarEventosCanvas() {
        this.canvas.addEventListener("mousedown", (event) => this.iniciarDesenho(event));
        this.canvas.addEventListener("mousemove", (event) => this.desenhar(event));
        this.canvas.addEventListener("mouseup", () => this.finalizarDesenho());
        this.canvas.addEventListener("mouseleave", () => this.finalizarDesenho());

        this.canvas.addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.iniciarDesenho(event.touches[0]);
        });
        this.canvas.addEventListener("touchmove", (event) => {
            event.preventDefault();
            this.desenhar(event.touches[0]);
        });
        this.canvas.addEventListener("touchend", () => this.finalizarDesenho());
    }

    iniciarDesenho(evento) {
        this.isDrawing = true;
        const posicao = this.getMousePos(evento);
        this.path = [posicao];
        this.ctx.beginPath();
        this.ctx.moveTo(posicao.x, posicao.y);
    }

    desenhar(evento) {
        if (!this.isDrawing) return;
        const posicao = this.getMousePos(evento);

        this.ctx.lineTo(posicao.x, posicao.y);
        const estaCorreto = this.verificarPosicao(posicao);

        this.ctx.strokeStyle = estaCorreto
            ? getComputedStyle(document.documentElement).getPropertyValue("--primary")
            : "#ff4444";
        this.ctx.lineWidth = estaCorreto ? 4 : 8;
        this.ctx.stroke();

        if (!estaCorreto) {
            this.criarParticulaErro(posicao);
        }

        this.path.push(posicao);
    }

    criarParticulaErro(posicao) {
        const particula = document.createElement("div");
        particula.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: #ff4444;
            border-radius: 50%;
            left: ${posicao.x + this.canvas.offsetLeft}px;
            top: ${posicao.y + this.canvas.offsetTop}px;
            pointer-events: none;
        `;
        document.body.appendChild(particula);

        anime({
            targets: particula,
            opacity: [1, 0],
            translateY: [-20, 0],
            duration: 1000,
            easing: "easeOutExpo",
            complete: () => particula.remove()
        });
    }

    finalizarDesenho() {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        const acertos = this.path.filter((ponto) => this.verificarPosicao(ponto)).length;
        const precisao = acertos / this.path.length;

        if (precisao > 0.6) {
            this.canvas.classList.add("concluido");
            this.mostrarMensagemAlquimia("Caminho Iluminado! 🌟");
            anime({
                targets: ".sistema-alquimico",
                scale: [1, 1.1],
                duration: 1000,
                easing: "easeInOutQuad",
                direction: "alternate"
            });
        } else if (precisao > 0.5) {
            this.mostrarMensagemAlquimia("Continue tentando! 💪");
        } else {
            this.mostrarMensagemAlquimia("Tente novamente! 🔄");
        }
    }

    verificarPosicao(posicao) {
        return this.ctx.isPointInStroke(posicao.x, posicao.y);
    }

    getMousePos(evento) {
        const retangulo = this.canvas.getBoundingClientRect();
        return {
            x: evento.clientX - retangulo.left,
            y: evento.clientY - retangulo.top
        };
    }

    configurarTemporizador() {
        this.temporizadorInterval = setInterval(() => {
            const tempoDecorrido = Math.floor((Date.now() - this.tempoInicial) / 1000);
            const minutos = Math.floor(tempoDecorrido / 60).toString().padStart(2, "0");
            const segundos = (tempoDecorrido % 60).toString().padStart(2, "0");
            document.querySelector(".temporizador").textContent = `⏳ ${minutos}:${segundos}`;
        }, 1000);
    }

    configurarReinicio() {
        document.getElementById("reiniciarLabirinto").addEventListener("click", () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.labirintos[document.getElementById("selecionarLabirinto").value]();
            this.canvas.classList.remove("concluido");
            this.tempoInicial = Date.now();
            this.path = [];
        });
    }
}

window.addEventListener("load", () => {
    new JogoAlquimia();
});
