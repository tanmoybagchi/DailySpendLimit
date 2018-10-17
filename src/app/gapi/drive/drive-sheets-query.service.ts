import { Injectable } from '@angular/core';
import { DriveFileSearchQuery } from './drive-file-search-query.service';
import { GapiModule } from '../gapi.module';

@Injectable({
  providedIn: GapiModule
})
export class DriveSheetsQuery {
  constructor(
    private driveFilesQuery: DriveFileSearchQuery
  ) { }

  execute(name = '') {
    return this.driveFilesQuery.execute(name, [], 'application/vnd.google-apps.spreadsheet');
  }
}
