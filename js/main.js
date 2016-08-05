var swiper2;
var maxHT = 0;
var sectTop;
var isMobile = false;
if (navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i)) {
  isMobile = true;
}
window.onload = function() {
  // PRELOADER
  var body = document.querySelector('body');
  body.classList.remove('noscroll')
  body.classList.add('loading')
  setTimeout(function(){body.classList.add('loaded')},1500)
  setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},2400)
  //PRELOADER
  var swiper1 = new Swiper('.news-slider', {
    loop:true,
    speed:1000,
    autoplay: 4000,
    // virtualTranslate:true,
    effect: 'fade',
    onTransitionStart: function(swiper) {
      $('.swiper-slide').removeClass('mask')
    },
    onTransitionEnd: function(swiper) {
      setTimeout(function(){$('.swiper-slide-active').addClass('mask')},2000);
    }
  });
  if(document.querySelector('.case-slider') != undefined){
    heightSlider();
    document.querySelector('.case-slider').onmouseover = function() {
      swiper2.stopAutoplay();
    }
    document.querySelector('.case-slider').onmouseout = function() {
      swiper2.stopAutoplay();
    }
    document.querySelector('.news-slider').onmouseover = function() {
      swiper1.stopAutoplay();
    }
    document.querySelector('.news-slider').onmouseout = function() {
      swiper1.startAutoplay();
    }
  }
  setTimeout(function(){
    swiper2 = new Swiper('.case-slider', {
      loop:true,
      speed:1000,
      autoplay: 4000,
      direction: 'vertical',
      autoHeight:false,
      // virtualTranslate:true,
    });
  },400);
  var swiper3 = new Swiper('.clients-slider', {
    loop:true,
    speed:1000,
    autoplay: 2000,
  });

  if(document.querySelector('.news-window') != undefined){
    var newsHeight = window.innerHeight - document.querySelector('.news-window-head').clientHeight - 60;
    for (var i =0 ;i < document.querySelectorAll('.news-window-body-over').length; i++) {
      document.querySelectorAll('.news-window-body-over')[i].style.maxHeight = newsHeight + 'px';
    }
  }
  // animate map
  if(document.querySelector('.maps') != undefined){
    if(isMobile == false) {
      document.querySelector('.maps').style.opacity = '1';
      var tl = new TimelineMax();
      var elPath = document.querySelectorAll(".map-svg path");
      var xPos = document.querySelector('.map-svg').clientWidth + 100;
      var YPos = Math.random()*(document.querySelector('.map-svg').clientHeight/2 - document.querySelector('.map-svg').clientWidth);
      tl.staggerFrom(elPath, 0.4, {x: xPos, y:YPos, repeat:1,ease: Circ.easeOut}, 0.01);
    }else {
      document.querySelector('.maps').style.opacity = '1';
    }
    var t2 = new TimelineMax({
      repeat:-1, 
      yoyo:true
    });
    t2
    .staggerTo("#map_svg stop", 4, {
      stopColor:'#2a3ef2',
      cycle:{
        stopColor: ['#ffc40c', '#2a3ef2','#ffc40c', '#2a3ef2']  
      }
    }, 0.7, 0)
    .progress(1).progress(0);
  }
  // animate map
  sectTop = document.querySelector('.section-nav').offsetTop;
  if(document.querySelector('.veiw-introd') != undefined){
    document.querySelector('.veiw-introd').onclick = function(){
      var block_ = document.querySelectorAll('.text-left .section-product-list');
      if(block_[0].classList.contains("active")) {
        block_[0].classList.remove("active");
        setTimeout(function(){block_[0].classList.remove("visible")},600);
        setTimeout(function(){block_[1].classList.add("visible")},700);
        setTimeout(function(){block_[1].classList.add("active")},800);
        this.innerHTML = 'View by Services'
      }else {
        block_[1].classList.remove("active");
        setTimeout(function(){block_[1].classList.remove("visible")},600);
        setTimeout(function(){block_[0].classList.add("visible")},700);
        setTimeout(function(){block_[0].classList.add("active")},800);
        this.innerHTML = 'View by Industries'
      }
      return false;
    }
  }
  var idActiveNews = window.location.hash;
  if (idActiveNews.length > 1){
    setTimeout(function(){
      document.body.classList.add('noscroll')
      document.querySelector('.overlay').classList.add('visible')
    },1500)
    setTimeout(function(){
      document.querySelector('.news-window[data-news="' + idActiveNews +'"]').classList.add('visible');
    },1800);
  }
}
window.onresize = function() {
  if(document.querySelector('.case-slider') != undefined){
    swiper2.destroy(false,true);
    heightSlider();
  }
  setTimeout(function(){
    swiper2 = new Swiper('.case-slider', {
      loop:true,
      speed:1000,
      autoplay: 4000,
      parallax: true,
      direction: 'vertical',
      autoHeight:false,
    });
  },300)
  if(document.querySelector('.news-window') != undefined){
    var newsHeight = window.innerHeight - document.querySelector('.news-window-head').clientHeight - 60;
    for (var i =0 ;i < document.querySelectorAll('.news-window-body-over').length; i++) {
      document.querySelectorAll('.news-window-body-over')[i].style.maxHeight = newsHeight + 'px';
    }
  }
}
window.onscroll = function() {
  var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  if(document.querySelector('.section-nav') != undefined){
    if (scrollTop > sectTop + 150) {
      document.querySelector('.section-nav-fixed').classList.add('visible');
    }else {
      document.querySelector('.section-nav-fixed').classList.remove('visible');
    }
  }
  if(document.querySelector('.nav-brd') != undefined){
    if (scrollTop > document.querySelector('.section-top').clientHeight) {
      document.querySelector('.nav-brd').classList.add('visible')
    }else {
      document.querySelector('.nav-brd').classList.remove('visible')
    }
  }
}
function heightSlider(){
  var boxSh = document.getElementsByClassName("case-slide");
  var maxHT = 0;
  for (var i = 0; i < boxSh.length; ++i) {
    boxSh[i].style.height = "";
    boxSh[i].removeAttribute("style");
    if (maxHT < boxSh[i].offsetHeight) {
      maxHT = boxSh[i].offsetHeight; 
    }
  }
  for (var i = 0; i < boxSh.length; ++i) {
    boxSh[i].style.height = maxHT + "px";
  }
  document.querySelector('.case-slider').style.height = maxHT + 'px';
}
$(document).ready(function() {
  $(document).on('click','.wave-effect',function(e){
    $('.wave-span').remove();
    var posL = e.pageX - $(this).offset().left - $(this).width()/2;
    var posT = e.pageY - $(this).offset().top - $(this).width()/2;
    var waveH = $(this).width();
    // $(this).find('span').hide();
    $(this).append('<span class="wave-span"></span>');
    $('.wave-span').css({'top':posT,'left':posL,'height':waveH, 'width':waveH});
  });
  if (isMobile == false) {
    $('.js_to_scroll').on('click',function(){
      var  offTopSec = document.querySelector('.section-product-and-service').offsetTop;
      $('body,html').animate({scrollTop: offTopSec},500);
      // return false
    });
  }
  $('.js_client_more').on('click',function(){
    if($('.js_client_more').parent().find('.clients-box-row.visible:last').next('.clients-box-row').length == 1) {
      $(this).parent().find('.clients-box-row.visible:last').next('.clients-box-row').addClass('visible');
      setTimeout(function(){$('.clients-box-row.visible').addClass('active')},100)
    }
    if($('.js_client_more').parent().find('.clients-box-row.visible:last').next('.clients-box-row').length == 0) {
      $(this).fadeOut(300);
    }
  });
 // news
  $(document).on('click','.read-more',function(){
    var newsId = $(this).attr('data-news');
    window.location.hash = newsId;
    $('body').addClass('noscroll');
    $('.overlay').addClass('visible');
    setTimeout(function(){$('.news-window[data-news='+ newsId +']').addClass('visible')},300);
    return false;
  });
  $(document).on('click','.overlay',function(){
    $('.news-window').removeClass('visible')
    setTimeout(function(){
      $('body').removeClass('noscroll');
      $('.overlay').removeClass('visible');
      $(document).scroll(function(e){
        e.preventDefault();
      })
    },300);
  });
  $('.js_close_news').on('click',function(){
    var offTOP = $(document).scrollTop();
    window.location.hash = '';
    $(this).parents('.news-window').removeClass('visible');
    setTimeout(function(){$('.overlay').removeClass('visible');},300);
    $('body').removeClass('noscroll');
    $(document).scrollTop(offTOP)
    return false;
  });
  // input animation
  $(document).on('focus','.input-field',function(){
    $(this).parent().find('label').addClass('active');
  })
  $(document).on('blur','.input-field',function(){
    var lengthWord = $(this).val();
    if(lengthWord.length >= 1){
      $(this).parent().find('label').addClass('active');
    } else {
      $(this).parent().find('label').removeClass('active');
    }
  });
  // $('input, textarea').placeholder();
  // modal
  $(".modal").on("show.bs.modal", function(){
    var $bodyWidth = window.innerWidth - document.body.clientWidth;
    $("body").css({'overflow-y': "hidden"}).css({'padding-right': $bodyWidth});
    $('.section-nav-fixed').css({'padding-right':$bodyWidth});
  });
  $(".modal").on("hidden.bs.modal", function(){
    $("body").css({'padding-right': "0",'overflow-y': "auto"});
    $('.section-nav-fixed').css('padding-right',0);
  // });
  });
  // modal
  // mask
  $('input[type="tel"]').intlTelInput({
    nationalMode: false,
    preventInvalidDialCodes: true,
    initialCountry: "auto",
    geoIpLookup: function(callback) {
      $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
        
      });
    }
  });
  // mask
  // validate form
  $('.js_validate button[type="submit"]').on("click", function(e){
    $('.wave-span').remove();
    var posL = e.pageX - $(this).offset().left - $(this).width()/2;
    var posT = e.pageY - $(this).offset().top - $(this).width()/2;
    var waveH = $(this).width();
    $(this).append('<span class="wave-span"></span>');
    $('.wave-span').css({'top':posT,'left':posL,'height':waveH, 'width':waveH});
    return validate($(this).parent(".js_validate"));
  }); 
  // switch text
  if (isMobile == false) {
    setTimeout(function(){
      var $quotes = $('.section-top .quote'),
          opts = { fadeTime: 2000, dwellTime: 8000 },
          shuffle,
          fadeInQuote,
          fadeOutQuote,
          switchTo,
          active,
          next = 0,
          last = 1;
      shuffle = function(o){
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * 
            Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      }; 
      fadeInQuote = function (q) {
        var letters = shuffle( $('[class*="char"]', $quotes[q]) );
        $('.section-top-info.active').fadeOut(300);
        $('.quote').removeClass('visible');
        $($quotes[q]).show();
        setTimeout(function(){
          $($quotes[q]).addClass('visible');
          // $('.section-top-info.active').remove()
        },500)
        $.each( letters, function (i, l) {
          setTimeout( 
            function () { $(l).animate({opacity: 1}, 100 ); }, 
            ( (opts.fadeTime/2) / letters.length * i ) + (opts.fadeTime/2) 
          );
        });
      };
      fadeOutQuote = function (q) {
        var letters = shuffle( $('[class*="char"]', $quotes[q]) );
        $.each(letters, function (i, l) {
          setTimeout(
            function () { 
              $(l).animate({opacity: 0}, 100 ); 
            }, 
            ( (opts.fadeTime/2) / letters.length ) * i 
          );
        });
        setTimeout( function () { 
          $($quotes[q]).hide(); }, 
          opts.fadeTime/2
        );
      };

      switchTo = function ( to ) {
        var old = active;
        fadeInQuote(to);
        fadeOutQuote(old);
        active = to;
      };
      $quotes.each( function (i, quote) {
        $(quote).hide();
        $(quote)
        .children('p').lettering('lines')
        .children('[class*=line]').lettering();
      });

      switchTo(next);
      setInterval( function () {
        next = ( active + 1 ) % $quotes.length;
        switchTo(next);
      }, opts.dwellTime );
    }, 14500);
  }else {
    var $quotes = $('.section-top .quote'),
        opts = { fadeTime: 2000, dwellTime: 8000 },
        shuffle,
        fadeInQuote,
        fadeOutQuote,
        switchTo,
        active,
        next = 0,
        last = 1;
    shuffle = function(o){
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * 
          Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }; 
    fadeInQuote = function (q) {
      var letters = shuffle( $('[class*="char"]', $quotes[q]) );
      $('.section-top-info.active').fadeOut(500);
      $('.quote').removeClass('visible');
      $($quotes[q]).show();
      setTimeout(function(){
        $($quotes[q]).addClass('visible');
        $('.section-top-info.active').remove();
      },300)
      $.each( letters, function (i, l) {
        setTimeout( 
          function () { $(l).animate({opacity: 1}, 100 ); }, 
          ( (opts.fadeTime/2) / letters.length * i ) + (opts.fadeTime/2) 
        );
      });
    };
    fadeOutQuote = function (q) {
      var letters = shuffle( $('[class*="char"]', $quotes[q]) );
      $.each(letters, function (i, l) {
        setTimeout(
          function () { 
            $(l).animate({opacity: 0}, 100 ); 
          }, 
          ( (opts.fadeTime/2) / letters.length ) * i 
        );
      });
      setTimeout( function () { 
        $($quotes[q]).hide(); }, 
        opts.fadeTime/2
      );
    };

    switchTo = function ( to ) {
      var old = active;
      fadeInQuote(to);
      fadeOutQuote(old);
      active = to;
    };
    $quotes.each( function (i, quote) {
      $(quote).hide();
      $(quote)
      .children('p').lettering('lines')
      .children('[class*=line]').lettering();
    });

    switchTo(next);
    setInterval( function () {
      next = ( active + 1 ) % $quotes.length;
      switchTo(next);
    }, opts.dwellTime );
  }
  // switch text
  $('.rad-box input').on('change',function(){
    var rad = $(this).attr('data-rad');
    if($(this).is(":checked")) {
      $(this).parents('.form-field').find('.rad-box label').removeClass('active');
      $(this).parent().addClass('active');
    }
    if(rad == 'yes') {
      $(this).parents('form').find('.select-field.visible .add-sel').remove();
      $(this).parents('form').find('.select-field.visible select option:last').before('<option class="add-sel" value="Tech. support">Tech support</option>');
    }
    if(rad == 'no') {
      $(this).parents('form').find('.select-field.visible .add-sel').remove();
    }
    $('.selectpicker').selectpicker('refresh');;
  })
  $('.select-other').change(function() {
    if ($(".select-other :selected").val()!="Other") {
      $('.form-other').hide();
    } else {
      $('.form-other').show();
    }
  });
  // scroll navigator
  $('.nav-brd').onePageNav();
  // file upload
  if($('input[type="file"]').length){
    $(this).parents('.file').find('.news-window_close.remove-file').show();
  }
  var arrF = [];
  $('input[type="file"]').on('change',function(){
       files = this.files;
       arrF = [];
     if($(this).length){
       $(this).parents('.file').find('.news-window_close.remove-file').show();
     }

    for(var a = 0; a < files.length; a++){
      var bsp = String.fromCharCode(160);
      arrF.push(bsp + files[a].name);
    }
    $(this).parents('.file-field').find('.name-file').text(arrF);
  })
  $('.name-file').hover(
    function(){
      $(this).parent().append('<span class="bl-nm"> ' + $(this).text() + '</span>')
    },
    function(){
      $('.bl-nm').remove();
    }
  );
  // select
  if(isMobile == false && $('select').length) {
    $('.selectpicker').selectpicker()
  }
  if( isMobile == true && $('select').length) {
    $('.selectpicker').selectpicker('mobile');
  }

  // select
  // modal privacy policy
  $('.privacy-policy input').on('change',function(){
    if ($(this).is(':checked')) {
      $(this).parents('.privacy-policy').find('.hidden-txt').slideUp(300);
    } else {
      $(this).parents('.privacy-policy').find('.hidden-txt').slideDown(300);
    }
  })
  // modal privacy policy
  $('.data-form').on('change',function(){
    var actForm = $(this).find('option:selected').attr('data-form');
    // console.log(actForm)
    $('.form-box').hide(400);
    setTimeout(function(){
      $('.form-box[data-form="'+actForm+'"]').show(400);
    },500)
  });
  // star raiting
  if($('.js_rating').length) {
    $('.js_rating').barrating('show', {
        theme: 'bars-movie'
    });
  }
  // star raiting
  // resize textarea
  var txt = $('textarea'),
    hiddenDiv = $(document.createElement('div')),
    content = null;
  hiddenDiv.addClass('hidden-div');
  txt.addClass('noscroll');
  txt.on('keyup', function() {
    console.log(123)
    $('hidden-div').empty();
    $(this).after(hiddenDiv);
      content = $(this).val();
      content = content.replace(/\n/g, '<br>');
      $(this).next(hiddenDiv).html(content);
      $(this).css('height', $(this).next(hiddenDiv).height() + 50);
  });
  // resize textarea
  // countTo
  $('.count').each(function(){
    $(this).appear(function() {
        var $endNum = parseInt($(this).text());
        $(this).countTo({
            from: 0,
            to: $endNum,
            speed: 3000,
            refreshInterval: 30,
        });
    },{accX: 0, accY: 0});
  })
  // animated
  $('.animated').appear(function() {
    var elem = $(this);
    var animation = elem.data('animation');
    if (!elem.hasClass('visible')) {
      var animationDelay = elem.data('animation-delay');
      if (animationDelay) {
        setTimeout(function() {
            elem.addClass(animation + " visible");
        }, animationDelay);
      } else {
        elem.addClass(animation + " visible");
      }
    }
  },{accX: 0, accY: -250});
  // remove file
  $('.js_remove_file').on('click',function(){
    $(this).parents('.file-field').find("input").val('');
    $(this).parents('.file-field').find(".name-file").text('file not chosen');
    $(this).hide();
    $('.bl-nm').remove();
  })
  // remove file
  // animated
