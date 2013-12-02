var game = {
    
    Mute: false,
    
    score: 0,
    
    intro: {
	
    time : 0,
    opacity: 0
	
    },
    
    timing: {
    
    global: 0,
    step: 0
    
    },
    
    state : "start",
    
    mouse : {
    
    x: 1024/2 - 50,
    y: 576/2,
    left: false,
    middle: false,
    right: false
	
    },
    
    mousecube: {
    
    angle: 0,
    width: 15,
    state: "aument"
	
    },
    
    keyStates : {},
    
     keys : {
                        
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    PAUSE: 19,
                    CAPS: 20,
                    ESC: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,                    
                    LEFT_ARROW: 37,
                    UP_ARROW: 38,
                    RIGHT_ARROW: 39,
                    DOWN_ARROW: 40,
                    INSERT: 45,
                    DELETE: 46,
                    0: 48,
                    1: 49,
                    2: 50,
                    3: 51,
                    4: 52,
                    5: 53,
                    6: 54,
                    7: 55,
                    9: 57,
                    A: 65,
                    B: 66,
                    C: 67,
                    D: 68,
                    E: 69,
                    F: 70,
                    H: 72,
                    I: 73,
                    J: 74,
                    K: 75,
                    L: 76,
                    N: 78,
                    O: 79,
                    P: 80,
                    Q: 81,
                    R: 82,
                    S: 83,
                    T: 84,
                    U: 85,
                    V: 86,
                    W: 87,
                    X: 88,
                    Z: 90,
                    NUMPAD_1: 97,
                    NUMPAD_3: 99,
                    NUMPAD_4: 100,
                    NUMPAD_5: 101,
                    NUMPAD_6: 102,
                    NUMPAD_8: 104,
                    NUMPAD_9: 105,
                    MULTIPLY: 106,
                    SUBSTRACT: 109,
                    DECIMAL: 110,
                    F1: 112,
                    F2: 113,
                    F3: 114,
                    F4: 115,
                    F5: 116,
                    F6: 117,
                    F7: 118,
                    F8: 119,
                    F9: 120,
                    F10: 121,
                    F11: 122,
                    F12: 123,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    PLUS: 187,
                    COMMA: 188,
                    PERIOD: 190,
                    PULT_UP: 29460,
                    PULT_DOWN: 29461,
                    PULT_LEFT: 4,
                    PULT_RIGHT: 5
}, //End of keys object

activeobjects : [],
    
Vector : function(frstcord,sndcord)
{
    if(frstcord && sndcord)
    {
    var xcord = sndcord.x - frstcord.x;
    var ycord = sndcord.y - frstcord.y;
    var startCord = frstcord;
    this.x = xcord;
    this.y = ycord;
    this.startCord = startCord;
    }
    else
    {
        this.x = 0;
        this.y = 0;
    }

    this.rotate = function(angle)
    {
	var result = new game.Vector();
	result.startCord = {x : this.startCord.x, y : this.startCord.y};
	result.x = this.x * Math.cos(angle) - this.y * Math.sin(angle); 
        result.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
	return result
    }
    
    this.add = function(vector)
    {
        var result = new game.Vector();
        result.x = this.x + vector.x;
        result.y = this.y + vector.y;
        result.startCord = {x : this.startCord.x, y : this.startCord.y};
        return result;
    }
    this.invert = function()
    {
        var result = new game.Vector();
        result.x = -this.x;
        result.y = -this.y;
        result.startCord = {x : this.startCord.x, y : this.startCord.y};
        return result;
    }
    this.multiply = function(number)
    {
        var result = new game.Vector();
        result.x = this.x * number;
        result.y = this.y * number;
        result.startCord = {x : this.startCord.x, y : this.startCord.y};
        return result;
    }
    this.divide = function(number)
    {
        var result = new game.Vector();
        result.x = this.x * (1 / number);
        result.y = this.y * (1 / number);
        result.startCord = {x : this.startCord.x, y : this.startCord.y};
        return result;
    }
    this.length = function()
    {
        var tamanho = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return tamanho;
    }
    this.perp = function()
    {
        var result = new game.Vector();
        result.x = -this.y;
        result.y = this.x;
        result.startCord = {x : this.startCord.x, y : this.startCord.y};
        return result;
    }
},
     
gamepads : [{},{},{},{}],

Circle : function(xpos,ypos,raio,cor)
{
    this.x = xpos;
    this.y = ypos;
    this.radius = 1;
    this.visradius = raio;
    this.angle = 0;
    this.color = cor;
    
},

particles : {
 
    collection : [],
    spawn : function(xpos,ypos,color){
    var quant = Math.floor((Math.random()*70)+10);
    for(x = 0; x < quant; x++)
    {
	var raio = Math.floor((Math.random()*7)+2);
	var velX = Math.floor((Math.random()*15)+5);
	var velY = Math.floor((Math.random()*15)+5);
	var neg = Math.floor((Math.random()*4)+0);
	switch(neg)
	{
	    case 1:
		velX = - velX;
		break;
	    
	    case 2:
		velY = - velY;
		break;
	    
	    case 3:
		velX = - velX;
		velY = - velY;
		break;
	}
	var particula = {x : xpos, y : ypos,color : color, speed : {x : velX, y : velY}, opacity: 0.8, radius : raio};
	game.particles.collection.push(particula);
    }
    }
    
    
},

spawner: 
{
  colors: [{quant: 0, code: "blue"},{quant: 0, code: "red"},{quant: 0, code: "green"},
           {quant: 0, code: "yellow"},{quant: 0, code: "grey"},{quant: 0, code: "purple"}], 
  spawn: function(){
  var color;
  for(x = 0; x < 30; x++)
  {
    var randomcolor = Math.floor((Math.random()*game.spawner.colors.length)+0);
    if(game.spawner.colors[randomcolor].quant > 0)
    {
	color = game.spawner.colors[randomcolor].code;
	 var bla = new game.Circle(1024/2,576/2,15,color);
         game.particles.spawn(1024/2,576/2,bla.color);
         game.activeobjects.push(bla);
	 break;
    }
  }
  } 
},

portals:
{
    collection: [],
    create: function(){
    
    var randompos = function(){
       var pos = {x: Math.floor((Math.random()*game.canvas.width)+0),y:Math.floor((Math.random()*game.canvas.height)+0)};
       return pos;
    }
    
    for(x = 0; x < 100; x++)
    {
        var teste = randompos();
        var dist = new game.Vector({x: game.canvas.width/2, y : game.canvas.height/2},{x: teste.x, y : teste.y});
        if (dist.length() > 300)
        {
            var numcor = Math.floor((Math.random()*game.spawner.colors.length)+0);
            var novoportal = {x: teste.x, y : teste.y, visradius:Math.floor((Math.random()*35)+25), radius: 5};
            var colquant = 0;
            novoportal.colorindex = numcor;
            for(x in game.portals.collection)
            {
		var outro = game.portals.collection[x];
                var nocoldist = outro.visradius + novoportal.visradius;
		var realdist = new game.Vector({x:novoportal.x,y:novoportal.y},{x:outro.x,y:outro.y});
		realdist = realdist.length();
                if(realdist < nocoldist)
                {
                    colquant ++;
                }
            }
            if(colquant === 0)
            {
                if(game.offscreen(novoportal.x,novoportal.y) === false)
		{
		  novoportal.color = game.spawner.colors[numcor].code;
		  game.spawner.colors[numcor].quant ++;
		  game.portals.collection.push(novoportal);
		}
                break;
            }
        }
    }
    
    },
    remove : function(portal){
    game.spawner.colors[portal.colorindex].quant --;
    var index = game.portals.collection.indexOf(portal);
    game.portals.collection.splice(index,1);
    }
},

offscreen: function(x,y){
var off = false;
if(x < 0) off = true;
if(y < 0) off = true;
if(x > 1024) off = true;
if(y > 576) off = true;
return off;
},

collide: function(obj1,obj2)
{
    var nocoldist = obj1.radius + obj2.radius;
    var realdist = new game.Vector({x:obj1.x,y:obj1.y},{x:obj2.x,y:obj2.y});
    var realdist = realdist.length();
    
    if(realdist < nocoldist) return true;
    else return false;
},

//Iniciar o loop do jogo!  
  init : function(width,height)
      {
          //Criar um canvas
          game.canvas = document.createElement("canvas");
          game.canvas.width = width;
          game.canvas.height = height;
          game.ctx = game.canvas.getContext("2d");
          document.body.appendChild(game.canvas);
	  game.canvas.style.cursor = "none";
        
          //Wrap up pra RequestAnimFrame API
          window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
                  
    })();

    window.addEventListener("keydown",function(event){
                    
                    for(x in game.keys)
                    {
                        if(game.keys[x] === event.keyCode)
                        {
                            game.keyStates[x] = true;
                        }
                    }
                    });
            
            window.addEventListener("keyup",function(event){
                    
                    for(x in game.keys)
                    {
                        if(game.keys[x] === event.keyCode)
                        {
                            game.keyStates[x] = false;
                        }
                    }
                    });
	    
	    window.addEventListener("mousedown",function(e){
	    
	    e.preventDefault();
	    game.mouse.x = e.x;
	    game.mouse.y = e.y;
	    switch(e.button)
	    {
		case 0:
		    game.mouse.left = true;
		    break;
		
		case 1:
		    game.mouse.middle = true;
		    break;
		
		case 2:
		    game.mouse.right = true;
		    break;
	    }
		
	    });
	    
	    window.addEventListener("mouseup",function(e){
	    
	    e.preventDefault();
	    game.mouse.x = e.x;
	    game.mouse.y = e.y;
	    switch(e.button)
	    {
		case 0:
		    game.mouse.left = false;
		    break;
		
		case 1:
		    game.mouse.middle = false;
		    break;
		
		case 2:
		    game.mouse.right = false;
		    break;
	    }
		
	    });
	    
	    window.addEventListener("mousemove",function(e){
	    
	    e.preventDefault();
	    game.mouse.x = e.x;
	    game.mouse.y = e.y;
	    });
	    
	    window.addEventListener("contextmenu",function(e){e.preventDefault();});
	    
	    
