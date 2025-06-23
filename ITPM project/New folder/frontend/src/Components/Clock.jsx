import React, { useEffect, useRef } from "react";

const Clock = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width * dpr;
    const h = rect.height * dpr;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Define arc as a class
    class Arc {
      constructor() {
        this.class = "month";
        this.r = 100;
        this.rot = 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(300, 300, this.r, Math.PI / (2 / 3), this.rot, false);
        ctx.lineWidth = 30;
        ctx.strokeStyle =
          "hsla(" + this.rot * (180 / Math.PI) + ",60%,50%,1)";
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 48, 1)";
        ctx.translate(300, 300);
        ctx.rotate(this.rot);
        ctx.font = "bold 14px Arial";
        if (this.class === "secs") {
          const d = new Date();
          ctx.fillText(d.getSeconds(), 267, -5);
        } else if (this.class === "mins") {
          const d = new Date();
          ctx.fillText(d.getMinutes(), 232, -5);
        } else if (this.class === "hours") {
          const d = new Date();
          ctx.fillText(d.getHours(), 197, -5);
        } else if (this.class === "day") {
          const d = new Date();
          let day = d.getDay();
          if (day === 1) day = "Mon";
          else if (day === 2) day = "Tue";
          else if (day === 3) day = "Wed";
          else if (day === 4) day = "Thu";
          else if (day === 5) day = "Fri";
          else if (day === 6) day = "Sat";
          else if (day === 7) day = "Sun";
          ctx.fillText(day, 158, -5);
        } else if (this.class === "date") {
          const d = new Date();
          ctx.fillText(d.getDate(), 127, -5);
        } else if (this.class === "month") {
          const d = new Date();
          ctx.fillText(d.getMonth() + 1, 93, -5);
        }
        ctx.restore();
      }
    }

    let arcs = [];

    const reset = () => {
      ctx.fillStyle = "rgba(0, 0, 48, 1)";
      ctx.fillRect(0, 0, w, h);
    };

    const init = () => {
      arcs = [];
      let m = new Arc();
      m.class = "month";
      arcs.push(m);

      let d = new Arc();
      d.class = "date";
      d.r = 135;
      arcs.push(d);

      let dayArc = new Arc();
      dayArc.class = "day";
      dayArc.r = 170;
      arcs.push(dayArc);

      let h = new Arc();
      h.class = "hours";
      h.r = 205;
      arcs.push(h);

      let m2 = new Arc();
      m2.class = "mins";
      m2.r = 240;
      arcs.push(m2);

      let s = new Arc();
      s.class = "secs";
      s.r = 275;
      arcs.push(s);
    };

    const draw = () => {
      reset();
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "12px Arial";
      ctx.fillText("seconds", 250, 27);
      ctx.fillText("minutes", 252, 63);
      ctx.fillText("hours", 264, 98);
      ctx.fillText("day", 274, 134);
      ctx.fillText("date", 270, 168);
      ctx.fillText("month", 260, 203);

      for (let i = 0; i < arcs.length; i++) {
        const a = arcs[i];
        const d = new Date();
        if (a.class === "month") {
          const n = d.getMonth() + 1;
          a.rot = (n / 12) * (Math.PI * 2) - Math.PI / 2;
        } else if (a.class === "date") {
          const n = d.getDate();
          a.rot = (n / 31) * (Math.PI * 2) - Math.PI / 2;
        } else if (a.class === "day") {
          const n = d.getDay();
          a.rot = (n / 7) * (Math.PI * 2) - Math.PI / 2;
        } else if (a.class === "hours") {
          const n = d.getHours();
          const m = d.getMinutes();
          a.rot = (n / 12) * (Math.PI * 2) - Math.PI / 2 + (m / 3600) * (Math.PI * 2);
        } else if (a.class === "mins") {
          const n = d.getMinutes();
          const s = d.getSeconds();
          a.rot = (n / 60) * (Math.PI * 2) - Math.PI / 2 + (s / 3600) * (Math.PI * 2);
        } else if (a.class === "secs") {
          const n = d.getSeconds();
          const m = d.getMilliseconds();
          a.rot = (n / 60) * (Math.PI * 2) - Math.PI / 2 + (m / 60000) * (Math.PI * 2);
        }
        a.draw();
      }
    };

    const animloop = () => {
      draw();
      window.requestAnimationFrame(animloop);
    };

    init();
    animloop();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="relative w-[600px] h-[600px]">
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      className="mx-auto"
    ></canvas>
  </div>
</div>

  );
};

export default Clock;
