import _ from 'lodash';
import j from 'jquery';
import app from './app';

function component() {
	  //var element = document.createElement('div');
	var element = j('<div></div>');
	  // Lodash, currently included via a script, is required for this line to work
	   element.html( _.join(['Hello', 'webpack'], ' '));
	
	     return element.get(0);
	     }
	
	     document.body.appendChild(component());
console.log(app);
console.log(app());
