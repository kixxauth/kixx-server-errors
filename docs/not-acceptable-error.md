# NotAcceptableError

A 406 Not Acceptable error class that indicates the server cannot produce a response matching the list of acceptable values.

## Properties

Inherits all properties from `WrappedError` with the following defaults:

| Property | Value | Description |
|----------|-------|-------------|
| `name` | 'NotAcceptableError' | The name of the error class |
| `code` | 'NOT_ACCEPTABLE_ERROR' | The error code |
| `httpError` | true | Indicates this is an HTTP error |
| `httpStatusCode` | 406 | The HTTP status code |
| `expected` | true | Indicates this is an expected error |

## Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | The error message describing why the response is not acceptable |
| `options` | object | Optional configuration object |
| `sourceFunction` | function | Optional function where the error occurred |

### Options Object

Inherits all options from `WrappedError` with the following defaults:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expected` | boolean | true | Whether the error was expected |
| `httpError` | boolean | true | Whether this is an HTTP error |
| `httpStatusCode` | number | 406 | HTTP status code |
| `acceptedTypes` | string[] | [] | List of accepted content types |

## Usage

```javascript
import { NotAcceptableError } from './mod.js';

// Basic usage
throw new NotAcceptableError('Response format not acceptable');

// With custom options
throw new NotAcceptableError('Content type not supported', {
    expected: false,
    sourceFunction: 'handleRequest',
    acceptedTypes: ['application/json', 'application/xml']
});

// With source function
throw new NotAcceptableError('Language not supported', {
    acceptedTypes: ['en-US', 'en-GB', 'fr-FR']
}, validateAcceptLanguage);
```

## Best Practices

1. Use descriptive error messages that explain why the response is not acceptable
2. Always include the `acceptedTypes` array in the options
3. Set `expected` to `false` for unexpected content type issues
4. Include the original error when wrapping other errors
5. Use the source function parameter to help with debugging
6. Consider providing guidance on which types are accepted 