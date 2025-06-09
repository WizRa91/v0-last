"use client"

import type { ReactNode } from "react"

interface ActionButtonGroupProps {
  children: ReactNode
  className?: string
}

export function ActionButtonGroup({ children, className }: ActionButtonGroupProps) {
  return <div className={`action-button-group ${className || ""}`}>{children}</div>
}
