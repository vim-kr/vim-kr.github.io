const UsecaseLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!m-0 cursor-pointer select-none rounded-2xl px-[20px] py-10 text-4xl font-extrabold text-gray-600 md:px-[40px]
			  ${
                  isActive
                      ? 'border-4 border-gray-500 !text-blue-500 dark:!text-white'
                      : 'hidden border-2 border-gray-300 hover:border-opacity-40 hover:bg-gray-100 hover:bg-opacity-30 hover:bg-clip-padding hover:text-blue-300 hover:backdrop-blur-md hover:backdrop-filter md:block dark:hover:text-white'
              }`}
        >
            {children}
        </div>
    )
}

export default UsecaseLabel
