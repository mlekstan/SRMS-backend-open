import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddBranchDto } from "./dto/add-branch.dto";
import { BranchesService } from "./branches.service";

@Controller("branches")
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Post()
  add(@Body() addBranchDto: AddBranchDto) {
    return this.branchesService.add(addBranchDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateBranchDto: AddBranchDto) {
    return this.branchesService.updateOne(params, updateBranchDto);
  }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.branchesService.findOne(params);
  }
}