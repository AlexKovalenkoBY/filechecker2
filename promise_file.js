const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
    });
};

const handleUpload = async(event) => {
    const file = event.target.files[0];
    const fileContentDiv = document.querySelector('div#file-content')

    try {
        const fileContents = await readUploadedFileAsText(file)
        fileContentDiv.innerHTML = fileContents
    } catch (e) {
        fileContentDiv.innerHTML = e.message
    }
}

document.querySelector('input#primary-file-upload').addEventListener('change', handleUpload)