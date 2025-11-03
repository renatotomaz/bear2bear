// export default function Home() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-2xl font-bold text-gray-800">Hello, Bear2Bear!</h1>
//     </main>
//   );
// }

// src/app/page.tsx
import { redirect } from 'next/navigation'
export default function Home() { redirect('/auth') }
