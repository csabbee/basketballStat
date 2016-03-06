import {Injectable} from 'angular2/core';
import {Serializable} from '../../models/serializable';
import {Toaster} from '../../helpers/toaster';
import {TableFactory} from './table-factory.service';
import {Output} from "angular2/core";
import EventEmitter = webdriver.EventEmitter;

@Injectable()
export class PouchDbService {
    @Output() emitEvent: EventEmitter<any> = new EventEmitter();

    constructor(private toaster: Toaster, private tableFactory: TableFactory) {}

    addEntry(table: string, entry: Serializable, toastMessage: string, ...eventsToEmit: Array<string>): Promise<any> {
        return this.tableFactory.getTable(table)
            .then((table: PouchDB) => {
                return table.post(entry, function() {});
            })
            .then(this.showToastMessage(toastMessage))
            .then(() => {
                eventsToEmit.forEach((event) => {
                    this.emitEvent.emit(event);
                });
            });
    }

    private showToastMessage(messageToShow): Function {
        return (value): Promise<any> => {
            return this.toaster.showToastMessage(messageToShow).then(() => {
                return Promise.resolve(value);
            }, (reason) => {
                return Promise.reject(reason);
            })
        }
    }

}