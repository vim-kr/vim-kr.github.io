import React from 'react'

const VimEnterCard = ({ event }) => {
    const yearMatch = event.title.match(/\d{4}/)
    const year = yearMatch ? yearMatch[0] : ''

    return (
        <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="relative rounded-xl border border-vim-blue/20 bg-vim-dark-secondary/50 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-vim-blue/40 hover:bg-vim-dark-secondary/70 hover:shadow-2xl hover:shadow-vim-blue/20">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vim-blue/20">
                            <i className="fas fa-calendar-alt text-xl text-vim-blue"></i>
                        </div>
                        <div>
                            <h3
                                className="text-xl font-bold text-vim-blue"
                                style={{ color: '#7aa2f7 !important' }}
                            >
                                {event.title}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {event.description}
                            </p>
                        </div>
                    </div>
                    <i className="fas fa-external-link-alt text-gray-300 transition-colors group-hover:text-vim-blue"></i>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                        <i className="fas fa-images"></i>
                        {event.images.length} 사진
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="fas fa-user"></i>
                        {event.author}
                    </span>
                </div>

                <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
                    <span className="text-6xl font-bold text-vim-purple">
                        {year}
                    </span>
                </div>
            </div>
        </a>
    )
}

export default VimEnterCard
