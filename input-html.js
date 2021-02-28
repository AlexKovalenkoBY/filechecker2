
// привет, хабр!
/* $('.my').change(function () {
  if ($(this).val() !== '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length)
    else $(this).prev().text('Выберите файлы')
}) */

((D, B, log = (arg) => console.log(arg)) => {
  const bpInput = D.getElementById('BPfile')
  const ppInput = D.getElementById('PPfile')
  const bpLabel = D.getElementById('bplabel')
  const startButton = D.getElementById('mainbutton')
  let contextBP = null
  const diffBP = null
  let BPSql = null

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
        contextBP = e.target.result
        handleContext(dateStampBP)
      }
      readerBp.readAsText(bp, 'windows-1251')
    }
  })
  function handleContext (dateStampBP) {
    const context = contextBP.split('\n')
    let oneStrformFile = null
    const recordsBP = []
    for (let i = 0; i < context.length; i++) {
      oneStrformFile = context[i].split('","')
      if (oneStrformFile !== '') {
        recordsBP.push(
          [oneStrformFile[0].slice(1),
            oneStrformFile[1],
            oneStrformFile[2],
            oneStrformFile[3],
            oneStrformFile[4],
            oneStrformFile[5],
            oneStrformFile[6],
            oneStrformFile[7],
            oneStrformFile[8],
            dateStampBP]
        )
      }
    }
    const url = 'http://127.0.0.1:8081/getallBPwithMaxDate'
    async function test () {
      /* const response = await fetch(url)
      const data = await response.json()
      return data */

      const response = await fetch(url /*, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify('')

        } */)
      const json = response.json()
      console.log('Успех:', JSON.stringify(json))
    }

    test().then(data => {
      console.log(data)
      BPSql = data.data
    })
    /* try {
         const response = await fetch(url, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify('')

         })
         const json = response.json()
         console.log('Успех:', JSON.stringify(json))
       } catch (error) {
         console.error('Ошибка:', error)
       } */
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
