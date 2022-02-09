///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////INFORMAÇÕES DE DESENVOLVIMENTO/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////                                                                                               ////
////	NOME ARQUIVO.....................: GERADOR.JS  		                                       ////
////	OBJETIVO.........................: GERADOR DE CPF E CNPJ VÁLIDOS                           ////
////	DESENVOLVIDO POR.................: WELBERT H. OLIVEIRA                                     ////
////	E-MAIL...........................: welbert.oliveira@gmail.com                              ////
////	CELULAR..........................: +55 (31) 98582-3150                                     ////
////	DATA DE DESENVOLVIMENTO..........: 21/04/2020                                              ////
////                                                                                               ////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////INFORMAÇÕES DE ALTERAÇÕES///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////                                                                                               ////
////	ALTERADO POR.....................:                                                         ////
////	E-MAIL...........................:                                                         ////
////	CELULAR..........................:                                                         ////
////	DATA DE ALTERAÇÃO................:                                                         ////
////                                                                                               ////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNÇÃO PARA GERAR NÚMEROS RANDOMICOS
function gera_random(n){
    var ranNum = Math.round(Math.random()*n);
    return ranNum;
}
//FUNÇÃO PARA RETORNAR O RESTO DA DIVISAO ENTRE NÚMEROS
function mod(dividendo,divisor){
    return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}
//FUNÇÃO QUE GERA O CPF VÁLIDO
function cpf(){
    var n = 9;
    var n1 = gera_random(n);
    var n2 = gera_random(n);
    var n3 = gera_random(n);
    var n4 = gera_random(n);
    var n5 = gera_random(n);
    var n6 = gera_random(n);
    var n7 = gera_random(n);
    var n8 = gera_random(n);
    var n9 = gera_random(n);
    var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
    d1 = 11 - ( mod(d1,11) );
    if (d1>=10) d1 = 0;
    var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
    d2 = 11 - ( mod(d2,11) );
    if (d2>=10) d2 = 0;
    return ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
}
//FUNÇÇÃO QUE GERA O CNPJ
function cnpj(){
    var n = 9;
    var n1  = gera_random(n);
    var n2  = gera_random(n);
    var n3  = gera_random(n);
    var n4  = gera_random(n);
    var n5  = gera_random(n);
    var n6  = gera_random(n);
    var n7  = gera_random(n);
    var n8  = gera_random(n);
    var n9  = 0;//gera_random(n);
    var n10 = 0;//gera_random(n);
    var n11 = 0;//gera_random(n);
    var n12 = 1;//gera_random(n);
    var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
    d1 = 11 - ( mod(d1,11) );
    if (d1>=10) d1 = 0;
    var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
    d2 = 11 - ( mod(d2,11) );
    if (d2>=10) d2 = 0;
    return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
}
//FUNÇÃO PARA ESCOLHER QUAL DAS FUNÇÕES VAI SER CHAMADA
function faz(){
    if (document.form1.tipo[0].checked)
        document.form1.numero.value = cpf();
    else
        document.form1.numero.value = cnpj();
}