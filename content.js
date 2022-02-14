const dropZone = document.querySelector('#drop-zone');
const inputElement = document.querySelector('input');
const img = document.querySelector('img');
const compressImg = document.querySelector('#compress')
let p = document.querySelector('p')

inputElement.addEventListener('change', function (e) {
    const clickFile = this.files[0];
    if (clickFile) {
        img.style = "display:block;";
        p.style = 'display: none';
        const reader = new FileReader();
        reader.readAsDataURL(clickFile);
        reader.onloadend = function () {
            const result = reader.result;
            let src = this.result;
            img.src = src;
            img.alt = clickFile.name
        }
    }


    let formdata = new FormData();
    formdata.append("files[]", inputElement.files[0]);
    formdata.append("fil", "CONTOUR");
    formdata.append("compress", "true");
    formdata.append("quality", "10");

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://image-filtering-api-flask.herokuapp.com/upload", requestOptions)
        .then(response => response.text())
        .then(imgresult => console.log(imgresult))
        .catch(error => console.log('error', error));
})

dropZone.addEventListener('click', () => inputElement.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    img.style = "display:block;";
    let file = e.dataTransfer.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        e.preventDefault()
        p.style = 'display: none';
        let src = this.result;
        img.src = src;
        img.alt = file.name
    }

});