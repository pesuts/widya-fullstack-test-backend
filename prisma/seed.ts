import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      {
        id: 1,
        name: "Widya-001",
        status: "ACTIVE",
        fuel_level: 85.4,
        odometer: 10234.5,
        latitude: -6.2088,
        longitude: 106.8456,
        speed: 60.2,
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Widya-002",
        status: "INACTIVE",
        fuel_level: 20.1,
        odometer: 12450.3,
        latitude: -6.9147,
        longitude: 107.6098,
        speed: 0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Widya-003",
        status: "ACTIVE",
        fuel_level: 47.9,
        odometer: 8750.0,
        latitude: -7.2504,
        longitude: 112.7688,
        speed: 40.5,
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Widya-004",
        status: "ACTIVE",
        fuel_level: 60.5,
        odometer: 9801.6,
        latitude: -6.9,
        longitude: 107.6,
        speed: 55.0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 5,
        name: "Widya-005",
        status: "INACTIVE",
        fuel_level: 10.0,
        odometer: 15700.2,
        latitude: -7.8,
        longitude: 110.4,
        speed: 0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 6,
        name: "Widya-006",
        status: "ACTIVE",
        fuel_level: 91.3,
        odometer: 5010.9,
        latitude: -8.5,
        longitude: 115.2,
        speed: 72.4,
        updated_at: new Date().toISOString(),
      },
      {
        id: 7,
        name: "Widya-007",
        status: "INACTIVE",
        fuel_level: 5.3,
        odometer: 13340.8,
        latitude: -6.4,
        longitude: 106.9,
        speed: 0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 8,
        name: "Widya-008",
        status: "ACTIVE",
        fuel_level: 70.0,
        odometer: 11200.0,
        latitude: -7.3,
        longitude: 112.7,
        speed: 52.6,
        updated_at: new Date().toISOString(),
      },
      {
        id: 9,
        name: "Widya-009",
        status: "ACTIVE",
        fuel_level: 33.3,
        odometer: 9480.1,
        latitude: -6.2,
        longitude: 106.8,
        speed: 36.5,
        updated_at: new Date().toISOString(),
      },
      {
        id: 10,
        name: "Widya-010",
        status: "INACTIVE",
        fuel_level: 0.0,
        odometer: 16230.7,
        latitude: -6.3,
        longitude: 106.9,
        speed: 0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 11,
        name: "Widya-011",
        status: "ACTIVE",
        fuel_level: 88.8,
        odometer: 7250.6,
        latitude: -7.0,
        longitude: 110.3,
        speed: 64.0,
        updated_at: new Date().toISOString(),
      },
      {
        id: 12,
        name: "Widya-012",
        status: "INACTIVE",
        fuel_level: 12.5,
        odometer: 14400.4,
        latitude: -6.6,
        longitude: 106.7,
        speed: 0,
        updated_at: new Date().toISOString(),
      },
    ],
  });

  console.log("12 data baru kendaraan berhasil ditambahkan!");
}

main()
  .catch((e: any) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
