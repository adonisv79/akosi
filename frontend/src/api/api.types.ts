/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserCredentialsDto {
  /**
   * The primary user's identifier. This has to be unique within the system and is only known to you for sign-in purposes.
   * @minLength 8
   * @maxLength 255
   */
  username: string;
  /**
   * The initial password. User will use this to authenticate themselves within the system.
   * @minLength 8
   * @maxLength 255
   */
  password: string;
}

export interface SignedUserResponseDto {
  /** The JWT session token to use */
  accessToken: string;
}

export interface UpdateUserCredentialsDto {
  /**
   * The initial password. User will use this to authenticate themselves within the system.
   * @minLength 8
   * @maxLength 255
   */
  password: string;
  /**
   * The new password that will replace the previous password.
   * @minLength 8
   * @maxLength 255
   */
  newPassword: string;
}

export interface UpdateUserInfoDto {
  /**
   * The given, personal or primary name. This includes second name if you have one.
   * @min 1
   */
  givenName: string;
  /**
   * The middle name (if applicable) is a part of a name that may derive from your mother's maiden surname or both parents depending on your culture.
   * @min 1
   */
  middleName: string;
  /**
   * The surname (a.k.a. lastname, family name, patrymonic or matrynomic name) is the part of the name that is passed down to indicate ancestry and is what is used by most cultures
   * @min 1
   */
  surname: string;
  /**
   * (In cases patronymic names are not part of ones surname) The patronymic name is part of the name to indicate relation to the father which is applied in some culture (i.e. Russia, Greece, Armenia, and Georgia). For Iceland, use surname for patronymic or matronymic fields
   * @min 1
   */
  patronymicName: string;
  /**
   * Honorific titles are part of names to formaly convey status
   * @min 1
   */
  honorificTitle: string;
  /**
   * Name suffixes, like honorific titles, are elements added to the end of a person's name to convey additional information or respect. Suffixes can serve various purposes and may indicate factors such as academic degrees, professional qualifications, or hereditary titles
   * @min 1
   */
  nameSuffix: string;
  /**
   * The date of birth based on the gregorian calendar
   * @format date-time
   */
  dateOfBirth: string;
  /**
   * The biological sex a person is born with. Note that this is different from gender
   * @default 0
   */
  biologicalSex: 0 | 1;
}

export interface AddLanguageDto {
  /** The language identifier */
  lang: "en" | "zh";
  /**
   * The proficiency level. 1-unfamiliar, 2-basic, 3-conversational, 4-proficient, 5-fluent
   * @min 1
   * @max 5
   */
  proficiency: number;
}

export interface UsersHistoriesResponseDto {
  /** The unique user identifier (UUIDv4) */
  userId: string;
  /** The activity code */
  activityId: number;
  /**
   * The date the activity occured
   * @format date-time
   */
  createdDate: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title akosi-api
 * @version 0.0.1
 * @contact
 *
 * The akosi-api is an OAuth + OIDC based system that focuses on providing an authentication system granting privacy, security and control for the users.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  auth = {
    /**
     * @description Use this to create a new user account. Note that this is a secured endpoint that can only be accessed thru an official domain
     *
     * @tags User Authentication
     * @name AuthControllerRegisterNewUser
     * @summary Registers a new user
     * @request POST:/auth
     */
    authControllerRegisterNewUser: (data: UserCredentialsDto, params: RequestParams = {}) =>
      this.request<SignedUserResponseDto, void>({
        path: `/auth`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Authentication
     * @name AuthControllerUpdatePassword
     * @summary Updates user password credentials
     * @request PUT:/auth
     * @secure
     */
    authControllerUpdatePassword: (data: UpdateUserCredentialsDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Authentication
     * @name AuthControllerDeleteUser
     * @summary Permanently deletes user data and granted permissions
     * @request DELETE:/auth
     * @secure
     */
    authControllerDeleteUser: (data: UserCredentialsDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Authentication
     * @name AuthControllerSignInUser
     * @summary Signs-in the user and retrieve authentication session tokens
     * @request POST:/auth/login
     */
    authControllerSignInUser: (data: UserCredentialsDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetCurrentUserInfo
     * @summary Retrieves user information
     * @request GET:/users/self
     * @secure
     */
    usersControllerGetCurrentUserInfo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/self`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateUser
     * @summary Updates user information
     * @request PUT:/users
     */
    usersControllerUpdateUser: (data: UpdateUserInfoDto, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerAddLanguage
     * @request POST:/users/lang
     */
    usersControllerAddLanguage: (data: AddLanguageDto, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/lang`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User Histories
     * @name UserHistoriesControllerGetUserHistories
     * @summary Rertrieves user past activity histories
     * @request GET:/users/{userId}/histories
     * @secure
     */
    userHistoriesControllerGetUserHistories: (userId: string, params: RequestParams = {}) =>
      this.request<UsersHistoriesResponseDto[], any>({
        path: `/users/${userId}/histories`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
