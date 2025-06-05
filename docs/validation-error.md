# ValidationError

A specialized error class for data validation failures. It extends `WrappedError` and includes additional functionality for handling validation details.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'ValidationError' | The name of the error class |
| `code` | 'VALIDATION_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 400 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

### Additional Properties

| Property | Type | Description |
|----------|------|-------------|
| `details` | object | Object containing validation error details for each field |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the validation failure |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 400 | HTTP status code |
| `details` | object | {} | Validation error details |

## Usage

```javascript
import { ValidationError } from './mod.js';

// Basic usage with validation details
throw new ValidationError('Invalid user data', {
    details: {
        email: 'Invalid email format',
        age: 'Must be over 18',
        password: 'Password must be at least 8 characters'
    }
});

// With custom options and source function
throw new ValidationError('Form validation failed', {
    expected: false,
    sourceFunction: 'validateUserForm',
    details: {
        username: 'Username is required',
        password: 'Password is too short'
    }
}, validateForm);
```

## Best Practices

1. Always include validation details in the `details` object
2. Use descriptive error messages for each field
3. Group related validation errors together
4. Include the source function when possible
5. Set `expected` to `false` for unexpected validation errors
6. Use consistent error message formats across your application
7. Consider using a validation library (like Joi or Yup) and converting its errors to `ValidationError` 