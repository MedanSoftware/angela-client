import App_ from '../helpers/App';
import io from 'socket.io-client';

export default class Socketio {
	constructor(host, port, path){
		this.host = host;
		this.port = port;
		this.path = path;
		return this;
	}

	/**
	 * Set host
	 * 
	 * @param {String} host
	 */
	setHost(host) {
		this.host = host;
		return this;
	}

	/**
	 * Set port
	 * 
	 * @param {String} port
	 */
	setPort(port) {
		this.port = port;
		return this;
	}

	/**
	 * Set path
	 * 
	 * @param {String} path
	 */
	setPath(path) {
		this.path = path;
		return this;
	}

	connect(callback) {
		App_.callback(callback, io(this.host+':'+this.port, {
			path: this.path,
			transports : ['websocket']
		}));
	}
}