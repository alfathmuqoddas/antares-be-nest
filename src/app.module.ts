import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsModule } from './modules/components/components.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { TheatersModule } from './modules/theaters/theaters.module';
import { ScreensModule } from './modules/screens/screens.module';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { SeatsModule } from './modules/seats/seats.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingSeatsModule } from './modules/booking_seats/booking_seats.module';
import { SlugifyModule } from './modules/slugify/slugify.module';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ComponentsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    TheatersModule,
    ScreensModule,
    ShowtimesModule,
    SeatsModule,
    BookingsModule,
    BookingSeatsModule,
    SlugifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
