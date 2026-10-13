/**
 * Registry of the figure slots currently on the page.
 *
 * `<Figure3D>` adds its placeholder element here on mount and removes it on
 * unmount; `StageMount` and `Stage` subscribe. Deliberately free of three, so
 * pages can register slots without pulling the WebGL bundle in.
 */

type Listener = () => void

const slots = new Set<HTMLElement>()
const listeners = new Set<Listener>()

const notify = () => listeners.forEach((l) => l())

export function addSlot(el: HTMLElement) {
  slots.add(el)
  notify()
}

export function removeSlot(el: HTMLElement) {
  slots.delete(el)
  notify()
}

export function getSlots(): ReadonlySet<HTMLElement> {
  return slots
}

export function hasSlots() {
  return slots.size > 0
}

export function onSlotsChange(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
