import {TableFactory} from 'app/datastorage/local/table-factory.service';

describe('TableFactory', () => {
    var underTest: TableFactory;

    beforeEach(() => {
        underTest = new TableFactory();
    });

    afterEach(() => {
        underTest = null;
    });

    it('should initialize a new table', () => {
        var testTable = 'newTable';
        underTest.getTable(testTable);

        expect(underTest.tables[testTable]).toBeDefined();
    });
});
