import { User } from '../models/User' // eslint-disable-line

export class UserDao {
  public create = async (user: User) => {
    console.log('user created')
    return user
  }

  public getById = async (userId: string) => {
    console.log('user get')
    return null
  }

  public getAll = async () => {
    console.log('user get')
    return []
  }

  public update = async (user: User, userId: string) => {
    console.log('user updated')
    return user
  }

  public delete = async (userId: string) => {
    console.log('user deleted')
    return null
  }
}
