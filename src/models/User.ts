export interface UserInterFace {
  firstName: string
  lastName: string
  id: string,
  emailId: string,
  profileImage: string,
  password: string
}

export class User implements UserInterFace {
  constructor (data?: any) {
    Object.assign(this, data)
  }

  id: string = ''
  emailId: string = ''
  firstName: string = ''
  lastName: string = ''
  profileImage: string = ''
  password: string = ''
}
