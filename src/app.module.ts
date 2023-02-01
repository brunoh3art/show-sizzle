import { AppController } from '@infra/http/controllers/app.controller';
import { AppService } from '@infra/http/controllers/app.service';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
