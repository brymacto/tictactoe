  var currentPlayer = 0; // 0 - X, 1 - O
  var ownedX = [];
  var ownedO = [];
  var gameOver = false;
  var playCount = 0;
  var currentGame;
  var winsX = 0;
  var winsO = 0;
  var gamesPlayed = 0;
  $( document ).ready(function() {

    $( '#playagain' ).click(function() {
      location.reload();
    });

    function game() {
      this.gameOver = false
      this.ownedX =  [];
      this.ownedO =  [];
      this.gameOver =  false;
      this.currentPlayer =  1;// 1 = X, 2 = O
      this.playCount = 0;
      this.winner = 0;
      this.spaces = [];
    }

    newGame();
    function newGame() {
      currentGame = new game();  
    }
    var Space = function (e, available, owner) {
      this.element = e;
      this.available = available;
      this.owner = null;
    }

    Space.prototype.listen = function() {
      var that = this;
      this.element.hover(function(e) { // To do: update this so it works with new OO code
        if (currentGame.gameOver == false) { 
          if (that.available != false) { 
            $( this ).addClass( "hover" );
          }
        }
        }, //on mouse out

        function(e) {
          if (currentGame.gameOver == false) {
            if (that.available != false) {
              $( this ).removeClass( "hover" );
            }
          }
        });

      this.element.on('click', function(e){
        if (currentGame.gameOver == false) {

          if (currentGame.currentPlayer === 1) {
            if (that.available != false) {
              currentGame.playCount++;
              $(this).html('<span>X</span>');
              that.available = false;
              that.owner = 1;
              updateScore();
              currentGame.currentPlayer = 2;
            }

          } else {
            if (that.available != false) {
              currentGame.playCount++;
              $(this).html('<span>O</span>');
              that.available = false;
              that.owner = 2;
              updateScore();
              currentGame.currentPlayer = 1;
            }

          }

        }
        $('#currentPlayer').html((currentGame.currentPlayer === 1) ? 'X' : 'O');
        if (currentGame.playCount == 9) {
          endGame(0);
        }
      });
      updateScore();
    }

    $.each($('.space'), function() {
      var space = new Space($(this), true, null);
      space.listen();
      currentGame.spaces.push(space);
    });

    function updateScore() {
      currentGame.ownedX = [];
      currentGame.ownedO = [];
      for (var space in currentGame.spaces) {
          if (currentGame.spaces[space].owner == 1) {
            currentGame.ownedX.push(parseInt(space));
          } else if (currentGame.spaces[space].owner == 2) {
            currentGame.ownedO.push(parseInt(space));
          }
      }
      checkWins(currentGame.ownedX, 1);
      checkWins(currentGame.ownedO, 2);

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
      function updateScoreBoard() {
        $('#gamesPlayed').html(gamesPlayed);
        $('#winsX').html(winsX);
        $('#winsO').html(winsO);

      }

      function endGame(owner) {
        currentGame.gameOver = true;
        gamesPlayed++;
        $('.board').effect('shake', {direction: 'up', distance: 3, times: 3}, 100)
        if (owner != 0) {
          $('#status').html('Game over!  The winner is ' + ((owner === 1) ? 'X' : 'O'));
          $('#playagain').show();
          if (owner === 1) {
            winsX++;
          } else {
            wins0++; 
          }
        } else 
        {
          $('#status').html("Game over!  There were no winners, only losers :(.");
          $('#playagain').show();
        }
        $('#jumbotron').animate({
          width : "100%", top: '0px'
        }, 1000, "swing", function() {
          $( this ).after( ""
           );
        });

        updateScoreBoard();

        $('.space').addClass( "hover" );

      }

});