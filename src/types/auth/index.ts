import type { CurrentUser } from '#/system/user';

/**
 * 用户名、昵称、邮箱和密码注册请求参数。
 * 用于 `POST /auth/register` 的 JSON 请求体。
 *
 * Username, nickname, email, and password registration request.
 * Used as the JSON request body for `POST /auth/register`.
 */
export interface RegisterRequest {
  /**
   * 邮箱，最大长度 255 个字符
   *
   * Email, up to 255 characters
   */
  email: string;

  /**
   * 注册用户名，长度为 2 到 64 个字符。
   *
   * Registration username, from 2 to 64 characters.
   */
  username: string;

  /**
   * 注册密码，长度为 8 到 72 个字符。
   *
   * Registration password, from 8 to 72 characters.
   */
  password: string;

  /**
   * 可选昵称，填写时长度为 2 到 64 个字符；未填写时不发送该字段。
   *
   * Optional nickname, from 2 to 64 characters when provided; omitted when not entered.
   */
  nickname?: string;
}

/**
 * 认证与鉴权接口类型。
 * 本模块描述登录、注册、令牌刷新和 CSRF 接口解包后的请求与响应数据，供认证服务和认证表单复用。
 *
 * Authentication and authorization API types.
 * This module describes unwrapped request and response payloads for sign-in, registration, token refresh, and CSRF APIs for reuse by authentication services and forms.
 */

/**
 * 用户名密码登录请求参数。
 * 用于 `POST /auth/login` 的 JSON 请求体。
 *
 * Username and password sign-in request.
 * Used as the JSON request body for `POST /auth/login`.
 */
export interface LoginRequest {
  /**
   * 登录用户名，最大 64 个字符。
   * Swagger 未声明最小长度，因此不额外推断该约束。
   *
   * Login username, up to 64 characters.
   * Swagger does not declare a minimum length, so no additional constraint is inferred.
   */
  username: string;

  /**
   * 登录密码，长度为 8 到 72 个字符。
   *
   * Login password, from 8 to 72 characters.
   */
  password: string;
}

/**
 * 访问令牌响应。
 * 用于 `POST /auth/token/refresh` 解包后的响应数据。
 *
 * Access token response.
 * Used as the unwrapped response payload of `POST /auth/token/refresh`.
 */
export interface AuthAccessTokenResponse {
  /**
   * 新的访问令牌。
   *
   * New access token.
   */
  accessToken: string;

  /**
   * 访问令牌过期时间，采用 ISO-8601 日期时间字符串。
   *
   * Access token expiration time as an ISO-8601 date-time string.
   */
  expiresAt: string;
}

/**
 * 登录成功响应。
 * 用于 `POST /auth/login` 解包后的响应数据，包含访问令牌和当前用户资料。
 *
 * Successful sign-in response.
 * Used as the unwrapped response payload of `POST /auth/login`; contains an access token and current-user profile.
 */
export interface AuthLoginResponse extends AuthAccessTokenResponse {
  /**
   * 当前登录用户资料。
   * 该字段对应 `GET /auth/me` 的用户数据，未来可作为 Zustand 登录用户状态的值。
   *
   * Current signed-in user profile.
   * This field matches the user data from `GET /auth/me` and can become the value of the Zustand signed-in user state.
   */
  user: CurrentUser;
}

/**
 * CSRF Token 响应。
 * 用于 `GET /auth/token/csrf` 解包后的响应数据。
 *
 * CSRF token response.
 * Used as the unwrapped response payload of `GET /auth/token/csrf`.
 */
export interface AuthCsrfTokenResponse {
  /**
   * CSRF Token 值。
   *
   * CSRF token value.
   */
  token: string;

  /**
   * 提交 CSRF Token 时使用的 HTTP 请求头名称。
   *
   * HTTP request header name used to submit the CSRF token.
   */
  headerName: string;

  /**
   * 提交 CSRF Token 时使用的请求参数名称。
   *
   * Request parameter name used to submit the CSRF token.
   */
  parameterName: string;
}
