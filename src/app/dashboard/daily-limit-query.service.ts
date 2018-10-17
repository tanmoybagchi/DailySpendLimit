import { Injectable } from '@angular/core';
import { Result } from '@app/core/result';
import { DriveFileQuery } from '@app/gapi/drive/drive-file-query.service';
import { DriveFileSearchQuery } from '@app/gapi/drive/drive-file-search-query.service';
import { environment } from '@env/environment';
import { throwError } from 'rxjs';
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
      switchMap(result => result.length === 0 ?
        throwError(Result.CreateErrorResult('DatabaseNotFound')) :
        this.driveFileQuery.execute(result[0].id))
    );
  }
}
