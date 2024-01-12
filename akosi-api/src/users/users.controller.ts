import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateNewUserDto } from './dtos/users.dto';

@Controller('users')
export class UsersController {
  @Get(':id')
  getUserInfo(@Req() req: Request, @Ip() ip, @Param() params) {
    return {
      reqParams: params,
      ip,
      body: req.body,
      bodyUsed: req.bodyUsed,
      cache: req.cache,
      credentials: req.credentials,
      destination: req.destination,
      headers: req.headers,
      integrity: req.integrity,
      keepalive: req.keepalive,
      method: req.method,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      url: req.url,
    };
  }

  @Post()
  @HttpCode(201)
  registerNewUser(
    @Req() req: Request,
    @Ip() ip,
    @Body() body: CreateNewUserDto,
  ) {
    return {
      reqBody: body,
      ip,
      body: req.body,
      bodyUsed: req.bodyUsed,
      cache: req.cache,
      credentials: req.credentials,
      destination: req.destination,
      headers: req.headers,
      integrity: req.integrity,
      keepalive: req.keepalive,
      method: req.method,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      url: req.url,
    };
  }
}
