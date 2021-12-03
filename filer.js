/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

((D, B, log = (arg) => console.log(arg)) => {
    const dropZone = D.querySelector('div')
    const input = D.querySelector('input')
    let file

    D.addEventListener('dragover', (ev) => ev.preventDefault())
    D.addEventListener('drop', (ev) => ev.preventDefault())

    dropZone.addEventListener('click', async() => {
        input.click()
        input.addEventListener('change', async() => {
            log(input.files)
            file = input.files[0]
            const allowedFiles = ['SD_workman.xml', 'apbstr.000.txt']
            if (
                allowedFiles.indexOf(file.name) == -1
            ) {
                B.innerHTML = '<h3>Загрузка файла с таким именем НЕ разрешена!!! </h3>'
                const timer = setTimeout(() => {
                    location.reload()
                    clearTimeout(timer)
                }, 2000)
                return
            } else {
                // let response = null;
                dropZone.remove()
                input.remove();
                unpoadFile1(file)
                let response = uploadFile(file)
                if ((response.status == 200)) {
                    B.innerHTML = '<h3>Загрузка файла с именем ' + file.name + ' прошла успешно </h3>'
                        //B.appendChild = `<div><p><pre>${response.statusText}</pre></p></div>`
                    const timer = setTimeout(() => {
                        location.reload()
                        clearTimeout(timer)
                    }, 3000)
                }
                const tt = 0;
            }
        })
    })
    const upload = (file) => {
        fetch('http://8-15604.ds.bapb.internal:8888/api/uploadfilesfromclient/', { // Your POST endpoint
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip",
            },
            body: file // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    };

    function uploadFile(file) {
        let result = null;

        switch (file.name) {
            case 'SD_workman.xml':
                {
                    // createText("DataTreeBP.CSV");
                    const reader = new FileReader()
                    reader.readAsText(file, 'UTF-8')
                    const filename = 'SD_workman.xml';
                    const codepage = 'UTF-8'
                    reader.onloadend = async() => {
                        let content = reader.result;
                        const url = 'http://8-15604.ds.bapb.internal:8888/api/uploadfilesfromclient/'
                            // try {
                        result = await fetch(url, {
                            method: 'POST', // или 'PUT'
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Accept-Encoding": "gzip",
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: JSON.stringify({
                                    filename: filename,
                                    codepage: codepage,
                                    content: reader.result
                                }) // данные могут быть 'строкой' или {объектом}!
                        });


                    }
                    break
                }
            case 'apbstr.000.txt':
                {
                    // createText("DataTreeBP.CSV");
                    const reader = new FileReader()
                    reader.readAsText(file, 'CP1251')
                    const filename = 'apbstr.000.txt';
                    const codepage = 'CP1251'
                    let encoder = new TextEncoder();

                    const datatosend = JSON.stringify({
                        filename: filename,
                        codepage: codepage,
                        content: reader.result
                    });
                    reader.onloadend = async() => {
                        let content = reader.result;

                        const url = 'http://8-15604.ds.bapb.internal:8888/api/uploadfilesfromclient/'
                        try {
                            let response = await fetch(url, {
                                method: 'POST', // или 'PUT'
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "Accept-Encoding": "gzip",
                                },
                                body: datatosend // данные могут быть 'строкой' или {объектом}!
                            })
                        } catch (error) {
                            console.error('Ошибка:', error)
                        } finally {
                            return response
                        }
                    }
                    break
                }
            default:
                // B.innerHTML = '<h3>Unknown File Format and (or) Filename  !</h3>'
                // const timer = setTimeout(() => {
                //     location.reload()
                //     clearTimeout(timer)
                // }, 2000)
                break
        }
        return result
    }

    function unpoadFile1(file) {
        const reader = new FileReader()
            // reader.readAsText(file, 'UTF-8')
        reader.readAsBinaryString(file)
        reader.onloadend = async() => {
            console.log(reader.result)
            const tt = 0;
        }

    }
})(document, document.body)
const createText = (text) => {
    const reader = new FileReader()
    reader.readAsText(text, 'windows-1251')
    reader.onload = () => (B.innerHTML = `<p><pre>${reader.result}</pre></p>`)
}