"use client"

import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex space-x-6 justify-center">
        <div className="flex-none w-[80%]">
          <Link href="/" className="flex font-medium">
            <span>
              <Image className="rounded-full" src="/logo_48x48.png" alt="Logo" width={26} height={26} />
            </span>
            <span className="text-xl font-bold ml-2">TON Provider Explorer</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
