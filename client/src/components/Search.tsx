export default function Search() {
  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md w-2/5 ">
      <input className='placeholder-slate-950 text-slate-950 focus:outline-none p-4 w-full' type="text" placeholder="Search..." />
      <button onClick={() => console.log('Search')} className='group cursor-pointer text-slate-950 bg-teal-600 text-white transition hover:bg-teal-500 rounded-r-lg p-4 font-bold h-full'>
        <span className='inline-block transition-transform duration-200 group-hover:scale-125'>Search</span>
      </button>
    </div>
  )
}