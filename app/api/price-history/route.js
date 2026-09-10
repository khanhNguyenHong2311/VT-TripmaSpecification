import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromCity = searchParams.get("fromCity");
    const toCity = searchParams.get("toCity");

    if (!fromCity || !toCity) {
      return NextResponse.json(
        { error: "fromCity and toCity are required" },
        { status: 400 }
      );
    }

    // Fetch up to 30 latest records for this route, ordered by date ascending (oldest to newest for chart)
    const history = await prisma.routePriceHistory.findMany({
      where: {
        fromCity: fromCity,
        toCity: toCity,
      },
      orderBy: {
        date: "asc",
      },
      take: 30,
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching price history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
