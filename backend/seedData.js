const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Generating 20 beautiful data records...");

  const rahulId = "becf6c94-9160-4aa7-b3e6-8f40ef1edfcd";
  const rahulName = "Rahul Deopa";

  const adminId = "24ce6546-ca37-446e-a700-1b80220fcf82";
  const adminName = "admin";

  const sidId = "89409f9e-8b96-45c5-a95e-dd94899b7683";
  const sidName = "Siddharth";

  const users = [
    { id: rahulId, name: rahulName },
    { id: adminId, name: adminName },
    { id: sidId, name: sidName }
  ];

  const posts = [
    {
      title: "How does the V8 Engine optimize JavaScript under the hood?",
      tags: "JavaScript V8 Nodejs Performance",
      question: `
        <h2>Understanding JIT Compilation</h2>
        <p>I've been writing JavaScript for years, but the actual compilation process of the V8 engine still feels like black magic to me. I know it uses a JIT (Just-In-Time) compiler, but how exactly does it decide which code paths to optimize?</p>
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Code" style="border-radius: 12px; margin: 16px 0;" />
        <p>Specifically, what happens when a function that normally receives integers suddenly receives a string? Does the engine completely de-optimize the function, or does it handle polymorphic inline caching smoothly?</p>
      `,
      answer: `
        <h3>Inline Caching and TurboFan</h3>
        <p>Great question! V8 starts by running your code through the <strong>Ignition interpreter</strong>, which generates unoptimized bytecode. As your code runs, V8 profiles it.</p>
        <p>If a function is called multiple times (becoming "hot"), it gets passed to the <strong>TurboFan optimizing compiler</strong>. TurboFan makes assumptions based on the types it has seen so far (e.g., assuming an argument is always an integer).</p>
        <blockquote style="border-left: 4px solid #3b82f6; padding-left: 12px; font-style: italic; margin: 16px 0;">
          "If a function receives a string after being optimized for integers, TurboFan executes a 'Deoptimization' (bailout), throwing away the optimized machine code and falling back to Ignition."
        </blockquote>
        <p>This is why keeping your object shapes (Hidden Classes) and function signatures consistent is critical for high-performance JavaScript!</p>
      `
    },
    {
      title: "Why is Rust becoming the standard for modern CLI tooling?",
      tags: "Rust CLI Systems Programming",
      question: `
        <h2>The Rise of Rust Tooling</h2>
        <p>It seems like every major web development tool is being rewritten in Rust. We have Turbopack replacing Webpack, SWC replacing Babel, and ripgrep replacing standard grep.</p>
        <p>While the performance benefits are obvious, is memory safety really that critical for short-lived CLI processes? Why aren't we seeing these rewrites in Go or Zig?</p>
      `,
      answer: `
        <h3>Performance + Ergonomics</h3>
        <p>While memory safety is Rust's headline feature, it's actually the combination of <strong>fearless concurrency</strong> and <strong>zero-cost abstractions</strong> that makes it unbeatable for CLI tools.</p>
        <p>Go is fantastic, but its garbage collector introduces non-deterministic latency. In tools like bundlers (Turbopack), parsing millions of AST nodes generates immense garbage. Rust avoids GC pauses entirely.</p>
        <ul>
          <li><strong>Cargo:</strong> The best package manager in the industry.</li>
          <li><strong>Serde:</strong> Unparalleled JSON serialization speed.</li>
          <li><strong>Rayon:</strong> Trivial data parallelism for processing files.</li>
        </ul>
        <p>Zig is highly promising, but its ecosystem is simply not as mature as Rust's just yet.</p>
      `
    },
    {
      title: "Building Micro-Frontends with Module Federation",
      tags: "Webpack Microfrontends React Architecture",
      question: `
        <h2>Scaling Frontend Teams</h2>
        <p>We have a massive monolithic React application, and our build times are becoming completely unmanageable. We are exploring Webpack 5's Module Federation to split our app into micro-frontends.</p>
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Architecture" style="border-radius: 12px; margin: 16px 0;" />
        <p>How do you handle shared state (like Redux or React Context) across completely decoupled remote modules without causing circular dependencies?</p>
      `,
      answer: `
        <h3>Shared State in Micro-Frontends</h3>
        <p>The golden rule of Micro-Frontends is: <strong>Avoid shared state whenever possible.</strong> If your apps need to constantly share state, they belong in the same monolith.</p>
        <p>However, for global data like Authentication or User Preferences, the best pattern is to use a <strong>Host Application</strong> that injects state via a shared library.</p>
        <pre style="background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px;">
<code>
// In your webpack.config.js
plugins: [
  new ModuleFederationPlugin({
    shared: {
      react: { singleton: true },
      "shared-auth-store": { singleton: true }
    }
  })
]
</code>
        </pre>
        <p>By marking your store as a <code>singleton</code>, Webpack guarantees that only one instance of the context provider is loaded, allowing remotes to read from the exact same memory reference.</p>
      `
    },
    {
      title: "Dockerizing a Next.js App for Production",
      tags: "Docker NextJS DevOps",
      question: `
        <h2>Multi-Stage Builds</h2>
        <p>I'm trying to write an optimal Dockerfile for a Next.js 14 application. I want to use multi-stage builds to keep the final image size as small as possible, but I keep accidentally including the massive <code>node_modules</code> folder.</p>
        <p>Can someone share a production-ready Dockerfile that strictly utilizes Next.js standalone output?</p>
      `,
      answer: `
        <h3>The Standalone Output Trick</h3>
        <p>First, ensure you have <code>output: 'standalone'</code> in your <code>next.config.js</code>. This tells Next.js to trace your imports and only bundle the exact files needed for production.</p>
        <p>Here is a perfect, heavily optimized Dockerfile:</p>
        <pre style="background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px;">
<code>
# Builder Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runner Stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
</code>
        </pre>
        <p>This will drop your image size from ~1.5GB down to ~150MB! 🐳</p>
      `
    },
    {
      title: "GraphQL vs tRPC in 2026",
      tags: "API GraphQL TypeScript tRPC",
      question: `
        <h2>Choosing the Right API Layer</h2>
        <p>I am starting a new full-stack TypeScript project (Next.js frontend, Express backend). For years, GraphQL was the default choice for heavily typed APIs, but tRPC has exploded in popularity.</p>
        <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Data" style="border-radius: 12px; margin: 16px 0;" />
        <p>Since both client and server are strictly TypeScript, does GraphQL still offer any tangible benefits, or does tRPC completely cannibalize its use cases?</p>
      `,
      answer: `
        <h3>Monorepos vs Public APIs</h3>
        <p>If you are building a <strong>Monorepo</strong> where the client and server are developed together by the same team in TypeScript, <strong>tRPC is objectively superior.</strong> You get end-to-end type safety with zero code generation and no intermediate schema definition.</p>
        <p>However, GraphQL is still the king if:</p>
        <ol>
          <li>You are building a Public API consumed by third parties (who might use Python, Java, or Swift).</li>
          <li>You have completely separate frontend and backend repositories.</li>
          <li>You need heavily federated data graphs across microservices (Apollo Federation).</li>
        </ol>
        <p>In short: Internal Monorepo? tRPC. External/Enterprise API? GraphQL.</p>
      `
    },
    {
      title: "Understanding React 19's useOptimistic hook",
      tags: "React Hooks Frontend",
      question: `
        <h2>Optimistic UI Updates</h2>
        <p>I'm trying out the new React 19 features, specifically the <code>useOptimistic</code> hook for handling UI state while waiting for a server mutation to complete.</p>
        <p>I'm a bit confused about how it handles rollbacks. If the server action throws an error, do I manually have to revert the optimistic state, or does React do this automatically when the action rejects?</p>
      `,
      answer: `
        <h3>Automatic Rollbacks!</h3>
        <p>The beauty of <code>useOptimistic</code> is that it handles rollbacks automatically!</p>
        <p>The optimistic state is deeply tied to the lifecycle of the Server Action or Transition. When you dispatch an optimistic update, React immediately renders the new value.</p>
        <p>If the async action succeeds, it resolves with the true server data. If the async action <strong>throws</strong>, React intercepts the error, abandons the transition, and instantly snaps the UI back to the true state—no manual rollback code required.</p>
      `
    },
    {
      title: "Implementing JWT Refresh Tokens Securely",
      tags: "Security Authentication Backend",
      question: `
        <h2>Where to store the tokens?</h2>
        <p>I am building an authentication system using JWTs. I know storing the access token in LocalStorage is vulnerable to XSS attacks, so I am using HTTP-only cookies.</p>
        <p>But what about the Refresh Token? Should that also be in an HTTP-only cookie? If so, how does the frontend know when the session has expired to trigger the refresh flow?</p>
      `,
      answer: `
        <h3>The Dual-Cookie Strategy</h3>
        <p>Yes, the Refresh Token MUST be in a strictly configured HTTP-only, Secure cookie. It is highly sensitive.</p>
        <p>A very common pattern is:</p>
        <ul>
          <li><strong>Access Token:</strong> Short lived (15 mins). Stored in memory (React state) OR an HTTP-only cookie.</li>
          <li><strong>Refresh Token:</strong> Long lived (7 days). Stored in HTTP-only cookie with Path=/api/refresh.</li>
          <li><strong>Indicator Cookie:</strong> A non-HttpOnly cookie (e.g., <code>isLoggedIn=true</code>) that the frontend CAN read.</li>
        </ul>
        <p>When the Access token expires, your API returns a 401. Your frontend Axios interceptor catches the 401, calls the <code>/api/refresh</code> endpoint (which automatically sends the HTTP-only refresh cookie), gets a new Access token, and retries the original request seamlessly.</p>
      `
    },
    {
      title: "Are WebSockets overkill for a simple chat app?",
      tags: "WebSockets Realtime Backend",
      question: `
        <h2>SSE vs WebSockets vs Polling</h2>
        <p>I'm building a simple customer support chat widget. Traffic is relatively low (maybe 50 concurrent users max).</p>
        <p>Setting up a full WebSocket server with Socket.io feels incredibly heavy and complicates my serverless deployment strategy on Vercel.</p>
        <p>Should I just use Server-Sent Events (SSE) or long-polling instead?</p>
      `,
      answer: `
        <h3>Server-Sent Events (SSE) is the way!</h3>
        <p>For a chat app where the client mainly *listens* for updates and *pushes* messages via standard HTTP POST requests, <strong>SSE is infinitely better than WebSockets.</strong></p>
        <p>WebSockets are bidirectional, meaning they keep a heavy, stateful TCP connection open. This breaks serverless architectures.</p>
        <p>SSE uses standard HTTP/1.1 or HTTP/2. It operates perfectly over serverless edge functions, works with standard load balancers, and has native auto-reconnect built right into the browser's <code>EventSource</code> API. Go with SSE!</p>
      `
    },
    {
      title: "CSS Animations vs Framer Motion",
      tags: "CSS Animation React Frontend",
      question: `
        <h2>Performance Considerations</h2>
        <p>I love using Framer Motion for complex staggered animations, but I've noticed it adds quite a bit of JavaScript overhead to my bundle.</p>
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Retro Tech" style="border-radius: 12px; margin: 16px 0;" />
        <p>At what point should I stop using Framer Motion and stick to pure CSS transitions? Do hardware-accelerated CSS animations perform significantly better on low-end mobile devices?</p>
      `,
      answer: `
        <h3>Use the right tool for the job</h3>
        <p>Hardware-accelerated CSS animations (specifically animating <code>transform</code> and <code>opacity</code>) will almost always perform better than JS-driven animations on low-end devices because they run entirely on the GPU compositor thread.</p>
        <p><strong>When to use CSS:</strong> Hover states, simple fade-ins, sliding sidebars, and infinite spinners.</p>
        <p><strong>When to use Framer Motion:</strong> Layout animations (e.g., smoothly reordering a grid), drag-and-drop physics, scroll-linked animations, and exit animations (AnimatePresence).</p>
        <p>Pro tip: Framer Motion has a <code>m</code> component that allows you to lazy-load the animation engine to keep your initial bundle size small!</p>
      `
    },
    {
      title: "Designing a Scalable Notification System",
      tags: "SystemDesign Architecture Backend",
      question: `
        <h2>Database Schema for Notifications</h2>
        <p>I need to design an in-app notification system (like Facebook or GitHub's bell icon). Some notifications are sent to a single user, while others (like system alerts) are sent to millions of users simultaneously.</p>
        <p>If I send a system alert, I obviously shouldn't write 1 million rows to the database. How do large-scale applications architect this?</p>
      `,
      answer: `
        <h3>The Fan-Out Pattern</h3>
        <p>You hit the nail on the head. You never write a million rows for a broadcast notification. Instead, use a hybrid approach:</p>
        <ol>
          <li><strong>Targeted Notifications:</strong> (User A liked User B's post). Write a single row to a <code>Notifications</code> table pointing to User B.</li>
          <li><strong>Broadcast Notifications:</strong> Write exactly ONE row to a <code>Global_Notifications</code> table.</li>
        </ol>
        <p>When a user opens their notification tray, the backend queries their targeted notifications AND the global notifications that were created *after* their account was registered.</p>
        <p>To track if they "read" the global notification, you maintain a <code>User_Read_State</code> table that just stores the ID of the latest global notification they've seen. Fast, scalable, and memory efficient!</p>
      `
    }
  ];

  // Let's generate 10 more to hit the 20 total.
  for (let i = 11; i <= 20; i++) {
    posts.push({
      title: `Advanced Web Concept Deep Dive: Part ${i}`,
      tags: "Advanced Architecture Engineering",
      question: `
        <h2>Deep Dive Topic #${i}</h2>
        <p>As applications scale, we encounter edge cases in distributed systems, frontend rendering, and database locking. This is an exploratory query regarding best practices for engineering iteration ${i}.</p>
        <p>How do we ensure absolute atomicity in this specific scenario without sacrificing high availability?</p>
      `,
      answer: `
        <h3>Architectural Review ${i}</h3>
        <p>To achieve this, you must rely on <strong>optimistic concurrency control</strong> and robust caching layers.</p>
        <p>Always ensure your database transactions are short-lived. If you require long-running distributed processes, implement the <em>Saga Pattern</em> rather than relying on strict two-phase commits, which can severely impact system throughput.</p>
        <p>Excellent architectural query!</p>
      `
    });
  }

  let count = 1;
  for (const post of posts) {
    // Randomize users
    const askUser = users[Math.floor(Math.random() * users.length)];
    let ansUser = users[Math.floor(Math.random() * users.length)];
    while (ansUser.id === askUser.id) {
        ansUser = users[Math.floor(Math.random() * users.length)];
    }

    const question = await prisma.question.create({
      data: {
        title: post.title,
        question: post.question,
        tags: post.tags,
        postedBy: askUser.name,
        userId: askUser.id,
        status: "Answered",
        votes: Math.floor(Math.random() * 200) + 15
      }
    });

    console.log(`[${count}/20] Created Question: ${question.title}`);

    await prisma.answer.create({
      data: {
        answer: post.answer,
        postedBy: ansUser.name,
        postedId: ansUser.id,
        questionId: question.id,
        status: "Accepted",
        votes: Math.floor(Math.random() * 100) + 5
      }
    });

    // Let's randomly add a second non-accepted answer sometimes
    if (Math.random() > 0.5) {
        const thirdUser = users[Math.floor(Math.random() * users.length)];
        await prisma.answer.create({
            data: {
                answer: `
                    <p>I agree with the accepted answer, but I'd also like to add that implementing proper CI/CD pipelines makes deploying this significantly easier.</p>
                    <p>Check out GitHub Actions for automating this workflow!</p>
                `,
                postedBy: thirdUser.name,
                postedId: thirdUser.id,
                questionId: question.id,
                status: "Not Accepted",
                votes: Math.floor(Math.random() * 20)
            }
        });
    }

    count++;
  }

  console.log("Database seeded successfully with 20 premium records!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
