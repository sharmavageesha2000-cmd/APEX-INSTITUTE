import { PrismaClient } from '@prisma/client';
import { INITIAL_EVENTS, INITIAL_BLOGS, INITIAL_SETTINGS } from '../src/lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Syncing Initial Events, Blogs, and Settings to PostgreSQL ---');

  // 1. Events
  const eventCount = await prisma.event.count();
  console.log(`Current DB events count: ${eventCount}`);
  if (eventCount === 0) {
    console.log('Seeding initial events...');
    for (const evt of INITIAL_EVENTS) {
      await prisma.event.create({
        data: {
          id: evt.id,
          title: evt.title,
          slug: evt.slug,
          category: evt.category,
          date: evt.date,
          time: evt.time,
          location: evt.location,
          speakerName: evt.speakerName,
          speakerRole: evt.speakerRole,
          speakerFoto: evt.speakerFoto,
          description: evt.description,
          featured: evt.featured ?? true,
        },
      });
      console.log(`  ✓ Event created: ${evt.title}`);
    }
  }

  // 2. Blogs
  const blogCount = await prisma.blog.count();
  console.log(`Current DB blogs count: ${blogCount}`);
  if (blogCount === 0) {
    console.log('Seeding initial blogs...');
    for (const b of INITIAL_BLOGS) {
      await prisma.blog.create({
        data: {
          id: b.id,
          title: b.title,
          slug: b.slug,
          category: b.category,
          image: b.image,
          authorName: b.authorName,
          authorTitle: b.authorTitle,
          authorPhoto: b.authorPhoto,
          readTime: b.readTime,
          summary: b.summary,
          content: b.content,
          featured: b.featured ?? false,
        },
      });
      console.log(`  ✓ Blog created: ${b.title}`);
    }
  }

  // 3. Site Settings
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
  if (!settings) {
    console.log('Seeding default site settings...');
    await prisma.siteSettings.create({
      data: {
        id: 'default',
        phone: INITIAL_SETTINGS.phone,
        email: INITIAL_SETTINGS.email,
        address: INITIAL_SETTINGS.address,
        workingHours: INITIAL_SETTINGS.workingHours,
        facebookUrl: INITIAL_SETTINGS.facebookUrl,
        twitterUrl: INITIAL_SETTINGS.twitterUrl,
        linkedinUrl: INITIAL_SETTINGS.linkedinUrl,
        youtubeUrl: INITIAL_SETTINGS.youtubeUrl,
        whatsappNo: INITIAL_SETTINGS.whatsappNo,
      },
    });
    console.log('  ✓ Site settings created.');
  }

  const finalEvents = await prisma.event.count();
  const finalBlogs = await prisma.blog.count();
  console.log(`Sync complete! DB now has ${finalEvents} events and ${finalBlogs} blogs.`);
}

main()
  .catch((e) => {
    console.error('Error during sync:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
