import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
type Props={
  title:string
  selected?:any
   onChange?:(e:any)=>void
   by?:string
   options:any
   error?:string
}
export default function ComboboxInput({options,title,selected,by,onChange,error}:Props) {
  const [query, setQuery] = useState('')

  
  const filteredOptions =
    query === ''
      ? options
      : options.filter((item) => {
          return item[by].toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" value={selected} onChange={(e)=>{
      !!onChange ? onChange(e) :undefined
    }}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{title}</Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item:any) => item[by]}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options   className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
              
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{item[by]}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      <span className="text-xs text-red-600 px-3">{error}</span>

    </Combobox>
  )
}