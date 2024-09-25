import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

const dummyInvoices = [
  { id: '1', name: 'John Doe', email: 'john@example.com', amount: '$100.00', image_url: '/images/profile1.jpg' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', amount: '$250.00', image_url: '/images/profile2.jpg' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', amount: '$75.00', image_url: '/images/profile3.jpg' },
];

export default function LatestInvoices() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-orange-500 p-4">

        <div className="bg-white px-6">
          {dummyInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-white" />
          <h3 className="ml-2 text-sm text-white ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
