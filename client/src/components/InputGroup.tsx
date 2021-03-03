import classNames from 'classnames';

interface InputGroupProps{
    className?:string
    type:string
    placeholder:string
    value:string
    errors:string | undefined
    setValue:(srt:string)=>void

}

const InputGroup:React.FC<InputGroupProps>=({className,type,placeholder,value,errors,setValue})=>{

    return(

        <div className={className}>
        <input value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder={placeholder} className={classNames("w-full p-3 py-2 bg-gray-100 border-gray-400 rounded outline-none focus:bg-white hover:bg-white",{'border-red-500':errors})} type={type}/>

        <small className="font-medium text-red-600">{errors}</small>
      </div>
    )
}

export default InputGroup