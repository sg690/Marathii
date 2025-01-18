import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  // Read data from a specific path
  readData(path: string): Observable<any> {
    return this.db.object(path).valueChanges();
  }

  // Write data to a specific path
  writeData(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  // Update data at a specific path
  updateData(path: string, data: any): Promise<void> {
    return this.db.object(path).update(data);
  }

  // Delete data at a specific path
  deleteData(path: string): Promise<void> {
    return this.db.object(path).remove();
  }

  // Fetch sidebar data
  getSidebarData(path: string): Observable<any[]> {
    return this.db
      .list(path)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.key,
            ...(c.payload.val() as any),
          }))
        )
      );
  }
}
