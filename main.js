'use strict';
{
  (() => {

    class ClockDrawer {
      constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
      }
      draw(angle, func) {
        this.ctx.save();

        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(Math.PI / 180 * angle);

        this.ctx.beginPath();
        func(this.ctx);
        this.ctx.stroke();

        this.ctx.restore();
      }
      clear() {
        this.ctx.clearRect(0, 0 , this.width, this.height);
      }
    }
    class Clock {
      constructor(drawer) {
        this.r = 100;
        this.drawer = drawer;
      }
      drawFace() {
        for (let angle = 0; angle <= 360; angle += 6) {
          this.drawer.draw(angle, ctx => {
            ctx.moveTo(0, -this.r);
            if (angle % 30 === 0) {
              ctx.lineWidth = 2;
              ctx.lineTo(0, -this.r + 10);
              ctx.font = '13px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(angle / 30 || 12, 0, -this.r + 25);
              //trueが1 falseが0
            } else {
              ctx.lineTo(0, -this.r + 5);
            }
          });
        }
      }

      drawHands() {
        //hour
        this.drawer.draw(this.h * 30 + this.m * 0.5, ctx => {
          ctx.lineWidth = 6;
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -this.r + 50)
        });

        //minute
        this.drawer.draw(this.m * 6, ctx => {
          ctx.lineWidth = 4;
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -this.r + 30);
        });

        //second
        this.drawer.draw(this.s * 6, ctx => {
          ctx.strokeStyle = 'red';
          ctx.moveTo(0, 20);
          ctx.lineTo(0, -this.r + 20);
        });
      }

      update() {
        this.h = (new Date()).getHours();
        this.m = (new Date()).getMinutes();
        this.s = (new Date()).getSeconds();
      }

      run() {
        this.update();
        this.drawer.clear();
        this.drawFace();
        this.drawHands(); //針の描画

        setTimeout(() => {
          this.run();
        }, 100);
      }
    }
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const clock = new Clock(new ClockDrawer(canvas));
    clock.run();
  })();
} 