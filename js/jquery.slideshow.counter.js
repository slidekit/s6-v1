/***********
 *
 *  counter addon:
 *
 *   adds slide counter (e.g. 1/7)
 *   - use key-n to toggle slide counter (in projection mode)
 *
 *   layout structure:
 *
 *  .layout
 *    > #counter  (e.g. 1/7)
 */


Slideshow.counterInit = function()
{
  this.debug( 'calling counterInit()' );

  // if no div.layout exists, create one
  if( $( '.layout' ).length == 0 )
    $( 'body' ).append( "<div class='layout'></div>");

  $( '.layout' ).append( "<div id='counter'>" );
 
  this.counterUpdate();
}

Slideshow.counterDebugOn = function()
{
  this.debug( 'calling counterDebugOn()' );
  $( '#counter' ).addClass( 'debug' );
}

Slideshow.counterDebugOff = function()
{
  this.debug( 'calling counterDebugOff()' );
  $( '#counter' ).removeClass( 'debug' );
}

Slideshow.counterKeys = function( event, key )
{
  this.debug( 'calling counterKeys()' );
  
  switch( key.which ) {
      case 78: // n
        this.counterToggle();
        break;
  }
} 

Slideshow.counterChange = function()
{
  this.debug( 'calling counterChange()' );
  this.counterUpdate();
}

// ------------------------------------------------

Slideshow.counterUpdate = function()
{ 
  $( '#counter' ).html( this.snum + '/' + this.smax );
}


Slideshow.counterToggle = function()
{
  // toggle slide number/counter
  
  // todo/fix: note jquery sets inline css (e.g. display: block)
  //   but css won't get scoped for media (e.g. projection, screen, etc)
  //   thus, css changes "spill over" to all media types
  
  $( '#counter' ).toggle();
}

// ------------------------------------------------

Slideshow.counterAddEvents = function()
{
  $( document ).on( 'slideshow.init',      $.proxy( Slideshow.counterInit, this ));
  $( document ).on( 'slideshow.debug.on',  $.proxy( Slideshow.counterDebugOn, this ));
  $( document ).on( 'slideshow.debug.off', $.proxy( Slideshow.counterDebugOff, this ));
  $( document ).on( 'slideshow.keys',      $.proxy( Slideshow.counterKeys, this ));
  $( document ).on( 'slideshow.change',    $.proxy( Slideshow.counterChange, this ));
}

Slideshow.counterAddStyles = function() {
  this.debug( 'add builtin counter css via inline style elements' );

   var styleProjection =
"<style media='screen,projection'>                   \n"+
"                                                    \n"+
" #counter.debug { background: #FFC; }               \n"+
"                                                    \n"+
" #counter      { position: fixed;                   \n"+
"                 left: 45%; bottom: 1em;            \n"+
"                width: 10%;                         \n"+
"                z-index: 10;                        \n"+
"                text-align: center;                 \n"+
"                font-size: 80%;                     \n"+
"              }                                     \n"+
"                                                    \n"+
" #counter :link,                                    \n"+
" #counter :visited {  text-decoration: none; }      \n"+
"                                                    \n"+
"</style>";

   var styleScreen =
"<style media='screen'>                    \n"+
" #counter { display: none !important; }   \n"+
"</style>";

  $( 'head' ).append( styleProjection );
  $( 'head' ).append( styleScreen     );
}

Slideshow.counterAddStyles();
Slideshow.counterAddEvents();