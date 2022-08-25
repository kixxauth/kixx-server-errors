Kixx Server Errors
==================
Common use case ECMAScript error classes for Node.js. Includes stackable errors and error handling utilties for better error handling in asychronous situations.

Inspired by [node-verror](https://github.com/TritonDataCenter/node-verror) and the corresponding [blog post](https://www.tritondatacenter.com/node-js/production/design/errors).

## Table of Contents

1. [Design Goals](#design-goals)
2. [Examples](#examples)
3. [API Reference : Error Classes](#error-classes)
4. [API Reference : Helpers](#helpers)
5. [Copyright and License](#copyright-and-license)

## Design Goals
There are 3 main design goals of kixx-server-errors:

1. __Make it easy to construct clear, complete error messages intended for people.__ Clear error messages greatly improve both user experience and debuggability.
2. __Make it easy to construct objects with programmatically-accessible metadata__ (which we call informational properties). Instead of just saying "connection refused while connecting to 192.168.1.2:80", you can add properties like "ip": "192.168.1.2" and "tcpPort": 80. This can be used for feeding into monitoring systems, analyzing large numbers of Errors (as from a log file), or localizing error messages.
3. __It also needs to be easy to compose Errors:__ higher-level code should be able to augment the Errors reported by lower-level code to provide a more complete description of what happened. Instead of saying "connection refused", you can say "operation X failed: connection refused".

## Examples

```js
const fs = require('fs');
const { OperationalError, getFullStack } = require('kixx-server-errors');

function readConfigFile(callback) {
	fs.readFile('/etc/my-server/config.inf', function (err, res) {
		if (err) {
			const wrappedError = new OperationalError('Failed reading config file', {
				err,
				location: 'configLoader:readFile',
				info: { path: '/etc/my-server/config.inf' }
			});
			callback(wrappedError);
		} else {
			callback(null, res);
		}
	});
}

// Assume this call fails with a Node.js ENOENT error:
readConfigFile(function (err, res) {
});
```

## Operational errors vs. programmer errors
It’s helpful to divide all errors into two broad categories:

__Operational errors__ represent run-time problems experienced by correctly-written programs. These are not bugs in the program. In fact, these are usually problems with something else: the system itself (e.g., out of memory or too many open files), the system’s configuration (e.g., no route to a remote host), the network (e.g., socket hang-up), or a remote service (e.g., a 500 error, failure to connect, or the like):

- failed to connect to server
- failed to resolve hostname
- invalid user input
- request timeout
- server returned a 500 response
- socket hang-up
- system is out of memory

__Programmer errors__ are bugs in the program. These are things that can always be avoided by changing the code. They can never be handled properly (since by definition the code in question is broken).

- tried to read property of “undefined”
- called an asynchronous function without a callback
- passed a “string” where an object was expected
- passed an object where an IP address string was expected

Operational errors are error conditions that all correct programs must deal with, and as long as they’re dealt with, they don’t necessarily indicate a bug or even a serious problem. “File not found” is an operational error, but it doesn’t necessarily mean anything’s wrong. It might just mean the program has to create the file it’s looking for first.

By contrast, programmer errors are bugs. They’re cases where you made a mistake, maybe by forgetting to validate user input, mistyping a variable name, or something like that. By definition there’s no way to handle those.

## Handling operational errors
Just like performance and security, error handling isn’t something that can be bolted onto a program that has no error handling already. Nor can you centralize all error handling in one part of the program, the same way you can’t centralize “performance” in one part of the program. Any code that does anything which might possibly fail (opening a file, connecting to a server, forking a child process, and so on) has to consider what happens when that operation fails. That includes knowing how it may fail (the failure mode) and what such a failure would indicate.

You may end up handling the same error at several levels of the stack. This happens when lower levels can’t do anything useful except propagate the error to their caller, which propagates the error to its caller, and so on. Often, only the top-level caller knows what the appropriate response is, whether that’s to retry the operation, report an error to the user, or something else. But that doesn’t mean you should try to report all errors to a single top-level callback, because that callback itself can’t know in what context the error occurred, what pieces of an operation have successfully completed, and which ones actually failed.

Let’s make this concrete. For any given error, there are a few things you might do:

- Deal with the failure directly.
- Propagate the failure to your client.
- Retry the operation.
- Blow up.
- Log the error — and do nothing else.

## (Not) handling programmer errors
There’s nothing you can do to handle a programmer error. By definition, the code that was supposed to do something was broken, so you can’t fix the problem with more code. If you could, you’d just use the error handling code in place of the broken code.

Some people advocate attempting to recover from programmer errors — that is, allow the current operation to fail, but keep handling requests. This is not recommended. Consider that a programmer error is a case that you didn’t think about when you wrote the original code. How can you be sure that the problem won’t affect other requests? If other requests share any common state (a server, a socket, a pool of database connections, etc.), it’s very possible that the other requests will do the wrong thing.

__The best way to recover from programmer errors is to crash immediately.__ You should run your programs using a restarter that will automatically restart the program in the event of a crash. With a restarter in place, crashing is the fastest way to restore reliable service in the face of a transient programmer error.

The only downside to crashing on programmer errors is that connected clients may be temporarily disrupted, but remember:

- By definition, these errors are always bugs. We’re not talking about legitimate system or network failures, but actual bugs in the program. They should be rare in production, and the top priority has to be to debug and fix them.
- For all the cases described above (and many more), the requests in flight are not necessarily going to complete successfully anyway. They may complete successfully, they may crash the server again, they may complete incorrectly in obvious ways, or they may complete wrongly in very subtle ways that are very hard to debug.
- In a reliable distributed system, clients must be able to deal with server failure by reconnecting and retrying requests. Network and system failure are a reality, whether or not the Node.js program itself is allowed to crash.
- If your production program is crashing so often that these disconnections are a problem, then the real problem is that the server is so buggy, not that it crashes in the case of a bug.

If disconnecting clients is a frequently problem because a server crashes so often, you should focus on the bugs that cause the service to crash — and make those exceptional — rather than trying to avoid crashing in cases where the code is obviously wrong. The best way to debug these problems is to configure Node to dump core on an uncaught exception. On both GNU/Linux and illumos-based systems, you can use these core files to see not only the stack trace where the program crashed, but the arguments to each of these functions and most other JavaScript objects as well, even those only referenced in closures. Even without core dumps configured, you can use the stack information and logs to make a start at the problem.

## Bad input: programmer error or operational error?
How do you know what’s a programmer error vs. an operational error? Quite simply: it’s up to you to define and document what types your function will allow and how you’ll try to interpret them. If you get something other than what you’ve documented to accept, that’s a programmer error. If the input is something you’ve documented to accept but you can’t process right now, that’s an operational error.

## API Reference

__Error Classes__

- [OperationalError](#operationalerror)
- [ProgrammerError](#programmererror)

__Helpers__

- [getFullStack()](#getfullstack)
- [getMergedInfo()](#getmergedinfo)
- [getHttpError()](#gethttperror)

### OperationalError
Use for wrapping low level operational errors like ENOENT and ECONNREFUSED.

OperationalError: Static properties:

static prop name | description | type
-----------------|-------------|-----
NAME | The default instance name | String
CODE | The default instance code | String
TITLE | The default instance title | String

OperationalError: Constructor arguments:

parameter name | description | type | is required | default
---------------|-------------|------|-------------|---------
message | The message string used in the base error | String | required | none
spec | The specification object to set specific parameters | Object | optional | `{}`
sourceFunction | The function to pass into Error.captureStackTrace(). | Function | optional | undefined

OperationalError: Optional specification properties:

prop name | description | type | default
----------|-------------|------|--------
spec.err | The cause error to wrap | Error or subclass of Error | `null`
spec.code | Assign the error code property instead of the default | String or Number | `OperationalError.CODE`
spec.title | Assign the error title property instead of the default | String | `OperationalError.TITLE`
spec.fatal | Assign the error fatal property instead of the default | Boolean | `false`
spec.location | Assign the error location property instead of the default | String | `undefined`
spec.info | Use as the error info object | Object | `{}`

OperationalError: Instance properties:

prop name | description | type
----------|-------------|-----
name | The error name. `OperationalError.NAME` | String
message | The composed message property from this error and all causal errors | String
code | Will be spec.code or `OperationalError.CODE` | String
title | Will be spec.title or `OperationalError.TITLE` | String
detail | The composed name:message from all causal errors | String
errors | An imutable list of causal errors | Array
fatal | Will be spec.fatal or `false` | Boolean
location | Will be spec.location or `undefined` | String or undefined
info | Will be spec.info or an empty object | Object

### getFullStack()

### getMergedInfo()

### getHttpError()

## Copyright and License
Copyright: (c) 2018 - 2022 by Kris Walker (www.kixx.name)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
