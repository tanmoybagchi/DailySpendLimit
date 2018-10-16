import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainHelper } from '@app/core/domain/domain-helper';
import { map } from 'rxjs/operators';
import { GapiModule } from '../gapi.module';

@Injectable({
  providedIn: GapiModule
})
export class DriveFilesQuery {
  constructor(
    private http: HttpClient,
  ) { }

  execute(name = '', parents: string[] = [], mimeType = '') {
    const searchParams: string[] = [];

    if (String.hasData(name)) {
      searchParams.push(`name='${name}'`);
    }

    if (String.hasData(mimeType)) {
      searchParams.push(`mimeType=${mimeType}`);
    }

    if (parents.length > 0) {
      searchParams.push(`'${parents.join(',')}' in parents`);
    }

    searchParams.push(`trashed=false`);

    const queryParams = {
      q: encodeURIComponent(searchParams.join(' and ')),
      fields: 'files(id,name,modifiedTime,version)'
    };

    const httpParams = new HttpParams({ fromObject: queryParams });
    const url = 'https://www.googleapis.com/drive/v3/files';

    const options = {
      params: httpParams
    };

    return this.http.get(url, options).pipe(
      map((x: { files: any[] }) => x.files.map(f => DomainHelper.adapt(DriveFilesQuery.Result, f)))
    );
  }
}

export namespace DriveFilesQuery {
  export class Result {
    id = '';
    name = '';
    @Reflect.metadata('design:type', Date)
    modifiedTime: Date = null;
    version = 0;
  }
}
