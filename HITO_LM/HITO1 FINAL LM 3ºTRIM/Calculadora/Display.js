class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '÷',
            porcentaje: '%',
            cuadrado: 'x²',
            raizCuadrada: '√'
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        if (tipo === 'cuadrado' || tipo === 'raizCuadrada') {
            this.tipoOperacion = tipo;
            this.calcular();
            this.tipoOperacion = 'igual';
        } else if (tipo === 'porcentaje') {
            this.valorActual = this.calculador.porcentaje(this.valorActual);
            this.imprimirValores();
        } else {
            this.tipoOperacion !== 'igual' && this.calcular();
            this.tipoOperacion = tipo;
            this.valorAnterior = this.valorActual || this.valorAnterior;
            this.valorActual = '';
            this.imprimirValores();
        }
    }

    agregarNumero(numero) {
        if (numero === '.' && this.valorActual.includes('.')) return;
        this.valorActual = this.valorActual.toString() + numero;
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorActual) || isNaN(valorAnterior)) return;

        switch (this.tipoOperacion) {
            case 'sumar':
            case 'restar':
            case 'multiplicar':
            case 'dividir':
                this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
                break;
            case 'cuadrado':
                this.valorActual = this.calculador.cuadrado(valorAnterior || valorActual);
                break;
            case 'raizCuadrada':
                this.valorActual = this.calculador.raizCuadrada(valorAnterior || valorActual);
                break;
            default:
                break;
        }
    }
}
