import { autoinject } from "aurelia-framework";
import { HttpClient, json } from 'aurelia-fetch-client';

import * as qs from 'querystringify';

import { config } from '../config';
import { JwtService } from './jwt-service';
import { parseError, status } from "./service-helper";

@autoinject()
export class ApiService {

  constructor(private http: HttpClient,
              private jwt: JwtService) { }
  
  getHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwt.getToken()) {
      headersConfig['Authentication'] = `Bearer ${this.jwt.getToken()}`;
    }
  }            

  get(path: string, params?: any) {
    const options = {
      method: 'GET',
      headers: this.getHeaders()
    };

    return this.http.fetch(`${config.api_url}${path}?${qs.stringify(params)}`, options)
      .then(status)
      .catch(parseError);
  }

  put(path: string, body) {
    const options = {
      method: 'PUT',
      headers: this.getHeaders(),
      body: json(body)
    };

    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(status)
      .catch(parseError);
  }

  post(path, body = {}) {
    const options = {
      method: 'POST',
      headers: this.getHeaders(),
      body: json(body)
    };

    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(status)
      .catch(parseError);
  }

  delete(path) {
    const options = {
      method: 'DELETE',
      headers: this.getHeaders()
    };

    return this.http.fetch(`${config.api_url}${path}`, options)
      .then(status)
      .catch(parseError);
  }
}

