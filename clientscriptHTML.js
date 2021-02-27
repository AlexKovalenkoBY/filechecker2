((D, B, log = (arg) => console.log(arg)) => {
  const btn = D.querySelector('button.btn')
  D.addEventListener('btn', (ev) => ev.preventDefault())
  D.addEventListener('btn', (ev) => ev.preventDefault())
  btn.addEventListener('click', () => {
    log(btn.name)
  })
})(document, document.body)
