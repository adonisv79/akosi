/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/": {
    get: operations["AppController_getHello"];
  };
  "/auth": {
    /** Updates user password credentials */
    put: operations["AuthController_updatePassword"];
    /**
     * Registers a new user
     * @description Use this to create a new user account. Note that this is a secured endpoint that can only be accessed thru an official domain
     */
    post: operations["AuthController_registerNewUser"];
    /** Permanently deletes user data and granted permissions */
    delete: operations["AuthController_deleteUser"];
  };
  "/auth/login": {
    /** Signs-in the user and retrieve authentication session tokens */
    post: operations["AuthController_signInUser"];
  };
  "/users/self": {
    /** Retrieves user information */
    get: operations["UsersController_getCurrentUserInfo"];
  };
  "/users/{userId}/histories": {
    /** Rertrieves user past activity histories */
    get: operations["UserHistoriesController_getUserHistories"];
  };
  "/users/{userId}/profiles": {
    /**
     * Creates a new profile for the user
     * @description This allows a user to add a new profile to their account. If this is the first profile they made, it becomes the user's primary profile
     */
    post: operations["UserProfilesController_createUserProfile"];
  };
  "/email": {
    post: operations["EmailController_sendEmail"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    UserCredentialsDto: {
      /** @description The primary user's identifier. This has to be unique within the system and is only known to you for sign-in purposes. */
      username: string;
      /** @description The initial password. User will use this to authenticate themselves within the system. */
      password: string;
    };
    SignedUserResponseDto: {
      /** @description The JWT session token to use */
      accessToken: string;
    };
    UpdateUserCredentialsDto: {
      /** @description The initial password. User will use this to authenticate themselves within the system. */
      password: string;
      /** @description The new password that will replace the previous password. */
      newPassword: string;
    };
    PasswordDto: {
      /** @description The initial password. User will use this to authenticate themselves within the system. */
      password: string;
    };
    UsersHistoriesResponseDto: {
      /** @description The unique user identifier (UUIDv4) */
      userId: string;
      /** @description The activity code */
      activityId: number;
      /**
       * Format: date-time
       * @description The date the activity occured
       */
      createdDate: string;
    };
    CreateUserProfileBody: {
      /** @description The given, personal or primary name. This includes second name if you have one. */
      givenName: string;
      /** @description The middle name (if applicable) is a part of a name that may derive from your mother's maiden surname or both parents depending on your culture. */
      middleName?: string;
      /** @description The surname (a.k.a. lastname, family name, patrymonic or matrynomic name) is the part of the name that is passed down to indicate ancestry and is what is used by most cultures */
      surname?: string;
      /** @description (In cases patronymic names are not part of ones surname) The patronymic name is part of the name to indicate relation to the father which is applied in some culture (i.e. Russia, Greece, Armenia, and Georgia). For Iceland, use surname for patronymic or matronymic fields */
      patronymicName?: string;
      /** @description Honorific titles are part of names to formaly convey status */
      honorificTitle?: string;
      /** @description Name suffixes, like honorific titles, are elements added to the end of a person's name to convey additional information or respect. Suffixes can serve various purposes and may indicate factors such as academic degrees, professional qualifications, or hereditary titles */
      nameSuffix?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_getHello: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  /** Updates user password credentials */
  AuthController_updatePassword: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserCredentialsDto"];
      };
    };
    responses: {
      /** @description The user credential was updated successfully */
      200: {
        content: never;
      };
      /** @description Provided credentials are invalid */
      401: {
        content: never;
      };
    };
  };
  /**
   * Registers a new user
   * @description Use this to create a new user account. Note that this is a secured endpoint that can only be accessed thru an official domain
   */
  AuthController_registerNewUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCredentialsDto"];
      };
    };
    responses: {
      /** @description User is registered successfully. Response body will also contain new user information such as unique identifier. */
      201: {
        content: {
          "application/json": components["schemas"]["SignedUserResponseDto"];
        };
      };
      /** @description Username is already in use */
      409: {
        content: never;
      };
    };
  };
  /** Permanently deletes user data and granted permissions */
  AuthController_deleteUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PasswordDto"];
      };
    };
    responses: {
      /** @description The user data and grants were deleted successfully */
      204: {
        content: never;
      };
      /** @description Provided credentials are invalid */
      401: {
        content: never;
      };
    };
  };
  /** Signs-in the user and retrieve authentication session tokens */
  AuthController_signInUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCredentialsDto"];
      };
    };
    responses: {
      /** @description Access tokens are generated and provided */
      201: {
        content: never;
      };
      /** @description Provided credentials are invalid */
      401: {
        content: never;
      };
    };
  };
  /** Retrieves user information */
  UsersController_getCurrentUserInfo: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  /** Rertrieves user past activity histories */
  UserHistoriesController_getUserHistories: {
    parameters: {
      path: {
        /** @description The unique user identifier */
        userId: string;
      };
    };
    responses: {
      /** @description Successfully retrieved the user histories */
      200: {
        content: {
          "application/json": components["schemas"]["UsersHistoriesResponseDto"][];
        };
      };
    };
  };
  /**
   * Creates a new profile for the user
   * @description This allows a user to add a new profile to their account. If this is the first profile they made, it becomes the user's primary profile
   */
  UserProfilesController_createUserProfile: {
    parameters: {
      path: {
        /** @description The unique user identifier */
        userId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserProfileBody"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  EmailController_sendEmail: {
    responses: {
      201: {
        content: never;
      };
    };
  };
}
