export interface EmailInterface {
  init: () => Promise<boolean>
  sendVerification: (code: string) => Promise<boolean>
}