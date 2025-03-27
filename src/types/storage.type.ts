import { RecordType } from './member.type';

export interface StorageService {
  getRecords: () => RecordType[];
  addRecord: (record: RecordType) => void;
  updateRecord: (record: RecordType) => void;
  deleteRecord: (key: number) => void;
}
