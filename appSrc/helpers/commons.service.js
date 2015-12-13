angular.module('basketballStat.helpers')
	.service('Commons', Commons);

function Commons() {
	return {
		pluckDoc: pluckDoc,
		logToConsole: logToConsole,
        swapArrayItemsByIndex: swapArrayItemsByIndex
	};

	function pluckDoc(documents) {
		return Promise.resolve(_.pluck(documents, 'doc'));
	}


	function logToConsole(message) {
		return console.log(message);
	}

	function swapArrayItemsByIndex(fromIndex, toIndex, array) {
        if (fromIndex === toIndex) {
            return Promise.resolve(array);
        }

        var lowerIndex = fromIndex < toIndex ? fromIndex : toIndex;
        var higherIndex = lowerIndex === fromIndex ? toIndex : fromIndex;
        var firstPart = array.slice(0, lowerIndex);
        var middlePart = array.slice(lowerIndex, higherIndex);
        var endPart = array.slice(higherIndex);
        var lowerElement = middlePart.shift();
        var higherElement = endPart.shift();
        middlePart.unshift(higherElement);
        endPart.unshift(lowerElement);
        return Promise.resolve(firstPart.concat(middlePart, endPart));
    }
}