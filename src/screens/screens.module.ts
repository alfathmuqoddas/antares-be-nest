import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './entities/screen.entity';
import { TheatersModule } from 'src/theaters/theaters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Screen]), TheatersModule],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
