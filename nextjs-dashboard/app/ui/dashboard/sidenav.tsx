import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-lightgrey">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-orange-500 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40 justify-center items-center">
          <Image
                src="/Logo.jpeg"
                alt="Meal Map"
                width={400}
                height={400}
                className='hidden md:block'
            />

          <Image
                src="/Logo.jpeg"
                alt="Meal Map"
                width={50}
                height={50}
                className='block md: hidden'
            />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-orange-500 p-3 text-sm font-medium hover:bg-orange-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" href="/localhost:3004"/>
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
