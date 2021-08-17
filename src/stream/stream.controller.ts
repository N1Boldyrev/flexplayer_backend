import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Controller('stream')
export class StreamController {
  @Get()
  getStream(@Res() res: Response, @Query('filePath') filePath: string) {
    const file = createReadStream(`${process.env.FILES_PATH}${filePath}`);
    file.pipe(res);
  }
}
