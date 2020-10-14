import React from 'react';

const SnapAudio = () => {
    return (
        <audio autoPlay style={{ height: "0" }}>
            <source
                src="https://booth.snap.live/Content/shutter.ogg"
                type="audio/ogg"
            />
            <source
                src="https://booth.snap.live/Content/shutter.mp3"
                type="audio/mpeg"
            />
        </audio>
    )
}

export default SnapAudio;
