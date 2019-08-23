'use strict';

const invert = require('lodash.invert');

const StatusMapperError = require('./status-mapper-error');

class StatusMapper {

	static get defaultStatuses() {
		return {
			inactive: 0,
			active: 1
		};
	}

	static get defaultStatusColors() {
		return {
			inactive: 'red',
			active: 'green'
		};
	}

	constructor() {
		this.statuses = { ...this.constructor.defaultStatuses };
		this.statusColors = { ...this.constructor.defaultStatusColors };
	}

	/**
	 * Get status from name or id
	 *
	 * @param {int|string} status The status
	 * @return {string|int} string when param is id or int when param is string
	 */
	map(status) {
		return this._map(status, this.statuses);
	}

	/**
	 * Get color assigned to status
	 *
	 * @param {int|string} status The status
	 * @return {string} Color assigned to status
	 */
	mapToColor(status) {
		const statusName = Number.isInteger(status) ? this.map(status) : status;
		return this._map(statusName, this.statusColors);
	}

	_map(status, mapping) {
		if(Number.isInteger(status))
			mapping = invert(mapping);

		return this._checkError(mapping[status]);
	}

	_checkError(res) {
		if(typeof res !== 'undefined')
			return res;

		throw new StatusMapperError('Status not exist', StatusMapperError.codes.NOT_EXIST);
	}

	/**
	 * Se a status
	 *
	 * @param {string} statusName The status name
	 * @param {int} statusId The status id
	 */
	set(statusName, statusId) {
		this._set(statusName, statusId, this.statuses);
	}

	/**
	 * Assign color to status.
	 *
	 * @param {string} statusName The status name
	 * @param {string} statusColor The status color
	 */
	setColor(statusName, statusColor) {
		if(typeof statusColor !== 'string')
			throw new StatusMapperError('Error on set status', StatusMapperError.codes.INVALID_DATA);

		this._set(statusName, statusColor, this.statusColors);
	}

	_set(statusName, value, mapping) {
		if(typeof statusName !== 'string')
			throw new StatusMapperError('Error on set status', StatusMapperError.codes.INVALID_DATA);

		mapping[statusName] = value;
	}

	/**
	 * Replace the statuses setted
	 *
	 * @param {object} statuses The statuses
	 */
	replace(statuses) {
		this.statuses = statuses;
	}

	/**
	 * Replace the colors setted
	 *
	 * @param {object} statusColors The status colors
	 */
	replaceColor(statusColors) {
		this.statusColors = statusColors;
	}
}

module.exports = StatusMapper;
