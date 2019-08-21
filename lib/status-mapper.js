'use strict';

const { invert } = require('lodash');

const StatusMapperError = require('./status-mapper-error');

class StatusMapper {

	static get statuses() {
		return {
			inactive: 0,
			active: 1,
			pending: 2,
			ready: 3
		};
	}

	static get statusColors() {
		return {
			inactive: 'red',
			active: 'green',
			pending: 'grey',
			ready: 'green'
		};
	}

	static map(status) {
		const res = !Number.isInteger(status) ? this._mapFromName(status) : this._mapFromId(status);
		return res || StatusMapperError.NOT_EXIST;
	}

	static _mapFromId(statusId) {
		const statuses = invert(this.statuses);
		return statuses[statusId];
	}

	static _mapFromName(statusName) {
		return this.statuses[statusName];
	}

	static mapToColor(status) {
		return !Number.isInteger(status) ? this._mapToColorFromName(status) : this._mapToColorFromId(status);
	}

	static _mapToColorFromId(statusId) {
		const statusName = this._mapFromId(statusId);
		return this._mapToColorFromName(statusName);
	}

	static _mapToColorFromName(statusName) {
		return this.statusColors[statusName];
	}
}

module.exports = StatusMapper;
