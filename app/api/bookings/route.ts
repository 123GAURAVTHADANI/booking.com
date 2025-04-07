import dbConfig from "@/lib/db.config";
import Booking from "@/models/booking.model";
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function POST(req: any) {
  try {
    await dbConfig();
    const booking_detail = await req.json();
    const user = await Booking.create(booking_detail);
    return NextResponse.json(
      { Message: "Booking is done sucessfully!", data: user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error },
      { status: 500 }
    );
  }
}
