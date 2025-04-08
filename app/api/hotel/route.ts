import dbConfig from "@/lib/db.config";
import Booking from "@/models/booking.model";
import Hotel from "@/models/hotel.model";
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function POST(req: any) {
  try {
    await dbConfig();
    const hotel_detail = await req.json();
    const user = await Hotel.create(hotel_detail);
    return NextResponse.json(
      { Message: "Hotel is created sucessfully!", data: user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error },
      { status: 500 }
    );
  }
}
export async function GET(req: any) {
  try {
    await dbConfig();
    const { searchParams } = new URL(req.url);
    let hotelLocation = searchParams.get("location");
    let checkInDate = searchParams.get("checkInDate");
    let checkOutDate = searchParams.get("checkOutDate");
    let hotels = await Hotel.find({ location: hotelLocation });
    let rooms_id = hotels.flatMap((item: any) => item.rooms.map(String));
    const bookedHotels = await Booking.find({
      location: hotelLocation,
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate },
        },
      ],
    });


    let booked_room_ids = new Set(
      bookedHotels.map((element: any) => element.room.toString())
    );

    const availableRooms = rooms_id.filter(
      (room: any) => !booked_room_ids.has(room.toString())
    );
    
    // return NextResponse.json(
    //   { Message: "Booked Hotel", hotels: availableHotels },
    //   { status: 200 }
    // );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error.message },
      { status: 500 }
    );
  }
}
