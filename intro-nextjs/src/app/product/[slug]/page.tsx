import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <h1>Product Detail</h1>
      <Link href='/about'>About Page</Link>
    </>
  );
}
