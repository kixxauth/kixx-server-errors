# NotImplementedError

A 501 Not Implemented error class that indicates the requested functionality is not implemented.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'NotImplementedError' | The name of the error class |
| `code` | 'NOT_IMPLEMENTED_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 501 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing what is not implemented |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 501 | HTTP status code |

## Usage

```javascript
import { NotImplementedError } from './mod.js';

// Basic usage
throw new NotImplementedError('Feature not implemented');

// With custom options
throw new NotImplementedError('Method not implemented', {
    expected: false,
    sourceFunction: 'processPayment',
    originalError: paymentError
});

// With source function
throw new NotImplementedError('Operation not implemented', {}, performOperation);
```

## Best Practices

1. Use descriptive error messages that specify what functionality is not implemented
2. Include the feature or method name in the error message
3. Set `expected` to `false` for unexpected implementation errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing information about when the feature might be implemented 