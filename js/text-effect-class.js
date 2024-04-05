const delay = ms => new Promise(res => setTimeout(res, ms));

class TxtType {
    constructor(toRotate, el, period, isStop, isOnce, isDark) {
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.isStop = isStop;
        this.isOnce = isOnce;
        this.toRotate = toRotate;
        this.isDark = isDark;
        this.delta = 0;
    }
    setToRotate(toRotate) {
        this.toRotate = toRotate;
    }
    setIsDark(isDark) {
        this.isDark = isDark;
    }
    tick() {
        var fullTxt = this.toRotate[this.loopNum];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        if (this.isDark) {
            this.el.innerHTML = '<span class="wrap wrap-light">' + this.txt + '</span>';
        } else {
            this.el.innerHTML = '<span class="wrap wrap-dark">' + this.txt + '</span>';
        }

        var that = this;

        if (this.isOnce) {
            this.delta = 20;
        } else {
            this.delta = 200 - 1 * 100;
        }

        if (this.isDeleting) { this.delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            if (!this.isOnce) {
                this.isDeleting = true;
                this.delta = this.period;
            } else {
                this.isStop = true;
            }
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum = (this.loopNum + 1) % this.toRotate.length;
            this.delta = 500;
        }

        if (!this.isStop) {
            setTimeout(function () {
                that.tick();
            }, this.delta);
        }
    }
    async stop() {
        this.isStop = true;
    }
    resume() {
        this.isStop = false;
    }
    async reset() {
        this.stop();
        await delay(this.delta);
        this.txt = "";
        this.loopNum = 0;
        this.isDeleting = false;
        this.resume();
        this.tick();
    }
}