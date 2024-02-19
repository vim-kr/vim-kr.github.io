const UsecaseLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!m-0 cursor-pointer rounded-2xl py-10 text-4xl font-extrabold text-gray-600
			  ${
                  isActive
                      ? '!text-blue-500 dark:!text-white'
                      : 'hidden hover:border-4 hover:border-gray-300 hover:border-opacity-40 hover:bg-gray-100 hover:bg-opacity-30 hover:bg-clip-padding hover:text-blue-300 hover:backdrop-blur-md hover:backdrop-filter md:block dark:hover:text-white'
              }`}
        >
            {children}
        </div>
    )
}

export default UsecaseLabel
