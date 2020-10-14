import React from 'react';

const BoomerangAudio = () => {
    return (
        <audio loop autoPlay>
            <source
                src="https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/music.mp3"
                type="audio/ogg"
            />
            <source
                src="https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/music.mp3"
                type="audio/mpeg"
            />
        </audio>
    )
}

export default BoomerangAudio;
