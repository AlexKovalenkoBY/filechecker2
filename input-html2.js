((D, B, log = (arg) => console.log(arg)) => {
    const bpInput = D.getElementById('BPfile')
    const ppInput = D.getElementById('PPfile')
    const bpLabel = D.getElementById('bplabel')
    const startButton = D.getElementById('mainbutton')
    let contextBPfile = null
    const diffBP = null
    let contextBPSql = null
    const recordsBP = []
        /* ************************************************************************* */
    startButton.addEventListener('click', (button) => {
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
            console.log('элементы скрыты')
            let new_row = D.createElement('div');
            new_row.className = "loader"
            B.appendChild(new_row)
            console.log('loader created')

        }
    })

    function handlecontextBPfile(dateStampBP) {
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
        const url = 'http://127.0.0.1:8081/getallBPwithMaxDate'
        async function test() {
            const response = await fetch(url)
            const data = await response.json()
            contextBPSql = data.data

            console.log('БП считаны отовсюду. Успех:', JSON.stringify(data))

            const diff1 = getDifference(recordsBP, contextBPSql)
            const diff2 = getDifference(contextBPSql, recordsBP)
        }

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
        }
        // let difference = recordsBP.filter(x => !contextBPSql.includes(x));

        console.log('done....')
    }
    /* ************************************************************************* */
    bpInput.addEventListener('change', (button) => {
        log(bpInput.files)
        const file = bpInput.files[0]
        if (file.name === 'DataTreeBP.CSV') {
            bpInput.previousElementSibling.innerText = 'Выбран файл: ' + file.name + ' ✔'
                // bpInput.previousElementSibling. = #008000
        }
        log(file)
        const dateStamp = file.lastModified
    })
    bpInput.addEventListener('click', (button) => {
            // bpInput.click()

        })
        /* ************************************************************************* */
    ppInput.addEventListener('change', (button) => {
        log(ppInput.files)
        const file = ppInput.files[0]
        if (file.name === 'DataTreeSubBP.CSV') {
            ppInput.previousElementSibling.innerText = 'Выбран файл: ' + file.name + ' ✔'
                // bpInput.previousElementSibling.color = #008000
        }
        log(file)
        const dateStamp = file.lastModified
    })
    ppInput.addEventListener('click', (button) => {})
})(document, document.body)