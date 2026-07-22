import { http, delay, HttpResponse } from 'msw';
import { GLOBAL_CONFIG } from '@/config/global';
import { USER_API_MAP, type DeleteUserPayload } from '@/api/services/user';
import { ResultStatusEnum } from '#/enum';
import { DB_USER } from '@/_mock/_backup';
import type { UserFormValues } from '@/pages/management/system/user/types';
import type { Role, User } from '#/entity';
import { mockRoles } from '@/pages/management/system/role/role-mock';
import { faker } from '@faker-js/faker';

/**
 * 用户管理 mock 数据源。
 * 直接引用 DB_USER 而不克隆，使用户 CRUD、登录与默认登录表单使用同一份内存数据。
 *
 * User management mock data source.
 * DB_USER is referenced directly rather than cloned so user CRUD, sign-in, and the default login form share the same in-memory data.
 */
const userStore: User[] = DB_USER;

/**
 * 将表单提交的角色 ID 转换为用户实体持久化的完整角色数据。
 * 用户实体需要角色详情供列表展示和权限判断使用，roleIds 只应存在于表单提交边界。
 * @param roleIds - 表单选择的角色 ID 列表。
 * @returns 已解析的角色列表；包含未知角色时返回 null。
 *
 * Resolves form role ids into the complete role data persisted on a user entity.
 * User entities retain role details for list rendering and permission checks; roleIds belong only at the form submission boundary.
 * @param roleIds - Role ids selected in the form.
 * @returns Resolved roles, or null when an unknown role is included.
 */
const resolveUserRoles = (roleIds: string[]): Role[] | null => {
  /*
   * 只接受角色数据源中存在的 ID，避免把失效或伪造的角色写入用户。
   *
   * Only ids present in the role source are accepted, preventing stale or fabricated roles from being stored on a user.
   */
  const selectedRoles = roleIds.map(roleId => mockRoles.find(role => role.id === roleId)).filter((role): role is Role => Boolean(role));

  return selectedRoles.length === roleIds.length ? structuredClone(selectedRoles) : null;
};

/**
 * 获取用户列表。
 * delay 用于模拟真实网络延迟，帮助页面验证加载、提交和刷新时序。
 *
 * Gets the user list.
 * The delay simulates real network latency so the page can exercise loading, submission, and refresh timing.
 */
const getUserList = http.get(GLOBAL_CONFIG.apiBaseUrl + USER_API_MAP.LIST, async () => {
  await delay(300);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: userStore
  });
});

/**
 * 创建用户。
 * 请求载荷保留 roleIds，写入数据源前必须转换为完整 roles，保证 DB_USER 始终符合 User 实体定义。
 *
 * Creates a user.
 * The request payload retains roleIds, which must be converted into complete roles before storage so DB_USER always conforms to the User entity definition.
 */
const createUser = http.post(GLOBAL_CONFIG.apiBaseUrl + USER_API_MAP.CREATE, async ({ request }) => {
  await delay(300);

  const value = (await request.json()) as UserFormValues;
  const roles = resolveUserRoles(value.roleIds);

  /*
   * 创建和编辑使用相同的身份唯一性规则，避免首次创建时写入脏数据。
   *
   * Creation and editing share the same identity uniqueness rules so invalid duplicate data cannot enter the store initially.
   */
  if (hasDuplicateUsername(value)) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'Username already exists'
    });
  }

  if (hasDuplicateUserEmail(value)) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'Email already exists'
    });
  }

  if (!roles) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'One or more selected roles do not exist'
    });
  }

  userStore.push({
    id: faker.string.uuid(),
    username: value.username,
    password: value.password,
    email: value.email,
    avatar: value.avatar,
    status: value.status,
    roles
  });

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '操作成功',
    data: null
  });
});

/**
 * 删除用户。
 * 找不到目标时返回业务失败，而不是静默成功，便于页面发现列表已过期或请求数据有误。
 *
 * Deletes a user.
 * A missing target returns a business failure instead of succeeding silently, allowing the page to detect stale list data or an invalid request.
 */
const deleteUser = http.delete(GLOBAL_CONFIG.apiBaseUrl + USER_API_MAP.DELETE, async ({ request }) => {
  await delay(300);

  const { id } = (await request.json()) as DeleteUserPayload;
  const targetIndex = userStore.findIndex(i => i.id === id);

  if (targetIndex < 0) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'User not found'
    });
  }

  userStore.splice(targetIndex, 1);
  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '操作成功',
    data: null
  });
});

/**
 * 校验用户名是否与其他用户重复。
 * 比较时忽略首尾空白和大小写，避免视觉相同的账号绕过唯一性限制。
 * @param value - 待校验的用户表单字段。
 * @returns 是否存在重复用户名。
 *
 * Checks whether a username duplicates another user.
 * Comparison ignores surrounding whitespace and casing so visually identical accounts cannot bypass the uniqueness rule.
 * @param value - User form fields to validate.
 * @returns Whether a duplicate username exists.
 */
const hasDuplicateUsername = (value: Pick<UserFormValues, 'id' | 'username'>): boolean =>
  userStore.filter(i => i.id !== value.id).some(i => i.username.trim().toUpperCase() === value.username.trim().toUpperCase());

/**
 * 校验邮箱是否与其他用户重复。
 * @param value - 待校验的用户表单字段。
 * @returns 是否存在重复邮箱。
 *
 * Checks whether an email duplicates another user.
 * @param value - User form fields to validate.
 * @returns Whether a duplicate email exists.
 */
const hasDuplicateUserEmail = (value: Pick<UserFormValues, 'id' | 'email'>): boolean =>
  userStore.filter(i => i.id !== value.id).some(i => i.email?.trim().toUpperCase() === value.email?.trim().toUpperCase());

/**
 * 更新用户。
 * 保留未提交的密码，并将 roleIds 解析为完整 roles 后写入，避免表单传输结构污染用户实体。
 *
 * Updates a user.
 * It preserves an omitted password and resolves roleIds into complete roles before writing, preventing the form transport shape from polluting the user entity.
 */
const updateUser = http.put(GLOBAL_CONFIG.apiBaseUrl + USER_API_MAP.UPDATE, async ({ request }) => {
  await delay(300);

  const value = (await request.json()) as UserFormValues;
  const targetIndex = userStore.findIndex(i => i.id === value.id);

  /*
   * 编辑只能覆盖已存在用户，避免过期表单把更新错误地变成新增。
   *
   * Updates must target an existing user so stale forms cannot turn an edit into an accidental creation.
   */
  if (targetIndex < 0) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'User not found'
    });
  }

  if (hasDuplicateUsername(value)) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: '重复的用户名'
    });
  }
  if (hasDuplicateUserEmail(value)) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: '该邮箱已被使用'
    });
  }

  const roles = resolveUserRoles(value.roleIds);

  if (!roles) {
    return HttpResponse.json({
      status: ResultStatusEnum.ERROR,
      message: 'One or more selected roles do not exist'
    });
  }

  userStore[targetIndex] = {
    ...userStore[targetIndex],
    username: value.username,
    email: value.email,
    avatar: value.avatar,
    status: value.status,
    roles,
    ...(value.password ? { password: value.password } : {})
  };

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '操作成功',
    data: null
  });
});

export { getUserList, createUser, deleteUser, updateUser };
