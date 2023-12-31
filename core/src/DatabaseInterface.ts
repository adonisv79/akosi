import { NewUserInterface, UserInfo } from "."
import { OAuthClient } from "./OAuthClientService"

export interface DatabaseInterface {
  init: () => Promise<boolean>
  addNewUser: (data: NewUserInterface) => Promise<boolean>
  addNewOAuthClient: (data) => Promise<OAuthClient>
  getUserHash: (username: string) => Promise<string>
  getUserInfo: (username: String) => Promise<UserInfo>
  validateOAuthClientApiKey: (apiKey: string) => Promise<boolean>
}