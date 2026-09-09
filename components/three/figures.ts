import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

/**
 * Palette is read from the stylesheet so the 3D figures re-tint with the rest
 * of the site — `--rust` in app/globals.css is the only place the accent lives.
 * Called from the builders (not at module scope) so the CSS is definitely
 * applied, with the shipped values as a fallback.
 */
function paletteColor(name: string, fallback: number): number {
  if (typeof window !== 'undefined') {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (v) {
      try {
        // Round-trips through Color so any CSS notation (hex, rgb(), oklch())
        // resolves to the plain hex int the line materials require.
        return new THREE.Color(v).getHex()
      } catch {
        /* fall through to the literal */
      }
    }
  }
  return fallback
}

const ink = () => paletteColor('--ink', 0x17150f)
const rust = () => paletteColor('--rust', 0x30236e)

/** The figures the page can ask for, by `data-figure` value. */
export type FigureKind = 'knot' | 'helix' | 'lattice' | 'orbit' | 'coil'

export type FrameContext = {
  /** Pointer position, -1..1 across the viewport. */
  pointerX: number
  pointerY: number
  /** Document scroll progress, 0..1. */
  scroll: number
}

export type Figure = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  /** Fat-line materials needing a resolution uniform on resize. */
  materials: LineMaterial[]
  update: (t: number, ctx: FrameContext) => void
  dispose: () => void
}

/** Builds a screen-space-thick polyline. `pts` is a flat xyz array. */
function fatLine(
  pts: number[],
  color: number,
  linewidth: number,
  opacity: number,
): { line: Line2; material: LineMaterial; geometry: LineGeometry } {
  const geometry = new LineGeometry()
  geometry.setPositions(pts)
  const material = new LineMaterial({
    color,
    linewidth,
    transparent: opacity < 1,
    opacity,
    dashed: false,
  })
  const line = new Line2(geometry, material)
  line.computeLineDistances()
  return { line, material, geometry }
}

/** Collects disposables so every figure can tear itself down completely. */
class Parts {
  geometries: { dispose: () => void }[] = []
  materials: LineMaterial[] = []
  plain: THREE.Material[] = []

  fat(group: THREE.Group, pts: number[], color: number, w: number, o: number) {
    const { line, material, geometry } = fatLine(pts, color, w, o)
    this.geometries.push(geometry)
    this.materials.push(material)
    group.add(line)
    return line
  }

  dispose() {
    this.geometries.forEach((g) => g.dispose())
    this.materials.forEach((m) => m.dispose())
    this.plain.forEach((m) => m.dispose())
  }
}

/* ------------------------------------------------------------------ knot --
 * The hero: a (2,3) torus knot drawn as longitudinal plotter ribs, with rust
 * cross-sections at measured intervals inside a faint construction cage.
 */
function buildKnot(): Figure {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0, 12)

  const root = new THREE.Group()
  scene.add(root)
  const parts = new Parts()

  const SAMPLES = 480
  const SEG = 520
  const RIBS = 9
  const TUBE = 0.42

  const raw: THREE.Vector3[] = []
  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2
    const r = Math.cos(3 * t) + 2
    raw.push(new THREE.Vector3(r * Math.cos(2 * t), r * Math.sin(2 * t), -Math.sin(3 * t)))
  }
  const curve = new THREE.CatmullRomCurve3(raw, true, 'catmullrom', 0.5)
  const frames = curve.computeFrenetFrames(SEG, true)
  const centres: THREE.Vector3[] = []
  for (let i = 0; i <= SEG; i++) centres.push(curve.getPointAt(i / SEG))

  const at = (i: number, angle: number, radius = TUBE) => {
    const c = centres[i]
    const n = frames.normals[Math.min(i, SEG - 1)]
    const b = frames.binormals[Math.min(i, SEG - 1)]
    return [
      c.x + radius * (Math.cos(angle) * n.x + Math.sin(angle) * b.x),
      c.y + radius * (Math.cos(angle) * n.y + Math.sin(angle) * b.y),
      c.z + radius * (Math.cos(angle) * n.z + Math.sin(angle) * b.z),
    ] as const
  }

  const ribs = new THREE.Group()
  for (let j = 0; j < RIBS; j++) {
    const angle = (j / RIBS) * Math.PI * 2
    const pts: number[] = []
    for (let i = 0; i <= SEG; i++) pts.push(...at(i, angle))
    // Alternate weights so the ribbon reads as a drawn object, not a mesh.
    const heavy = j % 3 === 0
    parts.fat(ribs, pts, ink(), heavy ? 1.7 : 1.05, heavy ? 0.62 : 0.34)
  }
  root.add(ribs)

  const rings = new THREE.Group()
  const RING_EVERY = 26
  const RING_RES = 24
  for (let i = 0; i <= SEG; i += RING_EVERY) {
    const pts: number[] = []
    for (let k = 0; k <= RING_RES; k++) pts.push(...at(i, (k / RING_RES) * Math.PI * 2))
    parts.fat(rings, pts, rust(), 1.35, 0.9)
  }
  root.add(rings)

  const cageGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.6, 1))
  const cageMat = new THREE.LineBasicMaterial({ color: ink(), transparent: true, opacity: 0.1 })
  const cage = new THREE.LineSegments(cageGeo, cageMat)
  parts.geometries.push(cageGeo)
  parts.plain.push(cageMat)
  root.add(cage)

  return {
    scene,
    camera,
    materials: parts.materials,
    update: (t, c) => {
      // Scroll adds a slow extra revolution so the object tracks the reader.
      root.rotation.y = t * 0.15 + c.pointerX * 0.5 + c.scroll * Math.PI * 1.4
      root.rotation.x = Math.sin(t * 0.23) * 0.15 + c.pointerY * -0.32
      ribs.rotation.z = Math.sin(t * 0.18) * 0.06
      rings.rotation.y = Math.sin(t * 0.11) * 0.12
      cage.rotation.y = -t * 0.08
      cage.rotation.x = t * 0.05
      // Breathing scale keeps it alive without touching vertex data.
      const s = 1 + Math.sin(t * 0.5) * 0.012
      root.scale.setScalar(s)
    },
    dispose: () => parts.dispose(),
  }
}

