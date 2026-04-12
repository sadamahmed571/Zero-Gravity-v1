    let ffAudioCtx = null;
    let currentAudio = null;
    let musicFiles = [
        { name: 'Deep Focus Alpha waves (موسيقى تركيز)', path: './music/focus.mp3' },
        { name: 'Ambient Rain (صوت المطر)', path: './music/rain.mp3' },
        { name: 'Brown Noise (ضوضاء بنية)', path: './music/noise.mp3' }
    ];
    let isPlaying = false;
    let isLooping = false;
    let isShuffling = false;
    let currentTrackIndex = -1;
    let fadeTimer = null;

    window.initAudioSystem = function() {
        if (!currentAudio) {
            currentAudio = new Audio();
            const savedVol = localStorage.getItem('ff_music_volume');
            if (savedVol !== null) {
                currentAudio.volume = parseFloat(savedVol);
                const slider = document.getElementById('volume-slider');
                if(slider) slider.value = savedVol;
            } else {
                currentAudio.volume = 0.5;
            }
            currentAudio.addEventListener('ended', window.onTrackEnded);
        }
    };

    window.renderMusicLibrary = function() {
        const lib = document.getElementById('music-library');
        if(!lib) return;
        lib.innerHTML = '';
        musicFiles.forEach((file, index) => {
            const isActive = index === currentTrackIndex;
            const btn = document.createElement('button');
            btn.className = `w-full text-right px-3 py-2 rounded-xl text-[10.5px] transition-all flex items-center justify-between group ${isActive ? 'bg-primary/20 text-primary border border-primary/30 font-bold shadow-[0_0_10px_rgba(var(--color-primary),0.1)]' : 'text-white/60 hover:bg-white/5 hover:text-white/90 border border-white/5'}`;
            btn.innerHTML = `
              <div class="flex items-center gap-2 overflow-hidden w-full">
                 <span class="material-symbols-outlined text-[15px] shrink-0 ${isActive && isPlaying ? 'animate-pulse text-primary' : (isActive ? 'text-primary' : 'text-white/30 group-hover:text-white/60')}" style="font-variation-settings: 'FILL' 1;">${isActive ? 'equalizer' : 'music_note'}</span>
                 <span class="truncate" dir="auto">${file.name}</span>
              </div>
            `;
            btn.onclick = () => window.playTrack(index);
            lib.appendChild(btn);
        });
    };

    window.playTrack = function(index) {
        window.initAudioSystem();
        if (currentTrackIndex === index && isPlaying) {
            window.pauseWithFade();
            return;
        } else if (currentTrackIndex === index && !isPlaying) {
            window.playWithFade();
            return;
        }
        
        currentTrackIndex = index;
        const file = musicFiles[index];
        
        if (file.fileObj) {
            const url = URL.createObjectURL(file.fileObj);
            currentAudio.src = url;
        } else {
            currentAudio.src = file.path;
        }
        
        document.getElementById('now-playing-title').innerText = file.name;
        window.renderMusicLibrary();
        window.playWithFade();
    };

    window.playWithFade = function() {
        const btn = document.getElementById('play-pause-btn');
        if(btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: \\'FILL\\' 1;">pause</span>';
        isPlaying = true;
        
        const iconBtn = document.getElementById('music-icon');
        if(iconBtn) {
           iconBtn.classList.replace('text-red-500/70', 'text-[#50C878]');
           iconBtn.classList.add('drop-shadow-[0_0_5px_rgba(80,200,120,0.6)]', 'animate-pulse-soft');
        }

        currentAudio.play().catch(e => console.warn('Music playback prevented', e));
        
        const slider = document.getElementById('volume-slider');
        const targetVol = slider ? parseFloat(slider.value) : 0.5;
        currentAudio.volume = 0;
        
        if (fadeTimer) clearInterval(fadeTimer);
        let vol = 0;
        fadeTimer = setInterval(() => {
            if (vol >= targetVol) {
                clearInterval(fadeTimer);
                currentAudio.volume = targetVol;
            } else {
                vol += 0.05;
                currentAudio.volume = Math.min(vol, targetVol);
            }
        }, 80);
        window.renderMusicLibrary();
    };

    window.pauseWithFade = function() {
        isPlaying = false;
        const btn = document.getElementById('play-pause-btn');
        if(btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: \\'FILL\\' 1;">play_arrow</span>';
        
        const iconBtn = document.getElementById('music-icon');
        if(iconBtn) {
           iconBtn.classList.replace('text-[#50C878]', 'text-red-500/70');
           iconBtn.classList.remove('drop-shadow-[0_0_5px_rgba(80,200,120,0.6)]', 'animate-pulse-soft');
        }

        const startVol = currentAudio.volume;
        let vol = startVol;
        if (fadeTimer) clearInterval(fadeTimer);
        fadeTimer = setInterval(() => {
            if (vol <= 0) {
                clearInterval(fadeTimer);
                currentAudio.pause();
                currentAudio.volume = startVol;
            } else {
                vol -= 0.05;
                currentAudio.volume = Math.max(vol, 0);
            }
        }, 50);
        window.renderMusicLibrary();
    };

    window.togglePlayPause = function() {
        window.initAudioSystem();
        if (currentTrackIndex === -1 && musicFiles.length > 0) {
            window.playTrack(0);
            return;
        }
        if (isPlaying) {
            window.pauseWithFade();
        } else {
            window.playWithFade();
        }
    };

    window.onTrackEnded = function() {
        if (isLooping) {
            currentAudio.currentTime = 0;
            window.playWithFade();
        } else if (isShuffling) {
            let nextIdx = Math.floor(Math.random() * musicFiles.length);
            window.playTrack(nextIdx);
        } else {
            let nextIdx = currentTrackIndex + 1;
            if (nextIdx < musicFiles.length) {
                window.playTrack(nextIdx);
            } else {
                window.pauseWithFade();
            }
        }
    };

    window.handleMusicImport = function(event) {
        const files = event.target.files;
        if (files && files.length > 0) {
            for(let i=0; i<files.length; i++) {
                musicFiles.push({
                    name: files[i].name,
                    fileObj: files[i]
                });
            }
            window.renderMusicLibrary();
        }
    };

    window.toggleLoop = function() {
        isLooping = !isLooping;
        const btn = document.getElementById('btn-loop');
        if(btn) {
           if (isLooping) {
               btn.classList.replace('text-white/40', 'text-primary');
               btn.classList.add('bg-primary/10');
           } else {
               btn.classList.replace('text-primary', 'text-white/40');
               btn.classList.remove('bg-primary/10');
           }
        }
    };

    window.toggleShuffle = function() {
        isShuffling = !isShuffling;
        const btn = document.getElementById('btn-shuffle');
        if(btn) {
           if (isShuffling) {
               btn.classList.replace('text-white/40', 'text-primary');
               btn.classList.add('bg-primary/10');
           } else {
               btn.classList.replace('text-primary', 'text-white/40');
               btn.classList.remove('bg-primary/10');
           }
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        if(typeof window.renderMusicLibrary === 'function') {
            window.renderMusicLibrary();
        }

        const volumeSlider = document.getElementById('volume-slider');
        if(volumeSlider) {
            // Support updating while dragging
            volumeSlider.addEventListener('input', (e) => {
                const vol = e.target.value;
                if(currentAudio) {
                   currentAudio.volume = vol;
                }
            });
            // Save on distinct changes
            volumeSlider.addEventListener('change', (e) => {
                const vol = e.target.value;
                localStorage.setItem('ff_music_volume', vol);
            });
        }
    });
