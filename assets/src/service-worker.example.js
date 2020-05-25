/**
 * Angela Service Worker
 *
 * @version 1.0.0
 * @package Angela Client
 * @subpackage Service Worker
 * @author Agung Dirgantara <agungmasda29@gmail.com>
 */

'use strict';

let app = {
	name :'Angela',
	version : '1.0.0',
	api_url : 'REPLACE_API_URL'
}

/**
 * Install Service Worker
 * 
 * @param  {String} event
 */
self.addEventListener('install', event => {
	console.log('installing '+app.name+' Service Worker Version : '+app.version);
	self.skipWaiting();
});

/**
 * Listen Webpush Event
 * 
 * @param  {String} event event name (push tracker)
 */
self.addEventListener('push', event => {
	let data = JSON.parse(event.data.text());
	self.registration.showNotification(data.title, data);
});

/**
 * Push Notification - OnClick
 */
self.addEventListener('notificationclick', function(event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({
			type: 'window'
	}).then(function(clientList){
		for (var i=0;i<clientList.length;i++) {
			var client = clientList[i];
			if (client.url == '/' && 'focus' in client) {
				return client.focus();
			}
		}

		if (clients.openWindow) {
			if (typeof event.notification.data.url !== 'undefined') {
				// do something on notification clicked
				return clients.openWindow(event.notification.data.url);
			}
		}
	}));
});

/**
 * Push Notification - OnClose
 */
self.addEventListener('notificationclose', function(event) {
	// do something on notification closed
});