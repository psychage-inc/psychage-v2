# Navigator Tests

This directory contains unit, integration, and accessibility tests for the Symptom Navigator flow.

## Test Structure

```
src/tests/
├── setup.ts                    # Test configuration and jest-axe setup
├── a11y/                       # Accessibility tests with axe-core
│   ├── navigator-screens.a11y.test.tsx
│   ├── confirm-dialog.a11y.test.tsx
│   └── crisis-banner.a11y.test.tsx
├── navigator/                  # Navigator engine tests
│   └── scoring.test.ts
└── ResultsScreen-confirm.test.tsx  # Integration tests
```

## Running Tests

```bash
# Run all tests once
npm run test

# Watch mode for development
npm run test:watch

# Visual UI for debugging
npm run test:ui

# E2E tests (separate from unit tests)
npm run test:e2e
```

## Accessibility Testing

We use `jest-axe` for automated accessibility testing. All interactive components should have corresponding a11y tests.

### Writing an Accessibility Test

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<YourComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Common Accessibility Checks

- **Color Contrast**: WCAG AA requires 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Management**: Focus must be visible and logical
- **ARIA Labels**: All interactive elements need accessible names
- **Semantic HTML**: Use proper HTML elements (button, not div with onClick)

## Test Coverage

### Current Coverage
- ✅ Navigator screens (Welcome, DurationSeverity, Results)
- ✅ ConfirmDialog component
- ✅ CrisisStickyBanner component
- ✅ Results screen confirmation flow
- ✅ Navigator engine scoring logic

### To Add
- [ ] SymptomSelectionScreen interactions
- [ ] DomainSelectionScreen interactions
- [ ] NavigatorContext state management
- [ ] Browser back button handling
- [ ] Skip/defaults functionality in DurationSeverity

## Mocking

### Framer Motion
Framer Motion is mocked in tests to avoid animation issues:

```typescript
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));
```

### Navigator Context
When testing components that use NavigatorContext, wrap in provider:

```typescript
render(
  <NavigatorProvider>
    <YourComponent />
  </NavigatorProvider>
);
```

## Best Practices

1. **Test User Behavior, Not Implementation**
   - ❌ `expect(setState).toHaveBeenCalled()`
   - ✅ `expect(screen.getByText('Updated')).toBeInTheDocument()`

2. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText` over `getByTestId`
   - This ensures accessibility

3. **Test Accessibility First**
   - Add axe tests for all new interactive components
   - Run `npm run test` before committing

4. **Keep Tests Isolated**
   - Each test should work independently
   - Use `cleanup()` from setup.ts

5. **Test Edge Cases**
   - Empty states
   - Error states
   - Loading states
   - Long text/overflow

## Debugging Failed Tests

### Visual Debugging
```bash
npm run test:ui
```
Opens Vitest UI in browser for interactive debugging.

### Console Debugging
```typescript
import { screen, debug } from '@testing-library/react';

// Print current DOM
debug();

// Print specific element
debug(screen.getByRole('button'));
```

### Accessibility Violations
If `toHaveNoViolations()` fails, the error message will show:
- What rule was violated
- Which element(s) violated it
- How to fix it

Example:
```
Expected no violations but got:
- color-contrast: Elements must have sufficient color contrast
  Fix: Change text-charcoal-400 to text-charcoal-200
```

## CI/CD Integration

Tests run automatically in CI. To simulate CI locally:

```bash
npm run test -- --run --reporter=verbose
```

## Useful Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev/)
- [jest-axe on GitHub](https://github.com/nickcolley/jest-axe)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe Rule Descriptions](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
