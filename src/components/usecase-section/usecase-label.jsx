const UsecaseLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!m-0 cursor-pointer rounded-2xl py-10 text-6xl font-extrabold text-gray-600
			  ${
                  isActive
                      ? 'text-white'
                      : 'hidden hover:border-4 hover:border-gray-300 hover:border-opacity-40 hover:bg-gray-100 hover:bg-opacity-30 hover:bg-clip-padding hover:text-white hover:backdrop-blur-md hover:backdrop-filter md:block'
              }`}
        >
            {children}
        </div>
    )
}

export default UsecaseLabel
