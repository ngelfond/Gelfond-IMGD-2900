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

var playerx = 1;
var playery = 1;
var moving = false;
var goalx = 0;
var goaly = 0;
var lvl = 1;

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

	PS.gridSize( 15, 15 );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    lvl1();



    // This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

    PS.statusText( "Escape!" );

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

    if (x === 0 && y === 0){
        reset();
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
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
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
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
    if (!moving){
        if (key === PS.KEY_ARROW_UP ){ // Up
            if ((PS.color ( playerx , playery - 1) === PS.COLOR_WHITE)||(PS.color ( playerx , playery - 1) === PS.COLOR_GRAY_DARK)){
                PS.audioPlay("fx_shoot7");
            }
            else{
                moving = true;
                movementTimer = PS.timerStart( 2, moveUp );
            }
        }
        if (key === PS.KEY_ARROW_DOWN ){ // Down
            if ((PS.color ( playerx , playery + 1) === PS.COLOR_WHITE)||(PS.color ( playerx , playery + 1) === PS.COLOR_GRAY_DARK)){
                PS.audioPlay("fx_shoot7");
            }
            else{
                moving = true;
                movementTimer = PS.timerStart( 2, moveDown );
            }
        }
        if (key === PS.KEY_ARROW_LEFT ){ // Left
            if ((PS.color ( playerx - 1, playery ) === PS.COLOR_WHITE)||(PS.color ( playerx - 1 , playery ) === PS.COLOR_GRAY_DARK)){
                PS.audioPlay("fx_shoot7");
            }
            else{
                moving = true;
                movementTimer = PS.timerStart( 2, moveLeft );
            }
        }
        if (key === PS.KEY_ARROW_RIGHT ){ // Right
            if ((PS.color ( playerx + 1, playery ) === PS.COLOR_WHITE)||(PS.color ( playerx + 1 , playery ) === PS.COLOR_GRAY_DARK)){
                PS.audioPlay("fx_shoot7");
            }
            else{
                moving = true;
                movementTimer = PS.timerStart( 2, moveRight );
            }
        }

        if (key === 82 || key === 114 ){ // R
            reset();
        }

    }

    //checks if player position ended on the goal
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

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }


	// Add code here for when an input event is detected.


};

let movementTimer = "";


function moveUp() {

    PS.color ( playerx, playery, PS.COLOR_BLACK );
    if (PS.borderAlpha( playerx, playery) === 255){
        PS.color ( playerx, playery, PS.COLOR_WHITE );
    }
    playery--;
    if (PS.color(playerx, playery) === PS.COLOR_BLUE){
        openDoor();
    }
    if (PS.color(playerx, playery) === PS.COLOR_RED){
        moving = false;
        PS.timerStop(movementTimer);
        reset();
    }
    else{
        PS.color ( playerx, playery, PS.COLOR_YELLOW );
        PS.timerStop(movementTimer);

        PS.color( goalx, goaly, PS.COLOR_GREEN);

        if ((PS.color ( playerx, playery - 1 ) == PS.COLOR_WHITE) || (PS.color ( playerx, playery - 1 ) == PS.COLOR_GRAY_DARK)){
            PS.audioPlay( "fx_squink" );
            moving = false;
            checkIfGoal()
        }
        else{
            movementTimer = PS.timerStart( 2, moveUp );
        }
    }


}

function moveDown() {

    PS.color ( playerx, playery, PS.COLOR_BLACK );
    if (PS.borderAlpha( playerx, playery) === 255){
        PS.color ( playerx, playery, PS.COLOR_WHITE );
    }
    playery++;
    if (PS.color(playerx, playery) === PS.COLOR_BLUE){
        openDoor();
    }
    if (PS.color(playerx, playery) === PS.COLOR_RED){
        moving = false;
        PS.timerStop(movementTimer);
        reset();
    }
    else{
        PS.color ( playerx, playery, PS.COLOR_YELLOW );
        PS.timerStop(movementTimer);

        PS.color( goalx, goaly, PS.COLOR_GREEN);

        if ((PS.color ( playerx, playery + 1 ) == PS.COLOR_WHITE) || (PS.color ( playerx, playery + 1 ) == PS.COLOR_GRAY_DARK)){
            PS.audioPlay( "fx_squink" );
            moving = false;
            checkIfGoal()
        }
        else{
            movementTimer = PS.timerStart( 2, moveDown );
        }
    }

}

