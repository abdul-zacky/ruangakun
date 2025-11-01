import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { ruangAkunId } = await request.json()

    // Case 1: No RuangAkunID provided - create new user
    if (!ruangAkunId) {
      const { data: newUser, error: createError } = await supabase
        .from('cookie_user')
        .insert({
          last_active: new Date().toISOString()
        })
        .select('id')
        .single()

      if (createError) {
        console.error('Error creating new cookie_user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }

      return NextResponse.json({
        id: newUser.id,
        action: 'created',
        message: 'New user created'
      })
    }

    // Case 2 & 3: RuangAkunID exists - check if user exists in database
    const { data: existingUser, error: fetchError } = await supabase
      .from('cookie_user')
      .select('id')
      .eq('id', ruangAkunId)
      .maybeSingle()

    if (fetchError) {
      console.error('Error fetching cookie_user:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }

    // Case 3: Cookie exists but no matching database entry - create new and overwrite
    if (!existingUser) {
      const { data: newUser, error: createError } = await supabase
        .from('cookie_user')
        .insert({
          last_active: new Date().toISOString()
        })
        .select('id')
        .single()

      if (createError) {
        console.error('Error creating replacement cookie_user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }

      return NextResponse.json({
        id: newUser.id,
        action: 'replaced',
        message: 'Cookie invalid, new user created'
      })
    }

    // Case 4: Valid cookie and user exists - update last_active
    const { error: updateError } = await supabase
      .from('cookie_user')
      .update({ last_active: new Date().toISOString() })
      .eq('id', existingUser.id)

    if (updateError) {
      console.error('Error updating last_active:', updateError)
      // Don't fail the request if we can't update last_active
    }

    return NextResponse.json({
      id: existingUser.id,
      action: 'validated',
      message: 'User validated'
    })

  } catch (error) {
    console.error('Unexpected error in cookie-user route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