var stylesArray = 
  [
    {
      "featureType": "water",
      "stylers": [{
          "color": "#46d1fd"
        }, {
            "visibility": "on"
        }]
      },
      {
      "featureType": "landscape",
        "stylers": [{
            "color": "#cecece"
        }]
      }, {
        "featureType": "road",
        "stylers": [{
            "saturation": -100,
          }]
      }, {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "simplified"
        }]
      }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          // "stylers": [{
          //     "visibility": "off"
          // }]
      }, {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#c3c3c3"
          }]
      }, {
          "featureType": "transit",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi",
          "stylers": [{
              "visibility": "off"
          }]
    }];
  if($('#contact-map').length)
    initialize()
  // validate form
  function initialize() {
    var myLatlng = new google.maps.LatLng(47.043911, 8.304395);
    var myCenter = new google.maps.LatLng(47.043911, 8.305395);
    var mapOptions = {
      zoom: 15,
      center: myCenter,
      scrollwheel: false,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:stylesArray
    };
    var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: 'images/marker.png'
    });
  };
  // map google
});
// validate form
function validate(form){
    var error_class = "error";
    var norma_class = "pass";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    var pass        = form.find('.password').val();
    var pass_1      = form.find('.password_1').val();
    var email       = false;
    var password    = false;
    var phone       = false;
    function mark (object, expression) {
        if (expression) {
            object.parent('div').addClass(error_class).removeClass(norma_class).find('.error_text').show();
            e++;
        } else
            object.parent('div').addClass(norma_class).removeClass(error_class).find('.error_text').hide();
    }
    form.find("[required]").each(function(){
        switch($(this).attr("data-validate")) {
            case undefined:
                mark ($(this), $.trim($(this).val()).length === 0);
            break;
            case "email":
                email = true;
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                email = false;
            break;
            case "phone":
                phone = true;
                reg = /[0-9 -()+]{10}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                phone = false;
            break;
            case "pass":
                password = true;
                reg = /^[a-zA-Z0-9_-]{6,}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
                password = false;
            break;
            case "pass1":
                mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
            break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark ($(this), !reg.test($.trim($(this).val())));
            break
        }
    })
    $('.js_valid_radio').each(function(){
        var inp = $(this).find('input.required');
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if ($(inp[i]).is(':checked') === true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        if (rezalt === 0) {
           $(this).addClass(error_class).removeClass(norma_class);
            e=1;
        } else {
            $(this).addClass(norma_class).removeClass(error_class);
        }
    })
    if (e == 0) {
     return true;
    }
    else {
        form.find("."+error_class+" input:first").focus();
        return false;
    }
}
// validate form 


