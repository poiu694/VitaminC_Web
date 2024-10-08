import { type FC, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { useKakaoMap } from './context'

import { icons } from '@/components/common/icons'
import type { ClassName } from '@/models/common'

interface GPSMarkerProps extends ClassName {
  latitude: number
  longitude: number
}

const iconSize = {
  width: 34,
  height: 34,
} as const

const createBaseIcon = (
  IconComponent: FC<any>,
  size: { width: number; height: number },
): HTMLElement => {
  const svgContainer = document.createElement('div')
  svgContainer.style.width = '100%'
  svgContainer.style.height = '100%'
  const root = createRoot(svgContainer)
  root.render(<IconComponent width={size.width} height={size.height} />)
  return svgContainer
}

const createMarkerContent = (
  size: { width: number; height: number },
  className?: string,
): HTMLElement => {
  const IconComponent = icons.gps

  const container = document.createElement('button')
  container.className = className ?? ''
  container.style.position = 'relative'
  container.style.width = `${size.width}px`
  container.style.height = `${size.height}px`
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'

  const baseIcon = createBaseIcon(IconComponent, size)
  container.appendChild(baseIcon)

  return container
}

const GPSMarker = ({ latitude, longitude, className }: GPSMarkerProps) => {
  const { map } = useKakaoMap()

  useEffect(() => {
    if (!map) return

    const position = new kakao.maps.LatLng(latitude, longitude)
    const content = createMarkerContent(iconSize, className)

    const customOverlay = new kakao.maps.CustomOverlay({
      position,
      content,
      clickable: true,
      xAnchor: 0.5,
      yAnchor: 1.2,
    })

    customOverlay.setMap(map)

    return () => {
      customOverlay.setMap(null)
    }
  }, [map, latitude, longitude, className])

  return null
}

export default GPSMarker
