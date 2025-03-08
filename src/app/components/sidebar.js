
const Sidebar = ({children}) => {

    return(
        <div className='h-[calc(100vh-89px)] w-[300px] border-r-4 border-gray-200 grid grid-rows-2 gap-y-8 bg-gray-50'>
            
            {children}

        </div>
    )
}
export default Sidebar;