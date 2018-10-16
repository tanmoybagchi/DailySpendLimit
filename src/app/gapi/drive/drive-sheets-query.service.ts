import { Injectable } from '@angular/core';
import { DriveFilesQuery } from './drive-files-query.service';
import { GapiModule } from '../gapi.module';

@Injectable({
  providedIn: GapiModule
})
export class DriveSheetsQuery {
  constructor(
    private driveFilesQuery: DriveFilesQuery
  ) { }

  execute(name = '') {
    return this.driveFilesQuery.execute(name, [], 'application/vnd.google-apps.spreadsheet');
  }
}
