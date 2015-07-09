$( document ).ready(function() {
  $('.space').hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }

    )
});