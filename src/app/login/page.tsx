import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image alt="Banner login" fill src="/banner-login.jpg" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Image className="mx-auto mb-8" alt="Logo" width={180} height={150} src="/logo-uneb.svg" />

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
