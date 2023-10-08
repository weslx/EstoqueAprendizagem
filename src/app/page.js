// App.js
import React from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

// Use dynamic import to code-split the page
const Form = React.lazy(() => import('./form'));

const App = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Head>
        <title>Mobile App Interface</title>
      </Head>
      <h1 className="text-white text-center text-4xl mt-12">Mobile App Interface</h1>
      
      <div className="flex justify-center">
        {/* Use react-lazyload to lazy load the form component */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <Form />
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
