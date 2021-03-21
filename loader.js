((D, B, log = (arg) => console.log(arg)) => {

    let new_row = D.createElement('div');
    new_row.className = "loader"
    B.appendChild(new_row)
    console.log('loader created')



})(document, document.body)