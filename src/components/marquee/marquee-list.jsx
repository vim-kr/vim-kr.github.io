import React from 'react'

const Marquee = ({ images }) => {
    // Filter out empty images and duplicate for seamless infinite scroll
    const validImages = images.filter((img) => img)
    const duplicatedImages = [...validImages, ...validImages]

    return (
        <div className="relative w-full overflow-hidden">
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .marquee-content {
                    display: flex;
                    animation: scroll 30s linear infinite;
                }

                .marquee-content:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="marquee-content">
                {duplicatedImages.map((image, index) => (
                    <div
                        key={index}
                        className="mr-4 h-[180px] w-[240px] flex-none overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Marquee
