import IndexController from './controllers/IndexController';

var indexController = new IndexController(document.getElementById('schedule'));
document.onreadystatechange = function(){
	if(document.readyState == 'complete'){
		setTimeout(indexController._getFeed, 600);
	}
};
