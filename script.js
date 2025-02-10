class JogoAlquimia {
    constructor() {
        this.arquetiposAtivos = new Set();
        this.simbolosAtivos = new Set();
        this.tempoInicial = Date.now();
        this.temporizadorInterval = null;
        this.labirintos = {
            chartres: this.criarLabirintoChartres.bind(this),
            cristal: this.criarLabirintoCristal.bind(this),
            espiral: this.criarLabirintoEspiral.bind(this)
        };
        this.canvas = document.getElementById('labyrinthCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.path = [];
        this.isDrawing = false;
        this.init();
    }

    init() {
        this.configurarMenu();
        this.configurarArquetipos();
        this.configurarSimbolos();
        this.configurarLabirinto();
        this.configurarTemporizador();
        this.configurarReinicio();
        this.labirintos.chartres();
    }

    configurarMenu() {
        const menuIcon = document.getElementById('menuIcon');
        const menu = document.getElementById('menu');
        
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    configurarArquetipos() {
        document.querySelectorAll('.card-arquetipo').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
                const elemento = card.dataset.elemento;
                
                if (card.classList.contains('flipped')) {
                    this.arquetiposAtivos.add(elemento);
                    this.mostrarEfeitoFusao(card);
                } else {
                    this.arquetiposAtivos.delete(elemento);
                }
                
                this.verificarCombinacoes();
            });
        });
    }

    mostrarEfeitoFusao(elemento) {
        const clone = elemento.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.opacity = '0';
        clone.style.transform = 'scale(0)';
        document.body.appendChild(clone);
        
        const retangulo = elemento.getBoundingClientRect();
        const caldeirao = document.getElementById('caldeiraoAlquimico');
        const destino = caldeirao.getBoundingClientRect();
        
        anime({
            targets: clone,
            opacity: [0, 1],
            scale: [0, 1.5],
            top: [`${retangulo.top}px`, `${destino.top}px`],
            left: [`${retangulo.left}px`, `${destino.left}px`],
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: () => clone.remove()
        });
    }

    configurarSimbolos() {
        document.querySelectorAll('.simbolo').forEach(simbolo => {
            simbolo.addEventListener('click', () => {
                simbolo.classList.toggle('ativo');
                const elemento = simbolo.dataset.elemento;
                
                if (simbolo.classList.contains('ativo')) {
                    this.simbolosAtivos.add(elemento);
                } else {
                    this.simbolosAtivos.delete(elemento);
                }
                
                this.verificarCombinacoes();
            });
        });
    }

    verificarCombinacoes() {
        const combinacoes = {
            'agua,fogo': {
                mensagem: 'Água + Fogo = Vapor da Transformação',
                efeito: () => this.revelarCaminho('espiral')
            },
            'terra,ar': {
                mensagem: 'Terra + Ar = Tempestade da Criação',
                efeito: () => this.revelarCaminho('cristal')
            }
        };

        const elementos = [...this.arquetiposAtivos, ...this.simbolosAtivos].sort().join(',');
        
        if (combinacoes[elementos]) {
            this.mostrarMensagemAlquimia(combinacoes[elementos].mensagem);
            combinacoes[elementos].efeito();
        }
    }

    revelarCaminho(labirinto) {
        document.getElementById('selecionarLabirinto').value = labirinto;
        this.labirintos[labirinto]();
    }

    mostrarMensagemAlquimia(mensagem) {
        const legenda = document.getElementById('legendaAlquimia');
        legenda.textContent = mensagem;
        legenda.style.animation = 'none';
        legenda.offsetHeight;
        legenda.style.animation = 'pulsarTexto 1.5s infinite';
    }

    configurarLabirinto() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        
        document.getElementById('selecionarLabirinto').addEventListener('change', (e) => {
            this.labirintos[e.target.value]();
        });

        this.canvas.addEventListener('mousedown', (e) => this.iniciarDesenho(e));
        this.canvas.addEventListener('mousemove', (e) => this.desenhar(e));
        this.canvas.addEventListener('mouseup', () => this.finalizarDesenho());
        this.canvas.addEventListener('mouseleave', () => this.finalizarDesenho());
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.iniciarDesenho(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.desenhar(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => this.finalizarDesenho());
    }

    criarLabirintoChartres() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary');
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const centerX = this.canvas.width/2;
        const centerY = this.canvas.height/2;
        
        // Labirinto estilo Chartres
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
        this.ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary');
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const lados = 8;
        const raio = 100;
        const centro = { 
            x: this.canvas.width/2, 
            y: this.canvas.height/2 
        };
        
        for(let i = 0; i < lados; i++) {
            const angulo = (i * (360/lados)) * Math.PI/180;
            const x = centro.x + Math.cos(angulo) * raio;
            const y = centro.y + Math.sin(angulo) * raio;
            
            this.ctx.moveTo(centro.x, centro.y);
            this.ctx.lineTo(x, y);
            
            if(i % 2 === 0) {
                this.ctx.arc(x, y, 30, 0, Math.PI * 2);
            }
        }
        this.ctx.stroke();
    }

    criarLabirintoEspiral() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary');
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const centro = { 
            x: this.canvas.width/2, 
            y: this.canvas.height/2 
        };
        let raio = 10;
        
        for(let i = 0; i < 500; i++) {
            const angulo = 0.1 * i;
            const x = centro.x + (raio + angulo) * Math.cos(angulo);
            const y = centro.y + (raio + angulo) * Math.sin(angulo);
            
            if(i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
            
            raio += 0.1;
        }
        this.ctx.stroke();
    }

    iniciarDesenho(e) {
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.path = [pos];
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    }

    desenhar(e) {
        if (!this.isDrawing) return;
        const pos = this.getMousePos(e);
        
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.strokeStyle = this.verificarPosicao(pos) ? 
            getComputedStyle(document.documentElement).getPropertyValue('--primary') : '#ff4444';
        this.ctx.lineWidth = 4;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        this.path.push(pos);
    }

    verificarPosicao(pos) {
        return this.ctx.isPointInStroke(pos.x, pos.y);
    }

    finalizarDesenho() {
        this.isDrawing = false;
        const acertos = this.path.filter(p => this.verificarPosicao(p)).length;
        if (acertos / this.path.length > 0.9) {
            this.canvas.classList.add('concluido');
            this.mostrarMensagemAlquimia('Caminho Iluminado!');
        }
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    configurarTemporizador() {
        this.temporizadorInterval = setInterval(() => {
            const tempoDecorrido = Math.floor((Date.now() - this.tempoInicial) / 1000);
            const minutos = Math.floor(tempoDecorrido / 60).toString().padStart(2, '0');
            const segundos = (tempoDecorrido % 60).toString().padStart(2, '0');
            document.querySelector('.temporizador').textContent = `⏳ ${minutos}:${segundos}`;
        }, 1000);
    }

    configurarReinicio() {
        document.getElementById('reiniciarLabirinto').addEventListener('click', () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.labirintos[document.getElementById('selecionarLabirinto').value]();
            this.canvas.classList.remove('concluido');
            this.tempoInicial = Date.now();
            this.path = [];
        });
    }
}

window.addEventListener('load', () => {
    new JogoAlquimia();
});