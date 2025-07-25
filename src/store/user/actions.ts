import { useMutation } from '@tanstack/react-query';
import { useUserActions } from './selectors';
import { signinApi, type SignInParams } from '@/api/services/user';
import { toast } from 'sonner';

export const useSignIn = () => {
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: signinApi
  });

  const signIn = async (data: SignInParams) => {
    try {
      const r = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = r;
      setUserInfo(user);
      setUserToken({
        accessToken,
        refreshToken
      });
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center'
      });
      throw err;
    }
  };

  return signIn;
};
