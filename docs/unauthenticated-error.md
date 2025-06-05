# UnauthenticatedError

A 401 Unauthorized error class that indicates the request lacks valid authentication credentials.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'UnauthenticatedError' | The name of the error class |
| `code` | 'UNAUTHENTICATED_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 401 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the authentication failure |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 401 | HTTP status code |

## Usage

```javascript
import { UnauthenticatedError } from './mod.js';

// Basic usage
throw new UnauthenticatedError('Authentication required');

// With custom options
throw new UnauthenticatedError('Invalid credentials', {
    expected: false,
    sourceFunction: 'validateToken',
    originalError: authError
});

// With source function
throw new UnauthenticatedError('Session expired', {}, checkSession);
```

## Best Practices

1. Use descriptive error messages that explain why authentication failed
2. Include specific authentication details in the error message when appropriate
3. Set `expected` to `false` for unexpected authentication errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on how to authenticate properly 