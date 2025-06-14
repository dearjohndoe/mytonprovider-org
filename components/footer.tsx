import Link from "next/link"
import { Github, MessageCircle, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="flex space-x-6 justify-center">
        <div className="flex-none w-[80%] justify-between flex items-center">
          <div className="">
            <Link href="/support" className="flex items-center text-gray-500 hover:text-gray-900">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </Link>
            {/* github */}
            <Link href="https://github.com/dearjohndoe/mytonprovider-org" className="flex items-center text-gray-500 hover:text-gray-900">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-900">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-900">
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-900">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
