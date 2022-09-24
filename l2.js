const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const songCurrentTime = $('.current-time');
const songDurationTime = $('.duration-time');
const player = $('.player')
const progressBar = $('.progress')
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const playlist =  $('.playlist');

let songPlayed = [];
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    song:
        [
            {
                name: 'I Will Follow You',
                singer: 'Ricky Nelson',
                path: './assets/music/I-Will-Follow-You.mp3',
                image: 'https://m.media-amazon.com/images/I/81YZWbD79PL._SS500_.jpg',
            },
            {
                name: 'Bằng Lăng Nở Hoa',
                singer: 'Anh Rồng, G5R Squad',
                path: './assets/music/BangLangNoHoaRemix-AnhRong.mp3',
                image:
                    'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/6/8/2/5/6825cac216a2e2c5e54c183862ba6abd.jpg',
            },
            {
                name: 'Despacito',
                singer: 'Luis Fonsi,Daddy Yankee',
                path: './assets/music/Despacito - Luis Fonsi_ Daddy Yankee.mp3',
                image: 'https://cdnimg.vietnamplus.vn/uploaded/tngztn/2017_07_07/despacito.jpg',
            },
            {
                name: 'Cơn Mơ Băng Giá',
                singer: 'Bằng Kiều',
                path: './assets/music/Con-Mo-Bang-Gia-Bang-Kieu.mp3',
                image:
                    'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/b/0/3/0/b030d520467eaf28c7d7a0ec931d3e7d.jpg',
            },
            {
                name: 'Thất Tình',
                singer: 'Trịnh Đình Quang',
                path: './assets/music/That-Tinh-Trinh-Dinh-Quang.mp3',
                image:
                    'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/avatars/8/5/85b4710d31d2806e237269c1063f7358_1462333009.jpg',
            },
            {
                name: 'Thay Đổi',
                singer: 'LilWuyn',
                path: './assets/music/Thay Doi - Lil_ Wuyn.mp3',
                image:
                    'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/c/9/6/dc9603deb245f9ee8859f8e0da4041b7.jpg',
            },
            {
                name: 'Tòng Phu',
                singer: 'Keyo',
                path: './assets/music/Tong-Phu-Dai-Meo-Remix-Keyo.mp3',
                image:
                    'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg',
            },
        ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.song[this.currentIndex]
            }
        })
    },
    render: function () {
        const html = this.song.map((song, idx) => {
            return `
                <div class="song ${idx === this.currentIndex ? 'active' : ''}" data-index='${idx}'>
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = html.join('')
    },
    handleEvent: function () {

        const _this = this // copy this
        const cdWidth = cd.offsetWidth
        // CD
        document.onscroll = function () {
            const scrollTop = window.screenY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        cdThumAnimation = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10s
            iterations: Infinity
        })
        cdThumAnimation.pause()
        // Click play button
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Xử lý khi được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumAnimation.play();
        };

        // Xử lý khi bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumAnimation.pause();
        };

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime * 100) / audio.duration
                );
                progressBar.value = progressPercent;
                progressBar.style.background = `linear-gradient(to right, #ff2a5f ${progressPercent}%, #ccc 0%)`;

                // Xử lý tiến độ
                const minutesCurrent =
                    Math.floor(audio.currentTime / 60) <= 9
                        ? '0' + Math.floor(audio.currentTime / 60)
                        : Math.floor(audio.currentTime / 60);
                const secondsCurrent =
                    Math.floor(audio.currentTime - minutesCurrent * 60) <= 9
                        ? '0' + Math.floor(audio.currentTime - minutesCurrent * 60)
                        : Math.floor(audio.currentTime - minutesCurrent * 60);
                const minutesDuration =
                    Math.floor(audio.duration / 60) <= 9
                        ? '0' + Math.floor(audio.duration / 60)
                        : Math.floor(audio.duration / 60);
                const secondsDuration =
                    Math.floor(audio.duration - minutesDuration * 60) <= 9
                        ? '0' + Math.floor(audio.duration - minutesDuration * 60)
                        : Math.floor(audio.duration - minutesDuration * 60);
                songCurrentTime.innerText = minutesCurrent + ':' + secondsCurrent;
                songDurationTime.innerText = minutesDuration + ':' + secondsDuration;
            }
        }
        // Xử lý khi tua song
        progressBar.oninput = function (e) {
            const seekTime = (e.target.value * audio.duration) / 100;
            audio.currentTime = seekTime;
        }

        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            _this.activeSong();
            audio.play();
        }
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            _this.activeSong();
            audio.play();
        }
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.loop = true;
                audio.play();
            } else {
                btnNext.click();
            }
        }
        btnRepeat.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            btnRepeat.classList.toggle('active', _this.isRepeat)
        }
        btnRandom.onclick = function () {
            _this.isRandom = !_this.isRandom;
            // _this.setConfig('isRandom', _this.isRandom);
            this.classList.toggle('active', _this.isRandom);
        };

        // lang gnhe hanh vi click
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option');
            if (songNode || optionNode) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.activeSong();
                    audio.play();
                }

            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            })
        }, 100)
    },
    activeSong: function () {
        const allSong = $$('.song');
        for (let i = 0; i < allSong.length; i++) {
            allSong[i].classList.remove('active');
            $(`[data-index='${this.currentIndex}']`).classList.add('active');
        }
    },
    randomSong: function () {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.song.length);
        } while (songPlayed.includes(randomIndex) === true);
        this.currentIndex = randomIndex;
        songPlayed.push(randomIndex);
        if (songPlayed.length === this.song.length) {
            songPlayed = [];
        }
        this.loadCurrentSong();
    },
    nextSong: function () {
        if (this.isRandom) {
        }
        this.currentIndex++;
        if (this.currentIndex >= this.song.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render()
        this.scrollToActiveSong()
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.song.length - 1;
        }
        this.loadCurrentSong();
        this.render()
        this.scrollToActiveSong()
    },
    randomSong: function () {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.song.length);
        } while (songPlayed.includes(randomIndex) === true);
        this.currentIndex = randomIndex;
        songPlayed.push(randomIndex);

        if (songPlayed.length === this.song.length) {
            songPlayed = [];
        }
        this.loadCurrentSong();
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    start: function () {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
    }
}

app.start()