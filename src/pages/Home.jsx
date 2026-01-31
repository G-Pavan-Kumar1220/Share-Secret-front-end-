import { useState } from 'react'
import { BASE_URL, BASE_URL_FRONTEND } from '../api/Api'

export default function Home() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [views, setViews] = useState('')
  const [error, setError] = useState(null)
  const [id, setId] = useState('')

  const submit = async () => {
    setError(null)
    try {
      const res = await fetch(`${BASE_URL}/api/pastes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: views ? Number(views) : undefined
        })
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Request failed: ${res.status} ${errorText}`)
      }

      const data = await res.json()
      setId(data.id)
      // alert('Link is ready')
    } catch (err) {
      setError(err.message)
    }
  }

  const copyLink = async () => {
    const link = `${BASE_URL_FRONTEND}/p/${id}`
    await navigator.clipboard.writeText(link)
    // alert('Link copied!')
  }

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center place-items-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border-l-4 border-emerald-400 p-6 sm:p-8">

      
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Paste
        </h1>

       
        <div className="mb-5">
          <textarea
            placeholder="Paste your secret content here..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full h-40 resize-none rounded-xl border border-gray-300 p-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">

        
          <div>
            <input
              type="number"
              placeholder="Expire in seconds"
              value={ttl}
              defaultValue={10000}
              onChange={e => setTtl(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Auto delete after time limit
            </p>
          </div>

       
          <div>
            <input
              type="number"
              placeholder="Max views"
              value={views}
              defaultValue={5}
              onChange={e => setViews(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Expire after view limit
            </p>
          </div>

        </div>

      
        <button
          onClick={submit}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Create Paste
        </button>

     
        {!error && id && (
          <div className="mt-6 rounded-xl border bg-gray-50 p-4">
            <a
              href={`${BASE_URL_FRONTEND}/p/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-600 font-medium break-all hover:underline"
            >
              {BASE_URL_FRONTEND}/p/{id}
            </a>

            <button
              onClick={copyLink}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Copy Link
            </button>
            <p className="mt-1 text-xs text-gray-500">
              Share with your friend
            </p>
          </div>
        )}

  
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

      </div>
    </div>
  )
}
