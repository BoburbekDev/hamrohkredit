function generatePartnerPage(root,cb){
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
                <span>Bizning Hamkorlar</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Rasm</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Hamkorlarimizni yaratish</p>
                <div class="absolute-body">
                    <div class="for-img">
                        <input type="file" accept="image/png, image/gif, image/jpeg">
                        <img src="">
                        <p>Hamkor Brendini yuklang</p>
                    </div>
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
function partnerPageFuncs(){
    function getPartners(){
        fetch('/api/partner/getPartners')
        .then(res => res.json())
        .then(document.querySelector('table tbody').innerHTML = '')
        .then(data => data.forEach((item,i) => {
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-img="${item.img}">
                <td>${i+1}</td>
                <td><img src="/${item.img}" alt="office_rasmi"></td>
                <td>
                    <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    <i class="fa fa-edit fa-2x" id="edit_user"></i>
                </td>
            </tr>
            `
            deletePartner()
            editPartner()
        }))
        
    }
    getPartners()
    function addPartner(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.for-img img').src=''
            document.querySelector('.absolute-menu-wrapper').style.display='block'
            document.querySelector('.page-container').scrollTop = 0
            document.querySelector('.page-container').style.overflow='hidden'
            showImg()
            document.querySelector('.absolute-btn-cancel').onclick = () => {
                document.querySelector('.absolute-menu-wrapper').style.display='none'
                document.querySelector('.page-container').style.overflow='auto'
            }
            document.querySelector('button.absolute-btn-ok').onclick = () => {
                const formData = new FormData();
                formData.append('image',document.querySelector('.for-img input').files[0])
                if(document.querySelector('.absolute-body input').value!==""){
                    fetch('/api/partner/createPartner', {
                            method: 'POST',
                            body: formData
                        })
                        .then(res => res.json())
                        .then(getPartners)
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
    }
    addPartner()
    function deletePartner(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                const formData = new FormData
                formData.append('id', item.parentElement.parentElement.dataset.id)
                fetch('/api/partner/deletePartner', {
                    method: "POST",
                    body:formData
                })
                    .then(res=>res.json())
                    .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    
    function editPartner(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                document.querySelector('.absolute-title').textContent = "Hamkorni tahrirlash"
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.for-img img').style.zIndex = 1 
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.for-img img').src=`/${item.parentElement.parentElement.dataset.img}`
                showImg()
                const datanews = new FormData()
                document.querySelector('button.absolute-btn-ok').onclick = () => {
                datanews.append('id',item.parentElement.parentElement.dataset.id)
                datanews.append('imgUpdated','true')
                datanews.append('image',document.querySelector('.for-img input').files[0])
                    fetch('/api/partner/updatePartner',{
                        method: "POST",
                        body: datanews
                    })
                        .then(res => res.json())
                        .then(getPartners)
                        .then(alert('Muaffaqqiyatli amalga oshirildi !!!'), document.querySelector('.absolute-menu-wrapper').style.display='none',
                        document.querySelector('.page-container').style.overflow='auto')
                        .catch(error => {
                            console.error('Error:', error)
                        });
                }
                document.querySelector('.absolute-btn-cancel').onclick = () => {
                    document.querySelector('.absolute-menu-wrapper').style.display='none'
                    document.querySelector('.page-container').style.overflow='auto'
                }
            }
        })
    
    }

    function showImg(){
        document.querySelector('.for-img input').onchange = () => {
            const [img]  = document.querySelector('.for-img input').files
            if(img){
                document.querySelector('.for-img img').src = URL.createObjectURL(img)
                document.querySelector('.for-img img').style.zIndex = 1
            }
        }
    }
}