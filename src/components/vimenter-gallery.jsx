import React, { useState } from 'react'

const VimEnterGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null)

    // 각 이미지에 무작위 회전 각도 생성 (-15도에서 15도 사이)
    const getRandomRotation = () => {
        return Math.floor(Math.random() * 31) - 15
    }

    return (
        <>
            <div className="polaroid-gallery">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="polaroid-item"
                        style={{
                            transform: `rotate(${getRandomRotation()}deg)`,
                        }}
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image}
                            alt={`VimEnter 행사 사진 ${index + 1}`}
                            loading="lazy"
                        />
                        <div className="polaroid-caption">
                            VimEnter #{index + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* 라이트박스 */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-h-[90vh] max-w-5xl">
                        <img
                            src={selectedImage}
                            alt="확대된 이미지"
                            className="max-h-full max-w-full object-contain"
                        />
                        <button
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedImage(null)
                            }}
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default VimEnterGallery