function moveLeft() {

    PS.color ( playerx, playery, PS.COLOR_BLACK );
    if (PS.borderAlpha( playerx, playery ) === 255){
        PS.color ( playerx, playery, PS.COLOR_WHITE );
    }
    playerx--;
    if (PS.color(playerx, playery) === PS.COLOR_BLUE){
        openDoor();
    }
    if (PS.color(playerx, playery) === PS.COLOR_RED){
        moving = false;
        PS.timerStop(movementTimer);
        reset();
    }
    else{
        PS.color ( playerx, playery, PS.COLOR_YELLOW );
        PS.timerStop(movementTimer);

        PS.color( goalx, goaly, PS.COLOR_GREEN);

        if ((PS.color ( playerx - 1, playery ) == PS.COLOR_WHITE) || (PS.color ( playerx - 1, playery ) == PS.COLOR_GRAY_DARK) ){
            PS.audioPlay( "fx_squink" );
            moving = false;
            checkIfGoal()
        }
        else{
            movementTimer = PS.timerStart( 2, moveLeft );
        }
    }
}

function moveRight() {

    PS.color ( playerx, playery, PS.COLOR_BLACK );
    if (PS.borderAlpha( playerx, playery) === 255){
        PS.color ( playerx, playery, PS.COLOR_WHITE );
    }
    playerx++;
    if (PS.color(playerx, playery) === PS.COLOR_BLUE){
        openDoor();
    }
    if (PS.color(playerx, playery) === PS.COLOR_RED){
        moving = false;
        PS.timerStop(movementTimer);
        reset();
    }
    else{
        PS.color ( playerx, playery, PS.COLOR_YELLOW );
        PS.timerStop(movementTimer);

        PS.color( goalx, goaly, PS.COLOR_GREEN);

        if (PS.color ( playerx + 1, playery ) === PS.COLOR_WHITE || PS.color ( playerx + 1, playery ) === PS.COLOR_GRAY_DARK){
            PS.audioPlay( "fx_squink" );
            moving = false;
            checkIfGoal()
        }
        else{
            movementTimer = PS.timerStart( 2, moveRight );
        }
    }

}

//all of the lvl functions populate the starting state of the current level

function lvl1(){
    PS.gridSize( 8, 8 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 7 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 7, PS.COLOR_WHITE);

    PS.color( 1, 1, PS.COLOR_WHITE);
    PS.color( 5, 1, PS.COLOR_WHITE);
    PS.color( 2, 4, PS.COLOR_WHITE);
    PS.color( 3, 6, PS.COLOR_WHITE);
    PS.color( 6, 3, PS.COLOR_WHITE);

    playerx = 4;
    playery = 1;

    goalx = 1;
    goaly = 3;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");

}

