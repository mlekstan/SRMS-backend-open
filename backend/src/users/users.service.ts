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

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        branch: true,
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        areaCode: true,
        phoneNumber: true,
        dateJoined: true,
        branch: {
          id: true,
          name: true,
        }
      }
    });
  }

  async findOne(params: { id: string }) {
    return await this.usersRepository.findOneOrFail({
      where: {
        id: Number(params.id)
      },
      relations: {
        branch: true,
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        areaCode: true,
        phoneNumber: true,
        dateJoined: true,
        branch: {
          id: true,
          name: true,
        }
      }
    });
  }

  async updateOne(params: { id: string }, user: UserIface) {
    console.log(user)
    
    const { userData } = user;
    
    const userRow = this.usersRepository.create({
      id: Number(params.id),
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      email: userData.email,
      areaCode: userData.areaCode,
      phoneNumber: userData.phoneNumber,
      branch: { id: userData.branchId },
      password: userData.password,
    });

    return await this.usersRepository.save(userRow);
  }
}