# AKOSI OAuth Service

AKOSI is a centralized IAM (Identity and Access Management) and Authorization Server that utilizes OAUTH 2.0, OpenID Connect, JWT.
(NOTE: Currently this is used for experimental purposes)

## Terminologies

* Resource Owners (users) - The entity that owns the resource and can grant access to it. In many cases, this is the end-user.
* Client - An OAuth Client represents an application or service that requests access to protected resources on behalf of the resource owners (users).
* Authorization Server - The server responsible for authenticating the resource owner and obtaining their consent. It issues access tokens to the client. In our case, the AKOSI-API is the AUTH server.
* Resource Server - The server hosting the protected resources. It validates access tokens and provides the requested resources.
* Access Token - A token issued by the authorization server that grants the client access to the protected resource. It represents the authorization granted to the client.
* Scope - A parameter that defines the extent of the access granted. It specifies what actions the client is allowed to perform with the access token.
* ID Token - A JWT (JSON Web Token) carrying claims about the authentication event. It contains user information and is used for identity verification
* Claims - Pieces of information about the user, such as their email address or name, that can be requested and included in the ID Token.
* Subject Identifier (sub) - A unique identifier for the authenticated user, allowing clients to recognize the user across different sessions.
* Nonce - A random value included in the authentication request to prevent replay attacks.
* Redirect URI - The URI to which the Authorization service will redirect to (with the authorization code) once user has approved or rejecting granting access to required information scopes.

## User Data

Users by default would start with a basic user record containing bare minimum credential infromations. This record can be expanded further by associating it with emails, profiles, etc.

### Emails

- A user by default does not need to have a primary email. This works in situations where some people do not actualy have one (elderlies, children and people who are not as adept in using modern technologies). This however is recommended as the primary email serves as their account restoration fallback (in case you forgot your credentials) as well as for verification/MFA.

- You can also set multiple emails in a user account. This works in situations where a user's secondary or other profiles should not provide their primary email. (ex: they have a gamer profile, work profile,  personal or financial and these might need separate email accounts)

### Profiles

- A user can have different profiles. Unlike most user authentication systems, we allow multiple profiles to help users abstract private information that they may deem irrelevant. For example, they may have 'gaming' profile where they would prefer not to provide their real name and PII details (unlike in a 'financial' account profile) and instead use aliases or secondary names. They can also have a different primary email address for each of their profiles.

## Creating user accounts

The very first step needed to access the system is by having a user account. Whether your goal is to register for a specific application or server, or create one yourself, you will need to have a user account existing in the database. This accounts can be created independently from any applications or services (clients). Once you have an account, you can join any client or even create your own. 

#### Required data

* email - the user's email serves as a perfect unique user identifier across the system. To ensure user has access to the email, a registration confirmation link is sent to the specified email.
* password - a unique word, phrase or random characters the user can use to authenticate itself.

### Creating clients

Clients make it easy to manage users in your apps or services.

## Updating Prisma
Whenerver prisma schema is updated, run the following 

to update the client
```
npx prisma generate
```

to create a new migration
```
npx prisma migrate dev --name <any name>
```

Strong Pass:
Must be 12 characters-the more characters, the better
Must be a mixture of both uppercase and lowercase letters
Must be a mixture of letters and numbers
Must include at least one special character, e.g., ! @ # ? ]