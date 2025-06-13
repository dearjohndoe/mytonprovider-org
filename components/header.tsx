"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-medium">
            💎<span className="text-xl font-bold ml-2">TON Provider Explorer</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
