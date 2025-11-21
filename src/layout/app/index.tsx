import Main from './main';

export default function AppLayout() {
  return <PCLayout />;

  function PCLayout() {
    return <Main />;
  }
}
