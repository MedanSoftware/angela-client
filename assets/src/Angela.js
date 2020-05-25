/**
 * @version 1.0.0
 * @package Angela Client Side
 * @subpackage Libraries
 * @author Agung Dirgantara <agungmasda29@gmail.com>
 */

import Swal from 'sweetalert2';

import Peer from './libraries/Peer';

import DataTable from './libraries/DataTable';

import Encryption from './libraries/Encryption';

/**
 * Set global variable
 */
window.Swal = Swal;
window.PeerJs = require('peerjs-client');

var Load = {
	helper : function (name) {
		
		var load;

		if (Array.isArray(name)) {
			load = new Array;
			name.forEach(function(item, index) {
				name = (item !== undefined)?item.charAt(0).toUpperCase()+item.slice(1):item;
				try {
					load[name] = require(`helpers/${name}`);
				} catch (error) {
					try {
						load[item] = require(`helpers/${item}`);
					} catch (error) {

					}
				}
			})

			return load;
		} else {
			try {
				name = (name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name;
				load = require(`helpers/${(name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name}`);
			} catch (error) {
				try {
					load = require(`helpers/${name}`);
				} catch (error) {

				}
			}

			return load;
		}
	},

	library : function (name) {

		var load;

		if (Array.isArray(name)) {
			load = new Array;
			name.forEach(function(item, index) {
				try {
					name = (item !== undefined)?item.charAt(0).toUpperCase()+item.slice(1):item;
					load[name] = require(`libraries/${name}`);
				} catch (error) {
					try {
						load[item] = require(`libraries/${item}`);
					} catch (error) {

					}
				}
			})

			return load;
		} else {
			try {
				name = (name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name;
				load = require(`libraries/${(name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name}`);
			} catch (error) {
				try {
					load = require(`libraries/${name}`);
				} catch (error) {

				}
			}

			return load;
		}
	},

	api : function (name) {

		var load;

		if (Array.isArray(name)) {
			load = new Array;
			name.forEach(function(item, index) {
				try {
					name = (item !== undefined)?item.charAt(0).toUpperCase()+item.slice(1):item;
					load[name] = require(`restful/${name}`);
				} catch (error) {
					try {
						load[item] = require(`restful/${item}`);
					} catch (error) {

					}
				}
			})

			return load;
		} else {
			try {
				name = (name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name;
				load = require(`restful/${(name !== undefined)?name.charAt(0).toUpperCase()+name.slice(1):name}`);
			} catch (error) {
				try {
					load = require(`restful/${name}`);
				} catch (error) {

				}
			}

			return load;
		}
	}
}

var Helpers = Load.helper(['App', 'Cookie', 'URL']);

var Libraries = { DataTable, Encryption, Peer };

export default { Helpers, Libraries, Load }