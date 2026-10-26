import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ContactInquiry } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'
import { sendContactNotification } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 20

    const query: Record<string, unknown> = {}
    if (status && status !== 'all') query.status = status

    const total = await ContactInquiry.countDocuments(query)
    const inquiries = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { fullName, phone, email, serviceRequired, location, message } = body

    if (!fullName?.trim() || !phone?.trim()) {
      return NextResponse.json({ success: false, message: 'Name and Phone number are required' }, { status: 400 })
    }

    const cleanPhone = phone.trim()
    const cleanName = fullName.trim()
    const finalService = serviceRequired?.trim() || 'RCC Work & Civil Construction'

    const rawEmail = email?.trim()
    const finalEmail = rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)
      ? rawEmail.toLowerCase()
      : `lead_${cleanPhone.replace(/\D/g, '') || Date.now()}@rcrenterprises.co.in`

    const finalLocation = location?.trim() ? ` [Location: ${location.trim()}]` : ''
    const finalMessage = message?.trim() 
      ? `${message.trim()}${finalLocation}` 
      : `Instant Quote Request from Website Popup for ${finalService}${finalLocation}`

    const inquiry = await ContactInquiry.create({ 
      fullName: cleanName, 
      phone: cleanPhone, 
      email: finalEmail, 
      serviceRequired: finalService, 
      message: finalMessage 
    })

    // Send email (blocking to prevent serverless termination)
    await sendContactNotification({ 
      fullName: cleanName, 
      phone: cleanPhone, 
      email: finalEmail, 
      serviceRequired: finalService, 
      location: location?.trim() || '',
      message: message?.trim() || `Instant Quote Request for ${finalService}`,
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted. We will contact you within 24 hours.',
      data: { id: inquiry._id },
    }, { status: 201 })
  } catch (error) {
    console.error('Contact POST error:', error)
    return NextResponse.json({ success: false, message: 'Failed to submit inquiry' }, { status: 500 })
  }
}
