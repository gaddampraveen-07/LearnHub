export const sampleQuizzes = {
  "quiz-react-fundamentals": {
    id: "quiz-react-fundamentals",
    title: "React 18 & Modern Hooks Architecture",
    courseId: "course-react-fullstack",
    description: "Validate your deep understanding of React component lifecycles, hooks behavior, state batching, and performance patterns.",
    passingScore: 75,
    estimatedTime: "8 mins",
    questions: [
      {
        id: "q1",
        question: "How does React 18 handle automatic state batching across multiple synchronous and asynchronous calls?",
        options: [
          "Only state updates inside React synthetic event handlers are batched; promises and timeouts are never batched.",
          "React 18 batches state updates automatically across timeouts, promises, native event handlers, and synthetic events.",
          "Batching requires wrapping multiple state updates inside `ReactDOM.flushSync()` explicitly.",
          "State updates are only batched if they occur within the same component render cycle."
        ],
        correctAnswer: 1,
        explanation: "In React 18, automatic batching is enabled out-of-the-box for all state updates, including inside Promises, setTimeout, and native event handlers, drastically reducing redundant re-renders."
      },
      {
        id: "q2",
        question: "When should you prefer the `useCallback` hook instead of declaring standard inline functions?",
        options: [
          "On every function declared inside any React component to guarantee fast performance.",
          "When passing callback functions to child components wrapped in `React.memo` or when the function is a dependency in `useEffect`.",
          "Only when the function accepts more than three parameters.",
          "Whenever you want to prevent garbage collection of function references."
        ],
        correctAnswer: 1,
        explanation: "`useCallback` caches a function definition between renders. It is most beneficial when passing callbacks to optimized child components that rely on reference equality (`React.memo`) or when the function is used in dependency arrays."
      },
      {
        id: "q3",
        question: "What is the primary architectural purpose of the `useId` hook introduced in React 18?",
        options: [
          "To generate globally unique cryptographic keys for database transactions.",
          "To provide predictable, SSR-safe unique identifiers for accessibility attributes (ARIA) across client and server.",
          "To replace the standard `key` prop in mapped array components.",
          "To track component instance render counts for React Profiler."
        ],
        correctAnswer: 1,
        explanation: "`useId` generates unique IDs that are guaranteed to match between server-side rendering and client hydration, specifically eliminating hydration mismatch errors in accessible form controls."
      },
      {
        id: "q4",
        question: "Which statement accurately describes the execution timing of `useLayoutEffect` compared to `useEffect`?",
        options: [
          "`useLayoutEffect` runs asynchronously after the browser paints the screen.",
          "`useLayoutEffect` fires synchronously after all DOM mutations but before the browser paints visual updates to the screen.",
          "`useLayoutEffect` only runs once on component unmount.",
          "`useLayoutEffect` runs on a background web worker thread."
        ],
        correctAnswer: 1,
        explanation: "`useLayoutEffect` runs synchronously immediately after DOM mutations, blocking the paint. It is specifically intended for measuring layout geometry or synchronously modifying the DOM before users see any visual flicker."
      }
    ]
  },

  "quiz-python-ds": {
    id: "quiz-python-ds",
    title: "Python Data Structures & Computational Complexity",
    courseId: "course-python-mastery",
    description: "Assess your mastery of Python internal memory models, dictionary hashing, and time complexity in production systems.",
    passingScore: 75,
    estimatedTime: "6 mins",
    questions: [
      {
        id: "q1",
        question: "What is the average amortized time complexity for retrieving a key-value pair from a Python dictionary (`dict`)?",
        options: [
          "O(n) where n is the number of keys.",
          "O(log n) using binary search trees.",
          "O(1) through open-addressing hash table lookup.",
          "O(k) where k is the length of the string key."
        ],
        correctAnswer: 2,
        explanation: "Python dictionaries are implemented as dynamic hash tables with compact memory arrays, offering average O(1) amortized lookup, insertion, and deletion."
      },
      {
        id: "q2",
        question: "Why should you avoid using a mutable object (like a list or dict) as a default parameter in Python functions?",
        options: [
          "Python will throw a SyntaxError at compile time.",
          "Default argument values are evaluated once at function definition time, causing state to persist and mutate across all calls.",
          "It forces the interpreter to use slower byte-code compilation.",
          "Mutable defaults bypass Python's Global Interpreter Lock (GIL)."
        ],
        correctAnswer: 1,
        explanation: "In Python, default arguments are evaluated only once when the function is defined. If a mutable object like `def fn(items=[])` is mutated, subsequent invocations share the modified object."
      },
      {
        id: "q3",
        question: "Which Python data structure from the standard library is best suited for implementing a FIFO (first-in, first-out) queue with O(1) appends and pops from both ends?",
        options: [
          "`list`",
          "`collections.deque`",
          "`heapq`",
          "`set`"
        ],
        correctAnswer: 1,
        explanation: "`collections.deque` is implemented as a doubly linked list of blocks, providing O(1) time complexity for `append` and `popleft`, whereas `list.pop(0)` takes O(n)."
      },
      {
        id: "q4",
        question: "What is the difference between `==` and `is` in Python object comparisons?",
        options: [
          "`==` tests identity (same memory address), while `is` tests value equality.",
          "`==` checks value equality (`__eq__`), while `is` checks reference/identity equality (`id(a) == id(b)`).",
          "There is no difference; `is` is syntactic sugar for `==`.",
          "`is` can only be used with numbers and booleans."
        ],
        correctAnswer: 1,
        explanation: "`==` evaluates whether two objects have matching values by invoking the `__eq__` method, whereas `is` checks if both references point to the exact same object in memory."
      }
    ]
  },

  "quiz-ux-design": {
    id: "quiz-ux-design",
    title: "Design Systems, Accessibility (a11y) & Visual Hierarchy",
    courseId: "course-uiux-pro",
    description: "Test your expertise in WCAG 2.1 contrast ratios, responsive token architectures, and cognitive ergonomics.",
    passingScore: 80,
    estimatedTime: "7 mins",
    questions: [
      {
        id: "q1",
        question: "Under WCAG 2.1 Level AA guidelines, what is the minimum required contrast ratio for normal body text against its background?",
        options: [
          "3.0 : 1",
          "4.5 : 1",
          "7.0 : 1",
          "10.0 : 1"
        ],
        correctAnswer: 1,
        explanation: "WCAG 2.1 AA mandates a minimum contrast ratio of 4.5:1 for normal text (under 18pt or 14pt bold) and 3:1 for large text to ensure readability for users with moderate visual impairments."
      },
      {
        id: "q2",
        question: "What is Fitts's Law and how does it directly inform UX button and navigation design?",
        options: [
          "The time to acquire a target is a function of the distance to and width of the target.",
          "Users spend most of their time on other websites, so your site should follow standard conventions.",
          "Visual elements placed closer together are perceived as belonging to the same group.",
          "Users retain 80% of what they see and 20% of what they read."
        ],
        correctAnswer: 0,
        explanation: "Fitts's Law states that target acquisition time depends on target distance and size. In UI design, clickable targets (like primary CTA buttons) should have adequate hit areas (minimum 44x44px or 48x48px) and be positioned within easy reach."
      },
      {
        id: "q3",
        question: "In atomic design methodology, which sequence correctly reflects the progression from smallest to largest component hierarchy?",
        options: [
          "Molecules → Atoms → Organisms → Templates → Pages",
          "Atoms → Molecules → Organisms → Templates → Pages",
          "Tokens → Components → Views → Flows → Systems",
          "Cells → Organs → Organisms → Systems → Universes"
        ],
        correctAnswer: 1,
        explanation: "Atomic Design (created by Brad Frost) progresses strictly through Atoms (basic HTML tags/inputs) → Molecules (simple groups like a search bar) → Organisms (distinct sections like headers) → Templates (page-level wireframes) → Pages (concrete instances with real content)."
      },
      {
        id: "q4",
        question: "When designing micro-interactions and transitions, why is an 'ease-out' or cubic-bezier decelerating curve generally preferred for entrance animations?",
        options: [
          "It forces the GPU to consume less battery.",
          "It mimics the physical reality of an object entering the user's field of view and settling down naturally without jarring movement.",
          "It makes linear animations look faster.",
          "It is the only easing supported by CSS3."
        ],
        correctAnswer: 1,
        explanation: "In real-world physics, objects entering a space decelerate to a stop. Ease-out creates an intuitive, smooth feeling where the UI responds immediately to input and lands gently."
      }
    ]
  }
};

