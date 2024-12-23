import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = ({role}) => {
  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-xl font-semibold text-orange-500">404</p>
          <h1 className="mt-4 text-balance md:text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Page not found
          </h1>
            {(role == 'admin')?
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Theatre admin have access only to Theatredetails Page
            </p>
            :
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            }
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-85"
            >
              <span className='pr-1.5' aria-hidden="true">&#11164;</span>
              Go to {(role == 'admin') ? 'Theatredetails': 'home'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PageNotFound
