var Slider = (function() {
    var  actIndex = 0;
    var  yearArray = [];
    var  historyMap = {};
    var activeCb = null;

    //callback为激活某个时间节点时调用的回调函数
    function init(index, year, history, callback) {
        actIndex = index;
        yearArray = year;
        historyMap = history;
        activeCb = callback;
        renderLine();
        bindClick();
        setActive(actIndex);
    }

    function renderLine() {
        var len = yearArray.length;
        var innerHtml = '<div class="slider-year-item slider-year-first"><div class="slider-year-item-text"></div><div class="slider-year-item-line">' + 
                        '<div class="empty"></div><div class="line"></div></div></div>' +
                        '<div class="slider-year-item"><div class="slider-year-item-text"></div><div class="slider-year-item-line">' + 
                        '<div class="empty"></div><div class="line"></div></div></div>';
        for(var i = 0; i < len; i++) {
            innerHtml += '<div class="slider-year-item"><div class="slider-year-item-text">'+ yearArray[i] +'</div><div class="slider-year-item-line">' + 
            '<div class="dot" ref="'+ i +'"></div><div class="line"></div></div></div>';
        }

        innerHtml += '<div class="slider-year-item"><div class="slider-year-item-text"></div><div class="slider-year-item-line">' + 
                        '<div class="empty"></div><div class="line"></div></div></div>' +
                        '<div class="slider-year-item"><div class="slider-year-item-text"></div><div class="slider-year-item-line">' + 
                        '<div class="empty"></div><div class="line"></div></div></div>';
        var dom = $('.slider-year-main');
        dom.html(innerHtml);
    }

    function bindClick() {
        $('.slider-year-main').on('click', clickHandler);

        $('.slider-year-pre').on('click', function() {
            if (actIndex > 0) {
                setActive(actIndex - 1);
            }
        });

        $('.slider-year-next').on('click', function() {
            if (actIndex < yearArray.length - 1) {
                setActive(actIndex + 1);
            }
        });
    }

    function clickHandler(ev) {
        var  event = ev || window.event;
        var target = event.target || event.srcElement;
        if (target.className.indexOf('dot') > -1) {
            setActive(target.attributes.ref.value);
        }
    }

    function setActive(index) {
        $('.slider-year-item')[actIndex + 2].className = 'slider-year-item';
        activeCb(actIndex, parseInt(index));
        actIndex = parseInt(index);
        var marginLeft = '-' + actIndex * 160 + 'px';
        $('.slider-year-first').css('margin-left', marginLeft);
        $('.slider-year-item')[actIndex + 2].className += ' slider-year-active';
    }

    return {
        init: init
    }
})();


var  historyMap = {
    2019: [
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfsdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        }
    ],
    2018: [
        {
            date: '2019-02',
            description: 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas' + 
                         'dfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas' + 
                         'dfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        },
        {
            date: '2019-02',
            description: 'asdfasdfasdfa'
        }
    ]
};
var years = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
function renderEvent(index, preIndex) {
    var year = years[index];
    var eventArray = historyMap[year] || [];
    var len = eventArray.length;
    var contentHtml = '';
    for(var i = 0; i < len; i++) {
        if (i % 2 === 0) {
            contentHtml  += '<div class="slider-content-item"><div class="slider-content-middle"><div class="slider-content-line"></div><div class="slider-content-dot"></div></div><span></span><span>' + eventArray[i].description + '</span><div class="vertical-middle left-date">'+ eventArray[i].date +'</div></div>';
        } else {
            contentHtml  += '<div class="slider-content-item"><div class="slider-content-middle"><div class="slider-content-line"></div><div class="slider-content-dot"></div></div><span>'+ eventArray[i].description + '</span><span></span><div class="vertical-middle right-date">'+ eventArray[i].date +'</div></div>';
        }
    }
    $('.slider-content').html(contentHtml);
    contentHtml = null;
    if (index > preIndex) {
        $(".slider-content").css('margin-left', "-900px");
        $(".slider-content").animate({marginLeft: "50px", speed: 2000});
    } else if (index < preIndex) {
        $(".slider-content").css('margin-right', "-900px");
        $(".slider-content").animate({marginRight: "50px", speed: 2000});
    }
    
}

Slider.init(0, years, historyMap, renderEvent);