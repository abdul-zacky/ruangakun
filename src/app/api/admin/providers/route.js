import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name')
    const duration = formData.get('duration')
    const description = formData.get('description')
    const features = formData.get('features')
    const basePrice = parseInt(formData.get('base_price'))
    const adminPrice = parseInt(formData.get('admin_price'))
    const minUser = parseInt(formData.get('min_user')) || 1
    const maxUser = parseInt(formData.get('max_user')) || 10
    const recommendedCount = formData.get('recommended_count') ? parseInt(formData.get('recommended_count')) : null
    const iconFile = formData.get('icon')

    let iconPath = null

    // Upload icon to storage if provided
    if (iconFile && iconFile.size > 0) {
      const fileExt = iconFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('provider-icons')
        .upload(fileName, iconFile, {
          contentType: iconFile.type,
          upsert: false
        })

      if (uploadError) {
        console.error('Error uploading icon:', uploadError)
        return NextResponse.json({ error: 'Failed to upload icon' }, { status: 500 })
      }

      iconPath = uploadData.path
    }

    // Parse features JSON
    let featuresData = null
    if (features) {
      try {
        featuresData = JSON.parse(features)
      } catch (e) {
        console.error('Error parsing features:', e)
        return NextResponse.json({ error: 'Invalid features format' }, { status: 400 })
      }
    }

    // Insert provider into database
    const { data: provider, error: insertError } = await supabase
      .from('provider')
      .insert({
        name,
        duration,
        description,
        features: featuresData,
        base_price: basePrice,
        admin_price: adminPrice,
        min_user: minUser,
        max_user: maxUser,
        recommended_count: recommendedCount,
        icon: iconPath
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting provider:', insertError)

      // Clean up uploaded icon if database insert failed
      if (iconPath) {
        await supabase.storage.from('provider-icons').remove([iconPath])
      }

      return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      provider
    })

  } catch (error) {
    console.error('Unexpected error in providers route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: providers, error } = await supabase
      .from('provider')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching providers:', error)
      return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 })
    }

    return NextResponse.json({ providers })

  } catch (error) {
    console.error('Unexpected error in providers route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
