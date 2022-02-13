import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { UserService } from '../services/UserService'
import { User } from '../models/User' // eslint-disable-line

export class UserController implements ControllerBase {
  public path = '/user'
  public router = express.Router()
  public userService: UserService

  constructor () {
    this.initRoutes()
    this.userService = new UserService()
  }

  public initRoutes () {
    this.router.get('/users', this.getAll)
    this.router.get(this.path + '/:userId', this.getById)
    this.router.post(this.path, this.post)
    this.router.put(this.path + '/:userId', this.update)
    this.router.delete(this.path + '/:userId', this.delete)
  }

  post = async (req: Request, res: Response) => {
    const data = req.body
    if (Object.keys(data).length !== 0) {
      const user: User = new User(data)
      await this.userService.createUser(user)
      return res.status(200).send({ user })
    }
    return res.status(400).send({ message: 'Invalid request body' })
  }

  getById = async (req: Request, res: Response) => {
    const pathParams = req.params
    if (pathParams && pathParams.userId) {
      const user: any | null = await this.userService.getUserById(pathParams.userId.toString())
      if (user) {
        return res.status(200).send(user)
      } else {
        return res.status(404).send({ message: 'User not found' })
      }
    } else {
      return res.status(400).send({ message: 'Bad Request' })
    }
  }

  getAll = async (req: Request, res: Response) => {
    const users: Array<User> | [] = await this.userService.getUsers()
    if (users.length > 0) {
      return res.status(200).send(users)
    } else {
      return res.status(404).send({ message: 'User not found' })
    }
  }

  update = async (req: Request, res: Response) => {
    const pathParams = req.params
    const data = req.body
    let user: any | null
    if (pathParams && data && data !== {} && pathParams.userId) {
      user = await this.userService.getUserById(pathParams.userId.toString())
      if (user) {
        user = await this.userService.updateUser(data, pathParams.userId)
        return res.status(200).send(user)
      } else {
        return res.status(404).send({ message: 'User not found' })
      }
    } else {
      return res.status(400).send({ message: 'Bad Request' })
    }
  }

  delete = async (req: Request, res: Response) => {
    const pathParams = req.params
    if (pathParams && pathParams.userId) {
      let user: any | null = await this.userService.getUserById(pathParams.userId.toString())
      if (user) {
        user = await this.userService.deleteUser(user!.id)
        return res.status(200).send(user)
      } else {
        return res.status(404).send({ message: 'User not found' })
      }
    } else {
      return res.status(400).send({ message: 'Bad Request' })
    }
  }
}
