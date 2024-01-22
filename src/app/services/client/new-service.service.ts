import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

interface Service {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  client_type: number;
  country: string;
  service: number;
  subService: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewServiceService {
  protected NewService: any;
  constructor() {}

  sendServiceRequest(data: Service): any {
    const options = {
      method: 'POST',
      url: `${environment.backend}/ovnisolutions/clients/new-web-requirement`,
      headers: {
        'x-app-authorization-token': environment.appToken,
      },
      data,
    };

    return axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
}
