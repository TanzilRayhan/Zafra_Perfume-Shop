import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Perfume } from "./perfume.entity";

@Injectable()
export class PerfumeService {
    constructor(
        @InjectRepository(Perfume)
        private perfumeRepository: Repository<Perfume>,
    ) {}
    async getAllPerfumes(): Promise<Perfume[]> {
        return await this.perfumeRepository.find();
    }
    async getPerfumeById(id: string): Promise<Perfume> {
        const perfume = await this.perfumeRepository.findOne({where: {id}});
        if (!perfume) {
            throw new Error('Perfume not found');
        }
        return perfume;
    }
    async createPerfume(perfume: Perfume): Promise<Perfume> {
        const newPerfume = this.perfumeRepository.create(perfume);
        return await this.perfumeRepository.save(newPerfume);
    }   
    async updatePerfume(id: string, perfume: Perfume): Promise<Perfume> {
        await this.perfumeRepository.update(id, perfume);
        const updatedPerfume = await this.perfumeRepository.findOne({where: {id}});
        if (!updatedPerfume) {
            throw new Error('Perfume not found');
        }
        return updatedPerfume;
    }
    async deletePerfume(id: string): Promise<void> {
        await this.perfumeRepository.delete(id);
    }
}