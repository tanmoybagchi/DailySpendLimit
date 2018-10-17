import { Injectable } from '@angular/core';
import { DriveFileQuery } from '@app/gapi/drive/drive-file-query.service';
import { DriveFileSearchQuery } from '@app/gapi/drive/drive-file-search-query.service';
import { environment } from '@env/environment';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyLimitQuery {
  constructor(
    private driveFileSearchQuery: DriveFileSearchQuery,
    private driveFileQuery: DriveFileQuery
  ) { }

  execute() {
    return this.driveFileSearchQuery.execute(environment.database).pipe(
      switchMap(result => result.length === 0 ? EMPTY : this.driveFileQuery.execute(result[0].id))
    );
  }
}
