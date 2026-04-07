import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purwadhika School',
  description: 'Purwadhika School adalah sekolah bootcamp nomor 1 di Indonesia',
  keywords: [
    'sekolah bootcamp',
    'sekolah coding',
    'web development',
    'data science',
    'digital marketing',
    'ui/ux',
  ],
  authors: [
    {
      name: 'Purwadhika School',
    },
  ],
  openGraph: {
    title: 'Purwadhika School | Sekolah Bootcamp Nomor 1 di Indonesia',
    description:
      'Purwadhika School adalah sekolah bootcamp nomor 1 di Indonesia',
    images: [
      {
        url: 'https://cdn.antaranews.com/cache/1200x800/2022/09/13/purwadi.jpg',
        width: 640,
        height: 640,
        alt: 'Campus Purwadhika School',
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <h1>Static Metadata</h1>
    </>
  );
}
