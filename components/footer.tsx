import Link from 'next/link'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; 2025 PromoPop. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center space-x-6">
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}

