# WrappedError

The base class for all error classes in the library. It extends the native `Error` class and provides additional functionality for error handling and debugging.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | The name of the error class |
| `code` | string | A unique error code string |
| `message` | string | The error message |
| `expected` | boolean | Indicates if the error was expected (default: true) |
| `httpError` | boolean | Indicates if this is an HTTP error |
| `httpStatusCode` | number | The HTTP status code (for HTTP errors) |
| `sourceFunction` | string | The function where the error occurred |
| `sourceFile` | string | The file where the error occurred |
| `sourceLine` | number | The line number where the error occurred |
| `sourceColumn` | number | The column number where the error occurred |
| `sourceCode` | string | The code snippet where the error occurred |
| `sourceStack` | string | The stack trace |
| `originalError` | Error | The original error that caused this error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | string | Class name | Custom error name |
| `code` | string | Class code | Custom error code |
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | false | Whether this is an HTTP error |
| `httpStatusCode` | number | undefined | HTTP status code |
| `sourceFunction` | string | undefined | Function name |
| `sourceFile` | string | undefined | File path |
| `sourceLine` | number | undefined | Line number |
| `sourceColumn` | number | undefined | Column number |
| `sourceCode` | string | undefined | Code snippet |
| `sourceStack` | string | undefined | Stack trace |
| `originalError` | Error | undefined | Original error |

## Usage

```javascript
import { WrappedError } from './mod.js';

// Basic usage
const error = new WrappedError('Something went wrong');

// With options
const error = new WrappedError('Database error', {
    code: 'DB_ERROR',
    expected: false,
    sourceFunction: 'queryDatabase',
    originalError: dbError
});

// With source function
const error = new WrappedError('Validation failed', {}, validateData);
```

## Inheritance

All error classes in the library inherit from `WrappedError`. When creating custom error classes, extend `WrappedError` to maintain consistent error handling:

```javascript
class CustomError extends WrappedError {
    static CODE = 'CUSTOM_ERROR';
    
    constructor(message, options, sourceFunction) {
        const opts = Object.assign({ expected: true }, options);
        super(message, opts, sourceFunction);
    }
}
``` 