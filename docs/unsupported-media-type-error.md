# UnsupportedMediaTypeError

A 415 Unsupported Media Type error class that indicates the server refuses to accept the request because the payload format is in an unsupported format.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'UnsupportedMediaTypeError' | The name of the error class |
| `code` | 'UNSUPPORTED_MEDIA_TYPE_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 415 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing the media type issue |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 415 | HTTP status code |

## Usage

```javascript
import { UnsupportedMediaTypeError } from './mod.js';

// Basic usage
throw new UnsupportedMediaTypeError('Unsupported media type');

// With custom options
throw new UnsupportedMediaTypeError('Invalid content type', {
    expected: false,
    sourceFunction: 'validateContentType',
    originalError: contentTypeError
});

// With source function
throw new UnsupportedMediaTypeError('Format not supported', {}, processRequest);
```

## Best Practices

1. Use descriptive error messages that specify the unsupported media type
2. Include the expected media types in the error message
3. Set `expected` to `false` for unexpected media type errors
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on supported media types 