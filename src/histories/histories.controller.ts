import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@ApiTags('histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly svc: HistoriesService) {}

  @Get('pet/:petId')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated timeline' })
  linea(
    @Param('petId') petId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.svc.timeline(petId, Number(page), Number(limit));
  }

  @Post(':petId')
  @ApiBody({ type: CreateHistoryDto })
  @ApiResponse({ status: 201, description: 'Event added' })
  crear(@Param('petId') petId: string, @Body() dto: CreateHistoryDto) {
    return this.svc.addEvent(petId, dto);
  }
}
