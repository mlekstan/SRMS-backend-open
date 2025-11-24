import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryIface } from "./interfaces/category.interface";
import { copyToRow } from "src/helper-functions/copyToRow";


@Injectable()
export class CategoriesService {
  private categoriesRepository: Repository<Category>

  constructor(@InjectRepository(Category) categoriesRepository: Repository<Category>) {
    this.categoriesRepository = categoriesRepository;
  }

  async add(category: CategoryIface) {
    const categoryRow = new Category();
    
    copyToRow(categoryRow, category);
    
    return (
      await this.categoriesRepository.save(categoryRow)
    );
  }

  async updateOne(params: { id: string }, category: CategoryIface) {
    const { categoryData } = category;
    
    const categoryRow = this.categoriesRepository.create({
      id: Number(params.id),
      name: categoryData.name
    });

    return await this.categoriesRepository.save(categoryRow);
  }

  async findAll() {
    try {
      const categories = await this.categoriesRepository.find();
      console.log(categories)
      return categories;

    } catch (error) {
      throw error;
    }
  }

  async findOne(params: { id: string }) {
    const category = await this.categoriesRepository.findOneOrFail({
      where: {
        id: Number(params.id)
      }
    });

    return category;
  }
}