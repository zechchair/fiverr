import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { isMobile } from "react-device-detect";
import cn from "classnames";
export default function PaginationUi(Props) {
  if (Props.len == 1) {
    return null;
  }
  return (
    <div className="fixed   bg-white lg:ml-72  p-5 inset-x-0 bottom-0 ">
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={async () => {
                if (Props.selected > 1) {
                  // Props.setSelected(Props.selected - 1);
                  await Props.onChange(Props.selected - 1);
                }
              }}
              className={cn(
                "inline-flex items-center border-t-2 hover:border-purple-600 pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                Props.selected > 1 ? "" : " invisible"
              )}
            >
              <ArrowLongLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </button>
          </div>
          <div className={cn("-mt-px flex")}>
            <a
              onClick={async () => {
                // Props.setSelected(1);
                await Props.onChange(1);
              }}
              className={cn(
                Props.selected == 1 ?
                "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
              :  "inline-flex cursor-pointer  hidden sm:block items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              
                )}
            >
              1
            </a>
            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {Props.selected > 2 ? (
            <span className="inline-flex  hidden sm:block items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>		) : null}


           {Props.selected != 1 && Props.selected != Props.len ? <a
          
              className={cn(
                // 
                "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                )}
            >
              								{Props.selected}

            </a>:undefined}
            {Props.selected < Props.len - 1 ? (
            <span className="inline-flex hidden sm:block items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>	
            	) : undefined}

            {Props.len != 1 ? (
            <a
              onClick={async () => {
                // Props.setSelected(1);
                await Props.onChange(Props.len)
              }}
              className={cn(
                Props.selected != Props.len?
                "inline-flex items-center hidden sm:block cursor-pointer border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              :"inline-flex items-center  border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                )}
            >
              									{Props.len}

            </a>

) : null}

          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
            onClick={async () =>
							{
								if (Props.len > Props.selected)
								{
									// Props.setSelected(Props.selected + 1);
									await Props.onChange(Props.selected + 1)
								}
							}}
              className={cn(
                "inline-flex items-center border-t-2 hover:border-purple-600 pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                Props.len > Props.selected ? "" : " invisible"
              )}>
              
              Next
              <ArrowLongRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
    </div>
  );
}
