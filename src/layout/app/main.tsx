import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { LineLoading } from '@/components/loading';

const Main = () => {
  return (
    <main>
      <Suspense fallback={<LineLoading />}>
        <Outlet />
      </Suspense>
    </main>
  );
};
export default Main;
