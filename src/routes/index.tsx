import { createSignal, Index, onMount } from "solid-js";

const getSquaresPerRow = (containerWidth: number, squareMinWidth: number, gap: number) => {
  return Math.floor((containerWidth + gap) / (squareMinWidth + gap))
}

export default function Home() {
  const [squares] = createSignal(Array(20).fill(0))
  const [test, setTest] = createSignal(0)
  let containerRef!: HTMLDivElement

  const onContainerResize = (entries: ResizeObserverEntry[]) => {
    const newSquaresPerRow = getSquaresPerRow(entries[0].contentRect.width, 260, 2)
    setTest(newSquaresPerRow)
  }

  onMount(() => {
    new ResizeObserver(onContainerResize).observe(containerRef)
  })

  return (
    <div ref={containerRef}>
      <div style={{ 'display': 'grid', 'gap': '2px', 'grid-template-columns': `repeat(${test()}, 1fr)`}}>
        <Index each={squares()}>{square => <div style={{ 'background-color': 'gray', 'aspect-ratio': 1 }}></div>}</Index>
      </div>
    </div>
  );
}
