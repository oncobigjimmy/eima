/**
 * Confeti breve para celebraciones puntuales (acción de Svelte sobre un <canvas>).
 *
 *   <canvas class="confetti" aria-hidden="true" use:confetti={{ colors }}></canvas>
 *
 * - Dos ráfagas desde las esquinas inferiores, en abanico hacia el centro.
 * - La posición de cada pieza es una función cerrada del tiempo (impulso inicial,
 *   rozamiento con el aire y gravedad), así que se ve igual a 60 Hz que a 120 Hz
 *   y nunca se queda "congelado" si la pestaña pierde el foco.
 * - Termina sola: pasado `duration` limpia el lienzo y lo oculta.
 * - Respeta `prefers-reduced-motion`: en ese caso no dibuja nada.
 */

export interface ConfettiOptions {
  /** Colores en hexadecimal de 6 dígitos. */
  colors?: string[];
  /** Número de piezas. Por defecto 120 (70 en pantallas estrechas). */
  count?: number;
  /** Duración total en ms, de la primera pieza a la última. Por defecto 1400. */
  duration?: number;
}

const DEFAULT_COLORS = ['#4083a7', '#8cd0d6', '#e8e8f6', '#d4b778'];
const DRAG = 3.8; // rozamiento (1/s): cuanto mayor, antes se frena la ráfaga
const GRAVITY = 1.5; // alturas de pantalla por s²
const MAX_DPR = 2;
const TAU = Math.PI * 2;

interface Piece {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  delay: number;
  life: number;
  width: number;
  height: number;
  round: boolean;
  rotation: number;
  spin: number;
  tilt: number;
  tumble: number;
  phase: number;
  sway: number;
  swing: number;
  front: string;
  back: string;
}

/** Oscurece un color #rrggbb para simular la cara en sombra de la pieza. */
function shade(hex: string, amount: number): string {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const channel = (shift: number) => Math.round(((value >> shift) & 255) * (1 - amount));
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

export function confetti(node: HTMLCanvasElement, options: ConfettiOptions = {}) {
  const ctx = node.getContext('2d');
  const reducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!ctx || reducedMotion) {
    node.hidden = true;
    return { destroy() {} };
  }

  const duration = (options.duration ?? 1400) / 1000;
  const palette = (options.colors?.length ? options.colors : DEFAULT_COLORS).map(
    (color) => [color, shade(color, 0.22)] as const
  );

  let width = 0;
  let height = 0;
  let dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = node.clientWidth;
    height = node.clientHeight;
    node.width = Math.round(width * dpr);
    node.height = Math.round(height * dpr);
  };
  resize();

  const compact = width < 768;
  const count = options.count ?? (compact ? 70 : 120);
  const scale = compact ? 0.85 : 1;
  const reach = Math.min(width, 1600); // en monitores muy anchos no cruza toda la pantalla
  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  const pieces: Piece[] = Array.from({ length: count }, (_, index) => {
    const direction = index % 2 ? -1 : 1; // pares: esquina izquierda; impares: derecha
    const angle = rand(38, 84) * (Math.PI / 180);
    const power = 0.42 + 0.58 * Math.sqrt(Math.random()); // más piezas en el frente de la ráfaga
    const kind = Math.random();
    const size = rand(0.8, 1.2) * scale;
    const [front, back] = palette[Math.floor(Math.random() * palette.length)];

    return {
      x0: direction > 0 ? -8 : width + 8,
      y0: height + 8,
      vx: direction * Math.cos(angle) * power * reach * 0.62 * DRAG,
      vy: -Math.sin(angle) * power * height * 1.12 * DRAG,
      delay: rand(0, 0.08) * duration,
      life: rand(0.74, 0.92) * duration,
      width: (kind < 0.6 ? 7 : kind < 0.82 ? 4 : 8) * size,
      height: (kind < 0.6 ? 11 : kind < 0.82 ? 14 : 8) * size,
      round: kind >= 0.82,
      rotation: rand(0, TAU),
      spin: rand(3, 9) * (Math.random() < 0.5 ? -1 : 1),
      tilt: rand(0, TAU),
      tumble: rand(7, 15),
      phase: rand(0, TAU),
      sway: rand(4, 8),
      swing: rand(4, 12) * scale,
      front,
      back
    };
  });

  let frameId = 0;
  let start: number | undefined;

  const finish = () => {
    window.removeEventListener('resize', resize);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, node.width, node.height);
    node.hidden = true;
  };

  const frame = (now: number) => {
    start ??= now;
    const elapsed = (now - start) / 1000;
    if (elapsed >= duration) return finish();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, node.width, node.height);

    const terminal = (GRAVITY * height) / DRAG; // velocidad de caída límite

    for (const piece of pieces) {
      const age = elapsed - piece.delay;
      if (age <= 0 || age >= piece.life) continue;

      const settle = 1 - Math.exp(-DRAG * age); // 0 → 1 a medida que el aire frena la pieza
      const x =
        piece.x0 +
        (piece.vx / DRAG) * settle +
        Math.sin(piece.phase + age * piece.sway) * piece.swing * settle;
      const y = piece.y0 + terminal * age + ((piece.vy - terminal) / DRAG) * settle;

      const progress = age / piece.life;
      const fade = progress < 0.6 ? 1 : 1 - ((progress - 0.6) / 0.4) ** 2;
      const rotation = piece.rotation + piece.spin * age;
      const flip = Math.cos(piece.tilt + piece.tumble * age); // volteo: la pieza se ve de canto
      const cos = Math.cos(rotation) * dpr;
      const sin = Math.sin(rotation) * dpr;

      ctx.globalAlpha = fade;
      ctx.fillStyle = flip >= 0 ? piece.front : piece.back;
      ctx.setTransform(cos, sin, -sin * flip, cos * flip, x * dpr, y * dpr);

      if (piece.round) {
        ctx.beginPath();
        ctx.arc(0, 0, piece.width / 2, 0, TAU);
        ctx.fill();
      } else {
        ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      }
    }

    frameId = requestAnimationFrame(frame);
  };

  window.addEventListener('resize', resize);
  frameId = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(frameId);
      finish();
    }
  };
}
