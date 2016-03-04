angular.module('basketballStat.helpers')
	.service('Commons', Commons);

function Commons($q) {
	return {
		pluckDoc: pluckDoc,
		logToConsole: logToConsole,
        shiftArrayItemsByIndex: shiftArrayItemsByIndex
	};

	function pluckDoc(documents) {
		return Promise.resolve(_.pluck(documents, 'doc'));
	}


	function logToConsole(message) {
		return console.log(message);
	}

	function shiftArrayItemsByIndex(fromIndex, toIndex, array) {
        if (fromIndex === toIndex) {
            return $q(function(resolve, reject) {
                resolve(array);
            });
        }
        var copiedArray = array.slice();
        copiedArray.splice(toIndex, 0, copiedArray.splice(fromIndex, 1)[0]);
        return $q(function(resolve, reject) {
            resolve(copiedArray);
        });
    }
}