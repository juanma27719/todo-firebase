import { Injectable, inject, signal } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean } from '@angular/fire/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {

  private rc = inject(RemoteConfig);

  canEdit = signal(false);

  constructor() {
    this.init();
  }

  async init() {
  try {
    const activated = await fetchAndActivate(this.rc);
    console.log('RC activated:', activated);

    const value = getBoolean(this.rc, 'enable_edit');
    console.log('RC enable_edit:', value);

    this.canEdit.set(value);
  } catch (err) {
    console.error('RemoteConfig error', err);
  }
}

}
