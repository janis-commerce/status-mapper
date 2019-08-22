'use strict';

const { invert } = require('lodash');

const customStatus = {};
const customColors = {};

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
		return Object.assign({
			inactive: 'red',
			active: 'green',
			pending: 'grey',
			ready: 'green'
		}, customColors);
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

	static add(name, value) {
		this._add(name, value, false);
	}

	static addColor(name, value) {
		this._add(name, value, true);
	}

	static _add(name, value, requireColor) {

		const functionName = requireColor ? 'mapToColor' : 'map';
		const customObject = requireColor ? customColors : customStatus;

		try {
			this[functionName](name);
		} catch(err) {
			customObject[name] = value;
			return;
		}

		throw new StatusMapperError('Status already exist', StatusMapperError.codes.ALREADY_EXIST);
	}

	static replace(changes) {
		this._replace(changes, false);
	}

	static replaceColor(changes) {
		this._replace(changes, true);
	}

	static _replace(changes, requireColor) {

		const statuses = requireColor ? this.statuses : this.statusColors;
		const customObject = requireColor ? customColors : customStatus;

		if(Object.keys(statuses).length !== Object.keys(Object.assign(statuses, changes)).length)
			throw new StatusMapperError('Status not exist to replace', StatusMapperError.codes.NOT_EXIST_TO_REPLACE);

		Object.assign(customObject, changes);
	}

	static _checkError(res) {
		if(res)
			return res;

		throw new StatusMapperError('Status not exist', StatusMapperError.codes.NOT_EXIST);
	}
}

module.exports = StatusMapper;
