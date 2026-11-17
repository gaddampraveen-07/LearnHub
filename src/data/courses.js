export const categories = [
  "All Categories",
  "Web Development",
  "Programming",
  "Data Science",
  "UI/UX Design",
  "Cloud & DevOps",
  "Mobile Development"
];

export const sampleCourses = [
  {
    id: "course-react-fullstack",
    title: "Fullstack Modern React & Node.js Architecture",
    description: "Master React 18, Server Components, Custom Hooks, Zustand state management, and modern RESTful APIs with Node.js and Express.",
    instructor: {
      name: "Marcus Vance",
      role: "Principal Frontend Architect & Former Meta Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      bio: "Marcus has spent over 12 years building web platforms scaled to millions of daily active users. He is an open-source contributor and technical keynote speaker."
    },
    category: "Web Development",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
    duration: "10 hrs 30 mins",
    rating: 4.9,
    reviewsCount: 3840,
    enrolledCount: 18450,
    learningObjectives: [
      "Architect clean React components with hooks, custom composables, and context",
      "Implement optimistic UI updates, error boundaries, and suspense boundaries",
      "Build robust Node.js and Express backend middleware with JWT authentication",
      "Deploy full-stack applications with high availability and modern CI/CD pipelines"
    ],
    sections: [
      {
        id: "sec-1",
        title: "Section 1: Modern React 18 Core & Concurrent Features",
        lessons: [
          {
            id: "les-react-101",
            title: "React 18 Architecture: Automatic Batching & Transitions",
            duration: "14:20",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
            quizId: null,
            content: `### Welcome to Modern React 18 Architecture

React 18 brought a generational shift to how web applications render and update UI state. Rather than treating all updates equally, React now distinguishes between urgent and non-urgent transitions.

#### 1. Automatic Batching
In React 17 and earlier, React only batched updates inside React event handlers. Updates inside promises, \`setTimeout\`, or native event listeners triggered individual, isolated re-renders.

\`\`\`javascript
// In React 18, both state updates trigger a SINGLE re-render!
fetch('/api/user').then(() => {
  setIsLoading(false);
  setUserData(data);
});
\`\`\`

#### 2. The \`useTransition\` Hook
When typing into a search input that filters a large list of 10,000 items, you want the input typing to remain instantaneous (urgent) while the filtered list update can happen in the background without freezing the browser (transition).

\`\`\`javascript
const [isPending, startTransition] = useTransition();

function handleSearch(query) {
  setInputValue(query); // Urgent: Keep typing responsive
  startTransition(() => {
    setFilteredResults(expensiveFilter(query)); // Non-urgent: Can be interrupted
  });
}
\`\`\`

> **Key takeaway:** Concurrent features in React allow UI updates to be interruptible, guaranteeing 60fps animations even under heavy data computation.`
          },
          {
            id: "les-react-102",
            title: "Custom Hook Composition & Performance Patterns",
            duration: "18:45",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/dpw9nfNz870",
            quizId: null,
            content: `### Building Bulletproof Custom Hooks

Custom hooks are the fundamental building blocks of idiomatic React code. They encapsulate stateful logic without cluttering your presentation layer.

#### Anatomy of an Optimized Hook
Consider a responsive window size listener. Notice how we use clean-up functions and memoized handlers to avoid memory leaks:

\`\`\`javascript
import { useState, useEffect } from 'react';

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
\`\`\`

#### Rule of Thumb for Performance:
- Do not wrap every callback in \`useCallback\` prematurely.
- Only memoize when passing callbacks to children wrapped in \`React.memo\` or passing them to custom effect dependency arrays.`
          },
          {
            id: "les-react-103",
            title: "Section Assessment: React 18 & Hooks Quiz",
            duration: "10:00",
            isPreview: false,
            videoUrl: null,
            quizId: "quiz-react-fundamentals",
            content: `### Test Your Mastery of React 18

Now that you've completed the fundamentals of React 18 concurrent rendering and hook composition, test your knowledge with this comprehensive quiz!

You must achieve **at least 75%** to pass this milestone. Take your time to review each scenario carefully.`
          }
        ]
      },
      {
        id: "sec-2",
        title: "Section 2: State Management & Fullstack Node.js API",
        lessons: [
          {
            id: "les-react-201",
            title: "Centralized State with Context and Reducer Patterns",
            duration: "16:10",
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/kK_Wqx3RnHk",
            quizId: null,
            content: `### Combining Context API with useReducer

For applications where external stores like Redux might be overkill, the native React \`useReducer\` paired with \`useContext\` provides clean state dispatching.

#### Structure:
1. Define actions with strict type identifiers.
2. Build pure reducer functions with zero side-effects.
3. Expose custom consumer hooks (e.g. \`useAppDispatch()\` and \`useAppState()\`).

\`\`\`javascript
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
}
\`\`\`
`
          },
          {
            id: "les-react-202",
            title: "Node.js REST Services & Secure Auth Middleware",
            duration: "21:30",
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
            quizId: null,
            content: `### Production-Ready REST APIs in Node.js

Building scalable backend services requires consistent error handling middleware, JWT authentication validation, and strict input sanitization.

#### Express Auth Guard:
\`\`\`javascript
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: "course-python-mastery",
    title: "Python 3.12 Deep Dive: Concurrency, OOP & Systems",
    description: "Write idiomatic, high-performance Python. Master memory layout, asynchronous programming with asyncio, metaprogramming, and typing.",
    instructor: {
      name: "Dr. Elena Rostova",
      role: "Lead Systems Engineer & Python Core Contributor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
      bio: "Elena holds a PhD in Computer Science and has spent a decade optimizing Python runtimes for high-frequency trading and distributed data pipelines."
    },
    category: "Programming",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    duration: "12 hrs 15 mins",
    rating: 4.95,
    reviewsCount: 2410,
    enrolledCount: 12900,
    learningObjectives: [
      "Understand the CPython interpreter internals, memory allocation, and the GIL",
      "Build concurrent, non-blocking I/O microservices with Asyncio and aiohttp",
      "Implement advanced OOP patterns with descriptors, metaclasses, and dataclasses",
      "Write statically typed Python with Mypy and generic protocols"
    ],
    sections: [
      {
        id: "sec-py-1",
        title: "Section 1: Data Structures, Memory & Internals",
        lessons: [
          {
            id: "les-py-101",
            title: "CPython Memory Architecture & Object Lifecycle",
            duration: "15:40",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
            quizId: null,
            content: `### How Python Manages Memory Under the Hood

Everything in Python is an object on the heap. Even simple integers are represented by \`PyObject\` structures containing a reference count and a type pointer.

#### Reference Counting & Cyclic GC
CPython uses reference counting as its primary memory management mechanism. When \`sys.getrefcount(obj)\` drops to 0, memory is immediately deallocated.

\`\`\`python
import sys

x = [1, 2, 3]
print(sys.getrefcount(x))  # Prints 2 (x and the function parameter)
y = x
print(sys.getrefcount(x))  # Increments to 3
del y
print(sys.getrefcount(x))  # Drops back to 2
\`\`\`

To handle cyclic references (e.g. object A referencing B, while B references A), CPython executes a generational garbage collector with 3 generations (Gen 0, Gen 1, Gen 2).`
          },
          {
            id: "les-py-102",
            title: "Deep Dive into Python Hash Tables & Dictionaries",
            duration: "19:15",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/k9TUPpGqYTo",
            quizId: null,
            content: `### The Evolution of the Python Dict

Since Python 3.6, dictionaries are ordered and significantly more memory compact. Instead of storing sparse arrays containing hash, key, and value in every row, Python separates indices from entries.

#### Compact Dict Representation:
- \`indices\`: A small dense array of 1-byte or 2-byte integers.
- \`entries\`: An array of tuples \`(hash, key, value)\` in insertion order.

This cut memory consumption by 25% while maintaining amortized O(1) lookups!`
          },
          {
            id: "les-py-103",
            title: "Knowledge Check: Python Data Structures & Complexity",
            duration: "08:00",
            isPreview: false,
            videoUrl: null,
            quizId: "quiz-python-ds",
            content: `### Test Your Python System Knowledge

Put your understanding of memory overhead, mutability, hash maps, and algorithmic complexity to the test in this quiz.`
          }
        ]
      }
    ]
  },

  {
    id: "course-uiux-pro",
    title: "Design Systems & High-Fidelity UI/UX with Figma",
    description: "Learn to design production-grade user experiences. Master Figma component variants, responsive autolayout, design tokens, and WCAG accessibility.",
    instructor: {
      name: "Sofia Chen",
      role: "Staff Product Designer & Design Systems Lead",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      bio: "Sofia has built design systems for Spotify and Airbnb. She is passionate about closing the gap between design tokens and real-world frontend code."
    },
    category: "UI/UX Design",
    level: "All Levels",
    thumbnail: "https://images.unsplash.com/photo-1581291518655-9523c932deda?auto=format&fit=crop&w=900&q=80",
    duration: "9 hrs 00 mins",
    rating: 4.88,
    reviewsCount: 1980,
    enrolledCount: 9400,
    learningObjectives: [
      "Master Figma Auto Layout 5.0, variables, modes, and nested component variants",
      "Establish semantic design token hierarchies (Colors, Spacing, Typography)",
      "Ensure compliance with WCAG 2.1 AA accessibility and contrast standards",
      "Hand off production-ready specs and design systems directly to engineering teams"
    ],
    sections: [
      {
        id: "sec-ux-1",
        title: "Section 1: Foundations of Design Systems",
        lessons: [
          {
            id: "les-ux-101",
            title: "Atomic Design & Token Architecture",
            duration: "13:30",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/Tkp3-vB4u04",
            quizId: null,
            content: `### Building Systematic UI

A design system is not just a UI kit; it is the shared single source of truth connecting designers and developers.

#### The Three Levels of Design Tokens:
1. **Global Tokens (Raw):** \`blue-500: #3b82f6\`, \`font-size-16: 1rem\`
2. **Alias / Semantic Tokens (Contextual):** \`action-primary: {blue-500}\`, \`text-body: {font-size-16}\`
3. **Component Tokens (Specific):** \`button-primary-bg: {action-primary}\`

By mapping components to semantic tokens rather than raw hex codes, dynamic dark mode and multi-brand theming can be configured in minutes!`
          },
          {
            id: "les-ux-102",
            title: "Micro-Interactions & Human-Centered Usability",
            duration: "16:00",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/dK91P_06O8o",
            quizId: null,
            content: `### Micro-Interactions that Delight

Great software feels alive. A micro-interaction has four distinct stages:
1. **Trigger:** User hovers, taps, or enters input.
2. **Rules:** What state changes are permitted?
3. **Feedback:** Visual cues, gentle haptics, spring animations.
4. **Loops & Modes:** Does the state persist?

> **Fitts's Law Reminder:** Always provide at least 44x44px touch targets on mobile viewports so interactive controls are effortless to hit.`
          },
          {
            id: "les-ux-103",
            title: "Design Systems & Accessibility Milestone Quiz",
            duration: "08:00",
            isPreview: false,
            videoUrl: null,
            quizId: "quiz-ux-design",
            content: `### Ready to Verify Your Design Systems Expertise?

Take this quiz covering WCAG contrast guidelines, Fitts's Law, easing curves, and design token hierarchies.`
          }
        ]
      }
    ]
  },

  {
    id: "course-data-science",
    title: "Applied Machine Learning & Data Engineering with PyTorch",
    description: "From data wrangling with Polars & Pandas to deep learning with PyTorch. Build real-world neural networks, embeddings, and inference pipelines.",
    instructor: {
      name: "Dr. Tariq Al-Mansoor",
      role: "Lead Machine Learning Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      bio: "Tariq leads artificial intelligence initiatives at a top European research lab, focusing on transformer architectures and high-throughput data processing."
    },
    category: "Data Science",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    duration: "14 hrs 45 mins",
    rating: 4.92,
    reviewsCount: 3120,
    enrolledCount: 15600,
    learningObjectives: [
      "Process gigabyte-scale datasets with modern vectorized tools (Polars, NumPy)",
      "Understand gradient descent, loss functions, backpropagation, and autograd",
      "Train convolutional networks and transformer models in PyTorch",
      "Export and deploy optimized models with ONNX Runtime and FastAPI"
    ],
    sections: [
      {
        id: "sec-ds-1",
        title: "Section 1: Data Pipelines & Vectorized Computation",
        lessons: [
          {
            id: "les-ds-101",
            title: "Modern Dataframes: Polars vs Pandas 2.0",
            duration: "20:10",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/4PX0L5Y2foc",
            quizId: null,
            content: `### High-Performance Data Analysis

Polars is written in Rust and built from scratch using Apache Arrow. Unlike standard Python loops, Polars executes queries using parallel SIMD instructions.

\`\`\`python
import polars as pl

# Lazy query execution plan:
q = (
    pl.scan_csv("large_telemetry_dataset.csv")
    .filter(pl.col("latency_ms") > 120)
    .group_by("region")
    .agg(pl.col("requests").sum())
)

df = q.collect()
print(df)
\`\`\`
`
          },
          {
            id: "les-ds-102",
            title: "PyTorch Tensors & Automatic Differentiation",
            duration: "24:30",
            isPreview: false,
            videoUrl: "https://www.youtube.com/embed/V_xro1bcAuA",
            quizId: null,
            content: `### Neural Network Building Blocks with PyTorch

The cornerstone of PyTorch is the dynamic computation graph engine called \`autograd\`.

\`\`\`python
import torch

# Create a tensor and track computation history
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2 + 3 * x + 5
z = y.sum()

z.backward()
print(x.grad)  # Computes dy/dx = 2x + 3 -> [7.0, 9.0]
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: "course-nextjs-enterprise",
    title: "Enterprise Next.js 15: Server Actions & App Router",
    description: "Build blazing-fast React applications using Next.js 15 App Router, React Server Components (RSC), Turbopack, and incremental static regeneration.",
    instructor: {
      name: "Marcus Vance",
      role: "Principal Frontend Architect & Former Meta Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      bio: "Marcus has spent over 12 years building web platforms scaled to millions of daily active users."
    },
    category: "Web Development",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    duration: "8 hrs 20 mins",
    rating: 4.87,
    reviewsCount: 1650,
    enrolledCount: 7800,
    learningObjectives: [
      "Differentiate Server Components from Client Components and when to mix them",
      "Implement zero-bundle-size mutations using Next.js Server Actions",
      "Optimize core web vitals (LCP, INP, CLS) using next/font and next/image",
      "Deploy with edge caching and streaming SSR"
    ],
    sections: [
      {
        id: "sec-nxt-1",
        title: "Section 1: App Router & Server Component Paradigm",
        lessons: [
          {
            id: "les-nxt-101",
            title: "Mental Model: Server Components vs Client Components",
            duration: "17:15",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/wm5gMKuwSYk",
            quizId: null,
            content: `### Rethinking Component Architecture

In Next.js App Router, every component inside the \`app\` folder is a **Server Component** by default. They run only on the server, never download JS to the client, and can directly query databases.

Add \`"use client"\` only when:
- You need interactivity (\`useState\`, \`useEffect\`)
- You attach event listeners (\`onClick\`, \`onChange\`)
- You use browser APIs (\`localStorage\`, \`window\`)`
          }
        ]
      }
    ]
  },

  {
    id: "course-typescript-mastery",
    title: "Advanced TypeScript 5: Type-Level Programming & Generics",
    description: "Go beyond basic types. Master mapped types, conditional types, template literal types, distributive inference, and custom DSLs.",
    instructor: {
      name: "Julian H. Meyer",
      role: "Compiler Engineer & Open Source Author",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
      bio: "Julian is a core contributor to several widespread TypeScript libraries and author of popular programming books."
    },
    category: "Programming",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc3d3326176?auto=format&fit=crop&w=900&q=80",
    duration: "7 hrs 45 mins",
    rating: 4.94,
    reviewsCount: 2280,
    enrolledCount: 11200,
    learningObjectives: [
      "Master conditional types and the `infer` keyword for recursive type extraction",
      "Build complex type-safe validation engines using template literal strings",
      "Understand branded and nominal types to guarantee data integrity",
      "Optimize TypeScript compile times in massive monorepos"
    ],
    sections: [
      {
        id: "sec-ts-1",
        title: "Section 1: The Type-Level Turing Machine",
        lessons: [
          {
            id: "les-ts-101",
            title: "Conditional Types and the 'infer' Keyword",
            duration: "16:45",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/7V-x81BOC6o",
            quizId: null,
            content: `### Unlocking Type-Level Logic

Conditional types take the form:
\`\`\`typescript
T extends U ? TrueType : FalseType
\`\`\`

#### Using \`infer\` to unpack inner types:
\`\`\`typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string
type Fallback = UnwrapPromise<number>; // number
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: "course-cloud-devops",
    title: "Docker, Kubernetes & AWS Cloud Native Microservices",
    description: "Learn to containerize, orchestrate, and deploy enterprise applications with zero-downtime rolling updates, Terraform, and GitOps.",
    instructor: {
      name: "Devon Reed",
      role: "Principal Cloud Architect",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80",
      bio: "Devon has migrated Fortune 500 infrastructure to AWS and GCP. He holds all 5 AWS professional and specialty certifications."
    },
    category: "Cloud & DevOps",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80",
    duration: "11 hrs 10 mins",
    rating: 4.86,
    reviewsCount: 1470,
    enrolledCount: 8900,
    learningObjectives: [
      "Write multi-stage Dockerfiles with minimal attack surfaces and tiny image sizes",
      "Deploy scalable Pods, Deployments, Services, and Ingresses in Kubernetes (k8s)",
      "Automate infrastructure provisioning using HashiCorp Terraform",
      "Implement zero-downtime blue/green and canary deployment strategies"
    ],
    sections: [
      {
        id: "sec-k8s-1",
        title: "Section 1: Multi-Stage Containerization",
        lessons: [
          {
            id: "les-k8s-101",
            title: "Writing Lean, Production-Ready Dockerfiles",
            duration: "14:50",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE",
            quizId: null,
            content: `### Building Slim & Secure Containers

Never ship your dev dependencies or compiler toolchain inside production container images. Use multi-stage builds to isolate the build environment from the minimal runtime scratch image.

\`\`\`dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: "course-flutter-mobile",
    title: "Cross-Platform Mobile App Engineering with Flutter & Dart",
    description: "Build iOS and Android applications with one codebase. Master Dart 3 pattern matching, Riverpod state management, and native animations.",
    instructor: {
      name: "Amara Okonjo",
      role: "Lead Mobile Engineer",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=80",
      bio: "Amara has launched high-charting mobile apps in the App Store and Google Play with over 5M downloads."
    },
    category: "Mobile Development",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    duration: "13 hrs 30 mins",
    rating: 4.89,
    reviewsCount: 1820,
    enrolledCount: 10400,
    learningObjectives: [
      "Understand the Flutter widget rendering pipeline and Skia/Impeller engine",
      "Manage app-wide state predictably with Riverpod and code generation",
      "Connect to Firebase and custom GraphQL backends",
      "Publish apps to both the iOS App Store and Google Play Store"
    ],
    sections: [
      {
        id: "sec-flt-1",
        title: "Section 1: Flutter Framework Fundamentals",
        lessons: [
          {
            id: "les-flt-101",
            title: "The Everything-is-a-Widget Architecture",
            duration: "18:00",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI",
            quizId: null,
            content: `### Widgets, Elements, and RenderObjects

Flutter paints directly onto the canvas at 60 or 120 frames per second using its custom rendering engine (Impeller on iOS).

There are three parallel trees:
1. **Widget Tree:** Immutable configuration descriptors.
2. **Element Tree:** The structural glue holding persistent instances in the layout.
3. **RenderObject Tree:** The actual layout calculation and painting layer.`
          }
        ]
      }
    ]
  },

  {
    id: "course-cybersecurity",
    title: "Web Security, Cryptography & OWASP Top 10 Defense",
    description: "Defend modern web applications against SQL injections, XSS, CSRF, broken access control, and cryptographic vulnerabilities.",
    instructor: {
      name: "Rachel Stern",
      role: "Chief Information Security Officer & Ethical Hacker",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
      bio: "Rachel has audited banking systems and led red-team assessments for tech unicorns. She is a certified OSCP and CISSP."
    },
    category: "Web Development",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
    duration: "9 hrs 15 mins",
    rating: 4.93,
    reviewsCount: 1340,
    enrolledCount: 6700,
    learningObjectives: [
      "Detect and neutralize OWASP Top 10 web application vulnerabilities",
      "Configure Content Security Policies (CSP), HSTS, and SameSite cookies",
      "Implement secure password hashing with Argon2id and PBKDF2",
      "Perform automated static analysis (SAST) and dynamic penetration testing"
    ],
    sections: [
      {
        id: "sec-sec-1",
        title: "Section 1: Modern Web Threat Modeling",
        lessons: [
          {
            id: "les-sec-101",
            title: "Cross-Site Scripting (XSS) and Content Security Policies",
            duration: "16:20",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/EoaDgJOm68E",
            quizId: null,
            content: `### Preventing Client-Side Script Injection

Cross-Site Scripting happens when untrusted user input is rendered into the DOM without proper escaping, allowing attackers to hijack sessions.

#### Defensive Best Practices:
1. **Context-Aware Escaping:** Never insert raw user HTML directly.
2. **Strict Content Security Policy (CSP):**
\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';
\`\`\`
3. **HTTP-Only Cookies:** Ensure sensitive auth tokens cannot be read by JavaScript via \`document.cookie\`.`
          }
        ]
      }
    ]
  },

  {
    id: "course-sql-postgres",
    title: "Modern PostgreSQL: Query Optimization & Database Design",
    description: "Design relational schemas that scale. Master EXPLAIN ANALYZE, B-Tree and GIN indexes, window functions, and connection pooling.",
    instructor: {
      name: "Dr. Elena Rostova",
      role: "Lead Systems Engineer & Python Core Contributor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
      bio: "Elena holds a PhD in Computer Science and has spent a decade optimizing runtimes for distributed data systems."
    },
    category: "Data Science",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    duration: "8 hrs 40 mins",
    rating: 4.91,
    reviewsCount: 1530,
    enrolledCount: 7100,
    learningObjectives: [
      "Interpret complex EXPLAIN ANALYZE query plans and spot table scans",
      "Design optimal compound and partial indexes for high query concurrency",
      "Utilize advanced window functions (ROW_NUMBER, RANK, LAG, LEAD)",
      "Configure PgBouncer connection pooling for microservice workloads"
    ],
    sections: [
      {
        id: "sec-sql-1",
        title: "Section 1: Query Execution & Index Strategies",
        lessons: [
          {
            id: "les-sql-101",
            title: "Reading PostgreSQL EXPLAIN ANALYZE Plans",
            duration: "15:10",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/FSddr8tZ08Q",
            quizId: null,
            content: `### Decoding the Postgres Query Planner

When PostgreSQL executes a query, the cost planner calculates multiple possible execution paths.

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT customer_id, SUM(amount)
FROM orders
WHERE created_at >= '2024-01-01'
GROUP BY customer_id;
\`\`\`

#### Key metrics to watch:
- **Seq Scan vs Index Scan:** Sequential table scans on large tables cause massive disk I/O.
- **Shared Hit vs Read:** Shared hits are pages fetched from RAM cache, while reads come from physical storage.`
          }
        ]
      }
    ]
  },

  {
    id: "course-system-design",
    title: "Scalable Software System Design & Distributed Architecture",
    description: "Crack system design interviews and build real-world large-scale distributed systems. Cover caching, sharding, message queues, and consensus.",
    instructor: {
      name: "Julian H. Meyer",
      role: "Compiler Engineer & Open Source Author",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
      bio: "Julian is a core contributor to several widespread developer systems and distributed frameworks."
    },
    category: "Programming",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    duration: "15 hrs 00 mins",
    rating: 4.96,
    reviewsCount: 4120,
    enrolledCount: 22100,
    learningObjectives: [
      "Evaluate trade-offs using CAP Theorem, PACELC, and ACID vs BASE",
      "Design horizontally scalable architectures with Redis caching and Kafka",
      "Master consistent hashing and database sharding techniques",
      "Architect resilient failover mechanisms and circuit breakers"
    ],
    sections: [
      {
        id: "sec-sys-1",
        title: "Section 1: Core Distributed System Fundamentals",
        lessons: [
          {
            id: "les-sys-101",
            title: "Horizontal Scaling, Load Balancing & Consistent Hashing",
            duration: "19:30",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/quLRC34bS9U",
            quizId: null,
            content: `### Scaling Beyond a Single Machine

When one server reaches compute or memory limits, horizontal scaling adds additional nodes in parallel.

#### Consistent Hashing Ring:
Traditional hashing using \`hash(key) % N\` suffers when a node joins or leaves: nearly all keys must be remapped. Consistent hashing places both nodes and keys on a virtual ring (0 to $2^{32}-1$), ensuring only $K/N$ keys need migration during topology changes.`
          }
        ]
      }
    ]
  },

  {
    id: "course-design-tokens",
    title: "Modern Design Systems: Tokens, Tailwind & Micro-Frontends",
    description: "Bridge the gap between product design and engineering. Build a living component library with Storybook, Tailwind CSS, and Figma tokens.",
    instructor: {
      name: "Sofia Chen",
      role: "Staff Product Designer & Design Systems Lead",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      bio: "Sofia has built design systems for Spotify and Airbnb."
    },
    category: "UI/UX Design",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
    duration: "6 hrs 50 mins",
    rating: 4.84,
    reviewsCount: 1190,
    enrolledCount: 5200,
    learningObjectives: [
      "Translate Figma Tokens JSON into dynamic Tailwind themes",
      "Document accessible components using Storybook and chromatic visual testing",
      "Package component libraries with Rollup and publish to private npm",
      "Enforce consistent UI patterns across multiple federated micro-apps"
    ],
    sections: [
      {
        id: "sec-tok-1",
        title: "Section 1: Automated Token Pipelines",
        lessons: [
          {
            id: "les-tok-101",
            title: "Exporting Tokens from Figma to Tailwind CSS Config",
            duration: "14:10",
            isPreview: true,
            videoUrl: "https://www.youtube.com/embed/Tkp3-vB4u04",
            quizId: null,
            content: `### The Automated Token Pipeline

Manually copying hex codes and spacing values between Figma and code is prone to human error. Instead, we configure GitHub actions that pull token definitions via Figma's REST API and compile them to CSS variables and Tailwind theme extensions.`
          }
        ]
      }
    ]
  }
];

