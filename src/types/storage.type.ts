import { RecordType } from './member.type';

export interface StorageService {
  getRecords: () => RecordType[];
  addRecord: (record: RecordType) => RecordType[];
  updateRecord: (record: RecordType) => RecordType[];
  deleteRecord: (key: number) => RecordType[];
}
