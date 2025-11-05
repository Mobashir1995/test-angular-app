import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ApiResponse {
  status: number;
  statusText: string;
  headers: any;
  data: any;
  time: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  url = 'https://stgw.vorwerk-schweiz.ch/wp-json/hs/v1/orders';
  method = 'POST';
  headers = '{\n  "Content-Type": "application/json"\n}';
  body = '{\n"Email": "selisetesttr@gmail.com",\n"PageNumber": 1,\n"PageSize": 10\n}';
  response: ApiResponse | null = null;
  loading = false;
  error: string | null = null;
  authMethod: 'basic' | 'query' | 'none' = 'basic';
  consumerKey = 'ck_603d3996bc25307337b5b57c89094448f0310a03';
  consumerSecret = 'cs_87fa9e84303c0d8e575e399d5fb8ccec87c6a1c3';

  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.loading = true;
    this.error = null;
    this.response = null;

    try {
      // Parse headers
      let parsedHeaders: any = {};
      if (this.headers.trim()) {
        parsedHeaders = JSON.parse(this.headers);
      }

      // Build HttpHeaders
      let httpHeaders = new HttpHeaders();
      Object.keys(parsedHeaders).forEach(key => {
        httpHeaders = httpHeaders.set(key, parsedHeaders[key]);
      });

      // Handle Basic Auth
      if (this.authMethod === 'basic' && this.consumerKey && this.consumerSecret) {
        const credentials = btoa(`${this.consumerKey}:${this.consumerSecret}`);
        httpHeaders = httpHeaders.set('Authorization', `Basic ${credentials}`);
      }

      // Build query parameters
      let httpParams = new HttpParams();
      if (this.authMethod === 'query' && this.consumerKey && this.consumerSecret) {
        httpParams = httpParams.set('consumer_key', this.consumerKey);
        httpParams = httpParams.set('consumer_secret', this.consumerSecret);
      }

      // Parse request body
      let requestBody: any = null;
      if (['POST', 'PUT', 'PATCH'].includes(this.method) && this.body.trim()) {
        try {
          requestBody = JSON.parse(this.body);
        } catch (e) {
          requestBody = this.body;
        }
      }

      // Build request options
      const requestOptions: any = {
        headers: httpHeaders,
        params: httpParams,
        observe: 'response' as const,
        responseType: 'json' as const
      };

      // Add body only for methods that support it
      if (requestBody !== null) {
        requestOptions.body = requestBody;
      }

      const startTime = Date.now();
      const res = await firstValueFrom(
        this.http.request<any>(this.method as any, this.url, requestOptions)
      ) as HttpResponse<any>;
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Convert headers to plain object
      const responseHeaders: any = {};
      res.headers.keys().forEach(key => {
        responseHeaders[key] = res.headers.get(key);
      });

      this.response = {
        status: res.status,
        statusText: res.statusText || 'OK',
        headers: responseHeaders,
        data: res.body,
        time: responseTime,
      };
    } catch (err: any) {
      if (err.status) {
        // Server responded with error status
        const errorHeaders: any = {};
        if (err.headers) {
          err.headers.keys().forEach((key: string) => {
            errorHeaders[key] = err.headers.get(key);
          });
        }

        this.response = {
          status: err.status,
          statusText: err.statusText || 'Error',
          headers: errorHeaders,
          data: err.error || err.message,
          time: 0,
        };
        this.error = `Request failed with status ${err.status}: ${err.statusText || 'Unknown error'}`;
      } else {
        // Network error or other issue
        this.error = err.message || 'No response received from server. Check your network connection and CORS settings.';
      }
    } finally {
      this.loading = false;
    }
  }

  getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 300 && status < 400) return '#f59e0b';
    if (status >= 400 && status < 500) return '#ef4444';
    if (status >= 500) return '#dc2626';
    return '#6b7280';
  }

  get methodsWithBody(): string[] {
    return ['POST', 'PUT', 'PATCH'];
  }
}

