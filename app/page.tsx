import AdForm from '../components/ad-form'
import AdPreview from '../components/ad-preview'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Instagram Ad Poster</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <AdForm />
        </div>
        <div className="flex items-center justify-center">
          <AdPreview />
        </div>
      </div>
    </main>
  )
}

