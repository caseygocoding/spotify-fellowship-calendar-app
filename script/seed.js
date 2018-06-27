'use strict';

const db = require('../server/db');
const { Event } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const events = await Promise.all([
    Event.create({
      eventName: 'visit sister',
      startTime: '7pm',
      endTime: '9pm',
      description: 'sister in the bay area',
      year: 2018,
      month: 7,
      day: 4,
    }),
    Event.create({
      eventName: 'visit brother',
      startTime: '2pm',
      endTime: '4pm',
      description: 'brother in Seattle',
      year: 2018,
      month: 7,
      day: 15,
    }),
  ]);

  console.log(`seeded ${events.length} events`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
