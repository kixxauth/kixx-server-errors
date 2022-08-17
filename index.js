'use strict';

const BadRequestError = require('./lib/bad-request-error');
const ConflictError = require('./lib/conflict-error');
const ForbiddenError = require('./lib/forbidden-error');
const MethodNotAllowedError = require('./lib/method-not-allowed-error');
const NotAcceptableError = require('./lib/not-acceptable-error');
const NotFoundError = require('./lib/not-found-error');
const NotImplementedError = require('./lib/not-implemented-error');
const StackedError = require('./lib/stacked-error');
const UnauthorizedError = require('./lib/unauthorized-error');
const UnprocessableError = require('./lib/unprocessable-error');
const UnsupportedMediaTypeError = require('./lib/unsupported-media-type-error');
const UserError = require('./lib/user-error');
const ValidationError = require('./lib/validation-error');

exports.BadRequestError = BadRequestError;
exports.ConflictError = ConflictError;
exports.ForbiddenError = ForbiddenError;
exports.MethodNotAllowedError = MethodNotAllowedError;
exports.NotAcceptableError = NotAcceptableError;
exports.NotFoundError = NotFoundError;
exports.NotImplementedError = NotImplementedError;
exports.StackedError = StackedError;
exports.UnauthorizedError = UnauthorizedError;
exports.UnprocessableError = UnprocessableError;
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
exports.UserError = UserError;
exports.ValidationError = ValidationError;


function getFullStack(err) {
	if (typeof err.getFullStack === 'function') {
		return err.getFullStack();
	}
	return err.stack || 'No stack trace.';
}
exports.getFullStack = getFullStack;

function includesErrorCode(err, code) {
	if (typeof err.includesErrorCode === 'function') {
		return err.includesErrorCode(code);
	}

	let errors = [err];
	if (Array.isArray(err)) {
		errors = err;
	}
	if (Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	for (let i = 0; i < errors.length; i++) {
		if (errors[i] && errors[i].code === code) {
			return code;
		}
	}
	return false;
}
exports.includesErrorCode = includesErrorCode;

function getOperationalError(err) {
	if (typeof err.getOperationalError === 'function') {
		return err.getOperationalError();
	}

	let errors = [err];
	if (Array.isArray(err)) {
		errors = err;
	}
	if (Array.isArray(err.errors)) {
		errors = errors.concat(err.errors);
	}

	for (let i = errors.length - 1; i >= 0; i--) {
		const e = errors[i];
		if (e && (typeof e.code === 'string' || typeof e.code === 'number')) {
			return e;
		}
	}
	return err;
}
exports.getOperationalError = getOperationalError;