/* ----------------------------------------------------------------- helix --
 * Two intertwined strands with rust rungs. Used beside the practice column.
 */
function buildHelix(): Figure {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  const root = new THREE.Group()
  scene.add(root)
  const parts = new Parts()

  const TURNS = 3.2
  const N = 300
  const R = 1.15
  const H = 4.2

  for (const phase of [0, Math.PI]) {
    const pts: number[] = []
    for (let i = 0; i <= N; i++) {
      const u = i / N
      const a = u * Math.PI * 2 * TURNS + phase
      pts.push(Math.cos(a) * R, (u - 0.5) * H, Math.sin(a) * R)
    }
    parts.fat(root, pts, ink(), 1.6, 0.6)
  }

  const rungs = new THREE.Group()
  for (let i = 0; i <= 14; i++) {
    const u = i / 14
    const a = u * Math.PI * 2 * TURNS
    const y = (u - 0.5) * H
    parts.fat(
      rungs,
      [Math.cos(a) * R, y, Math.sin(a) * R, -Math.cos(a) * R, y, -Math.sin(a) * R],
      rust(),
      1.15,
      0.85,
    )
  }
  root.add(rungs)

  return {
    scene,
    camera,
    materials: parts.materials,
    update: (t, c) => {
      root.rotation.y = t * 0.42 + c.pointerX * 0.35 + c.scroll * Math.PI
      root.rotation.z = Math.sin(t * 0.3) * 0.07
      root.rotation.x = c.pointerY * -0.2
    },
    dispose: () => parts.dispose(),
  }
}

/* --------------------------------------------------------------- lattice --
 * Nested polyhedral cages with rust nodes. Used beside the "now" column.
 */
function buildLattice(): Figure {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  const root = new THREE.Group()
  scene.add(root)
  const parts = new Parts()

  const outerGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.1, 0))
  const outerMat = new THREE.LineBasicMaterial({ color: ink(), transparent: true, opacity: 0.5 })
  const outer = new THREE.LineSegments(outerGeo, outerMat)
  parts.geometries.push(outerGeo)
  parts.plain.push(outerMat)
  root.add(outer)

  const innerGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.2, 0))
  const innerMat = new THREE.LineBasicMaterial({ color: ink(), transparent: true, opacity: 0.28 })
  const inner = new THREE.LineSegments(innerGeo, innerMat)
  parts.geometries.push(innerGeo)
  parts.plain.push(innerMat)
  root.add(inner)

  // Rust nodes on the outer hull's vertices.
  const hull = new THREE.IcosahedronGeometry(2.1, 0)
  const nodeGeo = new THREE.BufferGeometry()
  nodeGeo.setAttribute('position', hull.getAttribute('position').clone())
  hull.dispose()
  // Fixed pixel size: attenuated points scale off the full canvas height, which
  // makes them enormous inside a small slot viewport.
  const nodeMat = new THREE.PointsMaterial({ color: rust(), size: 5, sizeAttenuation: false })
  const nodes = new THREE.Points(nodeGeo, nodeMat)
  parts.geometries.push(nodeGeo)
  parts.plain.push(nodeMat)
  root.add(nodes)

  return {
    scene,
    camera,
    materials: parts.materials,
    update: (t, c) => {
      root.rotation.y = t * 0.3 + c.pointerX * 0.35 + c.scroll * Math.PI * 0.8
      root.rotation.x = t * 0.17 + c.pointerY * -0.2
      inner.rotation.y = -t * 0.7
      inner.rotation.z = t * 0.4
      nodes.rotation.copy(outer.rotation)
    },
    dispose: () => parts.dispose(),
  }
}

