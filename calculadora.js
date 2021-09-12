'use strict'

const screen = document.getElementById("tela");
const numeros = document.querySelectorAll("[id*=btn]"); //seletor css, IDs que com começam com btn
const operadores = document.querySelectorAll("[id*=operador]");

let numNovo = true;
let operador;
let numeroAntes;

const pendencia = () => operador !== undefined;

const calcular = () => {
   if (pendencia()){
       const numVigent =parseFloat(screen.textContent.replace(',','.'));
        numNovo = true;
        const valor = eval (`${numeroAntes}${operador}${numVigent}`);
        atualizarDisplay(valor);
          
        

      // if (operador == '+'){
      //     atualizarDisplay(numeroAntes + numVigent);
      // }else if (operador == '-'){
      //     atualizarDisplay(numeroAntes - numVigent);
      // }else if (operador == '*'){
      //  atualizarDisplay(numeroAntes * numVigent);
      // }else if (operador == '/'){
      //  atualizarDisplay(numeroAntes / numVigent);
        }
    }


const atualizarDisplay = (texto) => {
    if (numNovo){
        screen.textContent = texto.toLocaleString('pt-br'); // novo numero substitui por outro
        numNovo = false;
    }else {
        screen.textContent += texto; // se não concatena
    }
  
}
const inserirDigito = (Event) => atualizarDisplay(Event.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirDigito));

const inserirOperador = (Event) => {
    if(!numNovo) { 
    calcular()                              
    numNovo = true;
    operador = Event.target.textContent;
    numeroAntes =parseFloat(screen.textContent.replace(',','.'));

    }

}
operadores.forEach (operador =>operador.addEventListener('click', inserirOperador));


const acionarIgual = () =>{
    calcular();
    operador = undefined;
  
}
document.getElementById('igual').addEventListener('click', acionarIgual);

const apagarTudo = () => {
    screen.textContent = '';
    operador = undefined;
    numNovo = true;
    numeroAntes =undefined;
}

document.getElementById('resetarDisplay').addEventListener('click', apagarTudo );


const bkSpace = () =>screen.textContent = screen.textContent.slice(0,-1);
document.getElementById('backspace').addEventListener('click', bkSpace);

const temVirgula = () =>screen.textContent.indexOf(',') !== -1;
const temValor = () => screen.textContent.length > 0;
const flutuante = () => {
 if (!temVirgula()){
     if (temValor()){
         atualizarDisplay(',');
     } else {
         atualizarDisplay('0,')
     }
 }
}
document.getElementById('virgula').addEventListener('click', flutuante);

const teclado = {
    '0'   :  'btn0',
    '1'   :  'btn1',
    '2'   :  'btn2',
    '3'   :  'btn3',
    '4'   :  'btn4',
    '5'   :  'btn5',
    '6'   :  'btn6',
    '7'   :  'btn7',
    '8'   :  'btn8',
    '9'   :  'btn9', 
    ','   :  'virgula',
    '/'   :  'operadorDividir',
    '*'   :  'operadorMultiplicar',
    '+'   :  'operadorAdicionar',
    '-'   :  'operadorSubtrair',
    'Enter' : 'igual', // por algum motivo testei e não funcionou
    '='    :  'igual',
    'Escape' : 'resetarDisplay',
    'Backspace' : 'backspace'
   }



const mapTeclado = (Event) => {
    const tecla = Event.key;

    const teclaAutorizada = () => Object.keys(teclado).indexOf(tecla) !== -1; // vericar se tem tem as teclas pressionadas
    if(teclaAutorizada()) document.getElementById(teclado[tecla]).click();
   

}
document.addEventListener('keydown', mapTeclado);
