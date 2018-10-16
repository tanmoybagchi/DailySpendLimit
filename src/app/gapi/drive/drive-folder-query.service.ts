import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { GapiModule } from '../gapi.module';

@Injectable({
  providedIn: GapiModule
})
export class DriveFolderQuery {
  private data: { name: string, id: string }[] = [];
  private observable: Observable<any>;
  private initializing = false;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
  ) {
    this.initialize();
  }

  execute(name = '') {
    if (String.isNullOrWhitespace(name)) {
      return of('');
    }

    if (this.initializing) {
      return this.observable.pipe(
        map(() => {
          const item = this.data.find(x => x.name === name);
          return item ? item.id : '';
        })
      );
    }

    const folder = this.data.find(x => x.name === name);
    if (folder) {
      return of(folder.id);
    }
  }

  initialize() {
    if (this.initializing) {
      return;
    }

    this.initializing = true;

    this.data = this.storage.get('folders') || [];
    if (this.data.length > 0) {
      this.initializing = false;
      return;
    }

    this.observable = this.getFolderId(environment.rootFolder, null).pipe(
      map((x: { files: { id: string }[] }) => this.data.push({ name: environment.rootFolder, id: x.files[0].id })),
      tap(_ => {
        // when the cached data is available we don't need the 'Observable' reference anymore
        this.observable = null;

        this.initializing = false;

        this.storage.set('folders', this.data);
      }),
      share()
    );
  }

  private getFolderId(name: string, parentId: string) {
    const searchParams: string[] = [];
    searchParams.push(`name='${name}'`);
    searchParams.push('mimeType = \'application/vnd.google-apps.folder\'');
    searchParams.push(`trashed=false`);

    if (String.hasData(parentId)) {
      searchParams.push(`'${parentId}' in parents`);
    }

    const queryParams = {
      q: searchParams.join(' and '),
      fields: 'files(id)'
    };

    const httpParams = new HttpParams({ fromObject: queryParams });
    const url = 'https://www.googleapis.com/drive/v3/files';

    const options = {
      params: httpParams,
    };

    return this.http.get(url, options);
  }
}
