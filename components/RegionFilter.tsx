import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const RegionFilter = ({ filter, handleFilter }) => {
  return (
    <Menu as="div" className="relative inline-block text-left text-light-text dark:">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-between w-1/2 mx-4 rounded-md shadow-md p-4 bg-white dark:bg-dark-elements text-light-text dark:text-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-light-text">
              {filter || 'Filter'}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"

          >
            <Menu.Items
              static
              className="origin-top-right absolute mx-4 mt-2 w-1/2 rounded-md shadow-lg bg-white dark:bg-dark-elements dark:text-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('Africa')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Africa
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('Americas')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Americas
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('Asia')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Asia
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('Europe')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Europe
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('Oceania')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Oceania
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}