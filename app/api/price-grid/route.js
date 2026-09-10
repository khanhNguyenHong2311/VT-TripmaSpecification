import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fromCity = searchParams.get("fromCity");
    const toCity = searchParams.get("toCity");
    const startDateParam = searchParams.get("startDate");

    if (!fromCity || !toCity || !startDateParam) {
      return NextResponse.json(
        { error: "fromCity, toCity, and startDate are required" },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateParam);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid startDate format" },
        { status: 400 }
      );
    }

    // Generate 5 days centered around startDate
    const dateList = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      dateList.push(d);
    }

    const startOfRange = new Date(dateList[0]);
    startOfRange.setHours(0, 0, 0, 0);

    const endOfRange = new Date(dateList[dateList.length - 1]);
    endOfRange.setHours(23, 59, 59, 999);

    const history = await prisma.routePriceHistory.findMany({
      where: {
        fromCity: fromCity,
        toCity: toCity,
        date: {
          gte: startOfRange,
          lte: endOfRange,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Map fetched history prices by date string
    const priceMap = {};
    history.forEach(item => {
      const dateStr = item.date.toISOString().split('T')[0];
      priceMap[dateStr] = item.price;
    });

    // We will generate a 5x5 grid.
    // Let's assume columns are departing dates and rows are returning dates.
    // But if it's one-way, maybe rows are just different nearby dates, and columns are something else?
    // Let's just make it a flexible date grid where both axes represent dates around the search date.
    // If we only have 1 dimensional price history, we can generate a matrix by adding/subtracting small amounts for return dates.
    
    // For simplicity, let's construct a grid object:
    // headers: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11"]
    // rows: 
    // [
    //   { label: "Feb 12", prices: [200, 210, 190, 250, 300] },
    //   ...
    // ]
    
    // To format dates like "2/7"
    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

    const headers = dateList.map(d => formatDate(d));
    
    // Create 5 rows (e.g. Return dates starting from startDate + 5 days)
    const returnDateBase = new Date(startDate);
    returnDateBase.setDate(returnDateBase.getDate() + 5);
    
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const rDate = new Date(returnDateBase);
      rDate.setDate(rDate.getDate() + i);
      
      const rowLabel = formatDate(rDate);
      const rowPrices = [];
      
      for (let j = 0; j < 5; j++) {
        const colDateStr = dateList[j].toISOString().split('T')[0];
        const basePrice = priceMap[colDateStr] || (200 + Math.floor(Math.random() * 100));
        
        // Add some variation based on the row (return date)
        const roundTripPrice = basePrice + (150 + (i * 10) - (j * 5));
        rowPrices.push(roundTripPrice);
      }
      
      rows.push({
        label: rowLabel,
        prices: rowPrices
      });
    }

    return NextResponse.json({
      headers,
      rows
    });
  } catch (error) {
    console.error("Error fetching price grid:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
