const UsecaseRoundedLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!md:none !m-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-3xl font-extrabold text-gray-400 hover:bg-white hover:text-black ${
                isActive ? 'bg-white !text-black' : ''
            }`}
        >
            {children}
        </div>
    )
}

export default UsecaseRoundedLabel
