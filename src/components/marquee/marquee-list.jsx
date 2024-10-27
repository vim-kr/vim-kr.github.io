import React from 'react'

const Marquee = ({ images }) => {
    return (
        <div
            className="
      relative
      w-[min(600px,100%)]
      overflow-hidden
      "
        >
            <div className="flex animate-marquee">
                {images.map((image, index) => (
                    <div key={index} className="!mt-0 mr-[10px] flex-none">
                        <img
                            src={image}
                            alt=""
                            className="!h-[150px] !w-[200px] object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Marquee
