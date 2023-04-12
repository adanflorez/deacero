import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ChangePassword, ChangePasswordGateway } from '../../domain';
import { ChangePasswordImplementationMapper } from '../helpers';
// import { ChangePasswordEntity } from '../driven-adapters';

@Injectable()
export class ChangePasswordImplementation extends ChangePasswordGateway {
  apiAdmin = environment.apiAdmin;
  multisiteMapper = new ChangePasswordImplementationMapper();
  constructor(private http: HttpClient) {
    super();
  }

  update(): Observable<ChangePassword> {
    return this.http.get<ChangePassword>(`${this.apiAdmin}osc`);
    // .pipe(
    //   map((response: any) => {
    //     const multisites: Array<ChangePasswordEntity> = response.data.multiSite;
    //     const mappedMultisite: Array<ChangePassword> = multisites.map(
    //       this.multisiteMapper.mapFrom
    //     );
    //     return { sites: mappedMultisite, total: response.data.size };
    //   })
    // );
  }
}
