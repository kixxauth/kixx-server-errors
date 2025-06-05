# Kixx Server Errors

A collection of standardized error classes for Node.js applications, providing consistent error handling and HTTP status code mapping.

## Overview

This library provides a set of error classes that extend the native `Error` class, with additional properties and standardized behavior for HTTP error responses. All error classes inherit from `WrappedError`, which provides common functionality for error handling.

## Error Classes

### HTTP Error Classes

| Error Class | HTTP Status | Description |
|-------------|-------------|-------------|
| `BadRequestError` | 400 | The server cannot process the request due to client error |
| `UnauthenticatedError` | 401 | Authentication is required to access the resource |
| `UnauthorizedError` | 401 | The client lacks valid authentication credentials |
| `ForbiddenError` | 403 | The server understood the request but refuses to authorize it |
| `NotFoundError` | 404 | The requested resource could not be found |
| `MethodNotAllowedError` | 405 | The HTTP method is not supported for the requested resource |
| `NotAcceptableError` | 406 | The server cannot produce a response matching the list of acceptable values |
| `ConflictError` | 409 | The request conflicts with the current state of the server |
| `UnsupportedMediaTypeError` | 415 | The server refuses to accept the request because the payload format is unsupported |
| `NotImplementedError` | 501 | The server does not support the functionality required to fulfill the request |

### Special Error Classes

| Error Class | Description |
|-------------|-------------|
| `AssertionError` | Used for assertion failures in tests |
| `OperationalError` | Base class for operational errors (expected errors) |
| `ValidationError` | Used for data validation failures |
| `WrappedError` | Base class for all error classes in this library |

## Usage

```javascript
import { BadRequestError, ValidationError } from './mod.js';

// Create a bad request error
throw new BadRequestError('Invalid input parameters');

// Create a validation error with details
throw new ValidationError('Invalid user data', {
    details: {
        email: 'Invalid email format',
        age: 'Must be over 18'
    }
});
```

## Common Properties

All error classes inherit the following properties from `WrappedError`:

- `name`: The name of the error class
- `code`: A unique error code string
- `message`: The error message
- `expected`: Boolean indicating if the error was expected (default: true)
- `httpError`: Boolean indicating if this is an HTTP error (default: true for HTTP errors)
- `httpStatusCode`: The HTTP status code (for HTTP errors)
- `sourceFunction`: The function where the error occurred
- `sourceFile`: The file where the error occurred
- `sourceLine`: The line number where the error occurred
- `sourceColumn`: The column number where the error occurred
- `sourceCode`: The code snippet where the error occurred
- `sourceStack`: The stack trace
- `originalError`: The original error that caused this error

## Installation

```bash
npm install kixx-server-errors
```

## License

MIT 