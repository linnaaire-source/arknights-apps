import { useEffect, useRef } from 'react'
import './SilkBackground.css'

// Silk – animated canvas background inspired by @react-bits/Silk
// Props: speed, scale, color, noiseIntensity, rotation
function SilkBackground({ speed = 5, scale = 1, color = '#1a1a2e', noiseIntensity = 1.5, rotation = 0 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Simple silk-like noise drawing using layered sine waves
    const draw = () => {
      const { width, height } = canvas
      timeRef.current += 0.003 * speed
      const t = timeRef.current

      ctx.clearRect(0, 0, width, height)

      // Gradient base
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, '#05050a')
      grad.addColorStop(0.5, '#0c0c18')
      grad.addColorStop(1, '#05050a')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Draw silk wave layers
      const numLayers = 6
      for (let l = 0; l < numLayers; l++) {
        const alpha = 0.04 + (l / numLayers) * 0.06
        const freq = (0.002 + l * 0.0015) * scale
        const amp = (height * 0.15 + l * 20) * noiseIntensity * 0.3

        ctx.beginPath()
        ctx.moveTo(0, height / 2)

        for (let x = 0; x <= width; x += 3) {
          const nx = x + Math.cos(t * 0.7 + l) * 50
          const y =
            height / 2 +
            Math.sin(nx * freq + t + l * 1.1) * amp +
            Math.sin(nx * freq * 2.3 + t * 1.3 + l * 0.7) * (amp * 0.4) +
            Math.cos(nx * freq * 0.7 + t * 0.8) * (amp * 0.3)

          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        // Parse the color prop into a usable rgba
        const r = parseInt(color.slice(1, 3), 16) || 180
        const g = parseInt(color.slice(3, 5), 16) || 160
        const b = parseInt(color.slice(5, 7), 16) || 90

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      }

      // Scanline overlay for atmospheric effect
      for (let y = 0; y < height; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.03)'
        ctx.fillRect(0, y, width, 1)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [speed, scale, color, noiseIntensity, rotation])

  return <canvas ref={canvasRef} className="silk-canvas" />
}

export default SilkBackground
