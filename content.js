const dropZone = document.querySelector('#drop-zone');
const inputElement = document.querySelector('input');
const img = document.querySelector('img');
const downloadImg = document.querySelector('#download')
const compressimg = document.querySelector('#compress')
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

function applyChanges() {
    const element = document.getElementById('selectNumber').value;
    console.log(element)

    let formdata = new FormData();
    formdata.append("files[]", inputElement.files[0]);
    formdata.append("fil", element);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    displayLoading()


    fetch("https://image-filtering-api-flask.herokuapp.com/upload", requestOptions)
        .then(response => response.blob())
        .then(imageBlob => {
            hideLoading()
            const imageObjectURL = URL.createObjectURL(imageBlob);
            console.log(imageObjectURL);
            img.src = imageObjectURL;
            const link = document.createElement('a');
            link.href = imageObjectURL;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            downloadImg.addEventListener('click', () => link.click());

        })

}



compressimg.addEventListener('click', applyChanges)








// FOR ANIMATION

const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 10000);
}


// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}