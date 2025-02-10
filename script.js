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
        this.combinacoes = {
            'agua,fogo': {
                mensagem: 'Água + Fogo = Vapor da Transformação 🔥💧',
                efeito: () => this.revelarCaminho('espiral')
            },
            'terra,ar': {
                mensagem: 'Terra + Ar = Tempestade da Criação 🌪️🌱',
                efeito: () => this.revelarCaminho('cristal')
            },
            'fogo,ar': {
                mensagem: 'Fogo + Ar = Chama da Inspiração 🔥🌪️',
                efeito: () => this.ativarSimboloEspecial('inspiracao')
            }
        };
        this.canvas = document.getElementById('labyrinthCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.path = [];
        this.isDrawing = false;
        this.ctx.globalCompositeOperation = 'source-over';
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
        this.mostrarTutorialInicial();
    }

    mostrarTutorialInicial() {
        const tutorial = document.getElementById('tutorial');
        if (!localStorage.getItem('tutorialVisto')) {
            tutorial.style.display = 'flex';
            localStorage.setItem('tutorialVisto', 'true');
        }
    }

    configurarMenu() {
        const menuIcon = document.getElementById('menuIcon');
        const menu = document.getElementById('menu');
        
        menuIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
                menu.classList.remove('active');
            }
        });

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                menu.classList.remove('active');
            });
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
                    this.reproduzirSom('flip');
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
                    this.reproduzirSom('symbol');
                } else {
                    this.simbolosAtivos.delete(elemento);
                }
                
                this.verificarCombinacoes();
            });
        });
    }

    verificarCombinacoes() {
        const elementos = [...this.arquetiposAtivos, ...this.simbolosAtivos];
        const combinacaoOrdenada = elementos.sort().join(',');
        
        if (this.combinacoes[combinacaoOrdenada]) {
            this.ativarEfeitoCombinacao(combinacaoOrdenada);
            return;
        }
        
        const combinacoesPossiveis = Object.keys(this.combinacoes).filter(chave => 
            chave.split(',').every(elemento => elementos.includes(elemento))
        );
        
        if (combinacoesPossiveis.length > 0) {
            this.mostrarDicaCombinacao(combinacoesPossiveis[0]);
        } else {
            document.getElementById('legendaAlquimia').textContent = '';
        }
    }

    ativarEfeitoCombinacao(chave) {
        const combinacao = this.combinacoes[chave];
        this.mostrarMensagemAlquimia(combinacao.mensagem);
        combinacao.efeito();
        
        anime({
            targets: '#caldeiraoAlquimico',
            scale: [1, 1.2],
            duration: 1000,
            easing: 'easeInOutQuad',
            direction: 'alternate'
        });
    }

    mostrarDicaCombinacao(chave) {
        const elementos = chave.split(',');
        const dica = elementos.map(elemento => {
            switch(elemento) {
                case 'agua': return '🌊';
                case 'fogo': return '🔥';
                case 'terra': return '🌱';
                case 'ar': return '🌪️';
                default: return '';
            }
        }).join(' + ');
        
        document.getElementById('legendaAlquimia').innerHTML = 
            `Dica: Combine ${dica} para revelar novos caminhos!`;
    }

    configurarLabirinto() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        
        document.getElementById('selecionarLabirinto').addEventListener('change', (event) => {
            this.labirintos[event.target.value]();
            this.canvas.classList.remove('concluido');
            this.tempoInicial = Date.now();
        });

        this.configurarEventosCanvas();
    }

    configurarEventosCanvas() {
        this.canvas.addEventListener('mousedown', (event) => this.iniciarDesenho(event));
        this.canvas.addEventListener('mousemove', (event) => this.desenhar(event));
        this.canvas.addEventListener('mouseup', () => this.finalizarDesenho());
        this.canvas.addEventListener('mouseleave', () => this.finalizarDesenho());
        
        this.canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.iniciarDesenho(event.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            this.desenhar(event.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => this.finalizarDesenho());
    }

    criarLabirintoChartres() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
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
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const lados = 8;
        const raio = 100;
        const centro = { 
            x: this.canvas.width / 2, 
            y: this.canvas.height / 2 
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
        this.ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const centro = { 
            x: this.canvas.width / 2, 
            y: this.canvas.height / 2 
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

    iniciarDesenho(evento) {
        this.isDrawing = true;
        const posicao = this.getMousePos(evento);
        this.path = [posicao];
        this.ctx.beginPath();
        this.ctx.moveTo(posicao.x, posicao.y);
        this.reproduzirSom('start');
    }

    desenhar(evento) {
        if (!this.isDrawing) return;
        const posicao = this.getMousePos(evento);
        
        this.ctx.lineTo(posicao.x, posicao.y);
        const estaCorreto = this.verificarPosicao(posicao);
        
        this.ctx.strokeStyle = estaCorreto ? 
            getComputedStyle(document.documentElement).getPropertyValue('--primary') : '#ff4444';
        this.ctx.lineWidth = estaCorreto ? 4 : 8;
        this.ctx.stroke();
        
        if (!estaCorreto) {
            this.criarParticulaErro(posicao);
        }
        
        this.path.push(posicao);
    }

    criarParticulaErro(posicao) {
        const particula = document.createElement('div');
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
            easing: 'easeOutExpo',
            complete: () => particula.remove()
        });
    }

    finalizarDesenho() {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        
        const acertos = this.path.filter(ponto => this.verificarPosicao(ponto)).length;
        const precisao = acertos / this.path.length;
        
        if (precisao > 0.9) {
            this.canvas.classList.add('concluido');
            this.mostrarMensagemAlquimia('Caminho Iluminado! 🌟');
            this.reproduzirSom('success');
        } else if (precisao > 0.6) {
            this.mostrarMensagemAlquimia('Continue tentando! 💪');
        } else {
            this.mostrarMensagemAlquimia('Tente novamente! 🔄');
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
            this.reproduzirSom('reset');
        });
    }

    mostrarMensagemAlquimia(mensagem) {
        const legenda = document.getElementById('legendaAlquimia');
        legenda.textContent = mensagem;
        legenda.style.animation = 'none';
        legenda.offsetHeight;
        legenda.style.animation = 'pulsarTexto 1.5s infinite';
    }

    reproduzirSom(tipo) {
        const sons = {
            flip: new Audio('data:audio/wav;base64,UklGRl9v...'), // Som base64 encurtado
            symbol: new Audio('data:audio/wav;base64,UklGRkZ...'),
            success: new Audio('data:audio/wav;base64,UklGRkZ...'),
            reset: new Audio('data:audio/wav;base64,UklGRkZ...'),
            start: new Audio('data:audio/wav;base64,UklGRkZ...')
        };
        if (sons[tipo]) {
            sons[tipo].play().catch(error => console.log('Reprodução de som bloqueada pelo navegador'));
        }
    }

    ativarSimboloEspecial(tipo) {
        const simbolos = document.querySelectorAll('.simbolo');
        simbolos.forEach(simbolo => {
            simbolo.style.transform = 'rotate(360deg)';
            setTimeout(() => simbolo.style.transform = '', 1000);
        });
    }
}

window.addEventListener('load', () => {
    new JogoAlquimia();
});
