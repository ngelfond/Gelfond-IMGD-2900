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

PS.activeColor = null;
PS.activePalette = null;
PS.activeSounds = null;
const PALETTES = [
    //default rgb
    [
        PS.COLOR_RED,
        PS.COLOR_ORANGE,
        PS.COLOR_YELLOW,
        PS.COLOR_GREEN,
        PS.COLOR_BLUE,
        PS.COLOR_VIOLET

    ],

    //vibrant
    [
        0xed3b56, //red
        0xffa343, //orange
        0xfdfc74, //yellow
        0x71bc78, //green
        0x3382cc, //blue
        0x7442c8  //violet
    ],

    //pastel
    [
        0xffadcb, //red
        0xffd6a5, //orange
        0xfdffb6, //yellow
        0xcaffbf, //green
        0x9bf6ff, //blue
        0xbdb2ff  //violet
    ]
];

const SOUNDS = [
    //default rgb
    [
        "fx_tick",
        "fx_bang",
        "fx_blip",
        "fx_bloop",
        "fx_squink",
        "fx_squirp"

    ],

    //vibrant
    [
        "perc_drum_snare",
        "perc_hihat_closed",
        "perc_block_low",
        "perc_cowbell_high",
        "perc_tambourine",
        "perc_triangle"
    ],

    //pastel
    [
        "piano_c5",
        "piano_b4",
        "piano_a4",
        "piano_g4",
        "piano_f4",
        "piano_e4"
    ]
]



PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

    PS.debug( "Dev 3: Toy\n" );
    PS.debug( "Made by Naomi Gelfond\n" );
    PS.debug( "Click a square to change its color!\n" );
    PS.debug( "Please play with volume on.\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize( 15, 16 );
    PS.gridColor( PS.COLOR_GRAY_LIGHT );
    PS.borderColor ( PS.ALL, PS.ALL, PS.COLOR_BLACK );
    PS.borderAlpha ( PS.ALL, PS.ALL, 0);
    PS.color ( PS.ALL, 15, PS.COLOR_GRAY_LIGHT);
    PS.glyph ( 14, 15, "X");
    PS.activePalette = PALETTES[0];
    PS.activeSounds = SOUNDS[0];
    PS.borderColor ( 0, 15, PS.COLOR_YELLOW );
    PS.borderAlpha ( 0, 15, 255);
    PS.color ( 0, 15, PS.COLOR_RED );
    PS.color ( 1, 15, 0xed3b56 );
    PS.color ( 2, 15, 0xffadcb );


        // This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

    PS.statusText( "Rainbows!" );

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

    // checks the color and changes it to the next one


    if ( y !== 15){
        switch( PS.color( x, y )) {
            case PS.COLOR_WHITE:
                PS.color ( x, y, PS.activePalette[0] );
                break;
            case PS.activePalette[0]:
                PS.color ( x, y, PS.activePalette[1]);
                break;
            case PS.activePalette[1]:
                PS.color ( x, y, PS.activePalette[2] );
                break;
            case PS.activePalette[2]:
                PS.color ( x, y, PS.activePalette[3] );
                break;
            case PS.activePalette[3]:
                PS.color ( x, y, PS.activePalette[4] );
                break;
            case PS.activePalette[4]:
                PS.color ( x, y, PS.activePalette[5] );
                break;
            case PS.activePalette[5]:
                PS.color ( x, y, PS.COLOR_WHITE );
                break;
            default:
                PS.color ( x, y, PS.activePalette[0] );
                break;
        }
        PS.activeColor =  PS.color( x, y );
    }
    else{
        if (x === 0){
            PS.activePalette = PALETTES[0];
            PS.activeSounds = SOUNDS[0];
            PS.borderAlpha ( PS.ALL, PS.ALL, 0);
            PS.borderAlpha ( 0, 15, 255);
            PS.borderColor ( 0, 15, PS.COLOR_YELLOW );
        }
        else if (x === 1){
            PS.activePalette = PALETTES[1];
            PS.activeSounds = SOUNDS[1];
            PS.borderAlpha ( PS.ALL, PS.ALL, 0);
            PS.borderAlpha ( 1, 15, 255);
            PS.borderColor ( 1, 15, PS.COLOR_YELLOW );
        }
        else if (x === 2){
            PS.activePalette = PALETTES[2];
            PS.activeSounds = SOUNDS[2];
            PS.borderAlpha ( PS.ALL, PS.ALL, 0);
            PS.borderAlpha ( 2, 15, 255);
            PS.borderColor ( 2, 15, PS.COLOR_YELLOW );
        }
    }

    if (PS.glyph( x, y )){
        PS.color ( PS.ALL, PS.ALL, PS.COLOR_WHITE);
        PS.color ( PS.ALL, 15, PS.COLOR_GRAY_LIGHT);
        PS.color ( 0, 15, PS.COLOR_RED );
        PS.color ( 1, 15, 0xfc2847 );
        PS.color ( 2, 15, 0xffadcb );
        PS.audioPlay ( "fx_squawk" );
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
    switch( PS.color( x, y )) {
        case PS.activePalette[0]:
            PS.audioPlay( PS.activeSounds[0] );
            break;
        case PS.activePalette[1]:
            PS.audioPlay( PS.activeSounds[1] );
            break;
        case PS.activePalette[2]:
            PS.audioPlay( PS.activeSounds[2] );
            break;
        case PS.activePalette[3]:
            PS.audioPlay( PS.activeSounds[3] );
            break;
        case PS.activePalette[4]:
            PS.audioPlay( PS.activeSounds[4] );
            break;
        case PS.activePalette[5]:
            PS.audioPlay( PS.activeSounds[5] );
            break;
        case PS.COLOR_WHITE:
            PS.audioPlay( "fx_pop" );
            break;
    }
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
    if (options.touching) {
        if (y !== 15) {
            PS.color ( x, y, PS.activeColor);
            /* switch ( PS.activePalette ) {
                case PALETTES[0]:
                    PS.audioPlay( "fx_shoot7" );
                    break;
                case PALETTES[1]:
                    PS.audioPlay ("perc_shaker");
                    break;
                case PALETTES[2]:
                    PS.audioPlay ("xylo_b4");
                    break;
            } it's really loud :( */
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

