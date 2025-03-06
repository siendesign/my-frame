

import dynamic from 'next/dynamic';
import { NEXT_PUBLIC_URL } from './config';
import { Metadata } from 'next';

const Demo = dynamic(() => import('./components/Demo'), {
  ssr: false,
});

const frame = {
  version: "next",
  imageUrl: `${NEXT_PUBLIC_URL}/image.png`,
  button: {
    title: "🚩 Start",
    action: {
      type: "launch_frame",
      name: "test",
      url: NEXT_PUBLIC_URL,
      splashImageUrl: `${NEXT_PUBLIC_URL}/splash.png`,
      splashBackgroundColor: "#000000",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "test!",
    openGraph: {
      title: "test!",
      description: "test the flag",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <Demo />
    </main>
  );
}