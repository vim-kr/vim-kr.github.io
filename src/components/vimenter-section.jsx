import React from 'react'
import vimEnterJson from '../data/vimenter-info.json'
import Marquee from './marquee/marquee-list'

const Banner = () => {
    return (
        <div style={styles.container}>
            <div style={styles.line}>
                <span style={styles.pinkText}>지난</span>
                <span style={styles.blueText}>VimEnter</span>
                <span style={styles.star}>모임</span>
            </div>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#2A2B5E',
        padding: '20px',
        textAlign: 'center',
        fontFamily: "'Fira Code', monospace",
    },
    line: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        fontSize: '2rem',
    },
    pinkText: {
        color: '#FF5C8D',
    },
    blueText: {
        color: '#66AFFF',
    },
    whiteText: {
        color: '#FFFFFF',
    },
    star: {
        color: '#FFFFFF',
        fontSize: '1.4rem',
        position: 'relative',
        top: '-5px',
    },
}

const VimEnterSection = () => {
    const eventImages = vimEnterJson.map((feature) => feature.images).flat()
    return (
        <section className="mb-32">
            <Banner />
            <div
                className="
      flex
      justify-center
      "
            >
                <Marquee images={eventImages} />
            </div>
            <ul
                className="
  flex
  flex-col
  gap-4
  "
            >
                {vimEnterJson.map((feature, index) => (
                    <li key={index} className="list-inside list-disc">
                        <a
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {feature.description} 보러가기 ({feature.title})
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default VimEnterSection
