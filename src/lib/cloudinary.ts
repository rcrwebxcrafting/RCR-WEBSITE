import { v2 as cloudinary } from 'cloudinary'

// ============================================================
// CLOUDINARY CONFIG
// ============================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(
  file: string,
  folder: string = 'rcr-enterprises'
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: 'auto',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string = 'rcr-enterprises'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error || !result) return reject(error)
        resolve({ url: result.secure_url, publicId: result.public_id })
      })
      .end(buffer)
  })
}

// ============================================================
// EMAIL NOTIFICATIONS (Delegated to specialized email service)
// ============================================================
export { sendContactNotification, type ContactEmailData } from './email'
