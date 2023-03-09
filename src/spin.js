
//console.log('Estos son los goles desde otro js' +win)
/*
var kickSound = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/kick.mp3']
} );
var positiveSound = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/positive.mp3']
} );
var winnnnSound = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/win_all_rows.mp3'],
    volume: 0.3
} );
var winChaka = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/win_chaka.mp3'],
    volume: 0.7
} );
var spinSound = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/speed_2.mp3']
} );
var endRound = new Howl( {
    src: ['//static.wplay.co/offers/ofertas/assets/sounds/spin.mp3']
} );


function  winRound() {
   
    $('.reel').each(function(index, element) {
        setTimeout(function() {
            if (index === 0) {
                winChaka.play();
            }
           
            $(element).css({
                'background-image': 'url(\'//static.wplay.co/offers/ofertas/assets/images/spin/cherry.png\')',
                'background-size': '85%'
            }).animate({
                'background-position-y': '100%'
            }, 860, 'swing', function() {
                $(element).addClass('animated pulse');
                positiveSound.play();
                if (index === 2) {
                    setTimeout(function() {
                        $('body').trigger('show-win');
                    }, 2500)
                }
            });
        }, 460 * (index + 1));
    });
  }

  function showWin() {
    $( '.offer img' ).hide();
    $( '.offer' ).show( 'fast', function () {
        setTimeout( function () {
            winnnnSound.play();
            $( '.offer img' ).show().addClass( 'animated tada' );
        }, 1000 );
    } );
}


$( 'body' ).on( 'show-win', function () {
    showWin();
} );*/