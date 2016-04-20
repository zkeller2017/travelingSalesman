/*
	This is the code for the traveling salesman problem. This 
	calculates the route for both the nearest neighbor algorithm as
	well as the shortest route algorithm. It also takes in the points as clicked
	by the user on the web page.
	@author Zachary Keller
	@version final

*/


/*
the arrays that hold the points clicked on the white area on the web page.
There are two sets of x and y coordinates, this is so the nearest neighbor
and shortest route algorithms each have separate sets of the identical points
*/
var xs = [];
var ys = [];
var xs2 = [];
var ys2 = [];


$(document).ready( function() {
	

	/*
		For every click on the canvas, this code places a black dot on the
		screen and records the point in the arrays.
	*/
	$("#canvas").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		var ctx2 = canvas2.getContext("2d");
		var x = event.pageX - canvas.offsetLeft;
    	var y = event.pageY - canvas.offsetTop;
    	xs.push(x);
    	ys.push(y);
    	xs2.push(x);
    	ys2.push(y);
		ctx.fillRect(x,y,5,5);
		ctx2.fillRect(x,y,5,5);
		

	
	});
	
	
	/*
		When the button is pushed to execute the nearest neighbor algorithm,
		this code calls nearest neighbor and then draws the appropriate lines 
		between the points.
	*/
	$("#button2").click( function() {
		
		nearestNeighbor();
		//console.log(xs);
		//console.log(ys);
		
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 4; //change width of line
		//draw lines between points
		//console.log("hello");
		for (var a = 0; a < xs.length-1; ++a)
		{
			//console.log("hello");
			ctx.beginPath();
			ctx.moveTo(xs[a],ys[a]);
			ctx.lineTo(xs[a+1],ys[a+1]);
			ctx.stroke();
		}
		
		//draw a line between every point
		
	});
	
	/*
		For every click on the first canvas, this code places a black dot on the
		second canvas in the identical spot and records the point in the arrays.
		This intentionally just takes the spots from the first canvas and does not 
		allow the user to add new ones to the second canvas.
	*/
	$("#canvas2").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		var x = event.pageX - canvas.offsetLeft;
    	var y = event.pageY - canvas.offsetTop;
    	xs.push(x);
    	ys.push(y);
		ctx.fillRect(x,y,5,5);
		//add point to canvas (write this)
		//console.log(xs);
		//console.log(ys);
		
	
	});
	
	/*
		When the button is pushed to execute the shortest route algorithm,
		this code calls shortest route and then draws the appropriate lines 
		between the points.
	*/
	$("#button3").click( function() {
		console.log(xs2);
		console.log(ys2);
		shortDistance();
		console.log(xs2);
		console.log(ys2);
		
		var canvas = $("#canvas2").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 4; //change width of line
		//draw lines between points
		//console.log("hello");
		for (var a = 0; a < xs2.length-1; ++a)
		{
			console.log("hello");
			ctx.beginPath();
			ctx.moveTo(xs2[a],ys2[a]);
			ctx.lineTo(xs2[a+1],ys2[a+1]);
			ctx.stroke();
		}
		
		//draw a line between every point
		
	});
});


/*
	nearestNeighbor works through the points recorded from clicking on the screen and 
	rearranges the points into an order determined by the nearest neighbor algorithm
*/
function nearestNeighbor() {
	
	for (var i = 0; i < xs.length; ++i)
	{
		var shortest = distance(xs[i], xs[0], ys[i], ys[0]);
		var shortSpot = 0;
		for (var k = 0; k < i; ++k)
		{
			var dist = distance(xs[i], xs[k], ys[i], ys[k]);
		//	console.log("distance between (" + xs[i] + "," + ys[i] + ") and (" + xs[k] + "," +  ys[k] + ") is " + dist);
			if (dist < shortest)
			{
				shortest = dist;
				shortSpot = k;
				
			}
		}
	//	console.log("shortest: " + shortest);
	//	console.log("xs before splice " + xs);
		xs.splice(shortSpot+1, 0, xs[i]);
		xs.splice(i+1,1);
	//	console.log("xs after splice " + xs);
		//console.log("ys before splice " + ys);
		ys.splice(shortSpot+1, 0, ys[i]);
		ys.splice(i+1,1);
		//console.log("ys after splice " + ys);
		
	}
}
/*
	Finds the distance between two points
	@param x1 the x coordinate of the first point
	@param x1 the y coordinate of the first point
	@param x2 the x coordinate of the second point
	@param x2 the y coordinate of the second point
	@return the distance between the two points
*/
function distance(x1, x2, y1, y2) {
	return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));		
}

/*
	shortDistance works through the points recorded from clicking on the screen and 
	rearranges the points into an order determined by the shortest distance algorithm
*/
function shortDistance() {
	
	for (var i = 1; i < xs2.length; ++i)
	{
		var shortest = getDistance(i);
		var shortSpot = i;
		for (var k = 1; k < i + 1; ++k)
		{
			xs2.splice(k,0,xs2[i]);
			ys2.splice(k,0,ys2[i]);
			console.log(xs2 +  "xs during " + i);
			console.log(ys2 +  "ys during " + i);
			var dist = getDistance(i);
			if (k == 1)
			{
				shortest = dist;
				shortSpot = 1;
			}
			console.log("distance is " + dist);
			if (dist < shortest)
			{
				shortest = dist;
				shortSpot = k;
				
			}
			xs2.splice(k,1);
			ys2.splice(k,1);
		}
		console.log("shortest: " + shortest);
		console.log("Shortspot: " + shortSpot);
		console.log("xs2 before splice " + xs2);
		xs2.splice(shortSpot, 0, xs2[i]);
		xs2.splice(i+1,1);
		console.log("xs2 after splice " + xs2);
		console.log("ys2 before splice " + ys2);
		ys2.splice(shortSpot, 0, ys2[i]);
		ys2.splice(i+1,1);
		console.log("ys2 after splice " + ys2);
		
	}
}
/*
	Gets the total distance from two arrays of the x and y coordinates of points
	@param end the final point to which you are finding the distance
	@return the distance
*/
function getDistance(end)
{
	var total = 0;
	for (var i = 0; i < end; ++i)
	{
		total = total + distance(xs2[i], xs2[i+1], ys2[i], ys2[i+1]);
	}
	return total;
}



