# OperationalError

A base error class for operational errors that can be handled by the application.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'OperationalError' | The name of the error class |
| `code` | 'OPERATIONAL_ERROR' | The error code |
| `httpError` | false | Indicates this is not an HTTP error |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the operational error |
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
import { OperationalError } from './mod.js';

// Basic usage
throw new OperationalError('Operation failed');

// With custom options
throw new OperationalError('Database operation failed', {
    expected: false,
    sourceFunction: 'saveData',
    originalError: dbError
});

// With source function
throw new OperationalError('Processing failed', {}, processData);
```

## Best Practices

1. Use descriptive error messages that explain what operation failed
2. Include relevant operation details in the error message
3. Set `expected` to `false` for unexpected operational errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing recovery steps or alternative operations 