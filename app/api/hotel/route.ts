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
    // console.log(hotels);
    let rooms_id = hotels.map((item: any) => item.rooms).flat(1);
    // we are finding the overlapped booking
    const bookedHotels = await Booking.find({
      location: hotelLocation,
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate },
        },
      ],
    });
    let booked_room_ids = bookedHotels.map((room: any) => room);
    
    // 2 hotels : 2 rooms 2 rooms
    // Id store array , total hotels negate
    console.log("bookedHotels", bookedHotels);
    // if (bookedHotels.length == 0) {
    //   return NextResponse.json(
    //     { Message: "Hotel is fetched sucessfully!", hotels: hotels },
    //     { status: 200 }
    //   );
    // }
    return NextResponse.json(
      { Message: "Booked Hotel", hotels: bookedHotels },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error.message },
      { status: 500 }
    );
  }
}
