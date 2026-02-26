/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

let score;
let time;

var currX = 0;
var currY = 0;

let highscore = 0;

let dropping = false;

const WATERCOLOR = 0x0E87CC;
const FISHORANGE = 0xED8546;


var TIMER ={
    i: 0,
    until: 0,
    timerReference: "",
    func: function(){},
    tick: function(){
        TIMER.i++;
        if (TIMER.i % 2 == 0){
            time--;
        }
        if (hooked){
            PS.statusText( "Time: " + time + " || Score: " + score + " || Reel!" );
            fishMovement();
        }
        if (!hooked){
            PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );
            fishMovement();
            if(currX > 0 && currY > 0 ){
                hookShow(currX, currY);
            }
        }
        if(TIMER.i === TIMER.until){
            PS.timerStop(TIMER.timerReference);
            TIMER.func();
        }
    },
    startTimer: function(until, functionToDo){
        TIMER.until = until;
        TIMER.i = 0;
        TIMER.func = functionToDo;
        TIMER.timerReference = PS.timerStart(30, TIMER.tick);
    }
}


var fishX;
var fishY;

var fishData;

var hooked = false;
var hookedX;
var hookedY;
var firstReel = true;



PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:
	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize( 32, 32 );
    PS.gridColor( WATERCOLOR );
    PS.color( PS.ALL, PS.ALL, WATERCOLOR);
    PS.borderColor ( PS.ALL, PS.ALL, WATERCOLOR );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0);

    score = 0;
    time = 60;

    fishX = randomX();
    fishY = randomY();

    fishMaker();
    fishShow();

    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );

    TIMER.startTimer(120, endScreen);

	// Add any other initialization code you need here.
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
    if (time > 0){
        for(let i = 0; i < fishData.length; i++){
            let fishBead = fishData[i];
            if (fishBead[2] + fishX === x && fishBead[3] + fishY === y ){
                hooked = true;
                hookHide(x, y);
                PS.statusText( "Time: " + time + " || Score: " + score + " || Reel!" );
                hookedX = fishX;
                hookedY = fishY + 2;
                hookShow(hookedX, hookedY);
                PS.color(x , y, FISHORANGE);
                fishShow();

                fishSurprise();
            }
        }
    }



};



/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {

};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
    currX = x;
    currY = y;

    if(time > 0){
        if (!hooked){
            PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );
            if (x > 0 && y > 0) {
                hookShow(x, y);
            }
        }
    }


};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
    if (time > 0){
        if (!hooked){
            PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );
            if ( x > 0 && y >0){
                hookHide(x, y);
            }
            fishShow();
        }
    }
};

function hookHide(x , y){

    for (let i = y; i >= 0; i--){
        PS.color( x-1, i, WATERCOLOR);
    }
    PS.color( x, y, WATERCOLOR);
    PS.color( x-1, y, WATERCOLOR);
    PS.color( x-1, y-1, WATERCOLOR);
}

function hookShow(x, y){
    for (let i = y - 1; i >= 0; i--){
        PS.color( x-1, i, PS.COLOR_BLACK);
    }
    PS.color( x, y, PS.COLOR_GRAY_LIGHT);
    PS.color( x-1, y, PS.COLOR_GRAY_LIGHT);
    PS.color( x-1, y-1, PS.COLOR_GRAY_LIGHT);
}

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	if(time > 0){
        PS.color(PS.ALL, PS.ALL, WATERCOLOR);
        fishShow();
        currX = 0;
        currY = 0;
    }

};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
    if (time === 0 && !dropping){
        if (key === 82 || key === 114 ){ // R
            reset();
        }
    }
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

    var event = sensors.wheel;
        if ( event ) {
            if ( event === PS.WHEEL_BACKWARD ) {
                if (hooked){ reelIn(); }
            }
            if ( event === PS.WHEEL_FORWARD ) {
                if (hooked){ reelIn(); }
            }
        }


	// Add code here for when an input event is detected.


};



/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 */
function randomX() {
    return Math.floor(Math.random() * (31 - 6) + 1);
}

function randomY(){
    return Math.floor(Math.random() * (31 - 4) + 1);
}
function randomMovement(){
    return Math.floor(Math.random() * (4 - 1) + 1);
}

function fishMaker(){
    fishData = [
        [FISHORANGE, 255, 1, 0],
        [FISHORANGE, 255, 2, 0],
        [FISHORANGE, 255, 4, 0], //(4,0)
        [PS.COLOR_BLACK, 255, 1, 1],
        [FISHORANGE, 255, 0, 1],
        [FISHORANGE, 255, 2, 1],
        [FISHORANGE, 255, 3, 1],
        [FISHORANGE, 255, 4, 1],//(4,1)
        [FISHORANGE, 255, 0, 2],// (0,2)
        [FISHORANGE, 255, 1, 2],
        [FISHORANGE, 255, 2, 2],
        [FISHORANGE, 255, 4, 2]//(4,2)
    ]
}

function fishShow(){
    for(let i = 0; i < fishData.length; i++){
        let fishBead = fishData[i];
        PS.color( fishBead[2] + fishX, fishBead[3] + fishY, fishBead[0] );
    }
}

function fishHide(x, y){
    for(let i = 0; i < fishData.length; i++) {
        let fishBead = fishData[i];
        PS.color(fishBead[2] + fishX, fishBead[3] + fishY, WATERCOLOR);
    }
}

