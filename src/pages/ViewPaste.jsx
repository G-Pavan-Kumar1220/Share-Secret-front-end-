import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../api/Api'

export default function ViewPaste() {
  const { id } = useParams()
  const [content, setContent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/pastes/${id}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => setContent(data.content))
      .catch(() => setError('Paste not found or expired'))
  }, [id])

  return (
    <div className="min-h-screen flex justify-center items-center min-w-screen bg-gray-100 px-4">
  
      {error && (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      )}

   
      {content === null && !error && (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center animate-pulse">
          <p className="text-gray-500 text-lg">Loading paste...</p>
        </div>
      )}

 
      {content !== null && !error && (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border-l-4 border-emerald-400 p-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Shared Secret
          </h1>

          <pre className="bg-gray-900 select-none text-gray-100 rounded-xl p-4 text-sm sm:text-base overflow-x-auto whitespace-pre-wrap break-words font-mono">
            {content}
          </pre>
        </div>
      )}
    </div>
  )
}
