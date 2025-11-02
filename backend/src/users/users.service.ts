import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserIface } from "./interfaces/users.interface";


@Injectable()
export class UsersService {
  private usersRepository: Repository<User>

  constructor(@InjectRepository(User) usersRepostory: Repository<User>) {
    this.usersRepository = usersRepostory;
  }


  async add(user: UserIface) {
    const { userData } = user;

    console.log(user);

    const userRow = this.usersRepository.create({
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      email: userData.email,
      areaCode: userData.areaCode,
      phoneNumber: userData.phoneNumber,
      branch: { id: userData.branchId },
      password: userData.password,
      dateJoined: new Date()
    });

    return await this.usersRepository.save(userRow);
  }
}