function reelIn(){

    if (firstReel){
        if (fishY - 2 >= 0){ PS.color (fishX + 1 , fishY - 2, WATERCOLOR);}
        if (fishY - 4 >= 0){ PS.color (fishX + 1 , fishY - 4, WATERCOLOR);}
        if (fishY - 5 >= 0){ PS.color (fishX + 1 , fishY - 5, WATERCOLOR);}

        firstReel = false;
    }

    fishHide( hookedX , hookedY - 2 );

    hookedY-=2;
    fishY-=2;


    if (hookedY - 2 <= 0){
        hooked = false;

        fishX = randomX();
        fishY = randomY();

        PS.color( PS.ALL, PS.ALL, WATERCOLOR);

        fishShow();
        score++;

        PS.audioPlay("fx_coin2");

        firstReel = true;

        PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );
    }
    else{
        for (let i = hookedY - 1; i >= 0; i--){
            PS.color( hookedX-1, i, PS.COLOR_BLACK);
        }

        PS.color( hookedX, hookedY, PS.COLOR_GRAY_LIGHT);
        PS.color( hookedX-1, hookedY, PS.COLOR_GRAY_LIGHT);
        PS.color( hookedX-1, hookedY-1, PS.COLOR_GRAY_LIGHT);


        fishShow();

        PS.color( hookedX, hookedY+1, WATERCOLOR);
        PS.color( hookedX-1, hookedY+1, WATERCOLOR);
        PS.color( hookedX-1, hookedY+2, WATERCOLOR);

    }

}

function fishSurprise(){
    if (fishY - 2 >= 0){ PS.color (fishX + 1 , fishY - 2, PS.COLOR_RED);}
    if (fishY - 4 >= 0){ PS.color (fishX + 1 , fishY - 4, PS.COLOR_RED);}
    if (fishY - 5 >= 0){ PS.color (fishX + 1 , fishY - 5, PS.COLOR_RED);}

    PS.audioPlay("fx_shoot2");
}

var finalscore = 0;
function endScreen(){
    hooked = false;
    PS.gridColor( WATERCOLOR );
    PS.color( PS.ALL, PS.ALL, WATERCOLOR);
    PS.borderColor ( PS.ALL, PS.ALL, WATERCOLOR );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0);

    let gray = [[2,6], [13,6],
                        [2,7], [13,7],
                        [2,8], [13,8],
                        [3,9], [12,9],
                        [3,10], [12,10],
                        [3,11], [12,11],
                        [4,12], [11,12],
                        [4,13], [11,13],
                        [5,14], [6,14], [7,14], [8,14], [9,14], [10,14],
                        ];

    PS.colorMultiple( gray, PS.COLOR_GRAY_LIGHT);

    dropFishX = 13;

    fillBucket();

}

function fillBucket(){
    if (finalscore < score){
        finalscore++;
        dropFishY= 0;
        if (finalscore <= 12){
            if (dropFishX > 18){
                dropFishX = 13;
            }
        }
        else if(finalscore === 13){
            dropFishX = 12;
        }
        else if (finalscore > 13 && finalscore < 37){
            if (dropFishX > 19){
                dropFishX = 12;
            }
        }
        else if (finalscore === 37){
            dropFishX = 11;
        }
        else if (finalscore > 37){
            if (dropFishX > 20){
                dropFishX = 11;
            }
        }
        dropping = true;
        dropFishTimer = PS.timerStart(2, dropFish);
    }
    else {
        PS.statusText( "Score: " + finalscore + " || R to Replay || High Score :" + highscore);
        dropping = false;
        if (finalscore >= highscore){
            highscore = finalscore;
            PS.statusText( "New High Score! : " + highscore + " || R to Replay");
            PS.audioPlay("fx_tada");
        }
        else{
            PS.audioPlay("fx_powerup8");
        }
    }

}

var dropFishX = 0;
var dropFishY = 0;

var dropFishTimer = "";


function dropFish() {
    PS.timerStop(dropFishTimer);
    PS.statusText( "Fish Caught: " + finalscore);
    PS.color(dropFishX, dropFishY, WATERCOLOR);

    dropFishY++;
    PS.color(dropFishX, dropFishY, FISHORANGE);
        if ( PS.color(dropFishX, dropFishY + 1) === PS.COLOR_GRAY_LIGHT || (PS.color(dropFishX, dropFishY + 1) === FISHORANGE)) {
            PS.audioPlay("fx_bucket");
            dropFishX++;
            fillBucket();
        } else {
            dropFishTimer = PS.timerStart(2, dropFish);
        }
}

PS.colorMultiple = function (allCoordinates, specificColor)
{
    for (let i = 0; i < allCoordinates.length; i++)
    {
        PS.color( (allCoordinates[i][0] + 8), allCoordinates[i][1], specificColor);
    }
};

function reset(){
    PS.color( PS.ALL, PS.ALL, WATERCOLOR);
    PS.borderColor ( PS.ALL, PS.ALL, WATERCOLOR );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0);

    score = 0;
    time = 60;

    finalscore = 0;

    fishX = randomX();
    fishY = randomY();

    fishMaker();
    fishShow();

    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText( "Time: " + time + " || Score: " + score + " || Catch!" );

    TIMER.startTimer(60, endScreen);
}



function fishMovement(){
    if(!hooked){
        let rand = randomMovement();
        if(fishX > 1 && rand === 1){
            fishHide(fishX, fishY);
            fishX--
            fishShow();
        }
        if(fishX < 26 && rand === 2){
            fishHide(fishX, fishY);
            fishX++
            fishShow();
        }
        if(fishY > 4 && rand === 3){
            fishHide(fishX, fishY);
            fishY--
            fishShow();
        }
        if(fishY < 31 && rand === 4){
            fishHide(fishX, fishY);
            fishY++
            fishShow();
        }
    }
}