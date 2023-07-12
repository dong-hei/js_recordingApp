//dom
const recordBtn = document.querySelector(".record-btn")
const stopBtn = document.querySelector(".stop-btn")
const playBtn = document.querySelector(".play-btn")
const downloadBtn = document.querySelector(".download-btn")
const previewPlayer = document.querySelector("#preview")
const recordingPlayer = document.querySelector("#recording")

let recorder;
let recordedChunks = [];

// functions
function videoStart() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        previewPlayer.srcObject = stream; //녹화화면을 보여주기
        startRecord(previewPlayer.captureStream()) //실시간으로 보여지는 화면 녹화
    })
    // navigator -> mediaDevice 를 통해 웹브라우저 기능에 접근을 하고 사용할것이다.
}

function startRecording(stream){
    recordedChunks = []; // 항상 새롭게 녹화된내용이 담긴다.
    const recorder = new MediaRecorder(stream)
    recorder.ondataavailable = (e) =>{recordedChunks.push(e.data)}
    recorder.start()
    // 실행되는 데이터가 available 되면 e.data가 recordedChunks 안에 push가 된다.
}

function stopRecording(){
    previewPlayer.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop()
    //srcObject에 getTrack를 하게 되면 관련된 트랙 정보가 출력된다
}

function playRecording(){
    const recordedBlob = new Blob(recordedChunks, {type: "video/webm"});
    recordingPlayer.src = URL.createObjectURL(recordedBlob)
    recordingPlayer.play()
    downloadBtn.href=recordingPlayer.src;
    downloadBtn.download = `recording_${new Date()}.webm`;  
        //Blob은 이미지,사운드,비디오와 같은 멀티미디어 데이터를 다룰때 사용한다.
}

//event
recordBtn.addEventListener("click", videoStart);
stopBtn.addEventListener("click",stopRecording);
playBtn.addEventListener("click",playRecording);   