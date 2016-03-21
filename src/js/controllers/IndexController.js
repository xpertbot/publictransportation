export default function IndexController(container){
	this._container = container;
	this._openSocket();
	this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function(){
	if(!navigator.serviceWorker) return;
}

IndexController.prototype._openSocket = function(){
	var indexController = this;

	// var socketUrl = new URL('https://mnorth.prod.acquia-sites.com/wse/LIRR/gtfsrt/realtime/d6328abc7fde8bf2f3c576aa09db2ad1/json');
	// socketUrl.protocol = 'ws';

	// var ws = new WebSocket(socketUrl.href);

	// ws.addEventListener('message', function(){
	// 	indexController._onSocketMessage(event.data);
	// });
}

IndexController.prototype._onSocketMessage = function(data) {
  var messages = JSON.parse(data);
  this._postsView.addPosts(messages);
};
