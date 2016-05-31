var Clock = (function () {
    function Clock(cDom, width, height) {
        this.cDom = cDom;
        this.width = width;
        this.height = height;
        this.init();
    }
    Clock.prototype.init = function (){
    	this.canDom = document.getElementById(this.cDom);
        this.ct = this.canDom.getContext("2d");
        this.canDom.width = this.width;
        this.canDom.height = this.height;
    }
    Clock.prototype.drawClock = function () {
    	canDom = this.canDom;
    	ct = this.ct;
        ct.clearRect(0, 0, canDom.width, canDom.height);
        var x = canDom.width / 2;
        var y = canDom.height / 2;
        var r = y - 50;
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        var hourPos = (-90 + hours * 30 + minutes / 2) * Math.PI / 180;
        var minutePos = (-90 + minutes * 6) * Math.PI / 180;
        var secondPos = (-90 + seconds * 6) * Math.PI / 180;
        ct.beginPath();
        for (var i = 0; i < 60; i++) {
            ct.moveTo(x, y);
            ct.arc(x, y, r, 6 * i * Math.PI / 180, 6 * (i + 1) * Math.PI / 180);
        }
        ct.closePath();
        ct.stroke();
        ct.fillStyle = "white";
        ct.beginPath();
        ct.moveTo(x, y);
        ct.arc(x, y, r * 19 / 20, 0, 360 * Math.PI / 180);
        ct.closePath();
        ct.fill();
        ct.lineWidth = 3;
        ct.beginPath();
        for (var i = 0; i < 12; i++) {
            ct.moveTo(x, y);
            ct.arc(x, y, r, 5 * 6 * i * Math.PI / 180, 5 * 6 * (i + 1) * Math.PI / 180);
        }
        ct.closePath();
        ct.stroke();
        ct.fillStyle = "white";
        ct.beginPath();
        ct.moveTo(x, y);
        ct.arc(x, y, r * 18 / 20, 0, 360 * Math.PI / 180);
        ct.closePath();
        ct.fill();
        ct.fillStyle = "#111";
        ct.beginPath();
        ct.moveTo(x, y);
        ct.arc(x, y, 6, 0, 360 * Math.PI / 180);
        ct.closePath();
        ct.fill();
        //时针
        ct.beginPath();
        ct.lineWidth = 6;
        ct.moveTo(x, y);
        ct.arc(x, y, r * 13 / 20, hourPos, hourPos);
        ct.closePath();
        ct.stroke();
        //分针
        ct.beginPath();
        ct.lineWidth = 4;
        ct.moveTo(x, y);
        ct.arc(x, y, r * 15 / 20, minutePos, minutePos);
        ct.closePath();
        ct.stroke();
        //秒针
        ct.beginPath();
        ct.lineWidth = 2;
        ct.moveTo(x, y);
        ct.arc(x, y, r * 17 / 20, secondPos, secondPos);
        ct.closePath();
        ct.stroke();
        ct.beginPath();
        ct.fillStyle = "red";
        ct.font = "16px microsoft YaHei";
        ct.moveTo(x, y);
        ct.fillText((hours > 10 ? hours : "0" + hours) + ":" + (minutes > 10 ? minutes : "0" + minutes) + ":" + (seconds > 10 ? seconds : "0" + seconds), x-20, y + 120);
        ct.closePath();
    };
    Clock.prototype.start = function () {
        setInterval(this.drawClock, 1000);
    };
    return Clock;
})();
