/* eslint-disable no-unused-vars */

((D, B, log = (arg) => console.log(arg)) => {
    const bpInput = D.getElementById('BPfile')
    const ppInput = D.getElementById('PPfile')
    const bpLabel = D.getElementById('bplabel')
    const startButton = D.getElementById('mainbutton')
    let contextBPfile = null
    const diffBP = null
    let contextBPSql = null
    const recordsBP = []
    let contextPPfile = null
    const diffPP = null
    let contextPPSql = null
    const recordsPP = []
        /* ************************************************************************* */
    startButton.addEventListener('click', async(_button) => {
        console.log('button start proceed')
        const bp = document.getElementById('BPfile').files[0]
        const pp = document.getElementById('PPfile').files[0]

        if ((bp.name !== 'DataTreeBP.CSV') ||
            (pp.name !== 'DataTreeSubBP.CSV')) {
            document.location.reload()
                // location.reload() // window.location.reload()
        } else {
            const to_hide = document.getElementsByClassName('dada')
            for (let i = 0; i < to_hide.length; i++) {
                to_hide[i].hidden = true
            }

            let spinner = D.createElement('div');
            spinner.className = "loader"
            B.appendChild(spinner)
            console.log('Spiner  created')

            const dateStampBP = new Date(bp.lastModified).getDate() + '.' + String((new Date(bp.lastModified).getMonth())).replace(/^(\d)$/, '0$1') + '.' + new Date(bp.lastModified).getFullYear()
            const dateStampPP = new Date(pp.lastModified).getDate() + '.' + String((new Date(pp.lastModified).getMonth())).replace(/^(\d)$/, '0$1') + '.' + new Date(pp.lastModified).getFullYear()
            const bpfileContent = await readUploadedFileAsText(bp)
            let bppp = bpfileContent.split('\n')
            for (let i = 0; i < bppp.length; i++) {
                let oneStrformFile = bppp[i].split('","')
                if (oneStrformFile !== '') {
                    recordsBP.push({
                        bp_id_aris: Number(oneStrformFile[0].slice(1)),
                        cod_bp_txt: oneStrformFile[4],
                        d_start: oneStrformFile[7],
                        d_stop: oneStrformFile[8],
                        // datestamp: dateStampBP,
                        from_id: Number(oneStrformFile[6]),
                        naim_bp: oneStrformFile[2],
                        num_bp: oneStrformFile[1],
                        owner: Number(oneStrformFile[3]),
                        vyd: Number(oneStrformFile[5])
                    })
                }
            }
            const url = 'http://127.0.0.1:8081/getallBPwithMaxDate'
            const response = await fetch(url)
            const data = await response.json()
            contextBPSql = data.data
            console.log('Успех BP:', JSON.stringify(data))
                // считываем ПП 
            const ppfileContent = await readUploadedFileAsText(pp)
            const contextpp = ppfileContent.split('\n')
            for (let i = 0; i < contextpp.length; i++) {
                let oneStrformFile = contextpp[i].split('|')
                if (oneStrformFile !== '') {
                    recordsPP.push({
                        id_aris_parent_bp: Number(oneStrformFile[0]),
                        id_aris_parent_sub_bp: Number(oneStrformFile[1]),
                        sub_bp_id_aris: Number(oneStrformFile[2]),
                        num_sub_bp: oneStrformFile[3],
                        naim_sub_bp: oneStrformFile[4],
                        owner: Number(oneStrformFile[5]),
                        vyd: oneStrformFile[6],
                        d_start: oneStrformFile[7],
                        d_stop: oneStrformFile[8]
                    })
                }

            }
            const urlpp = 'http://127.0.0.1:8081/getallPPwithMaxDate'
            const responsepp = await fetch(urlpp)
            const datapp = await responsepp.json()
            contextPPSql = datapp.data
            console.log('Успех c PP :', JSON.stringify(datapp))
            console.log('start procceed files')

        } // else когда все имена файлов присутствуют 

    })


    async function getBPfromDB() {
        const url = 'http://127.0.0.1:8081/getallBPwithMaxDate'
        const response = await fetch(url)
        const data = await response.json()
        contextBPSql = data.data
        console.log('Успех:', JSON.stringify(data))
        return data.data

    }
    async function handlecontextBPfile(_dateStampBP) {
        const context = contextBPfile.split('\n')
        let oneStrformFile = null

        for (let i = 0; i < context.length; i++) {
            oneStrformFile = context[i].split('","')
            if (oneStrformFile !== '') {
                recordsBP.push({
                    bp_id_aris: Number(oneStrformFile[0].slice(1)),
                    cod_bp_txt: oneStrformFile[4],
                    d_start: oneStrformFile[7],
                    d_stop: oneStrformFile[8],
                    // datestamp: dateStampBP,
                    from_id: Number(oneStrformFile[6]),
                    naim_bp: oneStrformFile[2],
                    num_bp: oneStrformFile[1],
                    owner: Number(oneStrformFile[3]),
                    vyd: Number(oneStrformFile[5])
                })
            }
        }
        let bpdbrecords = getBPfromDB()


        /*
                // eslint-disable-next-line no-unused-vars
                function object_equals(x, y) {
                    for (var p in x) {
                        if (x[p] === y[p]) continue
                            // if they have the same strict value or identity then they are equal

                        if (typeof(x[p]) !== 'object') return false
                            // Numbers, Strings, Functions, Booleans must be strictly equal

                        if (!object_equals(x[p], y[p])) return false
                            // Objects and Arrays must be tested recursively
                    }

                    for (p in y) {
                        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) { return false }
                    }
                    // allows x[ p ] to be set to undefined

                    return true
                }

                function getDifference(a, b) {
                    const diff = []
                    let flag = false
                    for (let i = 0; i < a.length; i++) {
                        flag = false
                        for (let j = 0; j < b.length; j++) {
                            if (
                                (a[i].naim_bp !== b[j].naim_bp) ||
                                (a[i].bp_id_aris !== b[j].bp_id_aris) ||
                                (a[i].cod_bp_txt !== b[j].cod_bp_txt) ||
                                (a[i].d_stop !== b[j].d_stop) ||
                                (a[i].cod_bp_txt !== b[j].cod_bp_txt) ||
                                (a[i].from_id !== b[j].cod_bp_txt) ||
                                (a[i].num_bp !== b[j].num_bp) ||
                                (a[i].owner !== b[j].owner) ||
                                (a[i].vyd !== b[j].vyd)
                            ) {
                                flag = true
                            }
                        }
                        if (flag) diff.push(a[i])
                    }
                    return diff
                }*/
        // let difference = recordsBP.filter(x => !contextBPSql.includes(x));

        console.log('done....')
    }
    /* ************************************************************************* */
    bpInput.addEventListener('change', (_button) => {
        log(bpInput.files)
        const file = bpInput.files[0]
        if (file.name === 'DataTreeBP.CSV') {
            bpInput.previousElementSibling.innerText = 'Выбран файл: ' + file.name + ' ✔'
                // bpInput.previousElementSibling. = #008000
        }
        log(file)
        const dateStamp = file.lastModified
    })
    bpInput.addEventListener('click', (_button) => {
            // bpInput.click()

        })
        /* ************************************************************************* */
    ppInput.addEventListener('change', (_button) => {
        log(ppInput.files)
        const file = ppInput.files[0]
        if (file.name === 'DataTreeSubBP.CSV') {
            ppInput.previousElementSibling.innerText = 'Выбран файл: ' + file.name + ' ✔'
                // bpInput.previousElementSibling.color = #008000
        }
        log(file)
        const dateStamp = file.lastModified
    })
    ppInput.addEventListener('click', (_button) => {

    })

    function readUploadedFileAsText(inputFile) {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            }

            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result)
            }
            temporaryFileReader.readAsText(inputFile, 'windows-1251')
        })
    }
})(document, document.body)