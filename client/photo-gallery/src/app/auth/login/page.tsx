// src/app/(auth)/login/page.tsx
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-[350px] p-4">
        <LoginForm />
      </div>
    </div>
  );
}