'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/products');
  }, [router]);

  return (
    <div className="container flex items-center justify-center h-[50vh]">
      <div className="animate-pulse">Redirecting to products...</div>
    </div>
  );
}
