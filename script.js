/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */

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

      log(file)
      const dateStamp = file.lastModified
      handleFile(file)
    })
  })
  let context = []
  const recordsBP = []
  let oneStrformFile = ''
  const handleFile = (file) => {
    dropZone.remove()
    input.remove()

    if (
      (file.name !== 'DataTreeBP.CSV') &&
      (file.name !== 'DataTreeSubBP.CSV')
    ) { return }

    const dateStamp = file.lastModifiedDate
    const filedate = new Date(file.lastModified).getDate() + '.' + String((new Date(file.lastModified).getMonth())).replace(/^(\d)$/, '0$1') + '.' + new Date(file.lastModified).getFullYear()
    switch (file.name) {
      case 'DataTreeBP.CSV':
      {
      // createText("DataTreeBP.CSV");
        const reader = new FileReader()
        reader.readAsText(file, 'windows-1251')

        reader.onload = async (/* dateStamp */) => {
          // B.innerHTML = `<p><pre>${reader.result}</pre></p>`
          context = reader.result.split('\n')

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
                    dateStamp]
                  /* {id: oneStrformFile[0].slice(1),
                       num:oneStrformFile[1],
                       name:oneStrformFile[2],
                       owner:oneStrformFile[3],
                       shortname:oneStrformFile[4],
                       detalisationexist:oneStrformFile[5],
                       parent: oneStrformFile[6],
                       datebegin: oneStrformFile[7],
                       dateend:oneStrformFile[8],
                       dateload:dateStamp
                     } */
                )
              }
          }
          // var myJSONstr = JSON.stringify(myJson);
          const url = 'http://localhost:8081/api/bpload/'
          // let data = { username: 'example' };
          try {
              const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(recordsBP) // данные могут быть 'строкой' или {объектом}!
              })
              const json = await response.json()
              console.log('Успех:', JSON.stringify(json))
          } catch (error) {
            console.error('Ошибка:', error)
          }
        }
        const s = 0
        const timer = setTimeout(() => {
          location.reload()
          clearTimeout(timer)
        }, 2000)
        break
      }
      case 'DataTreeSubBP.CSV':
      { // createText("DataTreeBP.CSV");
          const reader = new FileReader()
          // let textArray =
          reader.readAsText(file, 'windows-1251')
          // dateStamp = file.lastModifiedDate; //file.lastModifiedDate
          reader.onload = async (/* dateStamp */) => {
            // B.innerHTML = `<p><pre>${reader.result}</pre></p>`
            context = reader.result.split('\n')
            const ppjson = []
            for (let i = 0; i < context.length; i++) {
              if (context[i] !== '') {
                const tempstr = context[i].split('|')
                const mySet = new Set()
                // mySet.add(
                ppjson.push({
                  idmain: tempstr[0],
                  idparent: tempstr[1],
                  idpp: tempstr[2],
                  numpp: tempstr[3],
                  namepp: tempstr[4],
                  managerpp: tempstr[5],
                  detalistaionexist: tempstr[6],
                  datebegin: tempstr[7],
                  datechange: tempstr[8],
                  dateend: tempstr[9],
                  dateload: dateStamp
                })
              }
            }
            try {
              const url = 'http://localhost:8081/api/ppload'
              const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(ppjson) // данные могут быть 'строкой' или {объектом}!

                /* method: 'POST', // или 'PUT'
                  mode: 'no-cors',
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: 'same-origin', // include, *same-origin, omit
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5500'
                  },
                   body: JSON.stringify(ppjson) // данные могут быть 'строкой' или {объектом}! */
                // body: mySet // данные могут быть 'строкой' или {объектом}!
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
