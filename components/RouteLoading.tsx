"use client"
type Props = { label?: string }
export default function RouteLoading({ label = "Loading" }: Props) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex items-center gap-3 text-sm text-gray-500 animate-pulse">
        <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" />
        <span>{label}…</span>
      </div>
    </div>
  )
}
