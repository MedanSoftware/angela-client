var Storage_ = require('./Storage');
var Howler = require('howler');

/**
 * Get application environment
 * 
 * @type {String}
 */
exports.environment = function() {
	return (typeof this.get_app_config().environment !== 'undefined')?this.get_app_config().environment:'development';
}

/**
 * Site path
 * 
 * @type {Object}
 */
exports.site_path = function(path = '') {
	return this.get_app_config().site_path+path;
}

/**
 * Callback function
 * 
 * @param  {Function} callback
 * @return {Function}
 */
exports.callback = function(callback) {
	if (callback !== undefined) {
		if (typeof callback == 'function') {
			callback(...Array.prototype.slice.call(arguments, 1));
		} else {
			eval(callback+'(...Array.prototype.slice.call(arguments, 1))');
		}
	}
}

/**
 * Get app config
 * 
 * @return {Object}
 */
exports.get_app_config = () => {
	return JSON.parse(require('../app.config').default);
}

/**
 * Ajax request
 * 
 * @param  {Object} 	ajax_param
 * @param  {Function} 	callbackOnSuccess
 * @param  {Function} 	callbackOnFail
 */
exports.ajax_request = function(ajax_param, callbackOnSuccess, callbackOnFail) {
	var _this = this;
	var identify = {
		user_token : Storage_.local_storage_get_data('user_token')
	}

	if (typeof ajax_param.headers == 'undefined') {
		ajax_param.headers = identify;
	} else {
		$.extend(ajax_param.headers, identify);
	}

	$.ajax(ajax_param).done(function(data) {
		_this.callback(callbackOnSuccess, ajax_param, data);
	}).fail(function(response) {

		if (_this.environment() !== 'production') {
			console.error({
				error : 'ajax request failed!',
				debug : {
					url : ajax_param.url,
					method : (typeof ajax_param.type == 'undefined')?'GET':ajax_param.type,
					response : response
				}
			});
		}

		_this.callback(callbackOnFail, ajax_param, response);
	})
}

/**
 * Save JSON from browser console
 * 
 * @param  {Object} data     JSON data
 * @param  {String} filename Save as File (default : console.json)
 */
exports.save_json_console = function (data, filename) {
	if (!data) {
		console.error('save_console : no data');
		return;
	}

	if (!filename) {
		filename = 'console.json';
	}

	if (typeof data === 'object') {
		data = JSON.stringify(data, undefined, 4);
	}

	var blob = new Blob([data], {type: 'text/json'}), e = document.createEvent('MouseEvents'), a = document.createElement('a');

	a.download = filename;
	a.href = window.URL.createObjectURL(blob);
	a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	a.dispatchEvent(e);
}

/**
 * Play audio
 * 
 * @param  {String}  	audio_file    Audio File URL
 * @param  {Boolean} 	vendor_folder Play Audio in Vendor
 */
exports.play_audio = function(audio_file, vendor_folder = false, callback) {
	var audio;
	if (audio_file !== undefined) {
		if (vendor_folder) {
			audio = new Audio(Nightigniter.Helpers.App.assets().url+'/media/backsounds/'+audio_file);
		} else {
			audio = new Audio(audio_file);
		}
	} else {
		audio = new Audio(Nightigniter.Helpers.App.assets().url+'/media/backsounds/notify.ogg');
	}

	audio.addEventListener('loadeddata', () => {
		audio.play();
	});

	audio.addEventListener('error', () => {
		audio = new Audio(Nightigniter.Helpers.App.assets().url+'/media/backsounds/notify.ogg');
		audio.addEventListener('loadeddata', () => {
			audio.play();
		});
	})
}