;
jQuery.extend(jQuery.easing, { easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b; }, easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b; } });
(function($) {
    $.fn.extend({
        "flow": function(options) { this.each(function(index, elem) {
                var $this = $(this);
                setTimeout(function() {
                    var i = 0,
                        iNow = -1,
                        timerFlow, timerDelay, _options = {},
                        stillCannotFlow, steps, oriP, oriD, thisBorder, _scroll = 0,
                        direction = 1,
                        a, btnClicked = false,
                        canFlowX = false,
                        canFlowY = false;
                    if ((typeof options) == 'number') { _options.speed = options; } else { _options = options || { speed: 50 }; };
                    var pause = _options.pause,
                        speed = _options.speed,
                        vertical = _options.vertical || false,
                        duration = _options.duration || 500,
                        $flowChild = $(_options.flowChild ? _options.flowChild : 'li', $this) || $this.children(),
                        len = $flowChild.length,
                        hoverToPause = _options.hoverToPause || true,
                        forceToFlow = _options.forceToFlow || false,
                        pix = speed / (1000 / jQuery.fx.interval) || 1,
                        delay = _options.delay || 100,
                        interval;
                    if ($flowChild.length === 0) {
                        return this };
                    thisBorder = { Left: parseInt($this.css('border-left-width')) || 0, Top: parseInt($this.css('border-top-width')) || 0 };
                    steps = { Left: [], Top: [] };
                    if ($flowChild.last().offset().top + $flowChild.last().outerHeight() > thisBorder.Top + $this.offset().top + $this.innerHeight()) { canFlowY = true; };
                    if ($flowChild.last().offset().left + $flowChild.last().outerWidth() > thisBorder.Left + $this.offset().left + $this.innerWidth()) { canFlowX = true; };
                    if (!(canFlowX || canFlowY) && !forceToFlow) {
                        return $this; };
                    if (!canFlowX && canFlowY) { vertical = true };
                    a = vertical ? 'Top' : 'Left';
                    $flowChild.parent().append($flowChild.parent()[0].innerHTML);
                    $flowChild = $flowChild.parent().children();
                    $this[0].scrollLeft = $this[0].scrollTop = 0;
                    oriP = { Left: $flowChild.eq(0).offset().left - $this.offset().left - thisBorder.Left, Top: $flowChild.eq(0).offset().top - $this.offset().top - thisBorder.Top };
                    oriD = { Left: $flowChild.eq(len).offset().left - $flowChild.eq(0).offset().left, Top: $flowChild.eq(len).offset().top - $flowChild.eq(0).offset().top };
                    if (pause || speed) { autoFlow();
                        $this.hover(function() { clearTimeout(timerFlow); }, function() { timerFlow = setTimeout(autoFlow, interval); }); };
                    $(_options.btn + ',' + _options.btnR).click(function(event) {
                        if (event.target == $(_options.btn)[0]) { pix = speed / (1000 / jQuery.fx.interval);
                            direction = 1; } else { pix = -1 * speed / (1000 / jQuery.fx.interval);
                            direction = -1; };
                        if (pause) { flowNext();
                            btnClicked = true;
                            clearTimeout(timerFlow); }; }).mouseleave(function() {
                        if (pause && btnClicked) { autoFlow();
                            btnClicked = false; } });

                    function autoFlow() { oriD = { Left: $flowChild.eq(len).offset().left - $flowChild.eq(0).offset().left, Top: $flowChild.eq(len).offset().top - $flowChild.eq(0).offset().top };
                        if (speed) { flowContinuous();
                            interval = jQuery.fx.interval; } else if (pause) { flowNext();
                            interval = pause + duration; };
                        timerFlow = setTimeout(autoFlow, interval); };

                    function flowContinuous() { _scroll += pix;
                        if (_scroll < oriP[a]) { _scroll = $flowChild.eq(len).offset()[a.toLowerCase()] - $flowChild.eq(0).offset()[a.toLowerCase()] + oriP[a]; } else if (_scroll > oriP[a] + oriD[a]) { _scroll = oriP[a]; };
                        $this[0]['scroll' + a] = _scroll; };

                    function flowNext() {
                        var _pos = {};
                        iNow += direction;
                        $this.stop(false, true);
                        steps.Left.length = steps.Top.length = 0;
                        for (var i = 0; i <= len; i++) { steps[a].push(oriP[a] + $flowChild.eq(i).offset()[a.toLowerCase()] - $flowChild.eq(0).offset()[a.toLowerCase()]); };
                        if (iNow > len) { $this[0]['scroll' + a] = oriP[a];
                            iNow = 1; } else if (iNow < 0) { $this[0]['scroll' + a] = oriP[a] + oriD[a];
                            iNow = len - 1; };
                        _pos['scroll' + a] = steps[a][iNow];
                        $this.animate(_pos, duration); }; }, 1000); });
            return this; },
        "fixedAt": function(place) {
            var startPoint;
            if (typeof(place) == 'string') { startPoint = $(place).offset().top; } else { startPoint = place; };
            $(this).each(function() {
                var isIE6, $this = $(this),
                    oriPos = $this.css('position'),
                    oriTop = $this.css('top'),
                    oriOffset = $this.offset().top,
                    startOffset = $this.offset().top - startPoint;
                isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;
                if (isIE6) { $(window).scroll(function() {
                        if ($(window).scrollTop() - startPoint >= 0) { $this.css({ 'position': 'absolute', 'top': startOffset + $(window).scrollTop() }); } else { $this.css({ position: oriPos, top: oriTop }); }; }); } else { $(window).scroll(function() {
                        if ($(window).scrollTop() - startPoint >= 0) { $this.css({ 'position': 'fixed', 'top': startOffset }); } else { $this.css({ position: oriPos, top: oriTop }); }; }); } });
            return this; },
        "smoothTo": function(where) {
            var toWhere;
            if (typeof(where) == 'number') { toWhere = where; } else { toWhere = $(where).offset().top; };
            $(this).animate({ scrollTop: toWhere }, 1000);
            return this; },
        "slide": function(options) {
            this.each(function(whichSlide) {
                var i, timerAutoplay, timerDelay, iNow = 0,
                    $this = $(this),
                    $children = $this.children(),
                    _options = {};
                if ($children.length <= 1) {
                    return this };
                _options = {};
                if ((typeof options) == 'string') { _options.controller = options; } else if (options == null) { _options.autoplay = 1500; } else { _options = options; };
                var $controller = $(_options.controller).eq(whichSlide),
                    $childrenController = $controller.children(),
                    $prev = $(_options.prev),
                    $next = $(_options.next),
                    action = _options.action || 'mouseenter',
                    autoplay = _options.autoplay || 0,
                    animation = _options.animation || 'normal',
                    classAdd = _options.classAdd || 'hover',
                    delay = _options.delay || 100,
                    speed = _options.speed || 500,
                    hoverToPause = _options.hoverToPause || true,
                    easing = _options.easing || 'swing',
                    lazy = _options.lazy,
                    dot = _options.dot,
                    oriPos = { left: parseInt($children.eq(0).css('left')) || 0, top: parseInt($children.eq(0).css('top')) || 0, height: $children.eq(0).height(), width: $children.eq(0).width() };
                $children.eq(0).show().siblings().hide();
                if (dot && $childrenController.length) makeDot();
                $childrenController.bind(action, function() {
                    var hoverIndex = $(this).index();
                    timerDelay = setTimeout(function() { slideTo(hoverIndex); }, delay); }).bind('mouseleave', function() { clearTimeout(timerDelay); });
                if (autoplay) { iNow = -1;
                    autoSlide();
                    if (hoverToPause) { $this.add($controller).hover(function() { clearTimeout(timerAutoplay); }, function() { timerAutoplay = setTimeout(autoSlide, autoplay); }); } };
                $(_options.prev + ',' + _options.next).click(function() { clearTimeout(timerAutoplay);
                    var _a = this === $(_options.next)[0] ? 1 : -1;
                    slideTo(iNow + _a);
                    timerAutoplay = setTimeout(autoSlide, autoplay); });

                function makeDot() {
                    var sHTML = $childrenController.eq(0)[0].outerHTML,
                        sHTMLDot = '';
                    for (var i = $children.length - 1; i >= 0; i--) { sHTMLDot += sHTML; };
                    $controller.html(sHTMLDot);
                    $childrenController = $controller.children(); }

                function comeout(i) {
                    var pic = $children.eq(i),
                        picNow = $children.eq(iNow),
                        picNext = $children.eq(i % $children.length),
                        picPrev = $children.eq((i - 1 + $children.length) % $children.length),
                        arrayPos = [{ left: oriPos.left, top: oriPos.top + oriPos.height }, { left: oriPos.left + oriPos.width, top: oriPos.top }, { left: oriPos.left, top: oriPos.top - oriPos.height }, { left: oriPos.left - oriPos.width, top: oriPos.top }];
                    if (lazy) {
                        var img = $('img', pic);
                        if (img.attr(lazy)) { img.attr({ src: img.attr(lazy) }).removeAttr(lazy); }; };
                    pic.css({ zIndex: 2 }).siblings().css({ zIndex: 0 }).show();
                    picNow.css({ zIndex: 1 });
                    $children.stop(true, true);
                    $childrenController.eq(i).addClass(classAdd).siblings().removeClass(classAdd);
                    if (animation == 'normal') { pic.show().siblings().hide(); } else if (animation == 'fade') { pic.fadeIn(speed).siblings().fadeOut(speed); } else if (animation.match(/slideH|overlayH/)) { slideH(); } else if (animation.match(/slideV|overlayV/)) { slideV(); };

                    function slideH() {
                        if (i > iNow) { pic.css({ left: arrayPos[1].left }).animate({ left: oriPos.left }, speed, easing);
                            if (animation != 'overlayH') { picNow.animate({ left: arrayPos[3].left }, speed, easing); } } else if (i < iNow) { pic.css({ left: arrayPos[3].left }).animate({ left: oriPos.left }, speed, easing);
                            if (animation != 'overlayH') { picNow.animate({ left: arrayPos[1].left }, speed, easing); } }; };

                    function slideV() {
                        if (i > iNow) { pic.css({ top: arrayPos[0].top }).animate({ top: oriPos.top }, speed, easing);
                            if (animation != 'overlayV') { picNow.animate({ top: arrayPos[2].top }, speed, easing); } } else if (i < iNow) { pic.css({ top: arrayPos[2].top }).animate({ top: oriPos.top }, speed, easing);
                            if (animation != 'overlayV') { picNow.animate({ top: arrayPos[0].top }, speed, easing); } }; }; };

                function slideTo(i) {
                    if (i != null) { comeout(i % $children.length);
                        iNow = i % $children.length; } else { comeout((iNow + 1) % $children.length);
                        iNow = ++iNow % $children.length; }; };

                function autoSlide() { slideTo();
                    timerAutoplay = setTimeout(autoSlide, autoplay); };
            });
        },
        "hoverToShow": function(toshow, delay) { this.each(function(whichOne) {
                var _timmer, _toshow = $(toshow).eq(whichOne);
                $(this).hover(function() { _toshow.show(); }, function() { _timmer = setTimeout(function() { _toshow.hide(); }, delay || 500) });
                _toshow.hover(function() { clearTimeout(_timmer); }, function() { $(this).hide(); }); }) }
    });
})(jQuery);
$(function() {
    if (!elementSupportsAttribute('textarea', 'placeholder')) { fillFormHintText() } });

function fillFormHintText() { $('input,textarea').not('input[type="password"]').each(function() {
        var placeholder = $(this).attr('placeholder');
        if (placeholder) { $(this).val(placeholder).css({ color: '#999' }).click(function() { $(this).css({ color: '#333' });
                if ($(this).val() == placeholder) { $(this).val(''); } }).blur(function() {
                if (($(this).val() == '') && placeholder) { $(this).val(placeholder).css({ color: '#999' }); } }); } }); };

function elementSupportsAttribute(element, attribute) {
    return !!(attribute in document.createElement(element)); };
