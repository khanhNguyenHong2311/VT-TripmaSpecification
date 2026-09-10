const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.flightDeals.deleteMany();
  await prisma.uniquePlaces.deleteMany();
  await prisma.commentSection.deleteMany();

  const users = [
    { name: "Yifei Chen", email: "yifei@example.com", image: "./commenter.svg" },
    { name: "Kaede Hare", email: "kaede@example.com", image: "./commenter.svg" },
    { name: "Anthony Smith", email: "anthony@example.com", image: "./commenter.svg" }
  ];
  
  const createdUsers = [];
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, image: u.image },
      create: u
    });
    createdUsers.push(user);
  }

  const comments = [
    {
      userId: createdUsers[0].id,
      date: new Date("2023-04-15"),
      rate: 4,
      description: "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me immediately!"
    },
    {
      userId: createdUsers[1].id,
      date: new Date("2023-05-20"),
      rate: 5,
      description: "Tripma made my vacation planning so much easier. The interface is clean, finding flights was a breeze, and I loved how they suggested unique places to stay."
    },
    {
      userId: createdUsers[2].id,
      date: new Date("2023-06-10"),
      rate: 5,
      description: "Highly recommend! Best prices I could find anywhere. Plus, their customer support is super responsive."
    }
  ];

  await prisma.commentSection.createMany({ data: comments });

  const flightDeals = [
    { placeName: "The Bund", city: "Shanghai", imgPath: "./flightdeal.svg", price: 598, description: "China's most international city" },
    { placeName: "Sydney Opera House", city: "Sydney", imgPath: "./flightdeal.svg", price: 981, description: "Take a stroll along the famous harbor" },
    { placeName: "Kōdaiji Temple", city: "Kyoto", imgPath: "./flightdeal.svg", price: 633, description: "Step back in time in the Gion district" },
    { placeName: "Eiffel Tower", city: "Paris", imgPath: "./flightdeal.svg", price: 750, description: "Experience the city of love" }
  ];
  await prisma.flightDeals.createMany({ data: flightDeals });

  const uniquePlaces = [
    { placeName: "Maldives", city: "Maldives", imgPath: "./uniqueplacestest.svg", price: 1200, description: "Stay among the atolls", motivation: "Relaxation" },
    { placeName: "Atlas Mountains", city: "Morocco", imgPath: "./uniqueplacestest.svg", price: 850, description: "Experience the Moroccan nomad lifestyle", motivation: "Adventure" },
    { placeName: "Tuscany", city: "Italy", imgPath: "./uniqueplacestest.svg", price: 900, description: "Live the authentic Tuscan countryside", motivation: "Culture" }
  ];
  await prisma.uniquePlaces.createMany({ data: uniquePlaces });

  console.log("Homepage data seeded successfully.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
