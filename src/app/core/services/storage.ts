import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage!: Storage;
  private ready!: Promise<void>;

  constructor() {
    this.ready = this.init();
  }

  async init() {
    this._storage = await new Storage().create();
  }

  async get<T>(key: string): Promise<T> {
    await this.ready;
    return this._storage.get(key);
  }

  async set(key: string, value: any) {
    await this.ready;
    return this._storage.set(key, value);
  }
}

