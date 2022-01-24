
function shuffle(array)
{
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let TicTacToe = ( function( $ )
{
	// 0 = not played, -1 = computer, 1 = player
	let playedSpaces = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

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
		row.forEach( element => document.getElementById( element ).style.backgroundColor = "red" );
	};

	function gameOver( d )
	{
		const msg = ( d == 1 ) ? 'Winner!' : ( ( d == -1 ) ? 'Loser!' : 'Draw!' );
		alert( msg );
		TicTacToe = '';
	};

	// Look for a winner
	function checkForWin( bUser )
	{
		for( let p = 0; p < winningMoves.length; p++ )
		{
			let test = winningMoves[p];

			if( !playedSpaces[test[0]] || !playedSpaces[test[1]] || !playedSpaces[test[2]] )
			{
				continue;
			}

			if( playedSpaces[test[0]] == playedSpaces[test[1]] && playedSpaces[test[1]] == playedSpaces[test[2]] )
			{
				highlightRow( test );

				gameOver( bUser ? 1 : -1 );
			}
		}
	};

	// Computer picked a square
	function playSquare( id )
	{
		playedSpaces[id] = -1;
		document.getElementById( id ).innerHTML = 'o';

		checkForWin();
	};

	$.Init = function()
	{
		let DOMGameBoard = document.querySelector( '.gameboard' );
		if( DOMGameBoard )
		{
			let oTDs = DOMGameBoard.querySelectorAll( 'td' );

			for( let i = 0; i < oTDs.length; i++ )
			{
				oTDs[i].id = i;
				oTDs[i].addEventListener( 'click', function() { TicTacToe.ClickSquare(this); }, false );
			}
		}
	};

	// User picked a square
	$.ClickSquare = function( elem )
	{
		if( elem.innerHTML.length )
			return;

		elem.innerHTML = 'x';
		playedSpaces[elem.id] = 1;

		checkForWin( 1 );

		setTimeout( "TicTacToe.ComputerPlay()", 500 );
	};

	// Computer logic
	$.ComputerPlay = function()
	{
		shuffle( winningMoves );

		// go for win
		for( let p = 0; p < winningMoves.length; p++ )
		{
			let test = winningMoves[p];

			if( playedSpaces[test[0]] + playedSpaces[test[1]] + playedSpaces[test[2]] == -2 )
			{
				if( playedSpaces[test[0]] == 0 )
				{
					playSquare( test[0] );
					return;
				}

				if( playedSpaces[test[1]] == 0 )
				{
					playSquare( test[1] );
					return;
				}

				if( playedSpaces[test[2]] == 0 )
				{
					playSquare( test[2] );
					return;
				}
			}
		}

		// block any that have 2 of 3 already .. then look for 1
		for( let p = 0; p < winningMoves.length; p++ )
		{
			let test = winningMoves[p];

			if( playedSpaces[test[0]] + playedSpaces[test[1]] + playedSpaces[test[2]] == 2 )
			{
				if( playedSpaces[test[0]] == 0 )
				{
					playSquare( test[0] );
					return;
				}

				if( playedSpaces[test[1]] == 0 )
				{
					playSquare( test[1] );
					return;
				}

				if( playedSpaces[test[2]] == 0 )
				{
					playSquare( test[2] );
					return;
				}
			}
		}

		// Just Play after 1
		for( let p = 0; p < winningMoves.length; p++ )
		{
			let test = winningMoves[p];

			if( playedSpaces[test[0]] && ( !playedSpaces[test[1]] || !playedSpaces[test[2]] ) )
			{
				if( !playedSpaces[test[1]] )
				{
					playSquare( test[1] );
					return;
				}
				else
				{
					playSquare( test[2] );
					return;
				}
			}
		}

		// Just Play
		for( let p = 0; p < playedSpaces.length; p++ )
		{
			if( playedSpaces[p] == 0 )
			{
				playSquare( p );
				return;
			}
		}

		// couldn't play
		gameOver();
	};

	return $;
} )( {} );
