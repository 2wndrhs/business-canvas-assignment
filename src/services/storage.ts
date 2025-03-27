import { INITIAL_RECORDS } from '../constants';
import { RecordType } from '../types/member.type';
import { StorageService } from '../types/storage.type';

class InMemoryStorage implements StorageService {
  private records = [...INITIAL_RECORDS];

  getRecords() {
    return this.records;
  }

  addRecord(record: RecordType) {
    this.records.push(record);
  }

  updateRecord(recordToUpdate: RecordType) {
    this.records = this.records.map((record) => {
      if (record.key === recordToUpdate.key) {
        return recordToUpdate;
      }

      return record;
    });
  }

  deleteRecord(key: number) {
    this.records = this.records.filter((record) => record.key !== key);
  }
}

class LocalStorage implements StorageService {
  private STORAGE_KEY = 'member-records';

  constructor() {
    // 로컬 스토리지에 데이터가 없으면 초기 데이터 저장
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_RECORDS));
    }
  }

  getRecords(): RecordType[] {
    const records = localStorage.getItem(this.STORAGE_KEY);
    return records ? JSON.parse(records) : [];
  }

  addRecord(record: RecordType) {
    const records = this.getRecords();
    records.push(record);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
  }

  updateRecord(recordToUpdate: RecordType) {
    const records = this.getRecords();
    const updatedRecords = records.map((record) => {
      if (record.key === recordToUpdate.key) {
        return recordToUpdate;
      }

      return record;
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRecords));
  }

  deleteRecord(key: number) {
    const records = this.getRecords().filter((record) => record.key !== key);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
  }
}

export const createStorageService = (): StorageService => {
  const storageType = import.meta.env.VITE_STORAGE;

  if (storageType === 'local-storage') {
    return new LocalStorage();
  }

  return new InMemoryStorage();
};
