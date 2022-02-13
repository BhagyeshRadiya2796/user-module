import { User } from '../models/User' // eslint-disable-line
import { UserDao } from '../daos/UserDao'

export class UserService {
  private userDao: UserDao
  constructor () {
    this.userDao = new UserDao()
  }

  public createUser = async (user: User) => {
    const newUser = await this.userDao.create(user)
    return newUser
  }

  public updateUser = async (user: User, userId: string) => {
    user = await this.userDao.update(user, userId)
    return user
  }

  public getUsers = async () => {
    const users = await this.userDao.getAll()
    return users
  }

  public getUserById = async (userId: string) => {
    const user = await this.userDao.getById(userId)
    return user || null
  }

  public deleteUser = async (userId: string) => {
    const user = await this.userDao.delete(userId)
    return user || null
  }
}