function lvl2(){
    PS.gridSize( 12, 12 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 11 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 11, PS.COLOR_WHITE);

    PS.color( 2, 1, PS.COLOR_WHITE); PS.color( 3, 1, PS.COLOR_WHITE); PS.color( 10, 1, PS.COLOR_WHITE);
    PS.color( 3, 2, PS.COLOR_WHITE); PS.color( 10, 2, PS.COLOR_WHITE);
    PS.color( 9, 3, PS.COLOR_WHITE); PS.color( 10, 3, PS.COLOR_WHITE);
    PS.color( 4, 4, PS.COLOR_WHITE);
    PS.color( 9, 6, PS.COLOR_WHITE);
    PS.color( 3, 7, PS.COLOR_WHITE); PS.color( 9, 7, PS.COLOR_WHITE);
    PS.color( 8, 6, PS.COLOR_WHITE);
    PS.color( 10, 10, PS.COLOR_WHITE);

    PS.borderAlpha ( 3, 9, 255 );

    playerx = 4;
    playery = 1;

    goalx = 2;
    goaly = 2;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl3(){
    PS.gridSize( 13, 13 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 12 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 12, PS.COLOR_WHITE);

    let bordered = [ [2,6], [3,10], [4,3], [5,5], [6,4], [8,9] ]
    PS.borderMultiple(bordered);

    playerx = 8;
    playery = 3;

    goalx = 3;
    goaly = 9;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl4(){
    PS.gridSize( 15, 15 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_RED);
    PS.color( 14 , PS.ALL, PS.COLOR_RED);
    PS.color( PS.ALL, 0, PS.COLOR_RED);
    PS.color( PS.ALL, 14, PS.COLOR_RED);

    let red = [ [1,3], [2,3], [10,6]];
    let white = [ [1,4], [1,5], [1,6], [2,13], [3,13], [5,3], [6,7], [6,12],
        [7,5], [7,13], [8,1], [8,12], [8,13], [9,1], [9,12], [9,13], [10,1], [10,2],
        [10,13], [11,13], [12,1], [12,4], [12,6], [13,4], [13,5], [13,6], [13,11]];
    PS.colorMultiple(red, PS.COLOR_RED);
    PS.colorMultiple(white, PS.COLOR_WHITE);

    playerx = 1;
    playery = 2;

    goalx = 11;
    goaly = 4;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl5(){
    PS.gridSize( 16, 16 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 15 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 15, PS.COLOR_WHITE);

    PS.color( 3, 1, PS.COLOR_RED); PS.color( 3, 2, PS.COLOR_RED);
    PS.color( 5, 12, PS.COLOR_RED);
    PS.color( 8, 4, PS.COLOR_RED);
    PS.color( 9, 4, PS.COLOR_RED);
    PS.color( 11, 12, PS.COLOR_RED);

    let white = [ [1,3], [2,14], [6,9], [7,4], [7,5], [7,14], [12,14], [13,2] ]

    PS.colorMultiple( white, PS.COLOR_WHITE);

    PS.borderAlpha ( 1, 8, 255 );

    playerx = 11;
    playery = 4;

    goalx = 2;
    goaly = 8;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl6(){
    PS.gridSize( 12, 12 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 11 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 11, PS.COLOR_WHITE);

    let white = [[1,3],[1,7],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[10,9],
                        [10,10],[10,8],[10,7],[10,2],[3,6],[4,1],[5,8],[8,7],[8,4]]
    PS.colorMultiple(white, PS.COLOR_WHITE);
    PS.color(1, 1, PS.COLOR_BLUE);
    PS.color(9, 9, PS.COLOR_GRAY_DARK);

    playerx = 8;
    playery = 2;

    goalx = 1;
    goaly = 10;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl7(){
    PS.gridSize( 16, 16 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 15 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 15, PS.COLOR_WHITE);
    PS.borderAlpha ( 6, 12, 255 );

    let blue = [[1,3],[4,5],[5,7],[6,10],[8,7],[9,1],[10,3],[12,5],[14,8]];
    let gray = [[5,13],[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[11,14],[13,14]];
    let red = [[2,4],[4,9],[4,13],[4,14],[6,13],[7,13],[8,13],[9,13],[10,13],
                        [11,13],[12,13],[13,13],[10,4],[11,4],[12,2],[14,14]];
    let white = [[1,2],[1,13],[1,14],
                        [2,5],[2,10],[2,13],[2,14],
                        [3,4],[3,13],[3,14],
                        [4,8],[5,6],[9,7],[10,9],
                        [11,5],[11,9],[11,11],
                        [12,11],[13,2],[13,3],[14,13]
                        ];

    PS.colorMultiple(blue, PS.COLOR_BLUE);
    PS.colorMultiple(gray, PS.COLOR_GRAY_DARK);
    PS.colorMultiple(red, PS.COLOR_RED);
    PS.colorMultiple(white,PS.COLOR_WHITE);

    playerx = 1;
    playery = 1;

    goalx = 12;
    goaly = 14;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}

function lvl8(){
    PS.gridSize( 16, 16 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_WHITE );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( 0 , PS.ALL, PS.COLOR_WHITE);
    PS.color( 15 , PS.ALL, PS.COLOR_WHITE);
    PS.color( PS.ALL, 0, PS.COLOR_WHITE);
    PS.color( PS.ALL, 15, PS.COLOR_WHITE);

    PS.color(12, 14, PS.COLOR_BLUE);
    PS.color(8, 3, PS.COLOR_GRAY_DARK);

    let red = [[1,11],[3,13],[4,4],[4,7],[7,4],[7,7],[7,8],[12,2],[14,14]];
    let white = [[1,1],[1,2],[2,1],[3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[4,3],
        [4,11],[4,6],[5,2],[5,3],[5,10],[5,11],[6,3],[6,11],[7,3],[7,5],[7,11],[8,11],[9,2],[9,3],[9,4],[9,11],
        [10,3],[10,11],[12,8],[14,7], [7,1],
        [11,10],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,11]];
    let bordered = [[7,14],[7,13],[7,12],[8,8],[10,6],[13,14]];

    PS.colorMultiple(red, PS.COLOR_RED);
    PS.colorMultiple(white, PS.COLOR_WHITE);
    PS.borderMultiple(bordered);

    playerx = 8;
    playery = 2;

    goalx = 8;
    goaly = 7;

    PS.color( playerx, playery, PS.COLOR_YELLOW);
    PS.color( goalx, goaly, PS.COLOR_GREEN);

    PS.glyph( 0, 0, "R");
}


function clear(){
    PS.gridSize( 23, 23 );
    PS.gridColor( PS.COLOR_BLACK );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0 );
    PS.color( PS.ALL, PS.ALL, PS.COLOR_GREEN );
    PS.color(1, 9, PS.COLOR_BLACK); PS.color(1, 10, PS.COLOR_BLACK); PS.color(1, 11, PS.COLOR_BLACK); PS.color(1, 12, PS.COLOR_BLACK); PS.color(1, 13, PS.COLOR_BLACK);
    PS.color(2, 9, PS.COLOR_BLACK); PS.color(2, 13, PS.COLOR_BLACK);
    PS.color(3, 9, PS.COLOR_BLACK); PS.color(3, 13, PS.COLOR_BLACK);

    PS.color(5, 9, PS.COLOR_BLACK); PS.color(5, 10, PS.COLOR_BLACK); PS.color(5, 11, PS.COLOR_BLACK); PS.color(5, 12, PS.COLOR_BLACK); PS.color(5, 13, PS.COLOR_BLACK);
    PS.color(6, 13, PS.COLOR_BLACK);
    PS.color(7, 13, PS.COLOR_BLACK);

    PS.color(9, 9, PS.COLOR_BLACK); PS.color(9, 10, PS.COLOR_BLACK); PS.color(9, 11, PS.COLOR_BLACK); PS.color(9, 12, PS.COLOR_BLACK); PS.color(9, 13, PS.COLOR_BLACK);
    PS.color(10, 9, PS.COLOR_BLACK);PS.color(10, 11, PS.COLOR_BLACK);PS.color(10, 13, PS.COLOR_BLACK);
    PS.color(11, 9, PS.COLOR_BLACK);PS.color(11, 13, PS.COLOR_BLACK);

    PS.color(13, 10, PS.COLOR_BLACK); PS.color(13, 11, PS.COLOR_BLACK); PS.color(13, 12, PS.COLOR_BLACK); PS.color(13, 13, PS.COLOR_BLACK);
    PS.color(14, 9, PS.COLOR_BLACK); PS.color(14, 11, PS.COLOR_BLACK);
    PS.color(15, 9, PS.COLOR_BLACK); PS.color(15, 11, PS.COLOR_BLACK);
    PS.color(16, 10, PS.COLOR_BLACK); PS.color(16, 11, PS.COLOR_BLACK); PS.color(16, 12, PS.COLOR_BLACK); PS.color(16, 13, PS.COLOR_BLACK);

    PS.color(18, 10, PS.COLOR_BLACK); PS.color(18, 11, PS.COLOR_BLACK); PS.color(18, 12, PS.COLOR_BLACK); PS.color(18, 13, PS.COLOR_BLACK);
    PS.color(19, 9, PS.COLOR_BLACK); PS.color(19, 11, PS.COLOR_BLACK);
    PS.color(20, 9, PS.COLOR_BLACK); PS.color(20, 11, PS.COLOR_BLACK);
    PS.color(21, 10, PS.COLOR_BLACK); PS.color(21, 12, PS.COLOR_BLACK); PS.color(21, 13, PS.COLOR_BLACK);

}

function checkIfGoal(){
    if (goalx === playerx && goaly === playery ){
        //next level
        PS.audioPlay("fx_coin1");
        lvl++;
        switch (lvl){
            case 2:
                lvl2();
                break;
            case 3:
                lvl3()
                break;
            case 4:
                lvl4();
                break;
            case 5:
                lvl5();
                break;
            case 6:
                lvl6();
                break;
            case 7:
                lvl7();
                break;
            case 8:
                lvl8();
                break;
            case 9:
                clear();
                break;
        }
    }
}

function reset(){
    PS.audioPlay("fx_blast3");
    switch (lvl){
        case 1:
            lvl1();
            break;
        case 2:
            lvl2();
            break;
        case 3:
            lvl3()
            break;
        case 4:
            lvl4();
            break;
        case 5:
            lvl5();
            break;
        case 6:
            lvl6();
            break;
        case 7:
            lvl7();
            break;
        case 8:
            lvl8();
            break;
        case 9:
            clear();
            break;
    }
}

PS.colorMultiple = function (allCoordinates, specificColor)
{
    for (let i = 0; i < allCoordinates.length; i++)
    {
        PS.color( allCoordinates[i][0], allCoordinates[i][1], specificColor);
    }
};

PS.borderMultiple = function (allCoordinates)
{
    for (let i = 0; i < allCoordinates.length; i++)
    {
        PS.borderAlpha ( allCoordinates[i][0], allCoordinates[i][1], 255);
    }
};

function openDoor(){
    switch(lvl){
        case 6:
            if (playerx === 1 && playery === 1){
                PS.color( 9, 9, PS.COLOR_BLACK);
            }
            break;
        case 7:
            if (playerx === 8 && playery === 7){
                PS.color( 13, 14, PS.COLOR_BLACK);
            }
            if (playerx === 1 && playery === 3){
                PS.color( 5, 13, PS.COLOR_BLACK);
            }
            if (playerx === 4 && playery === 5){
                PS.color( 5, 14, PS.COLOR_BLACK);
            }
            if (playerx === 5 && playery === 7){
                PS.color( 6, 14, PS.COLOR_BLACK);
            }
            if (playerx === 6 && playery === 10){
                PS.color( 7, 14, PS.COLOR_BLACK);
            }
            if (playerx === 9 && playery === 1){
                PS.color( 8, 14, PS.COLOR_BLACK);
            }
            if (playerx === 10 && playery === 3){
                PS.color( 9, 14, PS.COLOR_BLACK);
            }
            if (playerx === 12 && playery === 5){
                PS.color( 10, 14, PS.COLOR_BLACK);
            }
            if (playerx === 14 && playery === 8){
                PS.color( 11, 14, PS.COLOR_BLACK);
            }
            break;
        case 8:
            if (playerx === 12 && playery === 14){
                PS.color( 8, 3, PS.COLOR_BLACK);
            }
            break;
    }
}