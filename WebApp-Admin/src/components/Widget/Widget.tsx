

interface Props {
  percent: number,
  quantity: number,
  icon: string
}

const Widget = (props: Props) => {
  const {percent, quantity, icon} = props
  return (
    <div className='p-[24px] rounded h-[161px] bg-white relative hover:drop-shadow-xl' >
        <div></div> 
        <div className='flex justify-between'>
            <div className="w-[30px] h-[20px] object-cover"><i className={`${icon} text-[20px] text-purple-300`}></i></div>
            <div className="bg-green-500 rounded-[9999px] py-[2px] px-[10px] text-white text-[12px]">{percent}% <i className="fa-solid fa-arrow-up-wide-short"></i></div>
        </div>
        <div className="absolute bottom-[24px]">
            <h1 className='text-[24px] font-[700]'>{quantity}</h1>
            <span className='text-[14px] text-slate-300'>Items Sales</span>
        </div>
    </div>
  )
}

export default Widget