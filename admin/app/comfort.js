function generateComfortPage(root,cb){
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
                <span>Qulayliklar</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Rasm</th>
                        <th>Matn</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Yangi qulaylik qo'shish</p>
                <div class="absolute-body">
                    <div class="for-img">
                        <input id="files" type="file" accept="image/png, image/gif, image/jpeg">
                        <img src="">
                        <p>Rasm yuklang</p>
                    </div>
                    <input type="text" id="text" placeholder="Qulaylik haqida yozing...">                    
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
function comfortPageFuncs(){
    let imgInputFile = [];
    function getComforts(){
        fetch(`/api/comfort/getComforts`)
        .then(res => res.json())
        .then(document.querySelector('table tbody').innerHTML = '')
        .then(data => data.forEach((item, i) => {
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-img="${item.img}" data-text="${item.text}">
                <td>${i+1}</td>
                <td><img src="/${item.img}" alt="qulaylik_rasmi"></td>
                <td id="text">${item.text}</td>
                <td>
                    <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    <i class="fa fa-edit fa-2x" id="edit_user"></i>
                </td>
            </tr>
        `
            editComfort()
            deleteComfort()
        }))
                
    }
    function deleteComfort(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                const formData = new FormData
                formData.append('id', item.parentElement.parentElement.dataset.id)
                fetch('/api/comfort/deleteComfort', {
                    method: "POST",
                    body:formData
                })
                    .then(res=>res.json())
                    .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    getComforts()
    function addComfort(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.absolute-menu-wrapper').style.display = 'block'
            document.querySelector('.page-container').style.overflow = 'hidden'
            document.querySelector('.page-container').scrollTop = 0
            document.querySelector('.absolute-body input#text').value = ''
            document.querySelector('.for-img img').src = ''
            showImg()
        }
        document.querySelector('.absolute-btn-cancel').onclick = () => {
            document.querySelector('.absolute-menu-wrapper').style.display='none'
            document.querySelector('.page-container').style.overflow='auto'
        }

        document.querySelector('button.absolute-btn-ok').onclick = () => {
            const formData = new FormData();
            imgInputFile.push({img: document.querySelector('.for-img input').files[0]})
            formData.append('image',document.querySelector('.for-img input').files[0])
            formData.append('text',document.querySelector('.absolute-body input#text').value)
            var i=0;
            document.querySelectorAll('.absolute-body input').forEach(input => {
                if(input.value == ""){i++}
            });
            if(i===0){
                fetch('/api/comfort/createComfort', {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(getComforts)
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
    addComfort()
    function showImg(){
        document.querySelector('.for-img input').onchange = () => {
            const [img]  = document.querySelector('.for-img input').files
            if(img){
                document.querySelector('.for-img img').src = URL.createObjectURL(img)
                document.querySelector('.for-img img').style.zIndex = 1
            }
        }
    }
    function editComfort(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                document.querySelector('.absolute-title').textContent = "Maqolani tahrirlash"
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.for-img img').style.zIndex = 1
                document.querySelector('.for-img input').files[0] = imgInputFile
                document.querySelector('.absolute-body input#text').value = item.parentElement.parentElement.dataset.text
                showImg()
                document.querySelector('button.absolute-btn-ok').onclick = () => {
                    let datanews = new FormData();
                    if(document.querySelector('.for-img input').files[0]!=item.parentElement.parentElement.dataset.img){
                        datanews.set('imgUpdated','true')
                    }
                    datanews.append('id',item.parentElement.parentElement.dataset.id)
                    datanews.append('image',document.querySelector('.for-img input').files[0])
                    datanews.append('text',document.querySelector('.absolute-body input#text').value)
                    var i=0;
                    document.querySelectorAll('.absolute-body input').forEach(input => {
                        if(input.value == ""){i++
                        }
                    });
                    if(i===0){
                        fetch('/api/comfort/updateComfort',{
                            method: "POST",
                            body: datanews
                        })
                            .then(res => res.json())
                            .then(getComforts)
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