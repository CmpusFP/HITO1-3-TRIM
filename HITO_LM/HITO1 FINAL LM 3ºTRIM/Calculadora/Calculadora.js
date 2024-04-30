class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        if (num2 == 0) {
            alert("División por cero");
            return 0;
        } else {
            return num1 / num2;
        }
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }

    porcentaje(num) {
        return num / 100;
    }

    cuadrado(num) {
        return num * num;
    }

    raizCuadrada(num) {
        return Math.sqrt(num);
    }
}
