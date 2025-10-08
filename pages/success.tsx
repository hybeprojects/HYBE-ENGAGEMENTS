import type { GetStaticProps } from 'next';
import Link from 'next/link';
import FormLayout from '../components/FormLayout';

export default function Success() {
  return (
    <FormLayout
      title="Submission Successful | HYBE Corporation"
      pageHeading="Proposal Submitted"
      subheading="Your official proposal has been successfully submitted. Our Artist Management & Partnerships Division will review your request and contact you within 7–14 business days."
      smallLabel="Confirmation"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <p className="text-gray-700">Thank you for your submission.</p>
          <Link href="/artist-booking/proposal-form" className="accent-button w-full sm:w-auto">Submit another proposal</Link>
        </div>
      </div>
    </FormLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  };
};
