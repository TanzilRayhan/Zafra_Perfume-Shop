import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Perfume } from "./perfume.entity";
import { PerfumeService } from "./perfume.service";
import { PerfumeController } from "./perfume.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Perfume])],
    controllers: [PerfumeController],
    providers: [PerfumeService],
    exports: [PerfumeService],
})
export class PerfumeModule {}