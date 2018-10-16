import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GapiModule } from '../gapi.module';

@Injectable({
  providedIn: GapiModule
})
export class DriveFilePropertiesQuery {
  constructor(
    private http: HttpClient
  ) { }

  execute(fileId: string, properties = 'modifiedTime') {
    const baseUrl = 'https://www.googleapis.com/drive/v3/files';

    return this.http.get(`${baseUrl}/${fileId}?fields=${properties}`);
  }
}
