const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultTags = [
    { tagName: 'react', desc: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.' },
    { tagName: 'javascript', desc: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.' },
    { tagName: 'node', desc: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine.' },
    { tagName: 'express', desc: 'Fast, unopinionated, minimalist web framework for Node.js.' },
    { tagName: 'python', desc: 'Python is a programming language that lets you work quickly and integrate systems more effectively.' },
    { tagName: 'database', desc: 'Questions related to databases, schema design, and querying data.' },
    { tagName: 'frontend', desc: 'Everything related to the client side of the application (HTML, CSS, UI/UX).' },
    { tagName: 'backend', desc: 'Everything related to server-side logic, API design, and authentication.' },
    { tagName: 'api', desc: 'Application Programming Interface - questions regarding REST or GraphQL endpoints.' },
    { tagName: 'deployment', desc: 'Hosting, CI/CD pipelines, Docker, Kubernetes, and Vercel related topics.' }
];

async function main() {
    console.log("Seeding Tags...");
    for (const tag of defaultTags) {
        await prisma.tag.upsert({
            where: { tagName: tag.tagName },
            update: {},
            create: tag,
        });
    }
    console.log("Successfully seeded default tags.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
