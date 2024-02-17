const UsecaseDescription = ({
    description,
    route,
}: {
    description: string
    route: string
}) => {
    return (
        <a href={route} className="flex items-center !text-custom-gray">
            <div>{description}</div>
            <i className="fa-solid fa-arrow-right !m-0 pl-[10px]"></i>
        </a>
    )
}

export default UsecaseDescription
