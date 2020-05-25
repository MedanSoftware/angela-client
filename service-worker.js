/**
 * Angela Service Worker
 *
 * @version 1.0.0
 * @package Angela Client
 * @subpackage Service Worker
 * @author Agung Dirgantara <agungmasda29@gmail.com>
 * 
 * Refrence : 
 * - https://developer.mozilla.org/en-US/docs/Web/API/notification (Notification API)
 * - https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope (Service Worker Global Scope)
 * - https://developers.google.com/web/updates/2015/05/notifying-you-of-changes-to-notifications
 */

'use strict';

let app = {
	name :'Angela',
	version : '1.0.0',
	api_url : 'REPLACE_API_URL'
}

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});

	return response.json(); // parses JSON response into native JavaScript objects
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
self.addEventListener('push', function(event) {
	if (!(self.Notification && self.Notification.permission === 'granted')) {
		return;
	}

	var data = {};
	if (event.data) {
		try {
			data = JSON.parse(event.data.text());
		} catch (e) {
			data = event.data.text();
		}
	}
	
	var title = data.title || "Something Has Happened";
	var message = data.message || "Here's something you might want to check out.";
	var icon = "images/new-notification.png";

	var notificationPromise = self.registration.showNotification(data.notification.title, {
		body : 'Hello body',
		icon : 'https://www.pinclipart.com/picdir/big/452-4527480_shield-badge-free-png-image-bronze-package-clipart.png',
		badge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Brimob_badge.png/1200px-Brimob_badge.png',
		tag : 'tagged',
		data : {
			x : 'aw'
		},
		dir : 'ltr'
	});
	event.waitUntil(notificationPromise);
});

/**
 * Push Notification - OnClick
 */
self.addEventListener('notificationclick', function(event) {
	console.log('On notification click: ', event.notification.tag);
	event.notification.close();
	event.waitUntil(clients.matchAll({
		type: "window"
	}).then(function(clientList) {
		for (var i = 0; i < clientList.length; i++) {
			var client = clientList[i];
			console.log(client)
			postData('http://localhost:8081/webpush/subscribe', {client:JSON.stringify(client)}).then(data => {
				console.log(data);
			});

			if (client.url == '/' && 'focus' in client) {
				return client.focus();
			}
		}

		if (clients.openWindow) {
			return clients.openWindow('https://www.google.com');
		}
	}));
});

/**
 * Push Notification - OnClose
 */
self.addEventListener('notificationclose', function(event) {
	console.log('notification closed');
	// do something on notification closed
	var data = {};
	if (event.data) {
		try {
			data = JSON.parse(event.data.text());
		} catch (e) {
			data = event.data.text();
		}
	}
	
	console.log(data)
	console.log(event.notification.data)
});

/**
 * Push Notification - OnShow
 */
self.addEventListener('notificationshow', function(event) {
	console.log('notification show');
	console.log(event)
});

self.addEventListener('pushsubscriptionchange', function(event) {
	console.log('Subscribe Changed')
	console.log(event)
});