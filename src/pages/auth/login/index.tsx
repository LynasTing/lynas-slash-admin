import Logo from '@/components/logo';
import PlaceholderIMG from '@/assets/images/background/placeholder.svg';

function Login() {
  return (
    <div className="relative grid min-h-svh lg:grid-cols-2">
      <article className="flex flex-col gap-4 p-6 md:p-10 ">
        <header className="flex justify-center gap-2 md:justify-start ">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Logo size={28} />
            <h1>Slash Admin</h1>
          </div>
        </header>
      </article>
      <div className="relative hidden lg:block">
        <img src={PlaceholderIMG} alt="Placeholder" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
