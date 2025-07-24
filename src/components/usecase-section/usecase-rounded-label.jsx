const UsecaseRoundedLabel = ({ isActive = false, children }) => {
    return (
        <div
            className={`!md:none !m-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-2xl font-extrabold text-gray-200 hover:bg-gray-600 hover:text-white ${
                isActive ? 'bg-gray-600 !text-white' : ''
            }`}
        >
            {children}
        </div>
    )
}

export default UsecaseRoundedLabel
