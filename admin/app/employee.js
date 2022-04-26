function generateEmployeePage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control input-sm" placeholder="Qidirish...">
                </div>
                <div class="col-md-6 text-right">
                    <a href="#" class="btn btn-default">Qo'shish <i class="fa fa-plus"></i> </a>
                </div>
            </div>
            <div class="table-filter">
                <span>Hodimlar</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Rasm</th>
                        <th>Ism</th>
                        <th>Email</th>
                        <th>Bo'lim</th>
                        <th>Filial</th>
                        <th>Prezentatsiya</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Yangi hodim yaratish</p>
                <div class="absolute-body">
                    <div class="for-img">
                        <input type="file" accept="image/png, image/gif, image/jpeg">
                        <img src="">
                        <p>Rasm yuklang</p>
                    </div>
                    <input id="name" type="text" placeholder="Ism...">                    
                    <input id="email" type="text" placeholder="Email...">                    
                    <input id="password" type="text" placeholder="Parol...">                    
                    <select id="role" required>
                    </select>
                    <select id="branch" required>
                    </select>               
                </div>
                <div class="absolute-btns">
                    <button class="absolute-btn-cancel">Bekor qilish</button>
                    <button class="absolute-btn-ok">Saqlash</button>
                </div>
            </div>
        </div>
    </div>
    `
    cb()
}
function getOption(){
    document.querySelector('.absolute-body select#role').innerHTML = '<option value="" disabled selected>Lavozimni tanlang...</option>'
    fetch(`/api/role/getRoles`)
    .then(res => res.json())
    .then(data => data.forEach(item => {
        document.querySelector('.absolute-body select').innerHTML +=`
            <option value="${item._id}">${item.title}</option>
        `
    })),
    document.querySelector('.absolute-body select#branch').innerHTML = '<option value="" disabled selected>Qaysi filialga ishga kirishini tanlang...</option>'
    fetch(`/api/branch/getBranches`)
    .then(res => res.json())
    .then(data => data.forEach(item => {
        document.querySelector('.absolute-body select#branch').innerHTML +=`
            <option value="${item._id}">${item.name}</option>
        `
    }))
}

function employeePageFuncs(){
    function getEmployees(){
        document.querySelector('table tbody').innerHTML = ''
        fetch('/api/employee/getEmployees')
        .then(res => res.json())
        .then(data => data.forEach((item, i) => {
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-bool="${item.isBoolean}" data-name="${item.name}" data-img="${item.img}" data-email="${item.email}" data-roleId="${item.roleId.title}" data-branch="${item.branchId._id}" data-branchId="${item.branchId.name}">
                <td>${i+1}</td>
                <td id="img"><img src="/${item.img}"></td>
                <td id="name">${item.name}</td>
                <td id="email">${item.email}</td>
                <td id="roleId">${item.roleId.title}</td>
                <td id="branchId">${item.branchId.name}</td>
                <td id="isBool"><input type="checkbox" ${item.isBoolean==true ? `checked`: ""} class="isBool"></td>
                <td>
                    <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    <i class="fa fa-edit fa-2x" id="edit_user"></i>
                </td>
            </tr>
            `
            activePrezentation()
            deleteEmployee()
            editEmployee()
        }))

    }
    getEmployees()
    function addEmployee(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            getOption()
            document.querySelector('.absolute-body input#name').value = ''
            document.querySelector('.for-img img').src = ''
            document.querySelector('.absolute-body input#email').value = ''
            document.querySelector('.absolute-body input#password').value = ''
            document.querySelector('.absolute-body select').value = ''
            document.querySelector('.absolute-menu-wrapper').style.display='block'
            document.querySelector('.page-container').style.overflow='hidden'
            document.querySelector('.page-container').scrollTop = 0
            showImg()
            document.querySelector('.absolute-btn-cancel').onclick = () => {
                document.querySelector('.absolute-menu-wrapper').style.display='none'
                document.querySelector('.page-container').style.overflow='auto'
            }
            document.querySelector('button.absolute-btn-ok').onclick = () => {
                const formData = new FormData();
                formData.append('image',document.querySelector('.for-img input').files[0])
                formData.append('name',document.querySelector('.absolute-body input#name').value)
                formData.append('email',document.querySelector('.absolute-body input#email').value)
                formData.append('password',document.querySelector('.absolute-body input#password').value)
                formData.append('roleId',document.querySelector('.absolute-body select#role').value)
                formData.append('branchId',document.querySelector('.absolute-body select#branch').value)
                var i=0;
                document.querySelectorAll('.absolute-body input').forEach(input => {
                    if(input.value == ""){i++}
                });
                if(i===0){
                    document.querySelectorAll('td#email').forEach(item => {
                        if(item.textContent===document.querySelector('.absolute-body input#email').value){i++}
                    })
                    if(i===0){
                        if(document.querySelector('.absolute-body select#role').value != "" && document.querySelector('.absolute-body select#branch').value != ""){
                            fetch('/api/employee/createEmployee', {
                                method: 'POST',
                                body: formData
                            })
                            .then(res => res.json())
                            .then(getEmployees)
                            .then(alert('Muaffaqqiyatli amalga oshirildi !!!'), 
                            document.querySelector('.absolute-menu-wrapper').style.display='none',
                            document.querySelector('.page-container').style.overflow='auto')
                            .catch(error => {
                                console.error('Error:', error);
                            })
                        }else{
                            alert('Lavozim va Filialni tanlash majburiy ...')
                        }
                    }else{
                        document.querySelector('.absolute-body input#email').style.border="2px solid red"
                        alert('Email takrorlanmas bolishi kerak !!!')
                    }
                    
                }
                else{
                    alert("Majburiy malumotlar kiritilmadi !!!")
                }
            }
        }
    }

    



    addEmployee()
    function showImg(){
        document.querySelector('.for-img input').onchange = () => {
            const [img]  = document.querySelector('.for-img input').files
            if(img){
                document.querySelector('.for-img img').src = URL.createObjectURL(img)
                document.querySelector('.for-img img').style.zIndex = 1
            }
        }
    }


    function editEmployee(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                getOption()
                document.querySelector('.absolute-title').textContent = "Hodimni tahrirlash"
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.for-img img').style.zIndex = 1 
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.for-img img').src=`/${item.parentElement.parentElement.dataset.img}`
                document.querySelector('.absolute-body input#name').value = item.parentElement.parentElement.dataset.name
                document.querySelector('.absolute-body input#email').value = item.parentElement.parentElement.dataset.email
                document.querySelector('.absolute-body select#role').value = item.parentElement.parentElement.dataset.roleId
                document.querySelector('.absolute-body select#branch').value = item.parentElement.parentElement.dataset.branchId
                showImg()
                document.querySelector('button.absolute-btn-ok').onclick = () => {
                    let datanews = new FormData();
                    if(document.querySelector('.for-img input').files[0]!=item.parentElement.parentElement.dataset.img){
                        datanews.set('imgUpdated','true')
                    }
                    datanews.append('id',item.parentElement.parentElement.dataset.id)
                    datanews.append('image',document.querySelector('.for-img input').files[0])
                    datanews.append('name',document.querySelector('.absolute-body input#name').value)
                    datanews.append('email',document.querySelector('.absolute-body input#email').value)
                    datanews.append('password',document.querySelector('.absolute-body input#password').value)
                    datanews.append('roleId',document.querySelector('.absolute-body select#role').value)
                    datanews.append('branchId',document.querySelector('.absolute-body select#branch').value)
                    var i=0;
                    document.querySelectorAll('.absolute-body input').forEach(input => {
                        if(input.value == ""){i++}
                    });
                    if(i===0){

                        if(document.querySelector('.absolute-body select#role').value != "" && document.querySelector('.absolute-body select#branch').value != ""){
                            fetch('/api/employee/updateEmployee',{
                                method: "POST",
                                body: datanews
                            })
                                .then(res => res.json())
                                .then(getEmployees)
                                .then(alert('Muaffaqqiyatli amalga oshirildi !!!'), document.querySelector('.absolute-menu-wrapper').style.display='none',
                                document.querySelector('.page-container').style.overflow='auto')
                                .catch(error => {
                                    console.error('Error:', error)
                                })
                        }else{
                            alert('Lavozim va Filialni tanlash majburiy ...')
                        }
                    }
                    else{
                        alert("Majburiy malumotlar kiritilmadi !!!")
                    }                   
                }
                document.querySelector('.absolute-btn-cancel').onclick = () => {
                    document.querySelector('.absolute-menu-wrapper').style.display='none'
                    document.querySelector('.page-container').style.overflow='auto'
                }
            }
        })
    
    }

    function deleteEmployee(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {

            let comment = prompt('Ketish sababini kiriting ...');
                if(comment!==""){
                    fetch('/api/employee/deleteEmployee', {
                        method: "POST",
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: item.parentElement.parentElement.dataset.id,
                            branchId: item.parentElement.parentElement.dataset.branch,
                            comment
                        })
                    })
                        .then(res=>res.json())
                        .then(getEmployees)
                        .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
                }else{
                    alert('Hodim ishdan boshash sababini kiritishiz majburiy ...')
                }
            }
        })
    }

    function activePrezentation(){
        document.querySelectorAll('td#isBool input.isBool').forEach(item => {
            item.onclick = () => {
                fetch(`/api/employee/activePrezentation`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.parentElement.parentElement.dataset.id,
                        isBoolean: item.checked        
                    })
                })                
            }
        })
    }
}