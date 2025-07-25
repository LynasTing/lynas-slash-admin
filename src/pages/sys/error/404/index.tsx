import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Page404: FC<IProps> = () => {
  return <div>这里是404</div>;
};

export default Page404;
