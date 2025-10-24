import type { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function App({ children }: IProps) {
  return <>{children}</>;
}

export default App;
