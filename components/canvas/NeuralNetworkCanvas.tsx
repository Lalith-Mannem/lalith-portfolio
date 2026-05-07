"use client";

import { useEffect, useRef, useCallback } from "react";

interface NeuralNode {
  x: number;
  y: number;
  radius: number;
  glow: number;
  layer: number;
  index: number;
}

interface Signal {
  fromLayer: number;
  fromNode: number;
  toLayer: number;
  toNode: number;
  progress: number;
  speed: number;
  color: [number, number, number];
}

const LAYER_SIZES = [3, 5, 7, 5, 3];
const COLORS: [number, number, number][] = [
  [6, 182, 212],    // cyan
  [139, 92, 246],   // purple
  [16, 185, 129],   // emerald
  [236, 72, 153],   // pink
];

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NeuralNode[][]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const tickRef = useRef(0);

  const buildNetwork = useCallback((width: number, height: number) => {
    const layers: NeuralNode[][] = [];
    const totalLayers = LAYER_SIZES.length;
    const xStart = width * 0.12;
    const xEnd = width * 0.88;

    LAYER_SIZES.forEach((count, li) => {
      const layerX = xStart + (li / (totalLayers - 1)) * (xEnd - xStart);
      const gap = Math.min(70, (height * 0.7) / count);
      const layer: NeuralNode[] = [];

      for (let ni = 0; ni < count; ni++) {
        const nodeY =
          height / 2 - ((count - 1) / 2) * gap + ni * gap;
        layer.push({
          x: layerX,
          y: nodeY,
          radius: li === 0 || li === totalLayers - 1 ? 6 : 7,
          glow: 0.2 + Math.random() * 0.2,
          layer: li,
          index: ni,
        });
      }
      layers.push(layer);
    });

    nodesRef.current = layers;
    signalsRef.current = [];
  }, []);

  const spawnSignal = useCallback(() => {
    const layers = nodesRef.current;
    if (layers.length < 2) return;

    // Randomly pick a starting layer (not the last)
    const fromLayerIdx = Math.floor(Math.random() * (layers.length - 1));
    const fromNodeIdx = Math.floor(Math.random() * layers[fromLayerIdx].length);
    const toNodeIdx = Math.floor(
      Math.random() * layers[fromLayerIdx + 1].length
    );
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    signalsRef.current.push({
      fromLayer: fromLayerIdx,
      fromNode: fromNodeIdx,
      toLayer: fromLayerIdx + 1,
      toNode: toNodeIdx,
      progress: 0,
      speed: 0.006 + Math.random() * 0.006,
      color,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildNetwork(w, h);
    };

    setSize();

    const resizeObserver = new ResizeObserver(() => {
      setSize();
    });
    resizeObserver.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouse);

    const drawFrame = () => {
      if (!running) return;
      tickRef.current++;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const layers = nodesRef.current;
      const signals = signalsRef.current;

      // --- Draw connections ---
      for (let li = 0; li < layers.length - 1; li++) {
        for (const fn of layers[li]) {
          for (const tn of layers[li + 1]) {
            ctx.beginPath();
            ctx.moveTo(fn.x, fn.y);
            ctx.lineTo(tn.x, tn.y);
            ctx.strokeStyle = "rgba(99, 102, 241, 0.06)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // --- Active connection highlights ---
      for (const sig of signals) {
        const fn = layers[sig.fromLayer]?.[sig.fromNode];
        const tn = layers[sig.toLayer]?.[sig.toNode];
        if (!fn || !tn) continue;

        const [r, g, b] = sig.color;
        const alpha = 0.15 + sig.progress * 0.25;

        ctx.beginPath();
        ctx.moveTo(fn.x, fn.y);
        ctx.lineTo(tn.x, tn.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // --- Update & draw signals ---
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          const targetNode = layers[sig.toLayer]?.[sig.toNode];
          if (targetNode) targetNode.glow = 1.0;
          signals.splice(i, 1);
          continue;
        }

        const fn = layers[sig.fromLayer][sig.fromNode];
        const tn = layers[sig.toLayer][sig.toNode];
        const px = fn.x + (tn.x - fn.x) * sig.progress;
        const py = fn.y + (tn.y - fn.y) * sig.progress;
        const [r, g, b] = sig.color;

        // Outer glow
        const outerGrad = ctx.createRadialGradient(px, py, 0, px, py, 14);
        outerGrad.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
        outerGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        ctx.fill();
      }

      // --- Draw nodes ---
      for (const layer of layers) {
        for (const node of layer) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseBoost = Math.max(0, 1 - dist / 120) * 0.6;

          node.glow = Math.max(0.15, node.glow * 0.96 + mouseBoost * 0.04);

          const glowR = 8 + node.glow * 28;

          // Outer glow halo
          const glowGrad = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowR
          );
          glowGrad.addColorStop(0, `rgba(6,182,212,${node.glow * 0.5})`);
          glowGrad.addColorStop(1, "rgba(6,182,212,0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Node fill
          const nodeGrad = ctx.createRadialGradient(
            node.x - node.radius * 0.3,
            node.y - node.radius * 0.3,
            0,
            node.x,
            node.y,
            node.radius
          );
          nodeGrad.addColorStop(0, `rgba(165,240,255,${0.4 + node.glow * 0.6})`);
          nodeGrad.addColorStop(1, `rgba(6,182,212,${0.2 + node.glow * 0.5})`);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeGrad;
          ctx.fill();

          // Node ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6,182,212,${0.3 + node.glow * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Spawn signals at intervals
      if (tickRef.current % 18 === 0 && signals.length < 20) {
        spawnSignal();
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [buildNetwork, spawnSignal]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}
