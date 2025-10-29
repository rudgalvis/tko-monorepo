# Context Engineering Agent Guide

## Purpose

This guide helps you create effective system prompts and context documents for AI coding agents. Use these principles to engineer clear, comprehensive briefings that maximize agent performance on any project.

## What is a System Prompt?

A system prompt is a foundational document that:
- Defines the agent's role, scope, and identity
- Provides essential project context and background
- Establishes boundaries, constraints, and behavioral guidelines
- Sets communication style and output expectations

It's preloaded at the start of every conversation to ground the agent in your project context.

## Core Principles

### 1. Be Clear and Direct
Use unambiguous language. Avoid vague descriptions that lead to inconsistent behavior.

**Good**: "You are a TypeScript expert working on a SvelteKit monorepo using pnpm workspaces."  
**Bad**: "You know about web development and modern frameworks."

### 2. Define Role and Identity
Specify what the agent is, what expertise it has, and what it's responsible for.

**Good**: "You are a senior backend engineer specializing in GraphQL APIs and repository patterns."  
**Bad**: "You are a helpful assistant."

### 3. Provide Operational Context
Include information that affects how the agent should work:
- Project structure and architecture
- Technology stack and versions
- Development patterns and conventions
- Dependencies and relationships

### 4. Set Boundaries
Explicitly state what the agent should NOT do to prevent unintended actions.

**Examples**:
- "Never modify files outside the `src/` directory without explicit permission"
- "Do not introduce new dependencies without discussing tradeoffs first"
- "Preserve existing code style and formatting conventions"

### 5. Structure for Readability
Organize information with clear sections, headings, and bullet points. Make it scannable.

### 6. Test and Iterate
Refine your system prompt based on actual agent performance. Add clarifications where confusion occurs.

## Essential Sections for Coding Agents

### Project Overview
- Brief description of what the project does
- High-level architecture (monorepo, microservices, etc.)
- Repository structure

### Technology Stack
- Languages and versions
- Frameworks and libraries
- Build tools and package managers
- Testing frameworks

### Architecture & Patterns
- Directory structure conventions
- Code organization patterns
- Naming conventions
- Design patterns in use

### Key Constraints
- What files/directories are off-limits
- Breaking changes to avoid
- Required approval workflows
- Performance or compatibility requirements

### Development Practices
- Testing expectations
- Code review standards
- Documentation requirements
- Deployment considerations

### Reference Information (Optional)
- Links to key files or documentation
- Examples of well-implemented patterns
- Common gotchas or edge cases

## Template Structure

```markdown
# [Project Name] - AI Agent Context

## Project Overview
[Brief description of purpose and scope]

## Role & Responsibilities
You are a [expertise level] [specialization] working on [project type].

Your responsibilities:
- [Primary responsibility 1]
- [Primary responsibility 2]
- [Primary responsibility 3]

## Technology Stack
**Languages**: [List with versions]
**Frameworks**: [List with versions]
**Tools**: [Build tools, package managers, etc.]
**Testing**: [Testing frameworks and patterns]

## Project Structure
[Describe directory layout, key folders, and their purposes]

## Architecture & Patterns
### Code Organization
[How code is structured]

### Naming Conventions
[File, variable, function naming patterns]

### Design Patterns
[Key patterns used throughout the codebase]

## Development Guidelines
### Testing
[Testing requirements and patterns]

### Documentation
[When and how to document]

### Dependencies
[How to handle new dependencies]

## Constraints & Boundaries
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

## Communication Style
[Tone, detail level, preferred output format]

## Reference Examples
[Optional: Links to exemplary code or patterns]
```

## Example Application

Here's a condensed example for a hypothetical e-commerce monorepo:

```markdown
# ShopConnect Monorepo - AI Agent Context

## Project Overview
E-commerce platform connecting multiple Shopify stores with centralized inventory, pricing, and order management.

## Role & Responsibilities
You are a senior full-stack TypeScript developer specializing in SvelteKit and GraphQL.

Your responsibilities:
- Implement features across apps and shared packages
- Maintain type safety and test coverage
- Follow established patterns and conventions

## Technology Stack
**Languages**: TypeScript 5.x, Node.js 20.x
**Frameworks**: SvelteKit 2.x, Svelte 5
**Tools**: pnpm 10.x workspaces, Vitest, Tailwind CSS
**APIs**: Shopify Admin API, Storefront API

## Project Structure
- `apps/*` - Deployable applications
- `packages/*` - Shared libraries and components
- Build order: packages → apps

## Architecture & Patterns
### Code Organization
- SvelteKit apps: `src/routes/`, `src/lib/`, `src/hooks.server.ts`
- Repositories: Query file + method + tests
- Shared packages: Export via `src/index.ts`

### Naming Conventions
- Query files: `[actionName]Query.ts`
- Repositories: `[Entity]Repository.ts`
- Tests: `[filename].test.ts`

## Development Guidelines
### Testing
All new code requires Vitest unit tests. Follow existing patterns in `.test.ts` files.

### Dependencies
Check if functionality exists in shared packages before adding new dependencies.

## Constraints & Boundaries
- Never modify `package.json` without discussing impact on other packages
- Preserve existing API contracts in shared packages
- Maintain TypeScript strict mode compliance

## Communication Style
Provide concise explanations. Reference specific files and line numbers when discussing code.
```

## Best Practices

1. **Keep it current** - Update your context document as architecture evolves
2. **Be specific** - Generic advice doesn't help; project-specific details do
3. **Show examples** - Reference actual code patterns from your codebase
4. **Think long-term** - Write for agents who've never seen your code before
5. **Test effectiveness** - If agents consistently miss something, add it to context

---

**Remember**: A well-engineered system prompt is an investment that improves every interaction with AI agents on your project.

