let playlist = [ {
  'title': 'La Cantina Remix  Hernan Gómez x Luis Alfonso x Pipe Bueno',
  'audio': "assets/y2mate.com - La Cantina Remix  Hernan Gómez x Luis Alfonso x Pipe Bueno  Video Oficial.mp3",
}, {
  'title': 'PIRLO  El Dueño Del Trap Visualizer  365 DIAS DE AGUANTE',
  'audio': "assets/y2mate.com - PIRLO  El Dueño Del Trap Visualizer  365 DIAS DE AGUANTE.mp3",
}, {
  'title': 'Nirvana  Smells Like Teen Spirit Official Music Video',
  'audio': "assets/y2mate.com - Nirvana  Smells Like Teen Spirit Official Music Video.mp3",
}, {
  'title': 'Post Malone Swae Lee  Sunflower SpiderMan Into the SpiderVerse',
  'audio': "assets/y2mate.com - Post Malone Swae Lee  Sunflower SpiderMan Into the SpiderVerse.mp3",
} ];

i = 0;
n = playlist.length;
let player = document.getElementById( 'player' );
let dur = document.getElementById( 'dur' );
playlist.forEach( function( i ) {
  console.log( i.audio )
  player.src = i.audio;
  $( '.title' ).html( i.title );
}, );

function calculateTotalValue( length ) {
  let minutes = Math.floor( length / 60 ),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString( ),
    seconds = seconds_str.substr( 0, 2 ),
    time = minutes + ':' + seconds
  return time;
}

function calculateCurrentValue( currentTime ) {
  let current_hour = parseInt( currentTime / 3600 ) % 24,
    current_minute = parseInt( currentTime / 60 ) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed( ),
    current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
  return current_time;
}

function initProgressBar( ) {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue( length )
  if(isNaN(length)){
    jQuery( ".end-time" ).html('--:--');
  }else{
    jQuery( ".end-time" ).html( totalLength );
  }
  let currentTime = calculateCurrentValue( current_time );
  if(isNaN(length)){
    jQuery( ".start-time" ).html('--:--');
  }else{
    jQuery( ".start-time" ).html( currentTime );
  }
  if(current_time == length){ // nx
    nextSong();
  }
  dur.value = player.currentTime;

};

function mSet( ) {
  player.currentTime = dur.value;
}

function mDur( ) {
  let length = player.duration;
  dur.max = length;
}
function nextSong(){
  i = ( i + 1 + n ) % n;
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  player.play( );
}
function backSong(){
  i = ( i - 1 + n ) % n;
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  player.play( );
}
function startSong(){
  i = ( i + 0 + n ) % n;
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  player.play( );
}
function initPlayers( num ) {
  for ( let i = 0; i < num; i++ ) {
    ( function( ) {
      let playerContainer = document.getElementById( 'player-container' ),
        player = document.getElementById( 'player' ),
        isPlaying = false,
        playBtn = document.getElementById( 'play-btn' );
      if ( playBtn != null ) {
        playBtn.addEventListener( 'click', function( ) {
          togglePlay( )
        } );
      }

      function togglePlay( ) {
        if ( player.paused === false ) {
          player.pause( );
          isPlaying = false;
        }
        else {
          player.play( );
          isPlaying = true;
        }
      }
    }( ) );
  }
}

$( '#next' ).on( 'click', function( ) {
  nextSong()
} );
$( '#prev' ).on( 'click', function( ) {
  backSong()
} );
$( ".audio-player" )
  .toArray( )
  .forEach( function( player ) {
    let audio = $( player ).find( "audio" )[ 0 ];
    let volumeControl = $( player ).find( ".volumeControl .wrapper" );
    volumeControl.find( ".outer" ).on( "click", function( e ) {
      let volumePosition = e.pageX - $( this ).offset( ).left;
      let audioVolume = volumePosition / $( this ).width( );
      if ( audioVolume >= 0 && audioVolume <= 1 ) {
        audio.volume = audioVolume;
        $( this )
          .find( ".inner" )
          .css( "width", audioVolume * 100 + "%" );
      }
    } );
  } );
$( function( ) {
  // Dropdown toggle
  $( '.dropdown-toggle' ).click( function( ) {
    $( this ).next( '.dropdown' ).slideToggle( "fast" );
  } );
  $( document ).click( function( e ) {
    var target = e.target;
    if ( !$( target ).is( '.dropdown-toggle' ) && !$( target ).parents( ).is( '.dropdown-toggle' ) ) {
      $( '.dropdown' ).hide( );
    }
  } );
} );

initPlayers( jQuery( '#player-container' ).length );
