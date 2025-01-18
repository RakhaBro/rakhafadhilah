import { Howl } from 'howler';

class SoundManagement {
    constructor() {
        this.sounds = {};
    }

    soundDataList = [];

    addSound({key, src, loop, volume}) {
        this.sounds[key] = new Howl({
            src: [src],
            preload: true,
            loop: loop,
            volume: volume ?? 1
        });
        this.soundDataList.push({
            "key": key,
            "loop": loop,
            "volume": volume ?? 1
        })
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
        } else {
            console.error(`Sound with key "${key}" not found.`);
        }
    }

    muteAllSounds(mute) {
        Object.keys(this.sounds).forEach((soundKey => {
            const soundVol = this.soundDataList.find((data) => data.key == soundKey).volume;
            if (mute) {
                this.sounds[soundKey].fade(soundVol, 0, 300);
            } else {
                this.sounds[soundKey].fade(0, soundVol, 300);
            }
        }));
    }

    stopSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].stop();
        } else {
            console.error(`Sound with key "${key}" not found.`);
        }
    }
}

export default new SoundManagement();
