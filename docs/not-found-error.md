# NotFoundError

A 404 Not Found error class that indicates the requested resource could not be found.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'NotFoundError' | The name of the error class |
| `code` | 'NOT_FOUND_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 404 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing what was not found |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 404 | HTTP status code |

## Usage

```javascript
import { NotFoundError } from './mod.js';

// Basic usage
throw new NotFoundError('Resource not found');

// With custom options
throw new NotFoundError('User not found', {
    expected: false,
    sourceFunction: 'findUser',
    originalError: dbError
});

// With source function
throw new NotFoundError('File not found', {}, findFile);
```

## Best Practices

1. Use descriptive error messages that specify what resource was not found
2. Include resource identifiers in the error message when possible
3. Set `expected` to `false` for unexpected not found errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on how to locate the resource 