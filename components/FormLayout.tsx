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
          <div className="flex items-center justify-between gap-4">
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
            <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
              <a href="#" className="hover:text-hybePurple">About</a>
              <a href="#" className="hover:text-hybePurple">Artists</a>
              <a href="#" className="hover:text-hybePurple">Careers</a>
              <a href="#" className="hover:text-hybePurple">Contact</a>
            </nav>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">{pageHeading}</h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600">{subheading}</p>
        </div>
      </header>

      <main className="container-page py-8">{children}</main>

      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="container-page py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <img
                src="https://res.cloudinary.com/dgqhyz67g/image/upload/0f22d319-d299-465c-af1a-c5261c935f9a_removalai_preview_hzdvg2.png"
                alt="HYBE"
                className="h-8 w-auto"
              />
              <p className="mt-4 text-sm text-gray-600">HYBE Corporation — Global artist management and creative entertainment group. For official inquiries, use our proposal submission portal.</p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Explore</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://hybecorp.com/eng/company/info" className="footer-link" target="_blank" rel="noreferrer noopener">About HYBE</a></li>
                <li><a href="https://hybecorp.com/eng/company/artist" className="footer-link" target="_blank" rel="noreferrer noopener">Artists</a></li>
                <li><a href="https://hybecorp.com/eng/news/news" className="footer-link" target="_blank" rel="noreferrer noopener">News</a></li>
                <li><a href="https://careers.hybecorp.com/?locale=en_US" className="footer-link" target="_blank" rel="noreferrer noopener">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Legal & Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://hybeinsight.com/policy/privacy?locale=en" className="footer-link" target="_blank" rel="noreferrer noopener">Privacy Policy</a></li>
                <li><a href="https://hybecorp.com/eng/cookie" className="footer-link" target="_blank" rel="noreferrer noopener">Cookie Policy</a></li>
                <li><a href="https://hybecorp.com/eng/news/announcements" className="footer-link" target="_blank" rel="noreferrer noopener">Media & Announcements</a></li>
                <li><a href="https://hybecorp.com/eng/company/business" className="footer-link" target="_blank" rel="noreferrer noopener">Business Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} HYBE Corporation. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com" aria-label="Instagram" className="footer-social" target="_blank" rel="noreferrer noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="footer-social" target="_blank" rel="noreferrer noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://www.youtube.com" aria-label="YouTube" className="footer-social" target="_blank" rel="noreferrer noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 15l5-3-5-3v6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
