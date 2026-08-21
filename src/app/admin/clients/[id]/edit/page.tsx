'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetchClient()
  }, [id])

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${id}`)
      const data = await res.json()
      
      if (data.success) {
        setFormData({
          name: data.data.name,
          logo: data.data.logo,
          website: data.data.website || '',
          order: data.data.order || 0,
          isActive: data.data.isActive
        })
      } else {
        setError('Client not found')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch client')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingLogo(true)
    setError('')

    const uploadData = new FormData()
    uploadData.append('image', file)
    uploadData.append('folder', 'rcr-enterprises/clients')

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      })

      const data = await res.json()

      if (data.success) {
        setFormData(prev => ({ ...prev, logo: data.url }))
      } else {
        setError(data.message || 'Failed to upload image')
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading image')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        router.push('/admin/clients')
        router.refresh()
      } else {
        setError(data.message || 'Failed to update client')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading client data...</div>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/clients" className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Client</h1>
          <p className="text-sm text-slate-500">Update company details or logo.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL (Image Link) *</label>
          <div className="flex gap-3 items-center">
            <input 
              type="url" 
              required
              value={formData.logo}
              onChange={e => setFormData({...formData, logo: e.target.value})}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <button
                type="button"
                disabled={uploadingLogo}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 border border-slate-200"
              >
                <Upload size={18} />
                {uploadingLogo ? 'Uploading...' : 'Upload Local'}
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Paste a valid image URL or upload directly from your device. Square or transparent PNG is recommended.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Website URL (Optional)</label>
          <input 
            type="url" 
            value={formData.website}
            onChange={e => setFormData({...formData, website: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
            <input 
              type="number" 
              value={formData.order}
              onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-3 mt-8">
            <input 
              type="checkbox" 
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData({...formData, isActive: e.target.checked})}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
              Active (Visible on website)
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button 
            type="submit" 
            disabled={saving || uploadingLogo}
            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Updating...' : 'Update Client'}
          </button>
        </div>
      </form>
    </div>
  )
}
