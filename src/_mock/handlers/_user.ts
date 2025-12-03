import { http, HttpResponse } from 'msw';
import { GLOBAL_CONFIG } from '@/config/global';
import { UserApi } from '@/api/services/auth';
import { DB_ROLE, DB_USER, DB_USER_ROLE, DB_ROLE_PERMISSION, DB_MENU, DB_PERMISSION } from '../_backup';
import { convertFlatToTree } from '@/utils';
import { ResultStatusEnum } from '#/enum';
import { faker } from '@faker-js/faker';

/**
 * Mock 登录接口
 * Mock sign-in API handler
 *
 * 使用 msw 拦截请求，模拟用户登录验证与权限返回。
 * Intercepts HTTP requests using MSW, simulating user authentication and permission response.
 */
const signIn = http.post(GLOBAL_CONFIG.apiBaseUrl + UserApi.SignIn, async ({ request }) => {
  /**
   * 从请求体中解析用户名和密码
   * Parse username and password from request body
   */
  const { username, password } = (await request.json()) as Record<string, string>;

  /**
   * 在 mock 数据库中查找匹配的用户
   * Find the user in the mock DB by username
   */
  const user = DB_USER.find(i => i.username === username);

  /**
   * 如果用户名不存在或密码不匹配，则返回错误响应
   * Return error if user not found or password mismatch
   */

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10001,
      message: 'Incorrect username or password'
    });
  }

  /**
   * 解构出密码并丢弃，防止返回给前端
   * Remove password field before returning user data
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPaassword } = user;

  /**
   * 查询用户角色（通过 userId → roleId）
   * Find all roles associated with the user (via userId → roleId)
   */
  const roles = DB_USER_ROLE.filter(i => i.userId === user.id).map(i => DB_ROLE.find(j => j.id === i.roleId));

  /**
   * 根据角色获取对应的权限（roleId → permissionId）
   * Find permissions linked to these roles (roleId → permissionId)
   */
  const rolePermissions = DB_ROLE_PERMISSION.filter(i => roles.some(j => j?.id === i.roleId));
  /**
   * 根据 permissionId 获取实际的权限对象
   * Map permission IDs to actual permission objects
   */
  const permissions = rolePermissions.map(i => DB_PERMISSION.find(j => j.id === i.permissionId));

  /**
   * 将扁平菜单数据转换为树形结构
   * Convert flat menu data into a tree structure
   */
  const menu = convertFlatToTree(DB_MENU);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: {
      user: {
        ...userWithoutPaassword,
        roles,
        permissions,
        menu
      },
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid()
    }
  });
});

/**
 * Mock 注册接口
 * Mock sign-up API handler
 */
const signUp = http.post(GLOBAL_CONFIG.apiBaseUrl + UserApi.SignUp, async ({ request }) => {
  const { username, password, email } = (await request.json()) as Record<string, string>;

  /**
   * 检查用户是否已存在
   * Check if user already exists
   */
  const exist = DB_USER.find(i => i.username === username);

  if (exist) {
    return HttpResponse.json({
      status: 10001,
      message: 'User already exists'
    });
  }

  /**
   * 生成新用户
   * Generate new user
   */
  const userId = faker.string.uuid();
  const user = {
    id: userId,
    username,
    password,
    email,
    avatar: faker.image.avatarGitHub()
  };

  /**
   * 写入库
   * Write to DB
   */
  DB_USER.push(user);

  /**
   * 给新用户分配默认角色
   * Assign default role to new user
   */
  const roleId = DB_ROLE.find(i => i.id === 'role_test_id')?.id;
  if (roleId) {
    DB_USER_ROLE.push({
      id: userId,
      userId: user.id,
      roleId
    });
  }

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: 'Register success',
    data: {}
  });
});

export { signIn, signUp };
