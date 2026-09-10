const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
async function check() { 
  console.log('FlightDeals:', await prisma.flightDeals.count()); 
  console.log('UniquePlaces:', await prisma.uniquePlaces.count()); 
  console.log('CommentSection:', await prisma.commentSection.count()); 
} 
check().finally(() => prisma.$disconnect());
