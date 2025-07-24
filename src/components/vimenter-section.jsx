import React from 'react'
import vimEnterJson from '../data/vimenter-info.json'
import VimEnterGallery from './vimenter-gallery'
import VimEnterCard from './vimenter-card'

const Banner = () => {
    return (
        <div className="border-y border-vim-purple/30 bg-vim-dark-secondary/80 py-8 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 text-3xl font-bold">
                <span className="text-vim-pink">지난</span>
                <span className="text-vim-blue">VimEnter</span>
                <span className="text-white">모임</span>
            </div>
        </div>
    )
}

const VimEnterSection = () => {
    const eventImages = vimEnterJson
        .map((feature) => feature.images)
        .flat()
        .filter((img) => img)
    return (
        <section className="mb-32">
            <Banner />
            <div className="my-12">
                <h3
                    className="mb-8 text-center text-2xl font-bold text-vim-blue"
                    style={{ color: '#7aa2f7 !important' }}
                >
                    행사 사진 갤러리
                </h3>
                <VimEnterGallery images={eventImages} />
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {vimEnterJson.map((event, index) => (
                    <VimEnterCard key={index} event={event} />
                ))}
            </div>
        </section>
    )
}

export default VimEnterSection
