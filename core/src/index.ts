import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { DatabaseInterface } from "./DatabaseInterface";

export type SexGroup = "m" | "f"

export interface UserSignInInterface {
  email: string
  password: string
}

export interface UserRegistrationInfo {
  email: string
  firstName?: string
  lastName?: string
  mobilePrimary?: string
  dateOfBirth?: Date
  sex?: SexGroup
  citizenships?: string[]
  languages?: string[]
}

export interface UserRegistrationInInterface {
  user: UserRegistrationInfo
  password: string
}

export interface NewUserInterface extends UserRegistrationInfo {
  hash: string
}

export interface UserInfo extends UserRegistrationInfo {
  emailPrimaryVerified: boolean
  mobilePrimaryVerified: boolean
}

export type Claim = 'firstName' | 'lastName'

export interface TokenClaims {
  sub: string
  iat?: number
  exp?: number
}

export class AkosiService {
  private readonly DEFAULT_TOKEN_TTL = '1h';
  private jwtSecret: string
  private db: DatabaseInterface;
  constructor(jwtSecret: string, db: DatabaseInterface) {
    this.jwtSecret = jwtSecret
    this.db = db
    this.initializeService();
  }

  async initializeService() {
    if (!(await this.db.init()))
      throw new Error("Connection to database failed.");
  }

  async registerUser(data: UserRegistrationInInterface): Promise<string> {
    const salt = await bcrypt.genSalt()
    const newUserRegistration: NewUserInterface = {
      ...data.user,
      hash: await bcrypt.hash(data.password, salt),
    }
    if (!(await this.db.addNewUser(newUserRegistration)))
      throw new Error("New user registration failed!")
    const newUser: UserInfo = {
      ...data.user,
      emailPrimaryVerified: false,
      mobilePrimaryVerified: false,
    }
    return await this.createUserSessionToken(data.user.email, [])
  }

  async loginUser(data: UserSignInInterface): Promise<string> {
    const hash = await this.db.getUserHash(data.email)
    if (!(await bcrypt.compare(data.password, hash)))
      throw new Error("Username or password is incorrect")
    return await this.createUserSessionToken(data.email, [])
  }

  private async createUserSessionToken(username: string, claimsKey: Claim[]): Promise<string> {
    const storedUserInfo = await this.db.getUserInfo(username);
    if (!storedUserInfo) throw new Error('User not found');

    const claims:TokenClaims = {
      sub: storedUserInfo.username,
      username: storedUserInfo.username,
    };
    claimsKey.forEach(key => {
      claims[key.toString()] = storedUserInfo[key.toString()]
    })
    const token = jwt.sign(claims, this.jwtSecret, { expiresIn: this.DEFAULT_TOKEN_TTL})
    return token;
  }

  async validateUserSessionToken(token: string) {
    const decodedToken = jwt.verify(token, this.jwtSecret) as TokenClaims
    if (typeof decodedToken === 'string') throw new Error('Invalid token payload')
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      throw new Error('Token has expired');
    }
    decodedToken.username
  }
}
