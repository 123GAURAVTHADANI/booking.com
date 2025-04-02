import dbConfig from "@/lib/db.config";
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
