import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdowm-menu';
import Button from '@/ui/button';
import { useUserInfo, useUserActions } from '@/store/user';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLoginStateContext, LoginStateEnum } from '@/pages/auth/providers/declaration';
import { useNavigate } from 'react-router';

export default function AccountDropdown() {
  const { avatar, username, email } = useUserInfo();
  const { t } = useTranslation();
  const { clearUserInfoAndToken } = useUserActions();
  const { setLoginState } = useLoginStateContext();
  const navigate = useNavigate();

  /**
   * 退出登录
   * Logout
   */
  const logout = () => {
    try {
      clearUserInfoAndToken();
      setLoginState(LoginStateEnum.LOGIN);
    } catch (error) {
      console.log(`error + ::>>`, error);
    } finally {
      navigate('/auth/login', {
        replace: true
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <img src={avatar} className="w-6 h-6 rounded-full" alt="avatar" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex items-center gap-2 p-2">
          <img src={avatar} className="w-10 h-10 rounded-full" alt="avatar" />
          <div className="flex flex-col items-start">
            <div className="text-text-primary tex-sm font-medium">{username}</div>
            <div className="text-text-secondary text-xs">{email}</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* 文档 */}
        <DropdownMenuItem asChild>
          <NavLink to="https://docs-admin.slashspaces.com/" target="_black">
            {t('sys.docs')}
          </NavLink>
        </DropdownMenuItem>

        {/* 个人资料 / profile */}
        <DropdownMenuItem asChild>
          <NavLink to="https://docs-admin.slashspaces.com/" target="_black">
            {t('dashboard.nav.user.profile')}
          </NavLink>
        </DropdownMenuItem>

        {/* 账户 / account */}
        <DropdownMenuItem asChild>
          <NavLink to="https://docs-admin.slashspaces.com/" target="_black">
            {t('dashboard.nav.user.account')}
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* 退出 / logout */}
        <DropdownMenuItem className="text-warning font-bold" onClick={logout}>
          {t('auth.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
