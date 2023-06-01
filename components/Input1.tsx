type Props={
    title:string
    value?:any
     onChange?:(e:any)=>void
     type?:string
     error?:string
}

export default function Input1({title,value, onChange,type,error}:Props){
    return (
        <div>
        <label
          htmlFor="project-name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title}
        </label>
        <div className="mt-2">
          <input
            type={type ?? "text"}
            onChange={(e)=>{!!onChange ?onChange(e):undefined}}
            value={value }
            name={title}
            id={title+"id"}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <span className="text-xs text-red-600 px-3">{error}</span>
      </div>
    )
}