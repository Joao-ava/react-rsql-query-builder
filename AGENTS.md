# AGENTS.md

This is a React library for building RSQL query filters. Use these commands:

## Development

- **Storybook**: `pnpm run storybook` (port 6006)
- **Build**: `pnpm run build` (runs `tsc && vite build`)
- **Format**: `pnpm run format` (Prettier, singleQuote: true, no semicolons)
- **Lint**: `pnpm run lint` (ESLint, zero warnings)

Pre-commit runs format + lint via Husky + lint-staged.

## Architecture

- **Entry**: `src/index.ts` exports `Filter` component + types/utils
- **Structure**: Composition pattern with `FilterRoot`, `FilterTriggerContent`, `FilterTrigger`, `AppliedFiltersList`
- **State**: Uses `ExpressionNode` from `@rsql/ast` package
- **i18n**: Supports `en-US`, `pt-BR`, `es-ES` locales; customize via `i18n` prop or `language` prop
- **Styling**: Import `react-rsql-query-builder/styles.css`

## Key constraints

- React 19, TypeScript 5.x strict mode
- Build output: `dist/index.es.js`, `dist/index.umd.js`, `dist/index.d.ts`
- Peer dependencies: `react`, `react-dom` (version 19)
- Component props can override internal inputs/buttons/selects
- Test stories in `filter.stories.tsx` verify add/edit/remove filter flows

## Important notes

- No dedicated test suite (Jest/Vitest) - rely on Storybook stories for verification
- Date format uses `YYYY-MM-DD` internally, displayed as `DD/MM/YYYY`
- Array type fields support multiselect with `options` array
- All commands use `pnpm` (per package.json `packageManager` field)
