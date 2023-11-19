function calcularSoma(a, b) {
  var resultado = a + b;
  console.log("O resultado é: " + resultado);
}

function verificarNumeroPar(numero: string) { // forçando tipo errado
  if (numero % 2 == 0) {
    console.log("O número é par.");
  } else {
    console.log("O número é ímpar.");
  }
}

function exemploMásPraticas() {
  var variavelNaoUsada;

  for (var i = 0; i < 10; i++) {
    console.log("Iteração " + i);
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log("Loop infinito");
  }

  var array = [1, 2, 3];
  console.log("Elemento inexistente: " + array[10]);

  var objeto: any = {};
  objeto.propriedade1 = 1;
  objeto.propriedade2 = 2;
  console.log("Propriedade inexistente: " + objeto.propriedade3);

  var texto = "Isso é uma string muito longa que ultrapassa o limite permitido por boas práticas, então o SonarCloud pode apontar isso como um problema.";

  calcularSoma(3, 4);

  verificarNumeroPar(5);
}

exemploMásPraticas();