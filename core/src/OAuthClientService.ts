import { UserInfo } from ".";
import { DatabaseInterface } from "./DatabaseInterface";

export interface OAuthClientRegistrationInterface {
  clientName: string
  owner: UserInfo
}

export interface OAuthClient {
  clientId: string
  clientName: string
  owner: UserInfo
  createdDate: Date
}

export class OAuthClientService {
  private db: DatabaseInterface
  constructor(db: DatabaseInterface) {
    this.db = db;
  }

  async registerNewClient(data: OAuthClientRegistrationInterface) {
    const newClient = await this.db.addNewOAuthClient({
      ownerName: data.owner.email,
      clientName: data.clientName,
    });
    if (!newClient) throw new Error('Client registration failed');
  }

  async validateClientApiKey(apiKey: string) {
    return await this.db.validateOAuthClientApiKey(apiKey);
  }

  async authenticateUserToken(clientApiKey: string, token: string) {

  }
}