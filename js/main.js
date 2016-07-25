var isMobile = false;
if (navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i)) {
  isMobile = true;
}
var sectTop;
window.onload = function() {
  // PRELOADER
  var body = document.querySelector('body');
  body.classList.remove('noscroll')
  body.classList.add('loading')
  setTimeout(function(){body.classList.add('loaded')},1500)
  setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},2300)
  //PRELOADER
  var swiper1 = new Swiper('.news-slider', {
    loop:true,
    speed:1000,
    autoplay: 4000,
    parallax: true,
    onTransitionStart: function(swiper) {
      $('.swiper-slide').removeClass('mask')
    },
    onTransitionEnd: function(swiper) {
      setTimeout(function(){$('.swiper-slide-active').addClass('mask')},2000);
    }
  });
  var slideH =  document.querySelector('.case-slider .swiper-slide').clientHeight;
  document.querySelector('.case-slider').style.height = slideH + 'px';
  var swiper2 = new Swiper('.case-slider', {
    loop:true,
    speed:1000,
    autoplay: 4000,
    parallax: true,
    direction: 'vertical',
    autoHeight:false,
    height:slideH
  });
  document.querySelector('.news-slider').onmouseover = function() {
    swiper1.stopAutoplay();
  }
  document.querySelector('.news-slider').onmouseout = function() {
    swiper1.startAutoplay();
  }
  document.querySelector('.case-slider').onmouseover = function() {
    swiper2.stopAutoplay();
  }
  document.querySelector('.case-slider').onmouseout = function() {
    swiper2.stopAutoplay();
  }
  var newsHeight = window.innerHeight - document.querySelector('.news-window-head').clientHeight - 30;
  document.querySelector('.news-window-body-over').style.maxHeight = newsHeight + 'px';
  
  // animate map
  if(isMobile == false) {
    document.querySelector('.maps').style.opacity = '1';
    var tl = new TimelineMax();
    var elPath = document.querySelectorAll(".map-svg path");
    var xPos = document.querySelector('.map-svg').clientWidth;
    var YPos = Math.random()*(document.querySelector('.map-svg').clientHeight/2 - document.querySelector('.map-svg').clientWidth);
    tl.staggerFrom(elPath, 0.4, {x: xPos, y:YPos, repeat:1,ease: Circ.easeOut,} , 0.01);
  }else {
    document.querySelector('.maps').style.opacity = '1';
  }
  // animate map
  sectTop = document.querySelector('.section-nav').offsetTop;
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
  document.getElementById('file').onchange = function(){
    document.querySelector('.name-file').innerHTML = this.value.replace(/\\/g, '/').replace(/.*\//, '');
  };
  document.getElementById('file2').onchange = function(){
    document.querySelector('.name-file-2').innerHTML = this.value.replace(/\\/g, '/').replace(/.*\//, '');
  };
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
// function client_func (obj) {
//   var this_ = obj;
//   console.log(this_.parentNode.firstChild.nextSibling.nextElementSibling)
//   if(this_.parentNode.firstChild.nextSibling.nextElementSibling.classList.contains('visible') == false) {
//     this_.parentNode.firstChild.nextSibling.nextElementSibling.classList.add('visible')
//   }else {
//     document.querySelector('.js_client_more').style.display = "none";
//   }
// }
// function client_func (obj) {
//   var this_ = obj;
//   var clientBox = document.querySelectorAll('.clients-box-row');
//   console.log(this_.parentNode.childNodes)
//   for (var k = 0; k < clientBox.length; k++) {
//     if(clientBox[k].classList.contains('visible') == false) {
//       clientBox[k].classList.add('visible')
//     }else {
//       document.querySelector('.js_client_more').style.display = "none";
//     }
//   }
// }
window.onresize = function() {
  var newsHeight = window.innerHeight - document.querySelector('.news-window-head').clientHeight -30;
  document.querySelector('.news-window-body-over').style.maxHeight = newsHeight + 'px';
}
window.onscroll = function() {
  var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  if(document.querySelector('.section-nav') != undefined){
    if (scrollTop > sectTop) {
      document.querySelector('.section-nav-fixed').classList.add('visible');
    }else {
      document.querySelector('.section-nav-fixed').classList.remove('visible');
    }
  }
}
$(document).ready(function() {
  $(document).on('click','.wave-effect',function(e){
    $('.wave-span').remove();
    var posL = e.pageX - $(this).offset().left - $(this).width()/2;
    var posT = e.pageY - $(this).offset().top - $(this).width()/2;
    var waveH = $(this).width();
    // $(this).find('span').hide();
    $(this).append('<span class="wave-span"></span>');
    $('.wave-span').css({'top':posT,'left':posL,'height':waveH});
  });
  $('.js_to_scroll').on('click',function(){
    var  offTopSec = document.querySelector('.section-product-and-service').offsetTop;
    $('body,html').animate({scrollTop: offTopSec},500);
    return false
  });
  $('.js_client_more').on('click',function(){
    if($('.js_client_more').parent().find('.clients-box-row.visible:last').next('.clients-box-row').length == 1) {
      $(this).parent().find('.clients-box-row.visible:last').next('.clients-box-row').addClass('visible');
      setTimeout(function(){$('.clients-box-row.visible').addClass('active')},100)
    }else {
      $(this).fadeOut(300);
    }
  });
 // news
  $(document).on('click','.read-more',function(){
    var offTOP = $(document).scrollTop();
    var newsId = $(this).attr('data-news');
    window.location.hash = newsId;
    $('body').addClass('noscroll');
    $('.overlay').addClass('visible');
    setTimeout(function(){$('.news-window[data-news='+ newsId +']').addClass('visible')},300);
    return false;
  });
  // $(window).load(function(){
  //   var idActiveNews = window.location.hash;
  //   if (idActiveNews.length > 1){
  //     setTimeout(function(){
  //       $('body').addClass('noscroll');
  //       $('.overlay').addClass('visible');
  //     },2000)
  //     setTimeout(function(){$('.news-window[data-news='+ idActiveNews +']').addClass('visible')},2300);
  //   }
  // });
  $('.js_close_news').on('click',function(){
    window.location.hash = '';
    $(this).parents('.news-window').removeClass('visible');
    setTimeout(function(){$('.overlay').removeClass('visible');},300);
    $('body').removeClass('noscroll');
    return false;
  });
  // input animation
  $(document).on('focus','.input-field',function(){
    $(this).parent().find('label').addClass('active');
  })
  $(document).on('blur','.input-field',function(){
    var lengthWord = $(this).val();
    if(lengthWord.length > 1){
      $(this).parent().find('label').addClass('active');
    } else {
      $(this).parent().find('label').removeClass('active');
    }
  });
  $('input, textarea').placeholder();
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
  // $('input[type="tel"]').mask("+9(999)999 99 99"); 
  $('input[type="tel"]').inputmask("+9(999)999 99 99", { clearMaskOnLostFocus: false });  
  // mask
  // validate form
  $('.js_validate button[type="submit"]').on("click", function(){
    return validate($(this).parent(".js_validate"));
  }); 
  // switch text
    var $quotes = $('.section-top .quote'),
        opts = { fadeTime: 1000, dwellTime: 8000 },
        shuffle,
        fadeInQuote,
        fadeOutQuote,
        switchTo,
        active,
        next = 0,
        last = 1;
    //+ Jonas Raoni Soares 
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    shuffle = function(o){ //v1.
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * 
          Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }; 
    // fancy on the way in
    fadeInQuote = function (q) {
      var letters = shuffle( $('[class*="char"]', $quotes[q]) );
      $('.quote').removeClass('visible');
      $($quotes[q]).show();
      setTimeout(function(){
        $($quotes[q]).addClass('visible');
      },300)
      $.each( letters, function (i, l) {
        setTimeout( 
          function () { $(l).animate({opacity: 1}, 100 ); }, 
          ( (opts.fadeTime/2) / letters.length * i ) + (opts.fadeTime/2) 
        );
      });
    };
    // and fancy on the way out
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
  // switch text
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
/*! http://mths.be/placeholder v2.0.7 by @mathias */
$(function(window, document, $) {

 // Opera Mini v7 doesn t support placeholder although its DOM seems to indicate so
 var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
 var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
 var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
 var prototype = $.fn;
 var valHooks = $.valHooks;
 var propHooks = $.propHooks;
 var hooks;
 var placeholder;

 if (isInputSupported && isTextareaSupported) {

  placeholder = prototype.placeholder = function() {
   return this;
  };

  placeholder.input = placeholder.textarea = true;

 } else {

  placeholder = prototype.placeholder = function() {
   var $this = this;
   $this
    .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
    .not('.placeholder')
    .bind({
     'focus.placeholder': clearPlaceholder,
     'blur.placeholder': setPlaceholder
    })
    .data('placeholder-enabled', true)
    .trigger('blur.placeholder');
   return $this;
  };

  placeholder.input = isInputSupported;
  placeholder.textarea = isTextareaSupported;

  hooks = {
   'get': function(element) {
    var $element = $(element);

    var $passwordInput = $element.data('placeholder-password');
    if ($passwordInput) {
     return $passwordInput[0].value;
    }

    return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
   },
   'set': function(element, value) {
    var $element = $(element);

    var $passwordInput = $element.data('placeholder-password');
    if ($passwordInput) {
     return $passwordInput[0].value = value;
    }

    if (!$element.data('placeholder-enabled')) {
     return element.value = value;
    }
    if (value == '') {
     element.value = value;
     // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
     if (element != safeActiveElement()) {
      // We can't use `triggerHandler` here because of dummy text/password inputs :(
      setPlaceholder.call(element);
     }
    } else if ($element.hasClass('placeholder')) {
     clearPlaceholder.call(element, true, value) || (element.value = value);
    } else {
     element.value = value;
    }
    // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
    return $element;
   }
  };

  if (!isInputSupported) {
   valHooks.input = hooks;
   propHooks.value = hooks;
  }
  if (!isTextareaSupported) {
   valHooks.textarea = hooks;
   propHooks.value = hooks;
  }

  $(function() {
   // Look for forms
   $(document).delegate('form', 'submit.placeholder', function() {
    // Clear the placeholder values so they don't get submitted
    var $inputs = $('.placeholder', this).each(clearPlaceholder);
    setTimeout(function() {
     $inputs.each(setPlaceholder);
    }, 10);
   });
  });

  // Clear placeholder values upon page reload
  $(window).bind('beforeunload.placeholder', function() {
   $('.placeholder').each(function() {
    this.value = '';
   });
  });

 }

 function args(elem) {
  // Return an object of element attributes
  var newAttrs = {};
  var rinlinejQuery = /^jQuery\d+$/;
  $.each(elem.attributes, function(i, attr) {
   if (attr.specified && !rinlinejQuery.test(attr.name)) {
    newAttrs[attr.name] = attr.value;
   }
  });
  return newAttrs;
 }

 function clearPlaceholder(event, value) {
  var input = this;
  var $input = $(input);
  if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
   if ($input.data('placeholder-password')) {
    $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
    // If `clearPlaceholder` was called from `$.valHooks.input.set`
    if (event === true) {
     return $input[0].value = value;
    }
    $input.focus();
   } else {
    input.value = '';
    $input.removeClass('placeholder');
    input == safeActiveElement() && input.select();
   }
  }
 }

 function setPlaceholder() {
  var $replacement;
  var input = this;
  var $input = $(input);
  var id = this.id;
  if (input.value == '') {
   if (input.type == 'password') {
    if (!$input.data('placeholder-textinput')) {
     try {
      $replacement = $input.clone().attr({ 'type': 'text' });
     } catch(e) {
      $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
     }
     $replacement
      .removeAttr('name')
      .data({
       'placeholder-password': $input,
       'placeholder-id': id
      })
      .bind('focus.placeholder', clearPlaceholder);
     $input
      .data({
       'placeholder-textinput': $replacement,
       'placeholder-id': id
      })
      .before($replacement);
    }
    $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
    // Note: `$input[0] != input` now!
   }
   $input.addClass('placeholder');
   $input[0].value = $input.attr('placeholder');
  } else {
   $input.removeClass('placeholder');
  }
 }

 function safeActiveElement() {
  // Avoid IE9 `document.activeElement` of death
  // https://github.com/mathiasbynens/jquery-placeholder/pull/99
  try {
   return document.activeElement;
  } catch (err) {}
 }
 

}(this, document, jQuery));


