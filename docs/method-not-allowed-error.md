# MethodNotAllowedError

A 405 Method Not Allowed error class that indicates the HTTP method is not supported for the requested resource.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'MethodNotAllowedError' | The name of the error class |
| `code` | 'METHOD_NOT_ALLOWED_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 405 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the method not allowed |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 405 | HTTP status code |
| `allowedMethods` | string[] | [] | List of allowed HTTP methods |

## Usage

```javascript
import { MethodNotAllowedError } from './mod.js';

// Basic usage
throw new MethodNotAllowedError('Method not allowed');

// With custom options
throw new MethodNotAllowedError('PUT method not supported', {
    expected: false,
    sourceFunction: 'handleRequest',
    allowedMethods: ['GET', 'POST']
});

// With source function
throw new MethodNotAllowedError('DELETE not allowed for this resource', {
    allowedMethods: ['GET', 'POST', 'PUT']
}, validateMethod);
```

## Best Practices

1. Use descriptive error messages that explain why the method is not allowed
2. Always include the `allowedMethods` array in the options
3. Set `expected` to `false` for unexpected method issues
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on which methods are allowed 