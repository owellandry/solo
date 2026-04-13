import { useEffect, useRef } from 'react';

export function BackgroundArt() {
  const containerRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    let p5;
    
    const initP5 = async () => {
      if (p5Instance.current) return;
      
      const p5Module = await import('p5');
      p5 = p5Module.default;
      
      const sketch = (p) => {
        let particles = [];
        const numParticles = 100;
        const seed = 12345;
        
        p.setup = () => {
          p.createCanvas(window.innerWidth, window.innerHeight);
          p.randomSeed(seed);
          p.noiseSeed(seed);
          
          for(let i = 0; i < numParticles; i++) {
            particles.push({
              pos: p.createVector(p.random(p.width), p.random(p.height)),
              vel: p.createVector(p.random(-1, 1), p.random(-1, 1)),
              size: p.random(1.5, 3),
              color: p.random() > 0.5 
                ? p.color(217, 119, 87, 140)  // Anthropic Orange
                : p.color(106, 155, 204, 140) // Anthropic Blue
            });
          }
        };

        p.draw = () => {
          p.clear();
          
          for(let i = 0; i < particles.length; i++) {
            let prt = particles[i];
            
            // Organic turbulence flow field
            let angle = p.noise(prt.pos.x * 0.002, prt.pos.y * 0.002, p.frameCount * 0.001) * p.TWO_PI * 4;
            prt.vel.x += p.cos(angle) * 0.04;
            prt.vel.y += p.sin(angle) * 0.04;
            prt.vel.limit(1.2);
            
            prt.pos.add(prt.vel);
            
            if(prt.pos.x < 0) prt.pos.x = p.width;
            if(prt.pos.x > p.width) prt.pos.x = 0;
            if(prt.pos.y < 0) prt.pos.y = p.height;
            if(prt.pos.y > p.height) prt.pos.y = 0;
            
            for(let j = i + 1; j < particles.length; j++) {
              let other = particles[j];
              let d = p.dist(prt.pos.x, prt.pos.y, other.pos.x, other.pos.y);
              if(d < 150) {
                p.stroke(255, 255, 255, p.map(d, 0, 150, 40, 0));
                p.strokeWeight(0.6);
                p.line(prt.pos.x, prt.pos.y, other.pos.x, other.pos.y);
              }
            }
            
            p.noStroke();
            p.fill(prt.color);
            p.ellipse(prt.pos.x, prt.pos.y, prt.size);
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
      };

      if (containerRef.current && !p5Instance.current) {
        p5Instance.current = new p5(sketch, containerRef.current);
      }
    };

    initP5();

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
}
