'use strict';

const { invert } = require('lodash');

const customStatus = {};

const StatusMapperError = require('./status-mapper-error');

class StatusMapper {

	static get statuses() {
		return Object.assign({
			inactive: 0,
			active: 1,
			pending: 2,
			ready: 3
		}, customStatus);
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
		return this._checkError(!Number.isInteger(status) ? this._mapFromName(status) : this._mapFromId(status));
	}

	static _mapFromId(statusId) {
		const statuses = invert(this.statuses);
		return statuses[statusId];
	}

	static _mapFromName(statusName) {
		return this.statuses[statusName];
	}

	static mapToColor(status) {
		return this._checkError(!Number.isInteger(status) ? this._mapToColorFromName(status) : this._mapToColorFromId(status));
	}

	static _mapToColorFromId(statusId) {
		const statusName = this._mapFromId(statusId);
		return this._mapToColorFromName(statusName);
	}

	static _mapToColorFromName(statusName) {
		return this.statusColors[statusName];
	}

	static add(statusName, value) {
		try {
			this.map(statusName);
		} catch(err) {
			customStatus[statusName] = value;
			return;
		}

		throw new StatusMapperError('Status already exist', StatusMapperError.codes.ALREADY_EXIST);
	}

	static replace(changes) {
		if(Object.keys(this.statuses).length !== Object.keys(Object.assign(this.statuses, changes)).length)
			throw new StatusMapperError('Status not exist to replace', StatusMapperError.codes.NOT_EXIST_TO_REPLACE);

		Object.assign(customStatus, changes);
	}

	static _checkError(res) {
		if(res)
			return res;

		throw new StatusMapperError('Status not exist', StatusMapperError.codes.NOT_EXIST);
	}
}

module.exports = StatusMapper;
