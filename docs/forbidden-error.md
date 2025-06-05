# ForbiddenError

A 403 Forbidden error class that indicates the server understood the request but refuses to authorize it.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'ForbiddenError' | The name of the error class |
| `code` | 'FORBIDDEN_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 403 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing why access is forbidden |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 403 | HTTP status code |

## Usage

```javascript
import { ForbiddenError } from './mod.js';

// Basic usage
throw new ForbiddenError('Access denied');

// With custom options
throw new ForbiddenError('Insufficient permissions', {
    expected: false,
    sourceFunction: 'checkPermissions',
    originalError: authError
});

// With source function
throw new ForbiddenError('Resource access restricted', {}, checkAccess);
```

## Best Practices

1. Use descriptive error messages that explain why access is forbidden
2. Include details about required permissions when possible
3. Set `expected` to `false` for unexpected permission issues
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on how to obtain necessary permissions 