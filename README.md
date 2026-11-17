# LearnHub — Modern Online Learning Platform

LearnHub is a full-featured, responsive EdTech web application built with React 18, Tailwind CSS, React Router v6, and the Context API with persistent localStorage synchronization.

---

## 🌟 Key Features

### 1. Home & Course Catalog (`/`)
- **Hero & Metrics**: Highlighting track records, active courses, and key platform statistics.
- **Search & Filters**: Real-time multi-field search across titles, topics, and instructors, coupled with category pill filters (Web Development, Programming, Data Science, UI/UX Design, Cloud & DevOps, Mobile Development).
- **Featured Bestsellers**: Highlight section showcasing top-rated courses.
- **Course Cards**: Displaying thumbnail, level badge, instructor info, duration, lesson count, rating, review counts, enrollment status, and one-click bookmarking.

### 2. Course Details (`/courses/:courseId`)
- **Course Overview**: In-depth description, learning objectives breakdown with checkmarks, total course duration, and lecture counts.
- **Instructor Profile**: Authentic avatar, role, and bio.
- **Interactive Syllabus**: Section-by-section collapsible accordion with lecture durations, free preview indicators, and quiz indicators.
- **Enrollment Flow**: One-click enrollment with duplicate prevention and seamless "Continue Learning" navigation.

### 3. My Learning Dashboard (`/my-learning`)
- **Student Progress**: Active progress bars and percentage calculation derived from underlying lesson completion data.
- **Smart Filtering**: Switch between All Courses, In Progress, and Completed.
- **Resume Learning**: Direct link to the last accessed lesson.
- **Reset Capability**: Option to reset course progress for practice.
- **Empty States**: Engaging zero-state with direct CTA to browse the catalog.

### 4. Distraction-Free Lesson Player (`/learn/:courseId/:lessonId`)
- **Collapsible Curriculum Sidebar**: Visual progress bar, section navigation, and completed checkmarks.
- **Video & Interactive Media Player**: Supports embedded educational videos and responsive interactive media stream controls.
- **Rich Lesson Notes**: Real technical deep-dives with syntax highlighting, architectural diagrams, callouts, and key takeaways.
- **Lesson Controls**: Previous / Next lesson navigation and "Mark as Complete" toggle.
- **Course Completion Celebration**: Triggers celebration modal and confetti when 100% completed.

### 5. Interactive Assessment Quizzes (`/courses/:courseId/quiz/:quizId`)
- **Multiple-Choice Questions**: 4 answer options (A, B, C, D) per question with question jumping navigation pills.
- **Strict Validation**: Requires all questions to be answered before submission.
- **Accurate Scoring & Feedback**: Calculates percentage, pass/fail thresholds, and presents detailed educational explanations for each question.
- **Retake Quizzes**: Allows students to retake quizzes anytime.
- **Progress Synchronization**: Automatically marks linked lessons as completed upon passing.

### 6. Bookmarks (`/bookmarks`)
- Persistent bookmarked tracks saved across browser sessions.
- Instant toggle and removal with live toast notifications.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation & Run

1. Clone or open the project directory:
   ```bash
   cd LearnHub
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── common/
│   │   ├── Badge.jsx            # Reusable status and level badges
│   │   ├── EmptyState.jsx       # Zero-state empty views with actions
│   │   ├── Footer.jsx           # Platform footer with links & guarantees
│   │   ├── Navbar.jsx           # Responsive glassmorphism navbar
│   │   ├── ProgressBar.jsx      # Animated percentage progress bar
│   │   └── Toast.jsx            # Dynamic notification feedback pills
│   ├── courses/
│   │   ├── CategoryFilter.jsx   # Horizontal category filter tabs
│   │   ├── CourseCard.jsx       # Interactive course card with actions
│   │   ├── CourseCurriculum.jsx # Syllabus with section accordions
│   │   ├── CourseGrid.jsx       # Responsive grid with empty state fallback
│   │   └── CourseSearch.jsx     # Search input with clear button
│   ├── learning/
│   │   ├── CourseCompletionModal.jsx # 100% completion celebration modal
│   │   ├── LessonContent.jsx    # Lesson reader with markdown & controls
│   │   ├── LessonSidebar.jsx    # Curriculum drawer and progress tracking
│   │   └── VideoPlayer.jsx      # Video stream & media player
│   └── quiz/
│       ├── QuizQuestion.jsx     # MCQ question card with options
│       └── QuizResults.jsx      # Detailed breakdown with explanations
├── context/
│   └── AppContext.jsx           # Centralized state with localStorage persistence
├── data/
│   ├── courses.js               # 12 detailed realistic sample courses
│   └── quizzes.js               # MCQ quizzes with detailed explanations
├── hooks/
│   └── useLocalStorage.js       # Safe localStorage wrapper hook
├── pages/
│   ├── BookmarksPage.jsx        # Bookmarked courses page
│   ├── CourseDetailsPage.jsx    # Course overview and syllabus
│   ├── HomePage.jsx             # Catalog, search, and featured tracks
│   ├── LessonPage.jsx           # Full lesson player view
│   ├── MyLearningPage.jsx       # Student enrolled dashboard
│   ├── NotFoundPage.jsx         # Custom 404 error page
│   └── QuizPage.jsx             # Assessment runner and results
├── utils/
│   ├── progress.js              # Calculation of completion and lesson navigation
│   └── quizHelpers.js           # Score evaluation and answer validation
├── App.jsx                      # App root with routes and layout
├── index.css                    # Tailwind CSS directives and custom styling
└── main.jsx                     # Vite DOM entry point
```

---

## 💾 LocalStorage Persistence Schema

| Key | Format | Description |
|---|---|---|
| `learnhub_enrolled_courses_v1` | `string[]` | IDs of enrolled courses |
| `learnhub_bookmarks_v1` | `string[]` | IDs of bookmarked courses |
| `learnhub_completed_lessons_v1` | `{ [courseId]: string[] }` | List of completed lesson IDs per course |
| `learnhub_last_accessed_v1` | `{ [courseId]: string }` | Most recently opened lesson per course |
| `learnhub_quiz_results_v1` | `{ [quizId]: object }` | Score, breakdown, and pass status |

