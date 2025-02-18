import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  //   @Get()
  //   getData() {
  //     return this.apiService.getData();
  //   }

  @Get('ip')
  getIp(@Ip() ip: string) {
    return this.apiService.getIp(ip);
  }

  @Get(':param')
  getParamData(@Param('param') param: string) {
    return this.apiService.getParamData(param);
  }

  @Get()
  getQueryData(@Query('query') query: string) {
    return this.apiService.getQueryData(query);
  }

  @Post()
  postData(@Body() body: object) {
    return this.apiService.postData(body);
  }

  @Post('headers')
  postHeaders(@Headers() headers: object) {
    return this.apiService.postHeaders(headers);
  }

  @Put()
  putData(@Query('query') query: string) {
    return this.apiService.putData(query);
  }

  @Delete()
  deleteData() {
    return { message: 'Data deleted' };
  }
}
