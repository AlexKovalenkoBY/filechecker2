
// привет, хабр!
/* $('.my').change(function () {
  if ($(this).val() !== '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length)
    else $(this).prev().text('Выберите файлы')
}) */

((D, B, log = (arg) => console.log(arg)) => {
  const bpInput = D.getElementById('BPfile')
  const ppInput = D.getElementById('PPfile')
  const ppLabel = D.getElementById('pplabel')
  const bpLabel = D.getElementById('bplabel')
  const startButton = D.getElementById('mainbutton')
  /* ************************************************************************* */
  startButton.addEventListener('click', (button) => {
    console.log('button start proceed')
    if ((document.getElementById('BPfile').files[0].name !== 'DataTreeBP.CSV') ||
            (document.getElementById('PPfile').files[0].name !== 'DataTreeSubBP.CSV')) {
      document.location.reload()
      // location.reload() // window.location.reload()
    } else {
      const to_hide = document.getElementsByClassName('dada')
      for (let i=0; i<to_hide.length; i++){
        to_hide[i].hidden = true 
      }
      }
      
      alert('working.......')
    
  })
  /* ************************************************************************* */
  bpLabel.addEventListener('click', (button) => {
    // bpInput.click()
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
  })
  /* ************************************************************************* */
  ppInput.addEventListener('click', (button) => {
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
  })
})(document, document.body)
