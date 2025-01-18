import { Howl } from 'howler';

class SoundManagement {
    constructor() {
        this.sounds = {};
    }

    addSound({key, src, loop}) {
        this.sounds[key] = new Howl({
            src: [src],
            preload: true,
            loop: loop
        });
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
        } else {
            console.error(`Sound with key "${key}" not found.`);
        }
    }

    muteAllSounds(mute) {
        Object.keys(this.sounds).forEach((sound => {
            // this.sounds[sound].mute(mute);
            if (mute) {
                this.sounds[sound].fade(1, 0, 300);
            } else {
                this.sounds[sound].fade(0, 1, 300);
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
