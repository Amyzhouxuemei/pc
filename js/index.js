/*选项卡*/
(function () {
    function tab(container, defaultIndex) {
        var ul = utils.children(container, 'ul')[0];
        var lis = utils.children(ul);
        var divs = utils.children(container, 'div');

        defaultIndex = defaultIndex || 0;
        utils.addClass(lis[defaultIndex], 'selected');
        utils.addClass(divs[defaultIndex], '');
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function () {
                var siblings = utils.siblings(this);
                //siblings=utils.children(siblings,'a');
                for (var i = 0; i < siblings.length; i++) {
                    utils.removeClass(siblings[i], 'selected');
                }
                utils.addClass(this, 'selected');
                var index = utils.index(this);
                for (var k = 0; k < divs.length; k++) {
                    k === index ? utils.addClass(divs[k], 'selected') : utils.removeClass(divs[k], 'selected');
                }
            };
            lis[i].onmouseleave = function () {
                var index = utils.index(this);
                utils.removeClass(this, 'selected');
                utils.removeClass(divs[index], 'selected');

            }
        }
    }

    window.tab = tab;
})();

var selBox = document.getElementById('selBox'), selBox2 = document.getElementById('selBox2');
tab(selBox, 0);
tab(selBox2, 0);


/*左右轮播图*/
var imgBanner = document.getElementById('imgBanner'), imgs = imgBanner.getElementsByTagName('img'),
    focusList = document.getElementById('focusList'), lis = focusList.getElementsByTagName('li'),
    leftBtn = document.getElementById('left'),
    rightBtn = document.getElementById('right');


var step = 0;

function autoMove() {
    if (step == imgs.length - 1) {
        step = 0;
        utils.css(imgBanner, 'left', -1226 * step);
    }
    step++;
    animate(imgBanner, {left: -1226 * step}, 500);
    focusAlign();
}
//
function focusAlign() {
    var tempStep = step === imgs.length ? 0 : step;
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = i === tempStep ? 'selected' : "";
    }
}


//点击左右按钮
rightBtn.onclick = autoMove;
leftBtn.onclick = function () {
    if (step == 0) {
        step = imgs.length - 1;
        utils.css(imgBanner, 'left', -1226 * step);
    }
    step--;
    animate(imgBanner, {left: -1226 * step}, 500);
    focusAlign();
}

//给焦点绑定事件
;
(function () {
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;console.log(lis.length);
        lis[i].onclick = function () {
            step = this.index;

            animate(imgBanner, {left: -1226 * step}, 500);
            focusAlign();
        }
    }
})();
/*搜索框*/
var navSearch = document.getElementById('navSearch');
var input = utils.getElesByClass('headIn', navSearch)[0];
var searchR = utils.getElesByClass('headBtn', navSearch)[0];
var searchWord = utils.getElesByClass('hotWords', navSearch)[0];
var keyWordList = utils.getElesByClass('keyword-list', navSearch)[0];

navSearch.onkeyup = navSearch.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.getAttribute('isSearch') == "true") {
        var val = tar.value;
        var reg = /^\s*$/;
        if (reg.test(val)) {
            utils.css(input, 'borderColor', '#ff6700');
            utils.css(searchR, 'borderColor', '#ff6700');
            searchWord.style.display = 'block';
            keyWordList.style.display = 'none';
        }
        searchWord.style.display = 'none';
        keyWordList.style.display = 'block';
    }
};

keyWordList.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.tagName.toUpperCase() === 'SPAN' && tar.parentNode.parentNode.parentNode.parentNode.className == 'keyword-list') {
        keyWordList.style.display = "none";
        input.value = tar.innerHTML;
        return;
    }
    keyWordList.style.display = "none";
};
/*小米商品*/

var lefB = document.getElementById('leftB'), rigB = document.getElementById('rightB'), boxgoods = document.getElementById('boxgoods'), boxgoodsLis = boxgoods.getElementsByTagName('li');
var stepL = 0;
rigB.onclick = function () {
    if (stepL == boxgoodsLis.length / 5 - 1) {
        rigB.className = 'endR';
        lefB.className = ' left';
        return;
    }
    lefB.className = ' left';
    stepL++;
    animate(boxgoods, {left: -1240 * stepL}, 500);
};
lefB.onclick = function () {
    if (stepL == 0) {
        lefB.className = 'endL';
        rigB.className = 'right';
        return;
    }
    rigB.className = 'right';
    stepL--;
    animate(boxgoods, {left: -1240 * stepL}, 500);
};


///////////////////////////////////////////////////////
/*(function(){var Banner = (function(){

 var step = 0,banner = document.getElementById('bannBox'),
 bannerInner = utils.getElesByClass('bannerInner', banner)[0],
 focusList = utils.getElesByClass('focusList', banner)[0],
 imgs =bannerInner.getElementsByTagName('img'),
 lis = focusList.getElementsByTagName('li'),
 leftBtn = utils.getElesByClass('leftBtn', banner)[0],
 rightBtn = utils.getElesByClass('rightBtn',banner)[0];

 function Move() {
 if (step == imgs.length - 1) {
 step = -1;
 }
 step++;
 setBannerImg();
 };
 function setBannerImg () {
 for (var i = 0; i < imgs.length-1; i++) {
 if (i == step) {
 utils.css(imgs[i].parentNode, 'zIndex', 1);
 animate(imgs[i].parentNode, {opacity: 1}, 300, function () {
 var siblings = utils.siblings(this);
 for (var i = 0; i < siblings.length; i++) {
 utils.css(siblings[i], 'opacity', 0);
 }
 });
 } else {
 utils.css(imgs[i].parentNode, 'zIndex', 0);
 }
 }
 for (var i = 0; i < lis.length; i++) { //焦点对齐
 lis[i].className = step == i ? 'selected' : '';
 }
 };

 function btnEvent  (){
 leftBtn.onclick = function () {

 step--;
 if (step == -1) {
 step = imgs.length - 1;
 }
 setBannerImg();
 }
 this.rightBtn.onclick = function (){
 Move();
 }
 };
 function bindEventForFocus(){
 for (var i = 0; i < lis.length; i++) {
 lis[i].index = i;
 lis[i].onclick = function () {
 step = this.index;
 setBannerImg();
 }
 }
 };
 return {
 init: function () {
 Move();
 btnEvent();
 bindEventForFocus();
 }
 }
 })();

 Banner.init();
 })();*/





























