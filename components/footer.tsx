import Link from "next/link"
import { Github, MessageCircle, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link href="/support" className="flex items-center text-gray-500 hover:text-gray-900">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </Link>
            <Link href="/about" className="flex items-center text-gray-500 hover:text-gray-900">
              <MessageCircle className="h-4 w-4 mr-2" />
              About
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
