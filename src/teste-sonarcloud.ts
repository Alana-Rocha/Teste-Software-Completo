function calcularSoma(a: number, b: number) {
  var resultado = a + b;
  console.log("O resultado é: " + resultado);
}

function verificarNumeroPar(numero: number) {
  if (numero % 2 == 0) {
    console.log("O número é par.");
  } else {
    console.log("O número é ímpar.");
  }
}

function exemploMásPraticas() {
  for (var i = 0; i < 10; i++) {
    console.log("Iteração " + i);
  }

  var array = [1, 2, 3];
  console.log(array[3]);

  var objeto: any = {};
  objeto.propriedade1 = 1;
  objeto.propriedade2 = 2;

  calcularSoma(3, 4);

  verificarNumeroPar(5);
}

exemploMásPraticas();
