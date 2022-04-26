function generateBranchPage(root,cb){
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
                <span>Bizning officelarimiz</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Rasm</th>
                        <th>Joylashuv</th>
                        <th>Manzil</th>
                        <th>Mo'jjal</th>
                        <th>Phone</th>
                        <th>Ishchi soni</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Yangi Filial yaratish</p>
                <div class="absolute-body">
                    <div class="for-img">
                        <input type="file" accept="image/png, image/gif, image/jpeg">
                        <img src="">
                        <p>Rasm yuklang</p>
                    </div>
                    <input type="text" id="name" placeholder="Nomi...">                    
                    <input type="text" id="location" placeholder="Manzil...">                    
                    <input type="text" id="arentr" placeholder="Mo'jjal...">                    
                    <input type="text" id="phone" placeholder="Telefon raqam...">                    
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
function branchPageFuncs(){
    function getBranchs(){
        fetch('/api/branch/getBranches')
        .then(res => res.json())
        .then(document.querySelector('table tbody').innerHTML = '')
        .then(data => data.forEach((item, i)=>{
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-img="${item.img}" data-name="${item.name}" data-location="${item.location}" data-arentr="${item.arentr}" data-phone="${item.phone}">
                <td>${i+1}</td>
                <td><img src="/${item.img}" alt="office_rasmi"></td>
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.arentr}</td>
                <td>${item.phone}</td>
                <td>${item.employeeCount}</td>
                <td>
                    <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    <i class="fa fa-edit fa-2x" id="edit_user"></i>
                    <i class="fa fa-eye fa-2x" id="see_user"></i>
                </td>
            </tr>
        `  
        deleteBranch()
        editBranch()
        showEmployee()
        }))
    }
    getBranchs()
    function addBranch(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.for-img img').src=''
            document.querySelector('.absolute-body input#name').value = ''
            document.querySelector('.absolute-body input#location').value = ''
            document.querySelector('.absolute-body input#arentr').value = ''
            document.querySelector('.absolute-body input#phone').value = ''
            document.querySelector('.absolute-menu-wrapper').style.display='block'
            document.querySelector('.page-container').scrollTop = 0
            document.querySelector('.page-container').style.overflow='hidden'
            showImg()
            document.querySelector('button.absolute-btn-ok').onclick = () => {
                const formData = new FormData();
                formData.append('image',document.querySelector('.for-img input').files[0])
                formData.append('name',document.querySelector('.absolute-body input#name').value)
                formData.append('location',document.querySelector('.absolute-body input#location').value)
                formData.append('arentr',document.querySelector('.absolute-body input#arentr').value)
                formData.append('phone',document.querySelector('.absolute-body input#phone').value)
                var i=0;
                document.querySelectorAll('.absolute-body input').forEach(input => {
                    if(input.value == ""){i++}
                });
                if(i===0){
                    fetch('/api/branch/createBranch', {
                            method: 'POST',
                            body: formData
                        })
                        .then(res => res.json())
                        .then(getBranchs)
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
    function deleteBranch(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                const formData = new FormData
                formData.append('id', item.parentElement.parentElement.dataset.id)
                fetch('/api/branch/deleteBranch', {
                    method: "POST",
                    body:formData
                })
                    .then(res=>res.json())
                    .then(alert('Muaffaqiyatli ochirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    addBranch()

    function editBranch(){
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                document.querySelector('.absolute-title').textContent = "Filialni tahrirlash"
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.for-img img').style.zIndex = 1 
                document.querySelector('.for-img img').src=`/${item.parentElement.parentElement.dataset.img}`
                document.querySelector('.absolute-body input#name').value = item.parentElement.parentElement.dataset.name
                document.querySelector('.absolute-body input#location').value = item.parentElement.parentElement.dataset.location
                document.querySelector('.absolute-body input#arentr').value = item.parentElement.parentElement.dataset.arentr
                document.querySelector('.absolute-body input#phone').value = item.parentElement.parentElement.dataset.phone
                showImg()
                document.querySelector('button.absolute-btn-ok').onclick = () => {
                    let datanews = new FormData();
                    if(document.querySelector('.for-img input').files[0]!=item.parentElement.parentElement.dataset.img){
                        datanews.set('imgUpdated','true')
                    }
                    datanews.append('id',item.parentElement.parentElement.dataset.id)
                    datanews.append('image',document.querySelector('.for-img input').files[0])
                    datanews.append('name',document.querySelector('.absolute-body input#name').value)
                    datanews.append('location',document.querySelector('.absolute-body input#location').value)
                    datanews.append('arentr',document.querySelector('.absolute-body input#arentr').value)
                    datanews.append('phone',document.querySelector('.absolute-body input#phone').value)
                    var i=0;
                    document.querySelectorAll('.absolute-body input').forEach(input => {
                        if(input.value == ""){i++}
                    });
                    if(i===0){
                        fetch('/api/branch/updateBranch',{
                            method: "POST",
                            body: datanews
                        })
                            .then(res => res.json())
                            .then(getBranchs)
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

    function showEmployee(){
        document.querySelectorAll('td i#see_user').forEach(item =>{
            item.onclick = () =>{
                fetch(`/api/employee/employeeByBranch`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        branchId: item.parentElement.parentElement.dataset.id
                    })
                })
                .then(res => res.json())
                .then(data=>console.log(data))
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