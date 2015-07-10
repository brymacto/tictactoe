  var currentPlayer = 0; // 0 - X, 1 - O
  var ownedX = [];
  var ownedO = [];
  var gameOver = false;

$( document ).ready(function() {


  function updateScore() {
    ownedX = [];
    ownedO = [];
    
    $('.space').each(function() {

      if ($(this).attr('owner') == 0) {
        ownedX.push(parseInt($(this).attr('id')));
      } else if ($(this).attr('owner') == 1) {
        ownedO.push(parseInt($(this).attr('id')));
      }

      
      checkWins(ownedX, 0);
      checkWins(ownedO, 1);
    });
    function endGame(owner) {
      console.log("WIN!!  Winner is " + owner);
      gameOver = true;
      $('#jumbotron').html('Game over!  The winner is: ' + ((owner === 0) ? 'X' : 'O') )

    }
    function checkWins(arr, owner) {
      if (($.inArray(0, arr) >= 0) && ($.inArray(1, arr) >= 0) && ($.inArray(2, arr) >= 0) || 
        ($.inArray(3, arr) >= 0) && ($.inArray(4, arr) >= 0) && ($.inArray(5, arr) >= 0) || 
        ($.inArray(6, arr) >= 0) && ($.inArray(7, arr) >= 0) && ($.inArray(8, arr) >= 0) || 
        ($.inArray(0, arr) >= 0) && ($.inArray(3, arr) >= 0) && ($.inArray(6, arr) >= 0) || 
        ($.inArray(1, arr) >= 0) && ($.inArray(4, arr) >= 0) && ($.inArray(7, arr) >= 0) || 
        ($.inArray(2, arr) >= 0) && ($.inArray(5, arr) >= 0) && ($.inArray(8, arr) >= 0) || 
        ($.inArray(0, arr) >= 0) && ($.inArray(4, arr) >= 0) && ($.inArray(8, arr) >= 0) || 
        ($.inArray(6, arr) >= 0) && ($.inArray(4, arr) >= 0) && ($.inArray(2, arr) >= 0))
        

      {
        endGame(owner);
      }

    }


  }

  $('.space').hover(
        function() {
          if (gameOver == false) {
            if ($( this ).attr('avail') != "false") {
              $( this ).addClass( "hover" );
            }
          }
        }, //on mouse out

        function() {
          if ($( this ).attr('avail') != "true") {
            $( this ).removeClass( "hover" );
          }
      });

  $('.space').click(
      function() {
        if (gameOver == false) {
          if (currentPlayer === 0) {

            if ($( this ).attr('avail') != "false") {
              $(this).html('<span>X</span>').attr({avail: 'false', owner: 0});
              updateScore();
              currentPlayer = 1;
            }

          } else {
            if ($( this ).attr('avail') != "false") {
              $(this).html('<span>O</span>').attr({avail: 'false', owner: 1});
              updateScore();
              currentPlayer = 0;
            }
          }
          $('#currentPlayer').html((currentPlayer === 0) ? 'X' : 'O');
        }
      }

    );

});