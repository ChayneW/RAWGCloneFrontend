'use client'
import React, {useState, useRef, Suspense} from 'react'


const heroVids = [
    '/videos/group_gaming.mp4',
    '/videos/cs_competitive.mp4',
    '/videos/girl_gaming.mp4',
    // '/videos/intense_gaming_girl.mp4',
    '/videos/mortal-background.mp4',
]



const BackVid = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const handleVideoEnd = () => {
        console.log(`inside handleVideoEnd,current is ${currentVideoIndex}`)
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % heroVids.length);
    }

    const handleVideoError = () => {
        console.log(`error on video handling: current index: ${currentVideoIndex}`)
        if (currentVideoIndex === 0) {
            setCurrentVideoIndex(1);
        }
    }

    return (
        <div className='-z-10 absolute inset-0 w-full h-full'>
            Backvid:
            <Suspense fallback={<div className='-z-10 text-center'>Loading Video...</div>}>
                <div className="vid-container">
                    <video 
                        ref={videoRef}
                        className="absolute -z-10 inset-0 w-full h-full object-cover"
                        // className={`responsive-video ${isFading ? 'video-fade-out' : 'video-fade-in'}`}
                        autoPlay 
                        muted
                        preload='auto' 
                        playsInline
                        onEnded={handleVideoEnd}
                        src={`${heroVids[currentVideoIndex]}`}
                        // src={'/video/final-resize.mp4'}
                        // loop
                        onError={handleVideoError}
                        >
                        <source src={`${heroVids[currentVideoIndex]}`} type="video/mp4" />
                        Your Browser doesn&apos;t support Video Tag.
                    </video>
                    <div className='absolute inset-0 bg-black opacity-50 w-full h-full'></div>
                </div>
            </Suspense>
        </div>
    )
}

export default BackVid