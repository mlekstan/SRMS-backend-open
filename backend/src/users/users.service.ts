import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserIface } from "./interfaces/users.interface";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  private saltOrRounds: string | number;

  constructor(@InjectRepository(User) usersRepostory: Repository<User>) {
    this.usersRepository = usersRepostory;
    this.saltOrRounds = 10;
  }


  async add(user: UserIface) {
    const { userData } = user;
  
    const passwordHash = await bcrypt.hash(userData.password, this.saltOrRounds);

    const userRow = this.usersRepository.create({
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      email: userData.email,
      areaCode: userData.areaCode,
      phoneNumber: userData.phoneNumber,
      branch: { id: userData.branchId },
      password: passwordHash,
      dateJoined: new Date()
    });

    return await this.usersRepository.save(userRow);
  }

  async updateOne(params: { id: string }, user: UserIface) {
    const { userData } = user;

    const passwordHash = 
      (userData.password) ? 
      await bcrypt.hash(userData.password, this.saltOrRounds) : 
      undefined;

    const userRow = this.usersRepository.create({
      id: Number(params.id),
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      email: userData.email,
      areaCode: userData.areaCode,
      phoneNumber: userData.phoneNumber,
      branch: { id: userData.branchId },
      password: passwordHash,
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

  async findOne(params: { id: string }, secure?: boolean): Promise<User>;
  async findOne(email: string, secure?: boolean): Promise<User>;
  async findOne(arg: { id: string } | string, secure?: boolean) {
    let whereOption = (typeof arg === "string") ? { email: arg } : { id: Number(arg.id) };

    const user = await this.usersRepository.findOneOrFail({
      where: {
        ...whereOption
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
        password: !secure,
        dateJoined: true,
        branch: {
          id: true,
          name: true,
        }
      }
    });

    return user;
  }

}