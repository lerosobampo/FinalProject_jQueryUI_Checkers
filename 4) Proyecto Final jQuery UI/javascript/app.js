  
$(document).ready(DamasChinas);	

function DamasChinas() 
{
	tableroMatriz();	  
	hacerTableroDamas();  
	movimientos();		  
}

var contador1 = 0;  	
var contador2 = 0;  	
var saltoDoble = false;	

var xInicial = null;		
var xDestino = null;			
var yInicial = null;		
var yDestino = null;			
var saltosPosibles = 0;	

var piezaActual = null;	
const pieza = { 'R':{'piezaOpuesta': 'N', 'reyOpuesto': 'NK'}, 'N':{'piezaOpuesta': 'R', 'reyOpuesto': 'RK'}} 

var turno1 = true;	
var turno2 = false;	
var tableroDamas = tableroMatriz();		

//-------------------------------------------- MATRIZ TABLERO --------------------------------------------//

function tableroMatriz()  
{
	return tableroDamas = 
	[

	[' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
	['R', ' ', 'R', ' ', 'R', ' ', 'R', ' '],
	[' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['N', ' ', 'N', ' ', 'N', ' ', 'N', ' '],
	[' ', 'N', ' ', 'N', ' ', 'N', ' ', 'N'],
	['N', ' ', 'N', ' ', 'N', ' ', 'N', ' ']
	
	];
}

//---------------------------------------------- CREAR TABLERO --------------------------------------------//

function hacerTableroDamas() 
{
	let cambio = 0;	
	for (var xI = 0; xI < 8; xI++) 
	{
		cambio = 1 - cambio; 
		for (var yI = 0; yI < 8; yI++) 
		{
			var tableroJuego = $('.tablero'); 
			if (cambio) 
			{
				var crearDiv1 = $('<div>').addClass('cuadradoTablero cuadradoRojo').attr(  
				{
					'x': xI, 
					'y': yI  
				});
				cambio = 1 - cambio;  
			} 
			else 
			{
				if (tableroDamas[xI][yI] === 'R') 	
				{
					var crearDiv1 = $('<div>').addClass('cuadradoTablero cuadradoNegro').attr(  
					{  
						'x': xI, 
						'y': yI   
					});
					var crearDiv2 = $('<div>').addClass('cuadradoTablero fichaRoja usarFicha').attr(  
					{
						'x': xI,  
						'y': yI   
					});

					crearDiv1.append(crearDiv2);  
					cambio = 1 - cambio;  
				} 
				else if (tableroDamas[xI][yI] === 'N') 	
				{
					var crearDiv1 = $('<div>').addClass('cuadradoTablero cuadradoNegro').attr( 
					{
						'x': xI,  
						'y': yI  
					});
					var crearDiv2 = $('<div>').addClass('cuadradoTablero fichaNegra usarFicha').attr( 
					{ 
						'x': xI,  
						'y': yI  
					});

					crearDiv1.append(crearDiv2);   
					cambio = 1 - cambio;   
				} 
				else 
				{
					var crearDiv1 = $('<div>').addClass('cuadradoTablero cuadradoNegro').attr(  
					{
						'x': xI,  
						'y': yI   
					});
					var crearDiv2 = $('<div>').addClass('cuadradoTablero usarFicha').attr(  
					{
						'x': xI,  
						'y': yI   
					});

					crearDiv1.append(crearDiv2);   
					cambio = 1 - cambio;  
				}
			}
			tableroJuego.append(crearDiv1); 
		}
	}
}

//---------------------------------------------- MOVIMIENTOS --------------------------------------------//

function movimientos() //clickHandler
{
	$(".tablero").on('click', '.fichaNegra', clickNegro);  
	$(".tablero").on('click', '.fichaRoja', clickRojo);  
	$(".tablero").on("click", ".highlight", saltoDestino);  
	$(".tablero").on("click", ".reyRojo", clickRojo);  
	$(".tablero").on("click", ".reyNegro", clickNegro);  
	$(".botonReset").on("click", resetGame); 
}

//------------------------------------------- MOVIMIENTO ROJO --------------------------------------------//

function clickRojo() 
{
	if(!saltoDoble)
	{
		$('.usarFicha').removeClass('highlight highlight2'); 
		xInicial = parseInt($(this).attr('x'));  
		yInicial = parseInt($(this).attr('y'));  
	}
	if(turno2)
	{
		$(`.usarFicha[x=${xInicial}][y=${yInicial}]`).addClass('highlight2');  
		decisionMovimientos();  
	}
}

//----------------------------------------- MOVIMIENTO NEGRO --------------------------------------------//

function clickNegro()  
{
	if(!saltoDoble)
	{
		$('.usarFicha').removeClass('highlight highlight2');  
		xInicial = parseInt($(this).attr('x'));  
		yInicial = parseInt($(this).attr('y'));  
	}
	if(turno1)
	{
		$(`.usarFicha[x=${xInicial}][y=${xInicial}]`).addClass('highlight2');
		decisionMovimientos();
	}
}


//----------------------------------- DECISION DE MOVIMIENTOS -----------------------------------------//

function decisionMovimientos()  
{
	piezaActual = tableroDamas[xInicial][yInicial];  

	switch(piezaActual)
	{
		case 'R':
		revisarAbajoIzquierda();  
		revisarAbajoDerecha(); 
		break;

		case 'N': 
		revisarArribaIzquierda();  
		revisarArribaDerecha();  
		break;

		case 'RK':
		revisarAbajoIzquierda(); 
		revisarAbajoDerecha();  
		revisarArribaIzquierda();  
		revisarArribaDerecha();  
		break;

		case 'NK':
		revisarAbajoIzquierda(); 
		revisarAbajoDerecha();  
		revisarArribaIzquierda();  
		revisarArribaDerecha();  
		break; 
	}
}

//----------------------------------- MOVER ABAJO IZQUIERDA -----------------------------------------//

function revisarAbajoIzquierda()
{
	let x1AbajoIzquierda = xInicial+1;  
	let x2AbajoIzquierda = xInicial+2;  
	let y1AbajoIzquierda = yInicial-1;  
	let y2AbajoIzquierda = yInicial-2;  

	if (8 > x1AbajoIzquierda && 8 > y1AbajoIzquierda && -1 < x1AbajoIzquierda && -1 < y1AbajoIzquierda)
	{
		if(tableroDamas[x1AbajoIzquierda][y1AbajoIzquierda] === ' ' && !saltoDoble)  
		{
			$(`.usarFicha[x=${x1AbajoIzquierda}][y=${y1AbajoIzquierda}]`).addClass('highlight');  
		} 
		else if(tableroDamas[x1AbajoIzquierda][y1AbajoIzquierda] === pieza[piezaActual].piezaOpuesta || tableroDamas[x1AbajoIzquierda][y1AbajoIzquierda] === pieza[piezaActual].reyOpuesto)
		{
			saltoPosible(x2AbajoIzquierda, y2AbajoIzquierda);  
		}
	}
}

//----------------------------------- MOVER ABAJO DERECHA -----------------------------------------//

function revisarAbajoDerecha()  
{
	let x1AbajoDerecha = xInicial+1;  
	let x2AbajoDerecha = xInicial+2;  
	let y1AbajoDerecha = yInicial+1;  
	let y2AbajoDerecha = yInicial+2;  

	if (8 > x1AbajoDerecha && 8 > y1AbajoDerecha && -1 < x1AbajoDerecha && -1 < y1AbajoDerecha)
	{
		if(tableroDamas[x1AbajoDerecha][y1AbajoDerecha] === ' ' && !saltoDoble)
		{
			$(`.usarFicha[x=${x1AbajoDerecha}][y=${y1AbajoDerecha}]`).addClass('highlight');
		} 
		else if(tableroDamas[x1AbajoDerecha][y1AbajoDerecha] === pieza[piezaActual].piezaOpuesta || tableroDamas[x1AbajoDerecha][y1AbajoDerecha] === pieza[piezaActual].reyOpuesto)
		{
			saltoPosible(x2AbajoDerecha, y2AbajoDerecha);  
		}
	}
}

//----------------------------------- MOVER ARRIBA IZQUIERDA -----------------------------------------//

function revisarArribaIzquierda()  
{
	let x1ArribaIzquierda = xInicial-1;  
	let x2ArribaIzquierda = xInicial-2; 
	let y1ArribaIzquierda = yInicial-1;  
	let y2ArribaIzquierda = yInicial-2;  

	if (8 > x1ArribaIzquierda && 8 > y1ArribaIzquierda && -1 < x1ArribaIzquierda && -1 < y1ArribaIzquierda){
		if(tableroDamas[x1ArribaIzquierda][y1ArribaIzquierda] === ' ' && !saltoDoble)
		{
			$(`.usarFicha[x=${x1ArribaIzquierda}][y=${y1ArribaIzquierda}]`).addClass('highlight');
		} 
		else if(tableroDamas[x1ArribaIzquierda][y1ArribaIzquierda] === pieza[piezaActual].piezaOpuesta || tableroDamas[x1ArribaIzquierda][y1ArribaIzquierda] === pieza[piezaActual].reyOpuesto)
		{
			saltoPosible(x2ArribaIzquierda, y2ArribaIzquierda);
		}
	}
}

//----------------------------------- MOVER ARRIBA DERECHA -----------------------------------------//

function revisarArribaDerecha()  
{
	let x1ArribaDerecha = xInicial-1;  
	let x2ArribaDerecha = xInicial-2;  
	let y1ArribaDerecha = yInicial+1;  
	let y2ArribaDerecha = yInicial+2;  

	if (8 > x1ArribaDerecha && 8 > y1ArribaDerecha && -1 < x1ArribaDerecha && -1 < y1ArribaDerecha)
	{
		if(tableroDamas[x1ArribaDerecha][y1ArribaDerecha] === ' ' && !saltoDoble)
		{
			$(`.usarFicha[x=${x1ArribaDerecha}][y=${y1ArribaDerecha}]`).addClass('highlight');
		} 
		else if(tableroDamas[x1ArribaDerecha][y1ArribaDerecha] === pieza[piezaActual].piezaOpuesta || tableroDamas[x1ArribaDerecha][y1ArribaDerecha] === pieza[piezaActual].reyOpuesto)
		{
			saltoPosible(x2ArribaDerecha, y2ArribaDerecha); 
		}
	}
}

//------------------------------------- SALTO POSIBLE -------------------------------------------//

function saltoPosible(saltoX, saltoY)  
{
	if(8 > saltoX && 8 > saltoY && -1 < saltoX && -1 < saltoY)
	{
		if(tableroDamas[saltoX][saltoY] === ' ')  
		{
			$(`.usarFicha[x=${saltoX}][y=${saltoY}]`).addClass('highlight');  
			saltosPosibles++;  
		}
	}
}

//------------------------------------- SALTO DESTINO -------------------------------------------//

function saltoDestino()  
{
	xDestino = parseInt($(this).attr('x'));  
	yDestino = parseInt($(this).attr('y'));  

	if(Math.abs(xDestino - xInicial) === 1)  
	{
		moverPieza();  
	} 
	else if(Math.abs(xDestino - xInicial) === 2)
	{
		saltarPieza();  
	}
}

//------------------------------------- MOVER PIEZA -------------------------------------------//

function moverPieza()  
{
	switch(piezaActual)  
	{
		case 'R':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('fichaRoja');  
		break;

		case 'N':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('fichaNegra');  
		break;

		case 'RK':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('reyRojo');  
		break;

		case 'NK':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('reyNegro');  
		break; 
	}

	$(`.usarFicha[x=${xInicial}][y=${yInicial}]`).removeClass('fichaRoja fichaNegra reyRojo reyNegro');  
	
	if(xDestino === 7 && piezaActual === 'R')  
	{
		piezaActual = 'RK';  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).removeClass('fichaRoja').addClass('reyRojo'); 
	}
	if(xDestino === 0 && piezaActual === 'N')  
	{
		piezaActual = 'NK';  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).removeClass('fichaNegra').addClass('reyNegro'); 
	}

	tableroDamas[xDestino][yDestino] = piezaActual;  
	tableroDamas[xInicial][yInicial] = ' ';  
	cambioJugador();  
}

