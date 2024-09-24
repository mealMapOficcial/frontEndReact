
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from "./ui/home.module.css"
import { lusitana } from './ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex items-center justify-center h-20 items-end rounded-lg bg-orange-500 p-4 md:h-52">
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-seablue md:text-3xl md:leading-normal`}>
            <strong>Welcome to Meal Map.</strong> {' '} The guide to the flavor
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/*Image here*/} 
        </div>
      </div>
    </main>
  );
}
