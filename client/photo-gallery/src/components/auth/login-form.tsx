
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const { login, socialLogin } = useAuth(); // Added `socialLogin` for social authentication
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      await login(values);
      router.push('/dashboard/gallery'); // Update this path
    } catch (error) {
      const errorMessage = (error as any)?.response?.data?.message || 'Invalid credentials';
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialLogin(provider: 'google' | 'github') {
    try {
      setIsLoading(true);
      await socialLogin(provider); // Example: Trigger social login for the chosen provider
      router.push('/dashboard/gallery'); // Redirect after successful login
    } catch (error) {
      toast({
        title: `Login with ${provider} failed`,
        description: 'Something went wrong. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Login</h2>
      </CardHeader>
      <CardContent>
        {/* Email and Password Login */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>

        {/* Social Media Authentication */}
        <div className="mt-6 space-y-2">
          <Button
            onClick={() => handleSocialLogin('google')}
            className="w-full bg-red-500 text-white hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue with Google'}
          </Button>
          <Button
            onClick={() => handleSocialLogin('github')}
            className="w-full bg-gray-800 text-white hover:bg-gray-900"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue with GitHub'}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
