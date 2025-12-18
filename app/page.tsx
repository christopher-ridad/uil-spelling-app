"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="bg-[#FFF7F5] font-sans flex grow flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo-icon.svg"
              alt="Polaroid Album Logo"
              className="w-10 h-10"
            />
            <h1 className="text-4xl font-bold text-gray-900">Polaroid Album</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClickLogin}
              className="px-6 py-3 bg-[#E06C71] text-white font-medium rounded-full hover:bg-[#F5A3A7] transition"
            >
              Sign In
            </button>
            <button
              onClick={onClickSignup}
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-200 transition border-2 border-gray-300"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>
      <div className="bg-[#FFF7F5] flex flex-col grow justify-center">
        <main className="bg-[#E06C71] p-16 flex flex-row items-center justify-around">
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome to your Polaroid Album
              </h1>
              <h3 className="text-2xl text-white">
                Create and share beautiful photo memories
              </h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={onClickLogin}
                className="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition"
              >
                Sign In
              </button>
              <button
                onClick={onClickSignup}
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-200 transition border border-gray-300"
              >
                Create Account
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
