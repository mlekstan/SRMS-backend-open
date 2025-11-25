import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { SubcategoriesService } from "./subcategories.service";
import { AddSubcategoryDto } from "./dto/add-subcategory.dto";

@Controller("subcategories")
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @Post()
  add(@Body() addSubcategoryDto: AddSubcategoryDto) {
    return this.subcategoriesService.add(addSubcategoryDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateSubcategoryDto: AddSubcategoryDto) {
    return this.subcategoriesService.updateOne(params, updateSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.subcategoriesService.findOne(params);
  }

}