// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
;(function($, window, undefined){

	$(document).foundation({});

	var site = {
		init: function() {
			site.heroInit();
			site.sliders();
			site.sizeGrids();
			site.clickFunctions();
			site.mobileNav();
			site.hoverFunc();
			site.initBtns();
			site.scrollAnimations();
			site.pageTransitions();
			site.toggleClicks();
			$("a.fancybox").fancybox({
				'transitionIn'	:	'elastic',
				'transitionOut'	:	'elastic',
				'speedIn'		:	600, 
				'speedOut'		:	200, 
				'overlayShow'	:	true,
				helpers: {
					overlay: {
						locked: false
					}
				},
			});
		},
		heroInit: function() {
			var topBarHeight = $('#topBar').css('height');
		},
		sliders: function() {
			$('.hero').slick({
  				fade: true,
  				swipe: false,
				draggable: false,
				autoplay: true,
				autoplaySpeed: 3000,
				easing: 'ease-out',
				speed: 850,
				dots: true,
				// onBeforeChange: function(){
				// 	site.fadeOutSlide('hero_content');
				// },
				// onAfterChange: function(){
				// 	site.fadeInSlide('hero_content');
				// }
			});

			var heroItems = $('.slick-dots').children('li');
			var heroNumber = heroItems.length;
			heroItems.css('width',(100/heroNumber)+"%");

			console.log(heroNumber);
		},
		sizeGrids: function(){

			$('.pagination>div:eq(o)')
			//HomePage Product Double Grid
			var galleryItem = $('#gallery li');

			galleryItem.css('height',galleryItem.width());

			//Product Item Grid
			if($(window).width() >= 1005){
				gridRow = $('#productGrid .row');
				$.each(gridRow, function(){
					$('#productGrid .row').children('div:first-child').height( $('#productGrid .row').children('div:nth-child(2)').width() );
				});
			}else {
				gridRow = $('#productGrid .row');
				$.each(gridRow, function(){
					$(this).children('div:first-child').height($(this).children('div:first-child').width());
				});
			}

			//Features Item Grid
			var gridRow = $('#featureGrid .row');

			$.each(gridRow, function(){
				$(this).children('div').height( $(this).children('div:first-child').width()*1.3 );
			})

			//Support Grid 
			var supportHeight = $('#support .row div.medium-8').height();

			$('#support .row div.medium-2').height(supportHeight);
		},
		hoverFunc: function(){
			$('.featureItem').hover(function(){
				$(this).children('div:last-child').css('opacity','1');
				$(this).children('div:first-child').css('opacity','0');
			},function(){
				$(this).children('div:last-child').css('opacity','0');
				$(this).children('div:first-child').css('opacity','1');
			});
		},
		loginModal: function(){
			if($('body').hasClass('loginClosed') == true){
				$('#loginModal').css({
					opacity: 1,
					pointerEvents: 'inherit'
				});
				$('.close-reveal').css({
					opacity: 1
				});
				$('body').removeClass('loginClosed');
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$('.wrap').css('overflow','hidden');
					}
			}else{
				$('#loginModal').css({
					opacity: 0,
					pointerEvents: 'none'
				});
				$('.close-reveal').css({
					opacity: 0
				});
				$('body').removeClass('loginClosed');
				$('body').addClass('loginClosed');
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$('.wrap').css('overflow','inherit');
					}
			}
		},
		mobileNav: function(){
			mnavState = $('#mobileNav').attr('class');
			if(mnavState == 'closed'){
				$('body').css('overflow','hidden');
				$('#mobileNav').attr('class','open right');
				$('.wrap').attr('class','wrap left');
				$('.topGradient').css('opacity','0');
				$('#topBar').addClass('leftBar');
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$('.wrap').css('overflow','hidden');
					}
				$('#navBtn').addClass('active');
			}else{
				$('body').css('overflow','inherit');
				$('#mobileNav').attr('class','closed');
				$('.wrap').attr('class','wrap');
				$('.topGradient').css('opacity','.3');
				$('#topBar').removeClass('leftBar');
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$('.wrap').css('overflow','inherit');
					}
				$('#navBtn').removeClass('active');
			}
			$('#mobileNav .gborder').wrapAll('<ul />');
		},
		clickFunctions: function(){
			$(document).on('click', '#loginBtn', function(){
				site.loginModal();
			});
			$('.close-reveal').on('click', function(){
				site.loginModal();
			});
			$('.close-mobile-nav, #mobile-menu-btn').bind('tap', function(){
				site.mobileNav();
			});
			$('#mobileNav a').on('click', function(){
				site.mobileNav();
			});
			$('.wrap').on('click', function(){
				if($('#mobileNav').attr('class') != 'closed'){
					site.mobileNav();
				}
			});
			$('input, textarea').on('click',function (){
				$(this).select();
			});
		},
		initBtns: function(){
			buttons = $('.nav-main-link');
			$.each(buttons, function(){
				if($(this).attr('href') == "#signup" || $(this).attr('href') == "#login"){
					$(this).parent().removeClass("gborder");
	    			$(this).parent().addClass("gborder");
	    			if ($(this).attr('href') == "#login"){
	    				$(this).parent().attr("id",'loginBtn');
	    			}
				}
				$(this).children('div:first-child').height( $(this).children('div:nth-child(2)').height() );
			});
		},
		pageTransitions: function(){
			$('.wrap').css('opacity','1');

			$(".nav-drop-item>a, .type a").click(function(e){
				e.preventDefault();
			    var self = $(this).attr('href');
			    $('.wrap').animate({
			    	opacity: '0'
			    }, 200, function(){
			        window.location = self; // go to href after the slide animation completes
			     });

			    return false; // And also make sure you return false from your click handler.
			});
		},
		scrollAnimations: function(){

			var from = 'translate(0px,100px)';
			var to = 'translate(0px,0px)';

			$('.item').attr('data-bottom','opacity: 0; -webkit-transform: '+from+'; -ms-transform: '+from+'; -moz-transform: '+from+'; transform: '+from+';');
			$('.item').attr('data--250-bottom', 'opacity: 1;  -webkit-transform: '+to+'; -ms-transform: '+to+'; -moz-transform: '+to+'; transform: '+to+';');

			var from = 'translate(0px,25px)';
			var to = 'translate(0px,0px)';

			$('#productGrid ul li').attr('data-bottom','opacity: .5; -webkit-transform: '+from+'; -ms-transform: '+from+'; -moz-transform: '+from+'; transform: '+from+';');
			$('#productGrid ul li').attr('data--150-bottom', 'opacity: 1;  -webkit-transform: '+to+'; -ms-transform: '+to+'; -moz-transform: '+to+'; transform: '+to+';');

			if($(window).width() >= 650){
				var from = 'translate(-50%,0%)';
				var to = 'translate(-50%,-150%)';

				$('.tease .columns').attr('data-center','opacity: 1; -webkit-transform: '+from+'; -ms-transform: '+from+'; -moz-transform: '+from+'; transform: '+from+';');
				$('.tease .columns').attr('data--500-top', 'opacity: -2;  -webkit-transform: '+to+'; -ms-transform: '+to+'; -moz-transform: '+to+'; transform: '+to+';');
			}else {
				skrollr.init().destroy();
			}

			$('.wrap header').attr('data-bottom','opacity: 0;');
			$('.wrap header').attr('data--100-bottom', 'opacity: 1;')
		},
		logoNormalize: function(){
			var currentNav = $('nav h1 object').attr('data');
			if(currentNav == ''+$('body').data('uri')+'/img/logo.svg') {
    			return
    		}else{
				$('nav h1').html('<a href="#home"><object data="'+$('body').data('uri')+'/img/logo.svg" /><param name="src" value="'+$('body').data('uri')+'/img/logo.svg"></object></a>');
			}
		},
		toggleClicks: function(){
			$('.login1, .login2').on('click', function(){
				$('.toggle div').removeClass('active');
				$(this).addClass('active');
			})
		},
		fadeOutSlide: function(section){
			$('.'+section+'').stop();
			$('.'+section+'').fadeOut('fast');
		},
		fadeInSlide: function(section){
			$('.'+section+'').stop();
			$('.'+section+'').fadeIn('slow');
		}

	};

	$( document ).ready(function() {
		site.init();
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 			return;
		}else {
			skrollr.init({forceHeight: false});
		}
    	$('p').widowFix();
	});

	$(window).resize(function(){
		site.sizeGrids();
		site.heroInit();
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 			return;
		}else {
			site.scrollAnimations();
		}
		
		if($(window).width() >= 1005 ){
			site.logoNormalize();
			skrollr.init({forceHeight: false});
		}
	});

	$(window).scroll(function(){
		$('.hero_content, .casestudies').stop();
		if(!$('body').hasClass('page-template')){
			if($(window).width() <= 1005){
	        	var activeNav = $('a.nav-active').attr('href');
	        	var currentNav = $('nav h1 object').attr('data');
	        	if(activeNav){
	        		if(currentNav == ''+$('body').data('uri')+'/img/'+activeNav.slice(1)+'.svg'){
	        			return
	        		} else{
	        			$('nav h1').html('<object data="'+$('body').data('uri')+'/img/'+activeNav.slice(1)+'.svg" /><param name="src" value="'+$('body').data('uri')+'/img/'+activeNav.slice(1)+'.svg"></object>');
	        		}
	        	}else {
	        		site.logoNormalize();
	        	}
	        }
			
    	}
	})


})(jQuery, window);

