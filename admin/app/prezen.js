function generatePrezenPage(root,cb){
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
                <span>Prezentatsiya</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Nomi</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Prezentatsiya qo'shish</p>
                <div class="absolute-body">
                    <input id="files" type="file">
                    <input type="text" id="title" placeholder="Nomini kiriting...">                    
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
function prezenPageFuncs(){
    function getArticles(){
        fetch(`/api/prezentation/get`)
        .then(res => res.json())
        .then(document.querySelector('table tbody').innerHTML = '')
        .then(data => data.forEach((item, i) => {
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-img="${item.img}" data-title="${item.title}">
                <td>${i+1}</td>
                <td id="title">${item.title}</td>
                <td>
                    <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    <i class="fa fa-edit fa-2x" id="edit_user"></i>
                </td>
            </tr>
        `
            editArticle()
            deleteArticle()
        }))
                
    }
    function deleteArticle(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                const formData = new FormData
                formData.append('id', item.parentElement.parentElement.dataset.id)
                fetch('/api/prezentation/delete', {
                    method: "POST",
                    body:formData
                })
                    .then(res=>res.json())
                    .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    getArticles()
    function addArticle(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.absolute-menu-wrapper').style.display = 'block'
            document.querySelector('.page-container').style.overflow = 'hidden'
            document.querySelector('.page-container').scrollTop = 0
            document.querySelector('.absolute-body input#title').value = ''
        }
        document.querySelector('.absolute-btn-cancel').onclick = () => {
            document.querySelector('.absolute-menu-wrapper').style.display='none'
            document.querySelector('.page-container').style.overflow='auto'
        }

        document.querySelector('button.absolute-btn-ok').onclick = () => {
            const formData = new FormData();
            formData.append('image',document.querySelector('.absolute-body input#files').files[0])
            formData.append('title',document.querySelector('.absolute-body input#title').value)
            var i=0;
            document.querySelectorAll('.absolute-body input').forEach(input => {
                if(input.value == ""){i++}
            });
            if(i===0){
                fetch('/api/prezentation/create', {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(getArticles)
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
    }
    addArticle()
    function editArticle(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                const datanews = new FormData()
                document.querySelector('.absolute-title').textContent = "Tahrirlash"
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.absolute-body input#title').value = item.parentElement.parentElement.dataset.title
                document.querySelector('button.absolute-btn-ok').onclick = () => {
                    datanews.append('id',item.parentElement.parentElement.dataset.id)
                    datanews.append('image',document.querySelector('.absolute-body input#files').files[0])
                    datanews.append('title',document.querySelector('.absolute-body input#title').value)
                    datanews.append('imgUpdated','true')
                    var i=0;
                    document.querySelectorAll('.absolute-body input').forEach(input => {
                        if(input.value == ""){i++
                        }
                    });
                    if(i===0){
                        fetch('/api/prezentation/update',{
                            method: "POST",
                            body: datanews
                        })
                            .then(res => res.json())
                            .then(getArticles)
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
                document.querySelector('.absolute-btn-cancel').onclick = () => {
                    document.querySelector('.absolute-menu-wrapper').style.display='none'
                    document.querySelector('.page-container').style.overflow='auto'
                }
            }
        })
    }
}