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
            var generatorObj = findKeyGeneratorForStore(store),
                maxUsedId = _.max(generatorObj.usedIds.map(id => parseFloat(id))),
                lowestUnusedId = _.first(_.difference(_.range(maxUsedId), generatorObj.usedIds));

            var nextUnusedId = isValidId(lowestUnusedId) ? lowestUnusedId : isValidId(maxUsedId) ? ++maxUsedId+'' : '0';
            generatorObj.usedIds.push(parseFloat(nextUnusedId));

            return nextUnusedId;

            function findKeyGeneratorForStore(store) {
                return _.find(generators, isTheSameStore);

                function isTheSameStore(generator) {
                    return generator.store === store;
                }
            }

            function isValidId(id) {
                return !_.isUndefined(id) && _.isFinite(id);
            }
        }
    });