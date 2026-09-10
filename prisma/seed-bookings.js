const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

async function main() {
  // 1. Get a random flight
  const flight = await prisma.flight.findFirst();
  if (!flight) {
    console.log("No flights found. Run flightseed.js first.");
    return;
  }

  // 2. Create or find a test User
  const user = await prisma.user.upsert({
    where: { email: "testuser@tripma.com" },
    update: {},
    create: {
      email: "testuser@tripma.com",
      name: "Test User",
    }
  });

  // 3. Create a SavedPaymentMethod for this user
  await prisma.savedPaymentMethod.create({
    data: {
      userId: user.id,
      paymentType: "CREDIT_CARD",
      nameOnCard: "Test User",
      last4Digits: "1234",
      expireDate: new Date("2026-12-01"),
      paymentToken: "tok_visa_fake_123",
      billingAddress: "456 Silicon Valley, CA"
    }
  });

  // 4. Create a comprehensive Booking with PassengerInfo and PaymentInfo
  const confirmationMessage = uuidv4().replace(/-/g, "").slice(0, 12);
  
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      departingFlightId: flight.flightId,
      baggageFees: 100,
      upgradeFees: 0,
      total: 650,
      confirmationMessage: confirmationMessage,
      
      // Seed PassengerInfo with the NEW fields
      PassengerInfos: {
        create: {
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: new Date("1990-01-01"),
          email: "john.doe@example.com",
          phone: "12345678901",
          checkedBags: 2, 
          emergencyFirstName: "Jane", 
          emergencyLastName: "Doe", 
          emergencyEmail: "jane.doe@example.com", 
          emergencyPhone: "10987654321",
          departingSeat: "12A" // NEW: Seat is now attached to the passenger!
        }
      },

      // Seed PaymentInfo showing alternative payment logic (e.g. PayPal)
      PaymentInfos: {
        create: {
          paymentType: "PAYPAL",
          billingAddress: "123 Main St, New York", // NEW FIELD
          transactionId: "PAYID-XYZ987654321", // NEW FIELD
          providerEmail: "john.paypal@example.com", // NEW FIELD
          // We can leave cardNumber and ccv empty because they are now Optional!
        }
      }
    }
  });

  console.log("Database successfully seeded with new Booking structures!");
  console.log("Created Booking ID:", booking.id);
  console.log("Created User ID:", user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