game.state = "intro";
game.update();
},

last : new Date(),

update : function()
    {
    
    if(game.state === "intro")
    {
	if(game.keyStates.M === true)
	{
	    game.Mute = true;
	}
	game.ctx.fillStyle = "white";
	game.ctx.clearRect(0,0,1024,576);
	if(game.intro.time <= 60)
	{
	    game.ctx.globalAlpha = game.intro.opacity;
	    game.ctx.fillRect(0,0,1024,576);
	    game.ctx.drawImage(shield,262,138);
	    game.intro.opacity += 0.016;
	    game.intro.time ++;
	}
	
	if(game.intro.time <= 120 && game.intro.time > 60)
	{
	    game.ctx.globalAlpha = game.intro.opacity;
	    game.ctx.fillRect(0,0,1024,576);
	    game.ctx.drawImage(shield,262,138);
	    game.intro.time ++;
	}
	
	if(game.intro.time < 180 && game.intro.time > 120)
	{
	    game.ctx.globalAlpha = game.intro.opacity;
	    game.ctx.fillRect(0,0,1024,576);
	    game.ctx.drawImage(shield,262,138);
	    game.intro.opacity -= 0.018;
	    game.intro.time ++;
	}
	
	if(game.intro.time === 180)
	{
	    game.state = "menu";
	    if(game.Mute === false)
	    {
		menu.play();
	    }
	}
    }
    
    if(game.state === "menu")
    {
	game.ctx.globalAlpha = 1;
	game.ctx.clearRect(0,0,1024,576);
	game.ctx.fillStyle = "black";
	game.ctx.fillRect(0,0,1024,576);
	game.ctx.fillStyle = "white";
	game.ctx.font="50px sans-serif";
	var movX = Math.floor((Math.random()*10)+0);
	var movY = Math.floor((Math.random()*10)+0);
	game.ctx.globalAlpha = 0.9;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.1),576/2 - 50 + (movY * 0.1));
	game.ctx.globalAlpha = 0.8;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.2),576/2 - 50 + (movY * 0.2));
	game.ctx.globalAlpha = 0.7;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.3),576/2 - 50 + (movY * 0.3));
	game.ctx.globalAlpha = 0.6;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.4),576/2 - 50 + (movY * 0.4));
	game.ctx.globalAlpha = 0.5;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.5),576/2 - 50 + (movY * 0.5));
	game.ctx.globalAlpha = 0.4;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.6),576/2 - 50 + (movY * 0.6));
	game.ctx.globalAlpha = 0.3;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.7),576/2 - 50 + (movY * 0.7));
	game.ctx.globalAlpha = 0.2;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.8),576/2 - 50 + (movY * 0.8));
	game.ctx.globalAlpha = 0.1;
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 0.9),576/2 - 50 + (movY * 0.9));
	game.ctx.fillText("Fragment",1024/2 - 125 + (movX * 1),576/2 - 50 + (movY * 1));

	
	game.ctx.font="30px sans-serif";
	game.ctx.globalAlpha = 0.9;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.1),576/2 + 35 + (movY * 0.1));
	game.ctx.globalAlpha = 0.8;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.2),576/2 + 35 + (movY * 0.2));
	game.ctx.globalAlpha = 0.7;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.3),576/2 + 35 + (movY * 0.3));
	game.ctx.globalAlpha = 0.6;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.4),576/2 + 35 + (movY * 0.4));
	game.ctx.globalAlpha = 0.5;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.5),576/2 + 35 + (movY * 0.5));
	game.ctx.globalAlpha = 0.4;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.6),576/2 + 35 + (movY * 0.6));
	game.ctx.globalAlpha = 0.3;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.7),576/2 + 35 + (movY * 0.7));
	game.ctx.globalAlpha = 0.2;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.8),576/2 + 35 + (movY * 0.8));
	game.ctx.globalAlpha = 0.1;
	game.ctx.fillText("Play",1024/2 - 45 + (movX * 0.9),576/2 + 35 + (movY * 0.9));
	game.ctx.fillText("Play",1024/2 - 12455 + (movX * 1),576/2 + 35 + (movY * 1));
	
	game.ctx.globalAlpha = 0.3;
	game.ctx.font="15px sans-serif";
	game.ctx.fillText("M to mute; Mouse to play;",5,556);
	game.ctx.fillText("A game by Josue Ferreira de Oliveira",380,556);
	game.ctx.drawImage(twitter,839,391);
	if(game.mouse.left === true) 
	{
	    if(game.mouse.y > 250 && game.mouse.y < 410)
	    {
		if(game.mouse.x > 455 && game.mouse.x < 490)
		{
		    game.timing.global = Math.floor((Math.random()*180)+60);
		    game.state = "running";
		    menu.pause();
		    menu.currentTime = 0;
		    if(game.Mute === false)
		    {
			playing.play();
		    }
		}
	    }
	}
	
	if(game.mouse.x >= 839 && game.mouse.y >= 391)
	{
	    game.ctx.globalAlpha = 1;
	    game.ctx.drawImage(twitter,839,391);
	    if(game.mouse.left === true)
	    {
		window.open("https://twitter.com/josueoliverfer");
	    }
	}
	
	if(game.keyStates.M === true)
	{
	    game.Mute === true;
	}
	
	game.ctx.globalAlpha = 1;
	game.systems.updateMouseCursor();
    }
    
    if(game.state === "running")
    {
    game.systems.clearScreen();
    game.systems.updateMouseCursor();
    game.systems.updateCircles();
    game.systems.updatePortals();
    game.systems.updateParticles();
    game.systems.drawScore();
    game.systems.timer();
    var decis = Math.floor((Math.random()*120)+0);
    if(decis === 0)
    {
        game.spawner.spawn();
    }

    }
    
    
    if(game.state === "game over")
    {
	game.systems.gameover();
    }
    
    var now = new Date();
    
    if(game.keyStates.D === true)
    {
      game.ctx.fillStyle = "red";
      game.ctx.fillText("FPS: " + Math.floor(1000/(now-game.last)),50,50);
    }
    
    game.last = now;
        
    requestAnimFrame(game.update);    
},
};


