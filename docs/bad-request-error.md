# BadRequestError

A 400 Bad Request error class that indicates the server cannot process the request due to client error.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'BadRequestError' | The name of the error class |
| `code` | 'BAD_REQUEST_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 400 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the bad request |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 400 | HTTP status code |

## Usage

```javascript
import { BadRequestError } from './mod.js';

// Basic usage
throw new BadRequestError('Invalid input parameters');

// With custom options
throw new BadRequestError('Invalid JSON payload', {
    expected: false,
    sourceFunction: 'parseRequestBody',
    originalError: jsonError
});

// With source function
throw new BadRequestError('Missing required fields', {}, validateRequest);
```

## Best Practices

1. Use descriptive error messages that help the client understand what went wrong
2. Include validation details when appropriate
3. Set `expected` to `false` for unexpected client errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging 