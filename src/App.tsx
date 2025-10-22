import type { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function App({ children }: IProps) {
  return <div>React</div>;
}

export default App;