//------------------------------------- SALTAR PIEZA -------------------------------------------//

function saltarPieza()  
{
	let xSaltada; 
	let ySaltada; 

	if(xDestino<xInicial)  
	{
		xSaltada = xInicial-1;  
	} 
	else 
	{
		xSaltada = xInicial+1; 
	}

	if(yDestino<yInicial) 
	{
		ySaltada = yInicial-1;  
	} 
	else 
	{
		ySaltada = yInicial+1;   
	}
	
	$(`.usarFicha[x=${xInicial}][y=${yInicial}]`).removeClass('fichaRoja fichaNegra reyRojo reyNegro');  
	$(`.usarFicha[x=${xSaltada}][y=${ySaltada}]`).removeClass('fichaRoja fichaNegra reyRojo reyNegro');  
	
	switch(piezaActual)  
	{
		case 'R':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('fichaRoja'); 
		contador2++;  
		break;

		case 'N':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('fichaNegra');  
		contador1++;  
		break;

		case 'RK':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('reyRojo'); 
		contador2++;  
		break;

		case 'NK':  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).addClass('reyNegro');  
		contador1++;  
		break; 
	}

	if(xDestino === 7 && piezaActual === 'R')  
	{
		piezaActual = 'RK';  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).removeClass('fichaRoja').addClass('reyRojo');  
	}
	if(xDestino === 0 && piezaActual === 'N') 
	{
		piezaActual = 'NK';  
		$(`.usarFicha[x=${xDestino}][y=${yDestino}]`).removeClass('fichaNegra').addClass('reyNegro');  
	}

	tableroDamas[xDestino][yDestino] = piezaActual;  
	tableroDamas[xInicial][yInicial] = ' ';  
	tableroDamas[xSaltada][ySaltada] = ' ';  
	
	if(saltosPosibles > 0)  
	{
		saltoDoble = true;  
	}

	saltosPosibles = 0;  
	revisarSaltoDoble();  
	mensajeVictoria(); 

	if(saltosPosibles === 0)  
	{
		if(piezaActual === 'R' || piezaActual === 'RK')  
		{
			turno2 = true;  
		} 
		else
		{
			turno1 = true;  
		}

		saltoDoble = false;  
		cambioJugador();  
	}
}

