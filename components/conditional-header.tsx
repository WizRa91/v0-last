"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function ConditionalHeader() {
  const pathname = usePathname()
  const hideHeader = pathname === "/map"

  if (hideHeader) {
    return null
  }

  return <Header />
}
