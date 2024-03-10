import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/service/admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // router.route("/admin/list").get(catchErrors(adminController.list));

  @Post('/create')
  create(): string {
    return 'create';
  }

  @Get('/read/:id')
  read(@Param('id', ParseIntPipe) id: string): string {
    return `raed id: ${id}`;
  }

  @Patch('/update/:id')
  update(@Param('id', ParseIntPipe) id: string): string {
    return `update id: ${id}`;
  }

  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: string): string {
    return `delete id: ${id}`;
  }

  @Get('/search')
  search(): string {
    return `search `;
  }
  @Get('/')
  list(): string {
    return 'list';
  }

  @Patch('password-update/:id')
  updatePassword(@Param('id', ParseIntPipe) id: number): string {
    return `updatePassword id: ${id}`;
  }
}