//--------------------------------- REVISAR SALTO DOBLE ---------------------------------------//

function revisarSaltoDoble()  
{
	xInicial = xDestino;  
	yInicial = yDestino;  

	$('.usarFicha').removeClass('highlight highlight2');  

	decisionMovimientos();  

	$(`.usarFicha[x=${xInicial}][y=${yInicial}]`).addClass('highlight2'); 

	if(saltosPosibles > 0)  
	{
		if(piezaActual === 'R' || piezaActual === 'RK')  
		{
			$('#jugador1Gana').text('SALTO DOBLE').css('color', 'green');  
			turno2 = false;  
		} 
		else
		{
			$('#jugador2Gana').text('SALTO DOBLE').css('color', 'green');  
			turno1 = false;  
		}
	} 
	else
	{
		saltoDoble = false;  
		$('#jugador2Gana').text(' ');  
		$('#jugador1Gana').text(' ');  
		return;
	}		
}

//--------------------------------- CAMBIO DE JUGADOR ---------------------------------------//

function cambioJugador()  
{
	if (turno1)  
	{
		turno1 = false;  
		turno2 = true;  
		$("#jugador2Marcador").text(contador1);  
		$(".player2-image").css("border-color", "black");
		$(".player1-image").css("border-color", "green");
		$('.usarFicha').removeClass('highlight highlight2');  
	} 
	else if(turno2)  
	{
		turno2 = false;  
		turno1 = true;  
		$("#jugador1Marcador").text(contador2);  
		$(".player1-image").css("border-color", "black");
		$(".player2-image").css("border-color", "green");
		$('.usarFicha').removeClass('highlight highlight2');  
	}
}

//--------------------------------- GANADOR ---------------------------------------//

function mensajeVictoria() 
{
	if(contador2 === 12) 
	{
		$('#jugador1Gana').text('GANADOR!').css('color', '#94112B');  
		$(".player2-image").css("border-color", "black");
		$(".player1-image").css("border-color", "green");
		turno2 = false;  
		turno1 = false;  
	}

	if(contador1 === 12)  
	{
		$('#jugador2Gana').text('GANADOR!').css('color', '#111111');  
		$(".player1-image").css("border-color", "black");
		$(".player2-image").css("border-color", "green");
		turno2 = false;  
		turno1 = false;  
	}
}
























