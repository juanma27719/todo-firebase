import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage!: Storage;

  async init() {
    this._storage = await new Storage().create();
  }

  set(key: string, value: any) {
    return this._storage.set(key, value);
  }

  get<T>(key: string): Promise<T> {
    return this._storage.get(key);
  }
}
