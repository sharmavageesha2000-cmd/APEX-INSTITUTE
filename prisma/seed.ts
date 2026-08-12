import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  INITIAL_DOMAINS,
  INITIAL_COURSES,
  INITIAL_REVIEWS,
} from '../src/lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing
  await prisma.review.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.domain.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Domains
  console.log('Seeding domains...');
  for (const dom of INITIAL_DOMAINS) {
    await prisma.domain.create({
      data: {
        id: dom.id,
        name: dom.name,
        slug: dom.slug,
        headline: dom.headline,
        description: dom.description,
        iconName: dom.iconName,
        image: dom.image,
        subcategories: JSON.stringify(dom.subcategories),
        featured: dom.featured,
      },
    });
  }

  // Create Courses
  console.log('Seeding courses...');
  for (const crs of INITIAL_COURSES) {
    await prisma.course.create({
      data: {
        id: crs.id,
        title: crs.title,
        slug: crs.slug,
        headline: crs.headline,
        description: crs.description,
        domainId: crs.domainId,
        duration: crs.duration,
        fee: crs.fee,
        discountFee: crs.discountFee,
        level: crs.level,
        mode: crs.mode,
        badge: crs.badge,
        rating: crs.rating,
        totalStudents: crs.totalStudents,
        syllabus: JSON.stringify(crs.syllabus),
        careerRoles: JSON.stringify(crs.careerRoles),
        highlights: JSON.stringify(crs.highlights),
        placementAssistance: crs.placementAssistance,
        featured: crs.featured,
      },
    });
  }

  // Create Users (Admin & Student)
  console.log('Seeding users...');
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedStudentPassword = await bcrypt.hash('student123', 10);

  const admin = await prisma.user.create({
    data: {
      id: 'usr-admin-1',
      name: 'Apex Admin Director',
      email: 'admin@apexinstitute.com',
      password: hashedAdminPassword,
      phone: '+91 9876543210',
      role: 'ADMIN',
    },
  });

  const student = await prisma.user.create({
    data: {
      id: 'usr-student-1',
      name: 'Vikram Malhotra',
      email: 'student@example.com',
      password: hashedStudentPassword,
      phone: '+91 9123456789',
      role: 'STUDENT',
    },
  });

  // Create Initial Enrollment for student
  console.log('Seeding enrollment...');
  await prisma.enrollment.create({
    data: {
      id: 'enr-1',
      userId: student.id,
      courseId: INITIAL_COURSES[0].id,
      status: 'ACTIVE',
      progress: 65,
      batchTiming: 'Mon-Fri (7:30 PM - 9:30 PM)',
    },
  });

  // Create Reviews
  console.log('Seeding reviews...');
  for (const rev of INITIAL_REVIEWS) {
    await prisma.review.create({
      data: {
        id: rev.id,
        userName: rev.userName,
        userRole: rev.userRole,
        company: rev.company,
        courseId: rev.courseId,
        rating: rev.rating,
        comment: rev.comment,
        approved: true,
      },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
