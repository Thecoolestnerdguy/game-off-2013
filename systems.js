game.systems = {
    
clearScreen: function(){
    
    game.ctx.clearRect(0,0,1024,576);
    game.ctx.fillStyle = "black";
    game.ctx.fillRect(0,0,1024,576);
      
},
    
updateMouseCursor: function(){
    
    game.ctx.save();
    game.ctx.translate(game.mouse.x + (game.mousecube.width/2),game.mouse.y + (game.mousecube.width/2));
    game.ctx.rotate(game.mousecube.angle);
    game.ctx.fillStyle = "orange";
    game.ctx.fillRect(0,0,Math.floor(game.mousecube.width),game.mousecube.width);
    game.ctx.restore();
    game.mousecube.angle += 0.0872664626;
    if(game.mousecube.width === 15)
    {
	game.mousecube.state = "aument";
    }
    if(game.mousecube.width === 30)
    {
	game.mousecube.state = "dimin";
    }
    if(game.mousecube.state === "aument")
    {
	game.mousecube.width += 0.25;
    }
    if(game.mousecube.state === "dimin")
    {
	game.mousecube.width -= 0.25;
    }
    
},


updateCircles: function(){

for(x in game.activeobjects)
{
    
        var coisa = game.activeobjects[x];
	if(game.offscreen(coisa.x,coisa.y) === false)
	{
	var moveVec = new game.Vector({x:coisa.x,y:coisa.y},{x:game.mouse.x,y:game.mouse.y});
	moveVec = moveVec.divide(moveVec.length());
	moveVec = moveVec.multiply(5);
	var movX = moveVec.x;
	var movY = moveVec.y;
	var drawX = Math.floor(coisa.x);
	var drawY = Math.floor(coisa.y);
        game.ctx.beginPath();
        game.ctx.strokeStyle = coisa.color;
        game.ctx.lineWidth = 3;
        game.ctx.arc(coisa.x,coisa.y,coisa.radius,0,2*Math.PI);
	game.ctx.arc(drawX + (movX * 0.4),drawY + (movY * 0.4),Math.floor(coisa.radius),0,2*Math.PI);
	game.ctx.arc(drawX + (movX * 0.6),drawY + (movY * 0.5),Math.floor(coisa.radius),0,2*Math.PI);
	game.ctx.arc(drawX + (movX * 0.8),drawY + (movY * 0.8),Math.floor(coisa.radius),0,2*Math.PI);
	game.ctx.arc(drawX.x + (movX * 1),drawY + (movY * 1),Math.floor(coisa.radius),0,2*Math.PI);
	game.ctx.arc(drawX.x + (movX * 1.2),drawY + (movY * 1.2),Math.floor(coisa.radius),0,2*Math.PI);
	game.ctx.stroke();
	game.ctx.globalAlpha = 1;
	game.ctx.globalCompositeOperation = "source-over";
        coisa.x += moveVec.x;
        coisa.y += moveVec.y;
        for(x in game.portals.collection)
	{
	    var portal = game.portals.collection[x];
	    var nocoldist = coisa.radius + portal.radius;
	    var realdist = new game.Vector({x:coisa.x,y:coisa.y},{x:portal.x,y:portal.y});
	    realdist = realdist.length();
	    if(realdist <= nocoldist)
	    {
		if(portal.color === coisa.color)
		{
		 game.score ++;
		 var index = game.activeobjects.indexOf(coisa);
		 game.activeobjects.splice(index,1);
		}
		else
		{
		    game.state = "game over";
		}
	    }
	}
	
	if(coisa.radius < coisa.visradius)
	{
	    coisa.radius += 0.25;
	}
	}
	
	else
	{
	    game.score --;
	    var index = game.activeobjects.indexOf(coisa);
            game.particles.spawn(coisa.x,coisa.y,coisa.color);
	    game.activeobjects.splice(index,1);
	}
    }
},

updatePortals: function(){
    
    for(x in game.portals.collection)
    {
        var coisa = game.portals.collection[x];
        game.ctx.beginPath();
        game.ctx.strokeStyle = coisa.color;
        game.ctx.lineWidth = 3;
        game.ctx.arc(Math.floor(coisa.x),Math.floor(coisa.y),coisa.radius,0,2*Math.PI);
	game.ctx.stroke();
        
        if(coisa.radius < coisa.visradius)
        {
            coisa.radius += 5;
        }
        
    }
},

updateParticles: function(){
    
    for(x in game.particles.collection)
    {
	var coisa = game.particles.collection[x];
	if(coisa.opacity > 0.01)
	{
	    game.ctx.globalAlpha = coisa.opacity;
	    game.ctx.beginPath();
            game.ctx.fillStyle = coisa.color;
            game.ctx.lineWidth = 3;
            game.ctx.arc(Math.floor(coisa.x),Math.floor(coisa.y),coisa.radius,0,2*Math.PI);
	    game.ctx.fill();
	    game.ctx.globalAlpha = 1;
	    coisa.x += coisa.speed.x;
	    coisa.y += coisa.speed.y;
	    coisa.opacity -= 0.015;
	}
	else
	{
	    var index = game.particles.collection.indexOf(coisa);
	    game.particles.collection.splice(index,1);
	}
    }  
},

drawScore: function(){
    
    game.ctx.fillStyle = "white";
    game.ctx.font="25px sans-serif";
    game.ctx.fillText("Score: " + game.score,game.canvas.width/2 - 50,50);
},

gameover: function(){
    game.ctx.font="30px sans-serif";
    game.systems.clearScreen();
    game.systems.updateMouseCursor();
    game.systems.updateCircles();
    game.systems.updatePortals();
    game.systems.updateParticles();
    for(x in game.activeobjects)
    {
        var coisa = game.activeobjects[x];
        game.particles.spawn(coisa.x,coisa.y,coisa.color);
        var index = game.activeobjects.indexOf(coisa);
        game.activeobjects.splice(index,1);
    }
    for(x in game.portals)
    {
        var coisa = game.portals[x];
        game.particles.spawn(coisa.x,coisa.y,coisa.color);
        var index = game.portals.collection.indexOf(coisa);
        game.portals.collection.splice(index,1);
    }
    game.ctx.fillStyle = "black";
	game.ctx.fillRect(0,0,game.canvas.width,50);
	game.ctx.fillStyle = "white";
	game.ctx.fillText("Score: " + game.score ,game.canvas.width/2 - 200,270);
        game.ctx.fillText("Press R to restart",game.canvas.width/2 - 200,300);
        game.ctx.fillText("Press ESC to go back to title screen",game.canvas.width/2 - 200,330);
	if(game.keyStates.R === true)
	{
	    game.activeobjects = [];
	    for(x in game.portals.collection)
	    {
		game.portals.remove(game.portals.collection[x]);
	    }
	    game.particles.collection = [];
	    window.setTimeout(function(){
	    game.portals.create();
            game.portals.create();
            game.portals.create();
	    },100);
	    game.score = 0;
	    game.spawner.color = [{quant: 0, code: "blue"},{quant: 0, code: "red"},{quant: 0, code: "green"},
           {quant: 0, code: "brown"},{quant: 0, code: "grey"},{quant: 0, code: "purple"}];
	    game.state = "running";	    
	}
        
        if(game.keyStates.ESC === true)
        {
            game.activeobjects = [];
	    for(x in game.portals.collection)
	    {
		game.portals.remove(game.portals.collection[x]);
	    }
	    game.particles.collection = [];
	    window.setTimeout(function(){
	    game.portals.create();
            game.portals.create();
            game.portals.create();
	    },100);
	    game.score = 0;
	    game.spawner.color = [{quant: 0, code: "blue"},{quant: 0, code: "red"},{quant: 0, code: "green"},
           {quant: 0, code: "brown"},{quant: 0, code: "grey"},{quant: 0, code: "purple"}]
            playing.pause();
            playing.currentTime = 0;
            menu.play();
            game.state = "menu";
        }
    
},

timer: function(){
    
if(game.timing.step === game.timing.global)
{
   var decis = Math.floor((Math.random()*4)+0);
   
   if(decis === 0 || decis === 1)
   {
    if(game.portals.length > 0)
    {
        game.portals.remove(game.portals.collection[0]);
    }
   }
   if(decis === 2 || decis === 3)
   {
    if(game.portals.collection.length < 6)
    {
     game.portals.create();   
    }
   }
   game.timing.step = 0;
   game.timing.global = Math.floor((Math.random()*180)+30);
}


game.timing.step ++;
  
}



};
