import { Body, Controller, Get, Post } from "@nestjs/common";
import { SubcategoriesService } from "./subcategories.service";
import { AddSubcategoryDto } from "./dto/add-subcategory.dto";

@Controller("subcategories")
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @Post()
  add(@Body() addSubcategoryDto: AddSubcategoryDto) {
    return this.subcategoriesService.add(addSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

}