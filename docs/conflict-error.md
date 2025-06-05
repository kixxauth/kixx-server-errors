# ConflictError

A 409 Conflict error class that indicates the request conflicts with the current state of the server.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'ConflictError' | The name of the error class |
| `code` | 'CONFLICT_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 409 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the conflict |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 409 | HTTP status code |

## Usage

```javascript
import { ConflictError } from './mod.js';

// Basic usage
throw new ConflictError('Resource already exists');

// With custom options
throw new ConflictError('Email address already in use', {
    expected: false,
    sourceFunction: 'createUser',
    originalError: dbError
});

// With source function
throw new ConflictError('Version conflict detected', {}, checkVersion);
```

## Best Practices

1. Use descriptive error messages that explain the nature of the conflict
2. Include details about the conflicting resource when possible
3. Set `expected` to `false` for unexpected conflicts
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging 