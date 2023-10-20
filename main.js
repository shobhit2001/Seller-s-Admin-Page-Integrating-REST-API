const ApiUrl = "https://crudcrud.com/api/afdf81c6511e4b0f96511dc33183d4de";
const myForm = document.getElementById('my-form');
const productName = document.getElementById('name');
const amount = document.getElementById('price');
const category = document.getElementById('category');
const list = document.getElementById('list');
const mssg = document.querySelector('.msg');

myForm.addEventListener('submit' , onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(productName.value === "" || amount.value === ""){
        //Display an error message
        mssg.classList.add('error');
        mssg.textContent = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => mssg.remove(), 3000);
    }else{
        const productName = e.target.name.value;
        const amount = e.target.price.value;
        const category = e.target.category.value;

        const productData = {
            productName,
            amount,
            category
        };

        //Sending a POST Request to CRUD Server
        axios
          .post(`${ApiUrl}/products` , productData)
          .then((res) => {
            showProductOnScreen(res.data)
            console.log(res);  
          })
          .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
            console.log(error);
          })
    }    
}

//Sending a GET Request to CRUD Server
window.addEventListener("DOMContentLoaded" , () => {
    axios
      .get(`${ApiUrl}/products`)
      .then((res) => {
        console.log(res);
        for(var i = 0 ; i<res.data.length ; i++){
            showProductOnScreen(res.data[i]);
        }
      })
      .catch((error) => console.log(error));
})

function showProductOnScreen(productData){
    let li = document.createElement('li');
    const details = document.createTextNode(`${productData.productName} : ${productData.amount} : ${productData.category} `);

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = "Clear Order";
    deleteBtn.style.color = 'white';
    deleteBtn.style.backgroundColor = 'Grey';
    deleteBtn.onclick = () => {
        //Sending a Delete Request to CRUD Server
        axios
          .delete(`${ApiUrl}/products/${productData._id}`)
          .then((res) => {
            list.removeChild(li);
          })
          .catch((error) => console.log(error))
    }

    li.appendChild(details);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    //Clear Fields
    productName.value = '';
    amount.value = '';
    category.value = '';
}