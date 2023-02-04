'use strict';

const { EOL } = require('os');

const BadRequestError = require('./lib/errors/bad-request-error');
const ConflictError = require('./lib/errors/conflict-error');
const ForbiddenError = require('./lib/errors/forbidden-error');
const JsonParsingError = require('./lib/errors/json-parsing-error');
const MethodNotAllowedError = require('./lib/errors/method-not-allowed-error');
const NotAcceptableError = require('./lib/errors/not-acceptable-error');
const NotFoundError = require('./lib/errors/not-found-error');
const NotImplementedError = require('./lib/errors/not-implemented-error');
const OperationalError = require('./lib/errors/operational-error');
const ProgrammerError = require('./lib/errors/programmer-error');
const UnauthorizedError = require('./lib/errors/unauthorized-error');
const UnprocessableError = require('./lib/errors/unprocessable-error');
const UnsupportedMediaTypeError = require('./lib/errors/unsupported-media-type-error');
const ValidationError = require('./lib/errors/validation-error');


function getFullStack(err) {
	if (!err) {
		return 'Null or undefined error';
	}

	const stack = [];

	function recursivelyConcat(cause) {
		if (cause && cause.stack) {
			stack.push(cause.stack);
		} else if (typeof cause === 'string') {
			stack.push(cause);
		} else {
			stack.push('No stack trace');
		}

		if (cause && cause.cause) {
			recursivelyConcat(cause.cause);
		}
	}

	recursivelyConcat(err);

	return stack.join(`${ EOL }caused by:${ EOL }`);
}

function getMergedInfo(err) {
	const objects = [];

	function recursivelyCollectInfo(cause) {
		if (cause && typeof cause.info === 'object' && !Array.isArray(cause.info)) {
			objects.push(cause.info);
		}

		if (cause && cause.cause) {
			recursivelyCollectInfo(cause.cause);
		}
	}

	recursivelyCollectInfo(err);

	return objects.reverse().reduce((info, obj) => {
		return Object.assign(info, obj);
	}, {});
}

exports.BadRequestError = BadRequestError;
exports.ConflictError = ConflictError;
exports.ForbiddenError = ForbiddenError;
exports.JsonParsingError = JsonParsingError;
exports.MethodNotAllowedError = MethodNotAllowedError;
exports.NotAcceptableError = NotAcceptableError;
exports.NotFoundError = NotFoundError;
exports.NotImplementedError = NotImplementedError;
exports.OperationalError = OperationalError;
exports.ProgrammerError = ProgrammerError;
exports.UnauthorizedError = UnauthorizedError;
exports.UnprocessableError = UnprocessableError;
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
exports.ValidationError = ValidationError;

exports.getFullStack = getFullStack;
exports.getMergedInfo = getMergedInfo;
