import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { calculateAdminPrice, calculateBasePricePerUser } from '@/lib/pricing';

export async function POST(request) {
  try {
    const {
      providerId,
      userCount,
      cookieUserId,
      memberName,
      createNew = false
    } = await request.json();

    // Validate required fields
    if (!providerId || !userCount || !cookieUserId || !memberName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get provider pricing info
    const { data: provider, error: providerError } = await supabase
      .from('provider')
      .select('base_price, admin_price, max_user')
      .eq('id', providerId)
      .single();

    if (providerError || !provider) {
      console.error('Error fetching provider:', providerError);
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    // Calculate prices for this purchase
    const basePricePerUser = calculateBasePricePerUser(provider.base_price, userCount);
    const adminPricePerUser = calculateAdminPrice(userCount, provider.max_user, provider.admin_price);
    const totalPrice = basePricePerUser + adminPricePerUser;

    let ruanganId;
    let slotNumber;
    let isNewRoom = false;

    // STEP 1: Always try to find an available room first
    const { data: availableRooms, error: fetchError } = await supabase
      .from('ruangan')
      .select(`
        id,
        user_count,
        ruangan_users (slot_number)
      `)
      .eq('provider_id', providerId)
      .eq('status', 'tersedia')
      .lt('user_count', userCount)
      .order('created_at', { ascending: true })
      .limit(1);

    if (fetchError) {
      console.error('Error fetching rooms:', fetchError);
      return NextResponse.json(
        { error: 'Failed to find available room' },
        { status: 500 }
      );
    }

    // STEP 2: If available room exists and user wants to join (not explicitly creating new)
    if (availableRooms && availableRooms.length > 0 && !createNew) {
      // JOIN EXISTING ROOM
      const room = availableRooms[0];
      ruanganId = room.id;

      // Find the next available slot number
      const usedSlots = room.ruangan_users.map(ru => ru.slot_number);
      slotNumber = 1;
      while (usedSlots.includes(slotNumber)) {
        slotNumber++;
      }
    } else {
      // CREATE NEW ROOM (either explicitly requested or no rooms available)
      const { data: newRuangan, error: ruanganError } = await supabase
        .from('ruangan')
        .insert({
          provider_id: providerId,
          status: 'tersedia',
          user_count: 1, // First user
        })
        .select()
        .single();

      if (ruanganError) {
        console.error('Error creating ruangan:', ruanganError);
        return NextResponse.json(
          { error: 'Failed to create room' },
          { status: 500 }
        );
      }

      ruanganId = newRuangan.id;
      slotNumber = 1; // First slot
      isNewRoom = true;
    }

    // 2. Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payment')
      .insert({
        user_id: cookieUserId,
        base_price_per_user: basePricePerUser,
        admin_price_per_user: adminPricePerUser,
        total_price: totalPrice,
        user_count: userCount,
        is_paid: false,
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment:', paymentError);
      return NextResponse.json(
        { error: 'Failed to create payment' },
        { status: 500 }
      );
    }

    // 3. Add user to ruangan_users with payment_id
    const { data: ruanganUser, error: joinError } = await supabase
      .from('ruangan_users')
      .insert({
        ruangan_id: ruanganId,
        cookie_user_id: cookieUserId,
        slot_number: slotNumber,
        member_name: memberName,
        payment_id: payment.id,
      })
      .select()
      .single();

    if (joinError) {
      console.error('Error joining room:', joinError);
      return NextResponse.json(
        { error: 'Failed to join room' },
        { status: 500 }
      );
    }

    // 3. Get current room data and increment user_count
    const { data: currentRoom } = await supabase
      .from('ruangan')
      .select('user_count')
      .eq('id', ruanganId)
      .single();

    const { error: updateError } = await supabase
      .from('ruangan')
      .update({
        user_count: (currentRoom?.user_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', ruanganId);

    if (updateError) {
      console.error('Error updating room count:', updateError);
      // Note: User is already added, so we don't fail here
    }

    // 4. Check if room is now full and update status
    const { data: updatedRoom } = await supabase
      .from('ruangan')
      .select('user_count')
      .eq('id', ruanganId)
      .single();

    if (updatedRoom && updatedRoom.user_count === userCount) {
      // Room is now full
      await supabase
        .from('ruangan')
        .update({ status: 'penuh' })
        .eq('id', ruanganId);
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      ruanganId,
      slotNumber,
      isNewRoom,
      totalPrice,
      message: isNewRoom ? 'Room created successfully!' : 'Joined room successfully!'
    });

  } catch (error) {
    console.error('Error in join-room API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
