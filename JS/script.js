
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmb;

console.log(title, price, taxes, ads, discount, total, count, category, submit);
// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value) + (+taxes.value) + (+ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
    else{
        total.innerHTML = '0';
        total.style.backgroundColor = '#a50707';
    }
}

// creat product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro ={
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    //Update condition
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 1000){
        if(mood === 'create'){
        // count
        if(newPro.count > 1){
        for(let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
            }
        }
        else{
        dataPro.push(newPro);
        }
    }else{
        dataPro[tmb] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    } 
    clearInputs();
    }



    // save in local storage
    // save product in local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

console.log(dataPro);

// clear inputs

function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// read 

function showData(){
    getTotal();
    let table = ''; 
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td>
            <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>  
        </tr> 
        `;
    }
    document.getElementById('tBody').innerHTML = table; 
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = '';
    }

}
showData();

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll(){
    dataPro = [];
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmb = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
    getTotal();
}

// search
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus();
search.value = '';
showData();
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
    if(searchMood === 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                        <button onclick="updateData(${i})" id="update">Update</button>
                        </td>
                        <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                        </td>  
                    </tr> 
                    `;  
            }
        
    }
    else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                        <button onclick="updateData(${i})" id="update">Update</button>
                        </td>
                        <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                        </td>  
                    </tr> 
                    `;  
            }
        
    }}
    document.getElementById('tBody').innerHTML = table; 
}

// clean data

