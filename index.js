'use strict';

const { EOL } = require('os');

const BadRequestError = require('./lib/bad-request-error');
const ConflictError = require('./lib/conflict-error');
const ForbiddenError = require('./lib/forbidden-error');
const JsonParsingError = require('./lib/json-parsing-error');
const MethodNotAllowedError = require('./lib/method-not-allowed-error');
const NotAcceptableError = require('./lib/not-acceptable-error');
const NotFoundError = require('./lib/not-found-error');
const NotImplementedError = require('./lib/not-implemented-error');
const OperationalError = require('./lib/operational-error');
const StackedError = require('./lib/stacked-error');
const UnauthorizedError = require('./lib/unauthorized-error');
const UnprocessableError = require('./lib/unprocessable-error');
const UnsupportedMediaTypeError = require('./lib/unsupported-media-type-error');
const UserError = require('./lib/user-error');
const ValidationError = require('./lib/validation-error');


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

function includesErrorCode(err, code) {
	let errors = err ? [ err ] : [];

	if (err && Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	for (let i = 0; i < errors.length; i = i + 1) {
		if (errors[i] && errors[i].code === code) {
			return true;
		}
	}

	return false;
}

function getOperationalError(err) {
	let errors = err ? [ err ] : [];

	if (err && Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	// Search through the errors list from oldest to most recent.
	for (let i = errors.length - 1; i >= 0; i = i - 1) {
		const e = errors[i];
		if (e && (typeof e.code === 'string' || typeof e.code === 'number')) {
			return e;
		}
	}

	return err;
}

function getFirstStackedError(err) {
	let errors = err ? [ err ] : [];

	if (err && Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	// Search through the errors list from oldest to most recent.
	for (let i = errors.length - 1; i >= 0; i = i - 1) {
		const e = errors[i];
		if (e instanceof StackedError) {
			return e;
		}
	}

	return err;
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
exports.StackedError = StackedError;
exports.UnauthorizedError = UnauthorizedError;
exports.UnprocessableError = UnprocessableError;
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
exports.UserError = UserError;
exports.ValidationError = ValidationError;

exports.getFullStack = getFullStack;
exports.includesErrorCode = includesErrorCode;
exports.getOperationalError = getOperationalError;
exports.getFirstStackedError = getFirstStackedError;
exports.getHttpError = getHttpError;
