import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
  pageHeading: string;
  subheading: string;
  smallLabel?: string;
};

export default function FormLayout({ title, children, pageHeading, subheading, smallLabel }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Official artist engagement and partnership proposal submission to HYBE Corporation." />
      </Head>
      <header className="border-b border-gray-200 bg-white">
        <div className="container-page py-6">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dgqhyz67g/image/upload/0f22d319-d299-465c-af1a-c5261c935f9a_removalai_preview_hzdvg2.png"
              alt="HYBE Corporation"
              className="h-8 w-auto"
            />
            {smallLabel ? (
              <span className="badge-label">{smallLabel}</span>
            ) : null}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">{pageHeading}</h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">{subheading}</p>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </>
  );
}
