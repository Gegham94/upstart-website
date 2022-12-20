import { join } from 'path';
import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { KayValueType } from '../types/kay-value.type';
import * as fs from 'fs';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private prefix: string = 'i18n',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<KayValueType> {
    return new Observable((observer) => {
      const assetsFolder = join(process.cwd(), 'dist', 'upstart', 'browser', 'assets', this.prefix);

      const jsonData = JSON.parse(fs.readFileSync(`${assetsFolder}/${lang}${this.suffix}`, 'utf8'));

      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}
