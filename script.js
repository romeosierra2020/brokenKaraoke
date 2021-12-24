import songs from "./songs.js";
import Display from "./screen.js";
const root = document.getElementById("root");
const currentSong = document.getElementById("current-song");
let song = 0;
currentSong.innerText = (song + 1).toString();
let songFinished = true;

const pop = new Audio("sfx-pop.mp3");

window.addEventListener("click", (e) => {
    if (e.path[0].id === "btn-letters") {
        if (!songFinished) {
            return;
        }
        root.innerHTML = "";
        for (let i = 0; i < songs[song].notes.length; i++) {
            let lineHTML = "";
            console.log(song, i)
            console.log(songs[song])
            for (let j = 0; j < songs[song].notes[i].length; j++) {
                lineHTML += Display.getNote("note", i, j);
            }
            lineHTML += "";
            let newLine = document.createElement("div");

            newLine.innerHTML = lineHTML;
            root.appendChild(newLine);
        }
        let oldTimeStamp = 0;
        let cumulativeTime = 0;
        let elapsedTime = 0;
        let line = 0;
        let note = 0;
        const tick = (timeStamp) => {
            let beatLength = 60 / songs[song].tempo;
            songFinished = false;
            elapsedTime = timeStamp - oldTimeStamp;
            oldTimeStamp = timeStamp;
            cumulativeTime += elapsedTime;

            if (
                cumulativeTime >
                songs[song].pauses[line][note] * beatLength * 1000
            ) {
                let element = Display.getID(line, note);
                document.getElementById(element).innerText =
                    songs[song].notes[line][note][0].toUpperCase();
                pop.play();
                cumulativeTime = 0;
                note++;
                if (note >= songs[song].notes[line].length) {
                    note = 0;
                    line++;
                }
            }
            if (line < songs[song].notes.length) {
                window.requestAnimationFrame(tick);
            } else {
                songFinished = true;
            }
        };
        window.requestAnimationFrame(tick);
    }
    if (e.path[0].id === "btn-skip-bwd" && songFinished) {
        song--;
        if (song < 0) {
            song++;
        }
        currentSong.innerText = (song + 1).toString();
    }
    if (e.path[0].id === "btn-skip-fwd" && songFinished) {
        song++;
        if (song < 0) {
            song--;
        }
        currentSong.innerText = (song + 1).toString();
    }
    if(e.path[0].id === "btn-words") {
        root.innerHTML = "";
        for (let i = 0; i < songs[song].notes.length; i++) {
            let lineHTML = "";
            for (let j = 0; j < songs[song].notes[i].length; j++) {
                lineHTML += Display.getNote("word", i, j);
            }
            lineHTML += "";
            let newLine = document.createElement("div");

            newLine.innerHTML = lineHTML;
            root.appendChild(newLine);
        }
        let oldTimeStamp = 0;
        let cumulativeTime = 0;
        let elapsedTime = 0;
        let line = 0;
        let note = 0;
        const tick = (timeStamp) => {
            let beatLength = 60 / songs[song].tempo;
            songFinished = false;
            elapsedTime = timeStamp - oldTimeStamp;
            oldTimeStamp = timeStamp;
            cumulativeTime += elapsedTime;

            if (
                cumulativeTime >
                songs[song].pauses[line][note] * beatLength * 1000
            ) {
                let element = Display.getID(line, note);
                document.getElementById(element).innerText =
                    songs[song].notes[line][note] + " ";
                pop.play();
                cumulativeTime = 0;
                note++;
                if (note >= songs[song].notes[line].length) {
                    note = 0;
                    line++;
                }
            }
            if (line < songs[song].pauses.length) {
                window.requestAnimationFrame(tick);
            } else {
                song++;
                songFinished = true;
                currentSong.innerText = (song + 1).toString();
            }
        };
        window.requestAnimationFrame(tick);
    }
});
// window.addEventListener("keydown", (e) => {
//     console.log(e.key);

//     if (e.key === "ArrowRight" && songFinished) {
//         song++;
//         if (song >= songs.length) {
//             song--;
//         }
//         currentSong.innerText = (song + 1).toString();
//     }
//     if (e.key === " ") {
//         root.innerHTML = "";
//         for (let i = 0; i < songs[song].notes.length; i++) {
//             let lineHTML = "";
//             for (let j = 0; j < songs[song].notes[i].length; j++) {
//                 lineHTML += Display.getNote("word", i, j);
//             }
//             lineHTML += "";
//             let newLine = document.createElement("div");

//             newLine.innerHTML = lineHTML;
//             root.appendChild(newLine);
//         }
//         let oldTimeStamp = 0;
//         let cumulativeTime = 0;
//         let elapsedTime = 0;
//         let line = 0;
//         let note = 0;
//         const tick = (timeStamp) => {
//             let beatLength = 60 / songs[song].tempo;
//             songFinished = false;
//             elapsedTime = timeStamp - oldTimeStamp;
//             oldTimeStamp = timeStamp;
//             cumulativeTime += elapsedTime;

//             if (
//                 cumulativeTime >
//                 songs[song].pauses[line][note] * beatLength * 1000
//             ) {
//                 let element = Display.getID(line, note);
//                 document.getElementById(element).innerText =
//                     songs[song].notes[line][note] + " ";
//                 pop.play();
//                 cumulativeTime = 0;
//                 note++;
//                 if (note >= songs[song].notes[line].length) {
//                     note = 0;
//                     line++;
//                 }
//             }
//             if (line < songs[song].pauses.length) {
//                 window.requestAnimationFrame(tick);
//             } else {
//                 song++;
//                 songFinished = true;
//                 currentSong.innerText = (song + 1).toString();
//             }
//         };
//         window.requestAnimationFrame(tick);
//     }
// });
