# QuerySolve Rules
Stack: React 18 (Vite), Tailwind, Express, Prisma (NeonDB), JWT.

## UI/Design (CRITICAL)
- NEVER use default Tailwind colors (`bg-white`, `text-black`).
- MUST use custom variables: `bg-background`, `bg-surface`, `bg-surfaceHover`, `bg-surfaceBorder`, `text-textMain`, `text-textMuted`, `text-primary`, `text-accent`.
- Use `.glass` or `.glass-card` for card containers.
- Layout: 3-column Reddit-style (`Sidebar` left, `max-w-3xl` center, `<aside>` right).

## Shared Components
NEVER use raw `<button>` or alert `<div>`. Use:
- `import Button from '../common/Button';` (variants: primary|secondary|outline|ghost)
- `import Alert from '../common/Alert';` (types: success|error|info)

## Auth & Content
- JWT: `localStorage.getItem('token')`. Pass as `auth-token` header.
- Unauthenticated users: Show `<AuthModal />` or route to `/login` on interaction.
- Rich Text: Render JoditEditor HTML with `html-react-parser` inside `.prose` container (styles in `index.css`).

## AI Behavior (STRICT TOKEN EFFICIENCY)
- Role: You are an expert, highly efficient senior developer. Keep outputs incredibly terse. Do not explain changes unless asked.
- Respond with extreme brevity.
- Output ONLY the necessary code edits. DO NOT rewrite entire files if unnecessary.
- Never use markdown blocks if a raw diff can be applied.
- NO conversational filler, NO pleasantries, NO apologies. Jump straight to code.
- DO NOT explain code unless explicitly asked.
- DO NOT generate tests, documentation, or comments unless requested.
- Skip step-by-step reasoning; jump straight to the solution.

## Code Style & Architecture
- Language: JavaScript, React 18, Node.js (Express), Prisma.
- `src/components`: React components (use functional components only).
- `backend/src`: Express API and Prisma database controllers.
- Do not use `npm run build` unless explicitly instructed to verify, as it generates excess terminal noise.
