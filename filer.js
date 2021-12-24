((D, B, log = (arg) => console.log(arg)) => {
    const dropZone = D.querySelector('div')
    const input = D.querySelector('input')
    let file

    D.addEventListener('dragover', (ev) => ev.preventDefault())
    D.addEventListener('drop', (ev) => ev.preventDefault())

    dropZone.addEventListener('click', () => {
        input.click()
        input.addEventListener('change', () => {
            log(input.files)
            file = input.files[0]
            handleFile(file)
        })
    })
    let context = []
    const recordsBP = []
    let oneStrformFile = ''
    const handleFile = async(file) => {
        dropZone.remove()
        input.remove()
        const allowedFiles = ['SD_workman.xml', 'apbstr.000.txt', 'DataTreeBP.CSV', 'DataTreeSubBP.CSV']
        if (
            allowedFiles.indexOf(file.name) == -1
        ) { return }

        switch (file.name) {
            case 'DataTreeBP.CSV':
                {
                    const url = 'http://127.0.0.1:8888/api/uploadfilesfromclient'
                    try {
                        let reader = new FileReader()
                            // reader.readAsArrayBuffer(file)
                        reader.readAsDataURL(file)
                        reader.onloadend = async function() {
                            let content = reader.result;
                            const base64String = content;
                            // try {
                            const result = await fetch(url, {
                                method: 'POST', // или 'PUT'
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "Accept-Encoding": "gzip",
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Transfer-Encoding": "base64"
                                },
                                body: JSON.stringify({
                                        content: base64String,
                                        name: file.name,
                                        lastModified: file.lastModified,
                                        size: file.size
                                    }) // данные могут быть 'строкой' или {объектом}!
                            });
                            const outtext = await result.text();

                            B.innerHTML = '<h3>' + outtext + '!</h3>'
                            const timer = setTimeout(() => {
                                location.reload()
                                clearTimeout(timer)
                            }, 5000);
                        };
                    } catch (error) {
                        console.error('Ошибка:', error)
                    }


                    break;
                }
            case 'SD_workman.xml':
                {
                    // createText("DataTreeBP.CSV");
                    const reader = new FileReader()
                    reader.readAsText(file, 'UTF-8')
                    const filename = 'SD_workman.xml';
                    const codepage = 'UTF-8'
                    reader.onloadend = async() => {
                        let content = reader.result;
                        const url = 'http://8-15604.ds.bapb.internal:8888/api/uploadfilesfromclient'
                        try {
                            const response = await fetch(url, {
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
                            })
                            const json = await response.json()
                            console.log('Успех:', JSON.stringify(json))
                        } catch (error) {
                            console.error('Ошибка:', error)
                        }
                    }
                    const s = 0
                        // const timer = setTimeout(() => {
                        //     location.reload()
                        //     clearTimeout(timer)
                        // }, 2000)
                        // break
                }
            case 'apbstr.000.txt': // 1251
                { // createText("DataTreeBP.CSV");
                    const reader = new FileReader()
                        // let textArray =
                    reader.readAsText(file, 'windows-1251')

                    reader.onloadend = async( /* dateStamp */ ) => {

                        context = reader.result

                        try {
                            const url = 'http://localhost:8081/api/ppload'
                            const response = await fetch(url, {
                                method: 'POST', // или 'PUT'
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(ppjson) // данные могут быть 'строкой' или {объектом}!

                            })

                            const json = await response.json()
                            console.log('Успех:', json)
                        } catch (error) {
                            console.error('Ошибка:', error)
                        }
                        // return recordsPP;
                    }
                    const s = 0
                    break
                }
            default:
                B.innerHTML = '<h3>Unknown File Format and (or) Filename  !</h3>'
                const timer = setTimeout(() => {
                    location.reload()
                    clearTimeout(timer)
                }, 2000)
                break
        }
    }
    const createText = (text) => {
        const reader = new FileReader()
        reader.readAsText(text, 'windows-1251')
        reader.onload = () => (B.innerHTML = `<p><pre>${reader.result}</pre></p>`)
    }
})(document, document.body)