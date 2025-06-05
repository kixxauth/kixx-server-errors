# AssertionError

A base error class for assertion failures that occur when a condition is not met.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'AssertionError' | The name of the error class |
| `code` | 'ASSERTION_ERROR' | The error code |
| `httpError` | false | Indicates this is not an HTTP error |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the assertion failure |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | false | Whether this is an HTTP error |

## Usage

```javascript
import { AssertionError } from './mod.js';

// Basic usage
throw new AssertionError('Condition not met');

// With custom options
throw new AssertionError('Value out of range', {
    expected: false,
    sourceFunction: 'validateRange',
    originalError: rangeError
});

// With source function
throw new AssertionError('Invalid state', {}, checkState);
```

## Best Practices

1. Use descriptive error messages that explain what condition failed
2. Include the expected and actual values in the error message when relevant
3. Set `expected` to `false` for unexpected assertion failures
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on how to fix the assertion failure 