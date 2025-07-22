import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  return (
    <>
      <div>这里是登录页面</div>
      <div />
      <img src="xxx.png" />
    </>
  );
};

export default Login;
