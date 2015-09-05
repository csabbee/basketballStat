angular.module('basketballStat.storage')
    .service('KeyGenerator', function() {
        var generators = [];

        return {
            setSeed: setSeed,
            nextKey: nextKey
        };

        /**
         * Set the generator seed
         * @param {Object} obj
         * @param {string} obj.store
         * @param {number[]} obj.usedIds
         */
        function setSeed(obj) {
            var generatorObj = _.clone(obj);

            if (generators.indexOf(generatorObj) !== -1) {
                var generatorIndex = generators.indexOf(generatorObj);
                generatorObj[generatorIndex] = generatorObj;
            } else {
                generators.push(generatorObj);
            }
        }

        /**
         * Returns the next available key to the given object store
         * @param {string} store
         * @returns {number}
         */
        function nextKey(store) {
            var generatorObj = _.find(generators, generator => generator.store === store),
                maxId = _.max(generatorObj.usedIds.map(id => parseFloat(id))),
                nextKey = _.first(_.difference(_.range(maxId), generatorObj.usedIds));
            nextKey = !_.isUndefined(nextKey) && _.isFinite(nextKey) ? nextKey : !_.isUndefined(maxId) && _.isFinite(maxId) ? ++maxId+'' : '0';
            generatorObj.usedIds.push(parseFloat(nextKey));

            return nextKey;
        }
    });