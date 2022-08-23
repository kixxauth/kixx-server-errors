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
	let errors = err ? [ err ] : [];

	if (err && Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	if (errors.length === 0) {
		return 'Null or undefined error';
	}

	return errors.map((e) => {
		return e.stack || 'No stack trace';
	}).join(`${ EOL }caused by:${ EOL }`);
}

function getHttpError(err) {
	err = err || {};
	let errors = [ err ];

	if (Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	// Search through the errors list from most recent to oldest.
	for (let i = 0; i < errors.length; i = i + 1) {
		const e = errors[i];
		if (e && e.statusCode) {
			return e;
		}
	}

	return null;
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
exports.getHttpError = getHttpError;
