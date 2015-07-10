$( document ).ready(function() {
  var currentPlayer = 0 // 0 - X, 1 - O
  var ownedX = [];
  var ownedY = [];

  function checkWins() {


    $('.space').each(function() {
      if ($(this).attr('owner') == 0) {
        ownedX.push($(this).attr('id'));
      } else if ($(this).attr('owner') == 1) {
        ownedY.push($(this).attr('id'));
      }

    });


    // for (i = 0; i <= 8; i++) {
    //   if ($('.space').toArray()[i].attr('owner') == 0) {
    //     ownedX.push(i);
    //   } else if ($('.space').toArray()[i].attr('owner') == 1) {
    //     ownedY.push(i);
    //   }
    // }

  }

  $('.space').hover(
        function() {
          if ($( this ).attr('avail') != "false") {
            $( this ).addClass( "hover" );
          }
        }, function() {
          if ($( this ).attr('avail') != "true") {
            $( this ).removeClass( "hover" );
          }
      });

  $('.space').click(
      function() {

        if (currentPlayer === 0) {
          if ($( this ).attr('avail') != "false") {
            $(this).html('<span>X</span>').attr({avail: 'false', owner: 0});
            checkWins();
            currentPlayer = 1;
          }

        } else {
          if ($( this ).attr('avail') != "false") {
            $(this).html('<span>O</span>').attr({avail: 'false', owner: 1});
            checkWins();
            currentPlayer = 0;
          }
        }
        $('#currentPlayer').html((currentPlayer === 0) ? 'X' : 'O');
      }
    );

});