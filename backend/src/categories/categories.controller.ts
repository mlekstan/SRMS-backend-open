import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AddCategoryDto } from "./dto/add-category.dto";


@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  add(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoriesService.add(addCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}