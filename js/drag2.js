/**
 * Created by Administrator on 2017/2/15 0015.
 */
(function ($) {
    //拖拽插件,参数:id或object
    $.Move = function (_this) {
        if (typeof(_this) == 'object') {
            _this = _this;
        } else {
            _this = $("#" + _this);
        }
        if (!_this) {
            return false;
        }
        _this.css({'position': 'fixed'}).hover(function () {
            $(this).css("cursor", "move");
        }, function () {
            $(this).css("cursor", "default");
        });
        _this.mousedown(function (e) {
            var offset = $(this).offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            _this.css({'opacity': '0.3'});
            $(document).bind("mousemove", function (ev) {

                _this.bind('selectstart', function () {
                    return false;
                });
                var l = ev.pageX - x;//获得X轴方向移动的值
                var t = ev.pageY - y;//获得Y轴方向移动的值
                if(l<=0){
                    l=0;
                }else if(l>=$(document).width()-_this.width()-30){
                    l=$(document).width()-_this.width()-30
                }
                if(t<=10){
                    t=10;
                }else if(t>=$(window).height()-_this.height()-100){
                    t=$(window).height()-_this.height()-100
                }
                _this.css({'left': l + "px", 'top': t + "px"});

            });
        });
        $(document).mouseup(function () { //事件传播
            $(this).unbind("mousemove");
            _this.css({'opacity': ''});
        })
    };
})(jQuery)