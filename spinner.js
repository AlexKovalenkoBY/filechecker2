((D, B, log = (arg) => console.log(arg)) => {

    const btn = D.getElementsByClassName('mybtn')[0];
    btn.addEventListener('click', myFunction(D))


})(document, document.body)

function myFunction(D) {
    const btn = document.body.createElement('BUTTON')
    btn.innerHTML = 'CLICK ME'
    D.body.appendChild(btn)
}