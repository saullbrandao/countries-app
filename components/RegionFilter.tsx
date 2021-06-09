import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const RegionFilter = () => {
  const [filter, setFilter] = useState('')

  const handleFilter = region => setFilter(region)

  return (
    <Menu as="div" className="relative inline-block text-left text-light-text">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-between w-1/2 mx-4 rounded-md shadow-md p-4 bg-white text-light-text hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-light-text">
              Filter
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
              className="origin-top-right absolute mx-4 mt-2 w-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('africa')}
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
                      onClick={() => handleFilter('america')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      America
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleFilter('asia')}
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
                      onClick={() => handleFilter('europe')}
                      className={classNames(
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Europe
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