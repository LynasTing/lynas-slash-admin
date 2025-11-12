/**
 * 拼接 url
 * Join URLs parts
 *
 * @example
 * urlJoin('/admin/', '/api/', '/user/') === '/admin/api/user'
 * urlJoin('/admin', 'api', 'user/') === '/admin/api/user'
 * urlJoin('/admin/', '', '/user/') === '/admin/user'
 */
export const urlJoin = (...parts: string[]) => {
  const result = parts
    .map(str => {
      /**
       * 去掉 字符串开头和结尾的所有 /
       *
       * ^   匹配字符串开头
       * \/+ 匹配一个或多个/
       * \/+ 匹配一个或多个/
       * $   匹配字符串结尾
       * g   全局匹配
       */
      return str.replace(/^\/+|\/+$/g, '');
    })
    .filter(Boolean);
  return `/${result.join('/')}`;
};