/* ----------------------------------------------------------------- orbit --
 * An armillary sphere: tilted rings, one in rust. Used for selected work.
 */
function buildOrbit(): Figure {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  const root = new THREE.Group()
  scene.add(root)
  const parts = new Parts()

  const ring = (radius: number, res = 128) => {
    const pts: number[] = []
    for (let i = 0; i <= res; i++) {
      const a = (i / res) * Math.PI * 2
      pts.push(Math.cos(a) * radius, Math.sin(a) * radius, 0)
    }
    return pts
  }

  const specs = [
    { r: 2.15, tilt: 0, spin: 0.0, color: ink(), w: 1.7, o: 0.55 },
    { r: 1.72, tilt: Math.PI / 3, spin: 0.5, color: ink(), w: 1.25, o: 0.4 },
    { r: 1.3, tilt: -Math.PI / 4, spin: 1.1, color: rust(), w: 1.5, o: 0.9 },
    { r: 0.85, tilt: Math.PI / 2.2, spin: 1.8, color: ink(), w: 1.1, o: 0.3 },
  ]

  const shells = specs.map((s) => {
    const g = new THREE.Group()
    parts.fat(g, ring(s.r), s.color, s.w, s.o)
    g.rotation.x = s.tilt
    g.rotation.y = s.spin
    root.add(g)
    return g
  })

  const coreGeo = new THREE.BufferGeometry()
  coreGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3))
  const coreMat = new THREE.PointsMaterial({ color: rust(), size: 6, sizeAttenuation: false })
  parts.geometries.push(coreGeo)
  parts.plain.push(coreMat)
  root.add(new THREE.Points(coreGeo, coreMat))

  return {
    scene,
    camera,
    materials: parts.materials,
    update: (t, c) => {
      root.rotation.y = t * 0.22 + c.pointerX * 0.4 + c.scroll * Math.PI * 0.6
      root.rotation.x = c.pointerY * -0.22
      shells.forEach((g, i) => {
        g.rotation.z = t * (0.25 + i * 0.16) * (i % 2 ? -1 : 1)
      })
    },
    dispose: () => parts.dispose(),
  }
}

/* ------------------------------------------------------------------ coil --
 * A torus wound with a fine coil. Used for the closing invitation.
 */
function buildCoil(): Figure {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  const root = new THREE.Group()
  scene.add(root)
  const parts = new Parts()

  const R = 1.7
  const r = 0.5
  const WINDS = 46
  const N = 1400
  const pts: number[] = []
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * Math.PI * 2
    const v = u * WINDS
    const x = (R + r * Math.cos(v)) * Math.cos(u)
    const y = (R + r * Math.cos(v)) * Math.sin(u)
    const z = r * Math.sin(v)
    pts.push(x, y, z)
  }
  parts.fat(root, pts, ink(), 1.15, 0.5)

  const guide: number[] = []
  for (let i = 0; i <= 200; i++) {
    const u = (i / 200) * Math.PI * 2
    guide.push(Math.cos(u) * R, Math.sin(u) * R, 0)
  }
  parts.fat(root, guide, rust(), 1.5, 0.85)

  return {
    scene,
    camera,
    materials: parts.materials,
    update: (t, c) => {
      root.rotation.z = t * 0.16 + c.scroll * Math.PI * 0.5
      root.rotation.x = 1.05 + Math.sin(t * 0.22) * 0.12 + c.pointerY * -0.2
      root.rotation.y = c.pointerX * 0.3
    },
    dispose: () => parts.dispose(),
  }
}

const BUILDERS: Record<FigureKind, () => Figure> = {
  knot: buildKnot,
  helix: buildHelix,
  lattice: buildLattice,
  orbit: buildOrbit,
  coil: buildCoil,
}

export function createFigure(kind: FigureKind): Figure {
  return BUILDERS[kind]()
}

export const FIGURE_KINDS = Object.keys(BUILDERS) as FigureKind[]
