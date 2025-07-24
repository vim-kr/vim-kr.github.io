const UsecaseLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!m-0 cursor-pointer select-none rounded-2xl px-[20px] py-10 text-4xl font-extrabold md:px-[40px]
			  ${
                  isActive
                      ? 'border-4 border-vim-blue !text-vim-cyan'
                      : 'hidden border-2 border-gray-600 text-gray-300 hover:border-opacity-60 hover:bg-vim-dark-secondary hover:bg-opacity-50 hover:bg-clip-padding hover:text-vim-blue hover:backdrop-blur-md hover:backdrop-filter md:block'
              }`}
        >
            {children}
        </div>
    )
}

export default UsecaseLabel
