/**
 * Created by sanchez 
 */
'use strict';

//check the environment
// if (process.env.NODE_ENV !== 'production') {
//     console.log('Looks like we are in development mode!');
// }

// import CSS
// import animate_css from 'animate.css/animate.min.css';
import css from '../css/css.css';


// import Js Plugins/Entities

//ES6 Module
import $ from 'jquery' 

window.h5 = {
    isPc: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    },
    rootResize: function() {
        var wFsize;

        //iphone6/6s/7/8 orientation=portrait screen.width=750px screen.height=1334px / WeChat window.innerWidth=750px window.innerHeight=1206px 
        var wWidth = document.documentElement.clientWidth || window.innerWidth;
        var wHeight = document.documentElement.clientHeight || window.innerHeight;

        if (wWidth > wHeight) {
            wFsize = wHeight / 750 * 100;
        } else {
            wFsize = wWidth / 750 * 100;
        }
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    },
    eventInit: function() {
        var that = this;
        document.addEventListener('touchstart', function(e) {}, { passive: false });
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        return that;
    },
    cssInit: function() {
        var that = this;
        var noChangeCountToEnd = 100,
            noEndTimeout = 1000;
        that.rootResize();
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
            var interval,
                timeout,
                end,
                lastInnerWidth,
                lastInnerHeight,
                noChangeCount;
            end = function() {
                //"orientationchangeend"
                clearInterval(interval);
                clearTimeout(timeout);
                interval = null;
                timeout = null;
                that.rootResize();
            };
            interval = setInterval(function() {
                if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                    noChangeCount++;
                    if (noChangeCount === noChangeCountToEnd) {
                        //The interval resolved the issue first.
                        end();
                    }
                } else {
                    lastInnerWidth = window.innerWidth;
                    lastInnerHeight = window.innerHeight;
                    noChangeCount = 0;
                }
            });
            timeout = setTimeout(function() {
                //The timeout happened first.
                end();
            }, noEndTimeout);
        });

        return that;
    },
    init: function() {
        var that = this;
        that.cssInit().eventInit();
    }
};
window.onload = function() {
    /********************
  TEST BRO
  ********************/

    function handleMotionEvent(event) {
        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        var z = event.accelerationIncludingGravity.z;
        x = oneDecimal(x);
        y = oneDecimal(y);
        z = oneDecimal(z);

        // Show motion info
        $('.x_axis .value').text(x);
        $('.y_axis .value').text(y);
        $('.z_axis .value').text(z);


        // Now animate the .thePlayer
        var plyr = $('.such_ball_much_wow');

        var winWidth = $(window).width();
        var winHeight = $(window).height();

        var _pos = {
            'x': winWidth / (100 / toPercentage(x, 1)),
            'y': winHeight / (100 / toPercentage(y, 1))
        };

        $(plyr).css({
            'right': _pos.x,
            'top': _pos.y
        });


    }

    window.addEventListener("devicemotion", handleMotionEvent, true);


    function oneDecimal(n) {
        var number = n;
        var rounded = Math.round(number * 10) / 10;
        return rounded;
    }

    function toPercentage(x, n) {
        var p = 0;
        if (n) {
            p = ((x + 10) / 20) * 100;
        } else {
            p = ((x + 10) / 20);
        }
        return oneDecimal(p);
    }





    // Animations with the wows!
    var animations = ['flash'];
    var animationName = '';
    // Show the wows
    // $('.wowCircle').on('mouseenter', function() {
    //     animationName = animations[randInt(0, animations.length - 1)];

    //     $('.wow-overlay').show();
    //     $('.wow-overlay .wow').addClass('animated ' + animationName);
    // });

    // $('.wowCircle').on('mouseleave', function() {
    //     $('.wow-overlay').hide();
    //     $('.wow-overlay .wow').removeClass('animated ' + animationName);
    // });

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


};

//Stats JavaScript Performance Monitor

//import Stats from 'stats.js';
//showStats();
// function showStats() {
//     var stats = new Stats();
//     stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//     var fs = document.createElement('div');
//     fs.style.position = 'absolute';
//     fs.style.left = 0;
//     fs.style.top = 0;
//     fs.style.zIndex = 999;
//     fs.appendChild(stats.domElement);
//     document.body.appendChild(fs);

//     function animate() {
//         stats.begin();
//         // monitored code goes here
//         stats.end();
//         requestAnimationFrame(animate);
//     }
//     requestAnimationFrame(animate);
// }