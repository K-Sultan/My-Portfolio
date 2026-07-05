"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    let observer: ResizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(syncSize);
      observer.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;
    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    float t = u_time * 0.2;
    vec3 color1 = vec3(0.23, 0.51, 0.96);
    vec3 color2 = vec3(0.55, 0.36, 0.96);
    vec3 color3 = vec3(0.02, 0.71, 0.83);
    vec3 bg = vec3(0.035, 0.035, 0.043);
    
    float noise1 = sin(uv.x * 3.0 + t) * cos(uv.y * 2.0 - t);
    float noise2 = sin(uv.y * 4.0 - t * 0.5) * cos(uv.x * 3.0 + t * 0.8);
    
    vec3 finalColor = bg;
    finalColor = mix(finalColor, color1, smoothstep(0.3, 0.8, noise1 * 0.5 + 0.5) * 0.3);
    finalColor = mix(finalColor, color2, smoothstep(0.3, 0.8, noise2 * 0.5 + 0.5) * 0.2);
    finalColor = mix(finalColor, color3, smoothstep(0.4, 0.9, (noise1 + noise2) * 0.25 + 0.5) * 0.15);
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    // @ts-ignore
    function cs(type: number, src: string) {
      // @ts-ignore
      const s = gl.createShader(type);
      // @ts-ignore
      gl.shaderSource(s, src);
      // @ts-ignore
      gl.compileShader(s);
      return s;
    }
    // @ts-ignore
    const prog = gl.createProgram();
    // @ts-ignore
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    // @ts-ignore
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    // @ts-ignore
    gl.linkProgram(prog);
    // @ts-ignore
    gl.useProgram(prog);
    // @ts-ignore
    const buf = gl.createBuffer();
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // @ts-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    // @ts-ignore
    const pos = gl.getAttribLocation(prog, 'a_position');
    // @ts-ignore
    gl.enableVertexAttribArray(pos);
    // @ts-ignore
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    // @ts-ignore
    const uTime = gl.getUniformLocation(prog, 'u_time');
    // @ts-ignore
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    // @ts-ignore
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    
    const mouseMoveHandler = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    let animationFrameId: number;
    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      // @ts-ignore
      gl.viewport(0, 0, canvas.width, canvas.height);
      // @ts-ignore
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      // @ts-ignore
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      // @ts-ignore
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      // @ts-ignore
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-60" style={{ display: "block" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }}></canvas>
    </div>
  );
}
