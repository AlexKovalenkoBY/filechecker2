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
      const dateStampBP = new Date(bp.lastModified).getDate() + '.' + String((new Date(bp.lastModified).getMonth())).replace(/^(\d)$/, '0$1') + '.' + new Date(bp.lastModified).getFullYear()
      const dateStampPP = new Date(pp.lastModified).getDate() + '.' + String((new Date(pp.lastModified).getMonth())).replace(/^(\d)$/, '0$1') + '.' + new Date(pp.lastModified).getFullYear()
      const readerBp = new FileReader()

      const readerPp = new FileReader()
      readerBp.onload = async (e) => {
        contextBPfile = e.target.result
        handlecontextBPfile(dateStampBP)
      }
      readerBp.readAsText(bp, 'windows-1251')
    }
  })
  function handlecontextBPfile (dateStampBP) {
    const context = contextBPfile.split('\n')
    let oneStrformFile = null

    for (let i = 0; i < context.length; i++) {
      oneStrformFile = context[i].split('","')
      if (oneStrformFile !== '') {
        recordsBP.push(
          {
            bp_id_aris: oneStrformFile[0].slice(1),
            cod_bp_txt: oneStrformFile[4],
            d_start: oneStrformFile[7],
            d_stop: oneStrformFile[8],
            // datestamp: dateStampBP,
            from_id: oneStrformFile[6],
            naim_bp: oneStrformFile[2],
            num_bp: oneStrformFile[1],
            owner: oneStrformFile[3]
          }
        )
      }
    }
    const url = 'http://127.0.0.1:8081/getallBPwithMaxDate'
    async function test () {
      const response = await fetch(url)
      const data = await response.json()
      contextBPSql = data.data

      console.log('Успех:', JSON.stringify(data))
    }
    test()
    console.log('done....')
  }
  /* ************************************************************************* */
  bpInput.addEventListener('change', (button) => {
    log(bpInput.files)
    const file = bpInput.files[0]
    if (file.name === 'DataTreeBP.CSV') {
      bpInput.previousElementSibling.innerText = 'Выбран файл: ' + file.name + ' ✔'
      // bpInput.previousElementSibling.color = #008000
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
  ppInput.addEventListener('click', (button) => {

  })
})(document, document.body)
