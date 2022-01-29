
Array.prototype.random = function ()
{
	return this[Math.floor((Math.random()*this.length))];
}

let TicTacToe = ( function( $ )
{
	// 0 = not played, -1 = computer, 1 = player
	let playedSpaces = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	let bAllowPlay = true;

	// Winning matrix
	const winningMoves = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];

	// Display winning set
	function highlightRow( row )
	{
		row.forEach( element => document.getElementById( element ).classList.add( 'winner' ) );
	};

	// Display message and kill js
	function gameOver( d )
	{
		const msg = ( d == 1 ) ? 'Winner!' : ( ( d == -1 ) ? 'Loser!' : 'Draw!' );
		alert( msg );
		bAllowPlay = false;
	};

	// Look for a winner
	function checkForWin( bUser )
	{
		const winner = winningMoves.filter( t => !isPlayable( t ) ).filter( t => playedSpaces[t[0]] == playedSpaces[t[1]] && playedSpaces[t[1]] == playedSpaces[t[2]] );

		if( winner.length )
		{
			highlightRow( winner[0] );
			gameOver( bUser ? 1 : -1 );
		}
	};

	// Computer picked a square
	function playSquare( id )
	{
		if( !bAllowPlay )
			return;

		if( typeof( id ) !== 'undefined' )
		{
			playedSpaces[id] = -1;
			document.getElementById( id ).innerHTML = 'o';
		}
		else
		{
			let possiblePlays = [];

			playedSpaces.map( ( i, idx ) => { if( i == 0 ) possiblePlays[possiblePlays.length] = idx; } );

			const sq = possiblePlays.random();

			if( typeof( sq ) !== 'undefined' )
			{
				playSquare( sq );
				return;
			}

			// couldn't play
			gameOver();
			return;
		}

		checkForWin();
	};

	function isPlayable( sq )
	{
		if( typeof( sq ) == 'object' )
		{
			return sq.map( i => isPlayable( i ) ).reduce( function( prev, curr ) {
					return ( prev == true || curr == true ) ? true : false;
			} );
		}

		return playedSpaces[sq] == 0;
	};

	$.Init = function()
	{
		const DOMGameBoard = document.querySelector( '.gameboard' );
		if( DOMGameBoard )
		{
			const oTDs = DOMGameBoard.querySelectorAll( 'td' );

			oTDs.forEach( function( elem, i ) {
				elem.id = i;
				elem.innerHTML = "&nbsp;";
				elem.addEventListener( 'click', function() { TicTacToe.ClickSquare(this); }, false );
			} );
		}

		$.SetGamePlay();
	};

	// User picked a square
	$.ClickSquare = function( elem )
	{
		if( !bAllowPlay )
			return;

		if( playedSpaces[elem.id] )
			return;

		elem.innerHTML = 'x';
		playedSpaces[elem.id] = 1;

		checkForWin( 1 );

		setTimeout( "TicTacToe.ComputerPlay()", 500 );
	};

	// Computer logic
	$.ComputerPlay = function()
	{
		if( !bAllowPlay )
			return;

		// Play center square if not played
		if( playedSpaces[4] == 0 )
		{
			playSquare( 4 );
			return;
		}

		const winningMove = winningMoves.filter( squares => isPlayable( squares ) && ( playedSpaces[squares[0]] + playedSpaces[squares[1]] + playedSpaces[squares[2]] == -2 ) );

		if( winningMove.length )
		{
			playSquare( winningMove[0].find( sq => playedSpaces[sq] == 0 ) );
			return;
		}

		const defendingMove = winningMoves.filter( squares => isPlayable( squares ) && playedSpaces[squares[0]] + playedSpaces[squares[1]] + playedSpaces[squares[2]] == 2 );

		if( defendingMove.length )
		{
			playSquare( defendingMove[0].find( sq => playedSpaces[sq] == 0 ) );
			return;
		}

		playSquare();
	};

	$.Reset = function()
	{
		const DOMGameBoard = document.querySelector( '.gameboard' );
		if( DOMGameBoard )
		{
			const oTDs = DOMGameBoard.querySelectorAll( 'td' );

			oTDs.forEach( function( elem, i ) {
				elem.classList.remove( 'winner' );
				elem.innerHTML = '&nbsp;';
				} );
		}

		$.SetGamePlay();
	};

	$.SetGamePlay = function()
	{
		playedSpaces = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		bAllowPlay = true;
	};

	return $;
} )( {} );
