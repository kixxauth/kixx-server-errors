import WrappedError from './wrapped-error.js';


/**
 * Represents an error thrown when an assertion fails.
 * Typically used to indicate that an internal invariant or contract has been violated.
 * Extends WrappedError to provide additional context and stack trace handling.
 *
 * @class
 * @extends WrappedError
 */
export default class AssertionError extends WrappedError {
    /**
     * The error code string for this error type.
     * @type {string}
     * @static
     * @readonly
     */
    static CODE = 'ASSERTION_ERROR';
}
