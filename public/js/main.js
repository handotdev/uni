$.get( "api/designers", function( data ) {
  $( ".result" ).html( data );
  alert( "Load was performed." );
});