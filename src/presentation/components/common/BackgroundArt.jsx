import { useEffect, useRef } from 'react';

export function BackgroundArt() {
  const containerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const initP5 = async () => {
      if (p5InstanceRef.current || !containerRef.current) return;

      const p5Module = await import('p5');
      if (cancelled || !containerRef.current) return;

      const p5 = p5Module.default;
      p5.disableFriendlyErrors = true;
      if (!window.p5) {
        window.p5 = p5;
      }

      const sketch = (p) => {
        let particles = [];
        const numParticles = 800;
        const noiseScale = 0.003;
        const zOffsetSpeed = 0.0005;
        let zOffset = 0;
        let colors = [];

        class Particle {
          constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = p.random(0.5, 1.5);

            const r = p.random(1);
            if (r < 0.1) this.color = colors[0];
            else if (r < 0.2) this.color = colors[1];
            else if (r < 0.3) this.color = colors[2];
            else if (r < 0.8) this.color = colors[3];
            else this.color = colors[4];

            this.size = p.random(0.5, 2.5);
            this.maxLife = p.random(150, 400);
            this.life = p.random(0, this.maxLife);
            this.weight = p.random(0.1, 0.5);
          }

          update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            this.life += 1;
            if (this.life > this.maxLife || this.isOffScreen()) {
              this.reset();
            }
          }

          applyForce(force) {
            this.acc.add(p.createVector(force.x * this.weight, force.y * this.weight));
          }

          display() {
            let alpha = 255;
            const fadeTime = 50;

            if (this.life < fadeTime) {
              alpha = p.map(this.life, 0, fadeTime, 0, 200);
            } else if (this.life > this.maxLife - fadeTime) {
              alpha = p.map(this.life, this.maxLife - fadeTime, this.maxLife, 200, 0);
            } else {
              alpha = 200;
            }

            p.noStroke();
            const c = p.color(p.red(this.color), p.green(this.color), p.blue(this.color), alpha);
            p.fill(c);
            p.ellipse(this.pos.x, this.pos.y, this.size);
          }

          isOffScreen() {
            return (
              this.pos.x < 0 ||
              this.pos.x > p.width ||
              this.pos.y < 0 ||
              this.pos.y > p.height
            );
          }

          reset() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel.mult(0);
            this.life = 0;
          }
        }

        p.setup = () => {
          const container = containerRef.current;
          if (!container) return;

          p.createCanvas(container.offsetWidth, container.offsetHeight);
          p.background('#141413');

          colors = [
            p.color('#d97757'),
            p.color('#6a9bcc'),
            p.color('#788c5d'),
            p.color('#b0aea5'),
            p.color('#faf9f5')
          ];

          particles = [];
          for (let i = 0; i < numParticles; i += 1) {
            particles.push(new Particle());
          }
        };

        p.draw = () => {
          p.background(20, 20, 19, 10);

          for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            const angle = p.noise(
              particle.pos.x * noiseScale,
              particle.pos.y * noiseScale,
              zOffset
            ) * p.TWO_PI * 4;
            const force = p5.Vector.fromAngle(angle);
            force.setMag(0.15);
            particle.applyForce(force);
            particle.update();
            particle.display();
          }

          zOffset += zOffsetSpeed;
        };

        p.windowResized = () => {
          const container = containerRef.current;
          if (!container) return;
          p.resizeCanvas(container.offsetWidth, container.offsetHeight);
          p.background('#141413');
        };
      };

      if (containerRef.current && !p5InstanceRef.current) {
        p5InstanceRef.current = new p5(sketch, containerRef.current);
      }
    };

    initP5();

    return () => {
      cancelled = true;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(20,20,19,0.4), rgba(20,20,19,0) 45%, rgba(20,20,19,1))'
        }}
      />
    </div>
  );
}
