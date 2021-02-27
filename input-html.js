
// привет, хабр!
// const { $ } = require ('jquery')
// import $ from 'jquery'
/* $('.my').change(function () {
  if ($(this).val() !== '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length)
    else $(this).prev().text('Выберите файлы')
}) */

((D, B, log = (arg) => console.log(arg)) => {
  const dropZone = D.querySelector('startbutton')
  const allElements = D.querySelector("myfile2, myfile, proceed")
  const input = D.querySelector('input')

  D.addEventListener('click', () => {
    allElements.addEventListener('click', () => {
      input.click()
      input.addEventListener('change', () => {
        log(input.files)

        file = input.files[0]

        log(file)
        const dateStamp = file.lastModified
        handleFile(file)
      })
    })
  })

    const btn = D.querySelector('my')
})(document, document.body)
