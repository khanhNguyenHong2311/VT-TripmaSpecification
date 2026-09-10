import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// UC-01 PRE-2
async function getAvailableCities() {
  const flights = await prisma.flight.findMany({
    select: {
      fromCity: true,
      toCity: true,
    },
    distinct: ["fromCity", "toCity"],
  });

  const fromCities = [...new Set(flights.map((flight) => flight.fromCity))];
  const toCities = [...new Set(flights.map((flight) => flight.toCity))];
  return { fromCities, toCities };
}

export async function GET() {
  try {
    const { fromCities, toCities } = await getAvailableCities();
    return NextResponse.json(
      {
        fromCities,
        toCities,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
