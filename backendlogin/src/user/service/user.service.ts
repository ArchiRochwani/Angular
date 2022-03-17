import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/service/auth.service';
import { MongoClient } from 'mongodb';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) { }

  async create(newUser: User): Promise<User> {
    try {
      const exists: boolean = await this.mailExists(newUser.email);
      if (!exists) {
        console.log(newUser.password);
        const user = await this.userRepository.save(this.userRepository.create(newUser));
        return this.findOne(user.username);
      } else {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
    } 
    catch {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }
  }

  async login(user: User): Promise<string> {
    try {
      const foundUser: User = await this.findByEmail(user.email.toLowerCase());
      if (foundUser) {
        let matches: boolean = false;
        if (user.password == foundUser.password) {
          matches = true;
        }
        else {
          throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED)
        }
        if (matches) {
          const payload: User = await this.findOne(foundUser.username);
          return this.authService.generateJwt(payload);
        } else {

          throw new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
      }
    } 
    catch {
      throw new HttpException('Login was not successful, wrong credentials', HttpStatus.NOT_FOUND);
    }
  }
  async main(){
    const MongoClient=require('mongodb').MongoClient;
    const uri='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
    const client = new MongoClient(uri, { useNewUrlParser: true });

    // Connect to the client and query
    await client.connect();
    this.findListings(client);
    client.close();
}

    async findListings(client) {

    const cursor = client
      .db('test')
      .collection('user_entity')
      .find()
      
  
    const results = await cursor.toArray();
    if (results.length > 0) {
      console.log(`Found ${results.length} listing(s):`);
      results.forEach((result, i) => {
        
        console.log();
        console.log(`${i + 1}. name: ${result.username}`);
        console.log(`   user email: ${result.email}`);
        
      });
      
  }
  
  return results;
}
  
 async findAllData(client,res)
 {
   console.log(this.userRepository.findOne());
   return this.userRepository.find();
//    const mongoose=require("../test.user_entity");
//   const userSchema = new mongoose.Schema({
//     name: String,
//     email:String
// });
// var userModel=mongoose.model('users',userSchema);
 
// module.exports = mongoose.model("Users", userModel);

  //  console.log(this.userRepository.find());
  //  return this.userRepository.find();
 }
  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<UserEntity>(this.userRepository, options);
  }

  async findAllByUsername(username: string): Promise<User[]> {
    return this.userRepository.find({
    where: {
      username: Like(`%${username.toLowerCase()}%`)
    }
   })
 }

  // also returns the password
  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email }, { select: ['id', 'email', 'username', 'password'] });
  }
  
  private async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  public getOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
