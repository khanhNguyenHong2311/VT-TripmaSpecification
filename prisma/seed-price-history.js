const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getRandomDate(startDate, days) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

async function generateAndInsertPriceHistory() {
  const cities = ["New York", "Los Angeles", "Chicago"];
  const today = new Date();

  const priceHistories = [];

  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; j < cities.length; j++) {
      if (i === j) continue;
      
      const fromCity = cities[i];
      const toCity = cities[j];

      // Base price for this route
      const basePrice = Math.floor(Math.random() * 300) + 200; // 200 - 500
      
      // Generate daily prices for -15 to +30 days around today
      for (let dayOffset = -15; dayOffset <= 30; dayOffset++) {
        const date = new Date(today);
        date.setDate(date.getDate() + dayOffset);
        
        // Random fluctuation between -50 and 50
        const fluctuation = Math.floor(Math.random() * 101) - 50;
        const price = basePrice + fluctuation;

        priceHistories.push({
          fromCity,
          toCity,
          date: date,
          price: price,
        });
      }
    }
  }

  console.log(`Generating ${priceHistories.length} price history records...`);
  
  await prisma.routePriceHistory.createMany({
    data: priceHistories,
  });

  console.log("Dummy price history inserted");
}

async function main() {
  try {
    // Clear old data if necessary
    await prisma.routePriceHistory.deleteMany({});
    
    await generateAndInsertPriceHistory();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
