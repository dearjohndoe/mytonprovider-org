import Link from "next/link"
import { Github, MessageCircle, Twitter, Mail, ArrowBigUp, Server } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8">

      <div className="flex w-[90%] space-x-6 my-4">
        <div className="ml-auto mr-4">
          <Link href="#" className="flex items-center text-gray-500 hover:text-gray-900">
            <ArrowBigUp className="h-4 w-4 mr-2" />
            Go up 
          </Link>
        </div>
      </div>
      
      <div className="flex space-x-6 justify-center border-t">
        <div className="flex-none w-[80%] justify-between flex pt-8 items-center">
          <div>
            <Link href="https://github.com/igroman787/mytonprovider/blob/master/README.md" className="flex mb-4 items-center text-gray-500 hover:text-gray-900">
              <Server className="h-4 w-4 mr-2" />
              Become Provider
            </Link>
            {/* <br /> */}
            <Link href="https://t.me/tondev" className="flex my-2 items-center text-gray-500 hover:text-gray-900">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support RU
            </Link>
            <Link href="https://t.me/tondev_eng" className="flex mb-4 items-center text-gray-500 hover:text-gray-900">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support EN
            </Link>
            {/* <br /> */}
            <Link href="https://github.com/dearjohndoe/mytonprovider-backend" className="flex my-2 items-center text-gray-500 hover:text-gray-900">
              <Github className="h-4 w-4 mr-2" />
              GitHub (backend)
            </Link>
            <Link href="https://github.com/dearjohndoe/mytonprovider-org" className="flex my-2 items-center text-gray-500 hover:text-gray-900">
              <Github className="h-4 w-4 mr-2" />
              GitHub (frontend)
            </Link> 
          </div>

          <div className="flex space-x-4 mt-4">
          </div>
        </div>
      </div>
    </footer>
  )
}
