// // src/components/auth/register-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { authService } from '@/api/services/auth'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type FormData = z.infer<typeof formSchema>

export function RegisterForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  })

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true)
      const { confirmPassword, ...registrationData } = values
      await authService.register(registrationData)
      await login({ 
        email: values.email, 
        password: values.password 
      })
      
      toast({
        title: "Registration successful",
        description: "Welcome to Photo Gallery!",
      })
  
      router.push('/gallery')
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as any).response?.data?.message || 'Something went wrong',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      {...field} 
                      className="h-9"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      {...field} 
                      className="h-9"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-10 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center pt-2">
        <p className="text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}



