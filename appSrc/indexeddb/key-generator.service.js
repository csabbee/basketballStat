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
            var generatorObj = _.extend(obj, {maxId: _.max(obj.usedIds)});

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
                nextKey = _.first(_.difference(_.range(generatorObj.maxId), generatorObj.usedIds));
            nextKey = !_.isUndefined(nextKey) ? nextKey : ++generatorObj.maxId;
            generatorObj.usedIds.push(nextKey);

            return nextKey;
        }
    });