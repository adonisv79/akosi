import { UserInfo } from ".";
import { DatabaseInterface } from "./DatabaseInterface";

export interface OAuthClientRegistrationInterface {
  owner: UserInfo
  clientName: string
}

export class OAuthClientService {
  private db: DatabaseInterface
  constructor(db: DatabaseInterface) {
    this.db = db;
  }


  async registerNewClient(data: OAuthClientRegistrationInterface) {
    this.db.addNewOAuthClient({
      ownerName: data.owner.username,
      clientName: data.clientName,
    });
  }

  async validateClientApiKey(apiKey: string) {
    return await this.db.validateOAuthClientApiKey(apiKey);
  }

  async authenticateUserToken(clientApiKey: string, token: string) {

  }
}