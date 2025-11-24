import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AddCategoryDto } from "./dto/add-category.dto";


@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  add(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoriesService.add(addCategoryDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateCategoryDto: AddCategoryDto) {
    return this.categoriesService.updateOne(params, updateCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.categoriesService.findOne(params);
  }
}