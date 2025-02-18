import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getData() {
    return { message: 'Welcome to api!' };
  }

  getParamData(param: string) {
    return { message: `You passed param: ${param}` };
  }

  getQueryData(query: string) {
    return { message: `You passed query: ${query}` };
  }

  postData(body: object) {
    return { message: 'Data received', body };
  }

  postHeaders(headers: object) {
    return { message: 'Headers received', headers };
  }

  getIp(ip: string) {
    return { message: `Your IP address is: ${ip}` };
  }

  putData(query: string) {
    return { message: `You put query: ${query}` };
  }
}
