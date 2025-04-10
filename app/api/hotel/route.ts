import dbConfig from "@/lib/db.config";
import Booking from "@/models/booking.model";
import Hotel from "@/models/hotel.model";
import { NextRequest, NextResponse } from "next/server";

//getting function
export async function GET(req: NextRequest) {
  try {
    await dbConfig();

    const queries = req?.nextUrl?.searchParams;
    const location = queries.get("location");
    let checkInDate = queries.get("checkInDate");
    let checkOutDate = queries.get("checkOutDate");
    if (!(location && checkInDate && checkOutDate)) {
      return NextResponse.json(
        { message: "incomplete details" },
        { status: 401 }
      );
    }
    console.log(location);
    //all hotels at given location
    let totalHotels_at_location = await Hotel.find({ location: location });
    //all rooms of hotels
    let total_rooms = totalHotels_at_location
      .map((item: any) => item.rooms)
      .flat();
    console.log(total_rooms, "total rooms");
    //sir's code +++++

    const bookedHotels = await Booking.find({
      location: location,
      $or: [
        {
          checkInDate: { $lte: checkOutDate }, //nayi ki checkoutdate purani ki check in date se jyada h or eql h to
          checkOutDate: { $gte: checkInDate }, //nayi ki checkindate purani ki checkoutdate se kam h to
        },
      ],
    });
    //gt+++++

    //seperating booked rooms--------
    let bookedRoomsId = bookedHotels.map((items: any) => items.room.toString());
    console.log(bookedRoomsId, "booked rooms");
    //

    //finding hotels with only available rooms
    let result = totalHotels_at_location
      .map((hotel: any) => {
        const availableRooms = hotel.rooms.filter(
          (roomId: any) => !bookedRoomsId.includes(roomId.toString())
        );

        return {
          ...hotel.toObject(), //queries return us mongoose docs ,converted into js objects
          rooms: availableRooms,
        };
      })
      .filter((hotel: any) => hotel.rooms.length > 0); //removed hotels with 0 rooms

    console.log(result, "result");
    //
    if (bookedHotels.length < 1) {
      return NextResponse.json(
        {
          Message: "Hotets are fetched sucessfully!",
          hotels: totalHotels_at_location,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { Message: "Hotets are fetched sucessfully!", hotels: result },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "server error", error: err.message },
      { status: 500 }
    );
  }
}
