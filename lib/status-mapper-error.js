'use strict';

class StatusMapperError extends Error {

	static get codes() {

		return {
			NOT_EXIST: 1,
			ALREADY_EXIST: 2,
			NOT_EXIST_TO_REPLACE: 3
		};

	}

	constructor(err, code) {
		super(err);
		this.message = err.message || err;
		this.code = code;
		this.name = 'StatusMapperError';
	}
}

module.exports = StatusMapperError;
