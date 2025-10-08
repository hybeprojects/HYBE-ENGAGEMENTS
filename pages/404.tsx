import Link from 'next/link';
import FormLayout from '../components/FormLayout';

export default function NotFound() {
  return (
    <FormLayout
      title="404 | Page not found — HYBE Corporation"
      pageHeading="404 | This Page could not be found"
      subheading="The page you are looking for does not exist or may have been moved."
    >
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-gray-700">If you followed a link, please check that the URL is correct. You can return to the homepage or start a new proposal.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="accent-button">Go to Homepage</Link>
          <Link href="/artist-booking/proposal-form" className="text-sm text-gray-600 underline">Open Proposal Form</Link>
        </div>
      </div>
    </FormLayout>
  );
}
