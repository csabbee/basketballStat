angular.module('basketballStat.helpers')
	.service('Commons', Commons);

function Commons($q) {
	return {
		pluckDoc: pluckDoc,
		logToConsole: logToConsole
	};

	function pluckDoc(documents) {
		return Promise.resolve(_.pluck(documents, 'doc'));
	}


	function logToConsole(message) {
		return console.log(message);
	}
}