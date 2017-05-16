function touch(selector) {
    if (selector.indexOf("#") >= 0) {
        var div1 = document.getElementById(selector.split("#")[1]);
    }
    if (selector.indexOf(".") >= 0) {
        var div1 = document.getElementsByClassName(selector.split(".")[1])[0];
    }
    div1.style.position = "absolute";
    var distanceX;
    var distanceY;
    div1.addEventListener("touchstart", function (e) {
        //获取按下鼠标到div left  top的距离
        distanceX = e.touches[0].clientX - div1.offsetLeft;
        distanceY = e.touches[0].clientY - div1.offsetTop;
    })
    div1.addEventListener("touchmove", function (e) {
        var oEvent = e.touches[0] || event;
        //重新计算div的left top值
        var left = oEvent.clientX - distanceX;
        var top = oEvent.clientY - distanceY;
        //left  当小于等于零时，设置为零 防止div拖出document之外
        if (left <= 0) {
            left = 0;
        }
        //当left 超过文档右边界  设置为右边界
        else if (left >= document.documentElement.clientWidth - div1.offsetWidth) {
            left = document.documentElement.clientWidth - div1.offsetWidth;
        }
        if (top <= 0) {
            top = 0;
        }
        else if (top >= document.documentElement.clientHeight - div1.offsetHeight) {
            top = document.documentElement.clientHeight - div1.offsetHeight;
        }
        //重新给div赋值
        div1.style.top = top + "px";
        div1.style.left = left + "px";
    })
}

function Drag(id) {
    this.div = document.getElementById(id);
    if (this.div) {
        this.div.style.cursor = "move";
        this.div.style.position = "absolute";
    }
    this.disX = 0;
    this.disY = 0;
    var _this = this;
    this.div.onmousedown = function (evt) {
        _this.getDistance(evt);
        document.onmousemove = function (evt) {
            _this.setPosition(evt);
        }
        _this.div.onmouseup = function () {
            _this.clearEvent();
        }
    }
}
Drag.prototype.getDistance = function (evt) {
    var oEvent = evt || event;
    this.disX = oEvent.clientX - this.div.offsetLeft;
    this.disY = oEvent.clientY - this.div.offsetTop;
}
Drag.prototype.setPosition = function (evt) {
    var oEvent = evt || event;
    var l = oEvent.clientX - this.disX;
    var t = oEvent.clientY - this.disY;
    if (l <= 0) {
        l = 0;
    }
    else if (l >= document.documentElement.clientWidth - this.div.offsetWidth) {
        l = document.documentElement.clientWidth - this.div.offsetWidth;
    }
    if (t <= 0) {
        t = 0;
    }
    else if (t >= document.documentElement.clientHeight - this.div.offsetHeight) {
        t = document.documentElement.clientHeight - this.div.offsetHeight;
    }
    this.div.style.left = l + "px";
    this.div.style.top = t + "px";
}
Drag.prototype.clearEvent = function () {
    this.div.onmouseup = null;
    document.onmousemove = null;
}
// 此处调用
window.onload = function () {
    touch("#div1");
    new Drag("div1");
}