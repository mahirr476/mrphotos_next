// src/app/(auth)/register/page.tsx
// import { RegisterForm } from '@/components/auth/register-form';

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="w-full max-w-[350px] p-4">
//         <RegisterForm />
//       </div>
//     </div>
//   );
// }



import { RegisterForm } from '@/components/auth/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="">
      <RegisterForm/>
    </div>
  )
}

export default RegisterPage
