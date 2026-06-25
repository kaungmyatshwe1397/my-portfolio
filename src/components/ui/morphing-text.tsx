"use client"

import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const morphTime = 1.5
const cooldownTime = 0.5

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(0)
  const initializedRef = useRef(false)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return

      const safeFraction = Math.max(fraction, 0.001)
      const invertedFraction = Math.max(1 - fraction, 0.001)

      t2.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`
      t2.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`

      t1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      t1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      const idx = textIndexRef.current % texts.length
      t1.textContent = texts[idx]
      t2.textContent = texts[(idx + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const t1 = text1Ref.current
    const t2 = text2Ref.current
    if (t1 && t2) {
      t2.style.filter = "none"
      t2.style.opacity = "100%"
      t1.style.filter = "none"
      t1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const now = performance.now()
      if (!initializedRef.current) {
        timeRef.current = now
        initializedRef.current = true
      }

      const dt = (now - timeRef.current) / 1000
      timeRef.current = now

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts)
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  )
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
      className
    )}
  >
    <Texts texts={texts} />
  </div>
)
