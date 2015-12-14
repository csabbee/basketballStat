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

        if (fromIndex > toIndex) {
            let elementToMove = copiedArray.splice(fromIndex, 1)[0];
            let firstPart = copiedArray.slice(0, toIndex);
            let lastPart = copiedArray.slice(toIndex);
            firstPart.push(elementToMove);
            copiedArray = firstPart.concat(lastPart);
        } else {
            let firstPart = copiedArray.slice(0, fromIndex);
            let lastPart = copiedArray.slice(fromIndex);
            let elementToMove = lastPart.shift();
            let lastPartsFirstPart = lastPart.slice(0, toIndex - fromIndex);
            let lastPartsLastPart = lastPart.slice(toIndex - fromIndex);
            lastPartsFirstPart.push(elementToMove);
            copiedArray = firstPart.concat(lastPartsFirstPart, lastPartsLastPart);
        }

        return $q(function(resolve, reject) {
            resolve(copiedArray);
        });
    }
}