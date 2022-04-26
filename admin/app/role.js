function generateRolePage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control input-sm" placeholder="Search...">
                </div>
                <div class="col-md-6 text-right">
                    <a href="#" class="btn btn-default">Qo'shish <i class="fa fa-plus"></i> </a>
                </div>
            </div>
            <div class="table-filter">
                <span>Bizning Bo'limlarimiz</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Bo'lim</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Yangi Bo'lim yaratish</p>
                <div class="absolute-body">
                    <input type="text" id="title" placeholder="Bo'lim nomini kiriting...">                    
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
function rolePageFuncs(){
    function getRoles(){
        fetch('/api/role/getRoles')
            .then(res=> res.json())
            .then(document.querySelector('table tbody').innerHTML = '')
            .then(data => data.forEach((item, i) =>{
                document.querySelector('table tbody').innerHTML += `
                <tr data-id="${item._id}" data-title="${item.title}">
                    <td>${i+1}</td>
                    <td>${item.title}</td>
                    <td>
                        <i class="fa fa-trash fa-2x" id="delete_user"></i>
                        <i class="fa fa-edit fa-2x" id="edit_user"></i>
                    </td>
                </tr>
            `
            editRole()
            deleteRole()
            }))
       
    }
    getRoles()
    function addRole(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.absolute-body input#title').value = ''
            document.querySelector('.absolute-menu-wrapper').style.display='block'
            document.querySelector('.page-container').scrollTop = 0
            document.querySelector('.page-container').style.overflow='hidden'
            document.querySelector('button.absolute-btn-ok').onclick = () => {
                if(document.querySelector('.absolute-body input').value!==""){
                    fetch('/api/role/createRole', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: document.querySelector('.absolute-body input#title').value
                            })
                        })
                        .then(res => res.json())
                        .then(getRoles)
                        .then(alert('Muaffaqqiyatli amalga oshirildi !!!'), document.querySelector('.absolute-menu-wrapper').style.display='none',
                        document.querySelector('.page-container').style.overflow='auto')
                        .catch(error => {
                            console.error('Error:', error);
                        });
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
    }
    addRole()

    function editRole(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.absolute-body input#title').value = item.parentElement.parentElement.dataset.title
            }
            document.querySelector('button.absolute-btn-ok').onclick = () => {
                if(document.querySelector('.absolute-body input#title').value !== ""){
                    fetch(`/api/role/updateRole`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: item.parentElement.parentElement.dataset.id,
                            title: document.querySelector('.absolute-body input#title').value
                        })
                    })
                        .then(res => res.json())
                            .then(getRoles)
                            .then(alert('Muaffaqqiyatli amalga oshirildi !!!'), document.querySelector('.absolute-menu-wrapper').style.display='none',
                            document.querySelector('.page-container').style.overflow='auto')
                            .catch(error => {
                                console.error('Error:', error)
                            });
                        }
                else{
                    alert("Majburiy malumotlar kiritilmadi !!!")
                }          
            }
        })    
    }

    function deleteRole(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                fetch(`/api/role/deleteRole`, {
                    method: "POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.parentElement.parentElement.dataset.id
                    })
                })
                    .then(res => res.json())
                    .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    
}