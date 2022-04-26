function generateTestPage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control input-sm" placeholder="Search...">
                </div>
                <div class="col-md-6 text-right">
                    <a href="#" class="btn btn-default">Qo'shish<i class="fa fa-plus"></i> </a>
                </div>
            </div>
            <div class="table-filter">
                <span>Sinov testlari</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Kim uchun</th>
                        <th>Sarlavha</th>
                        <th>Boshlangan vaqti</th>
                        <th>Yopilgan vaqti</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="absolute-menu-wrapper">
            <div class="absolute-menu">
                <p class="absolute-title">Test yaratish</p>
                <div class="absolute-body">
                    <select required>
                    </select>                   
                    <input id="title" type="text" placeholder="Sinov sarlavhasini kiriting..."> 
                    <label>Sinov boshlanish sanasi</label>                   
                    <input id="opened" type="date" placeholder="Sinov boshlanish sanasi..."> 
                    <label>Sinov tugallanish sanasi</label>                   
                    <input id="closed" type="date" placeholder="Sinov yakunlanish sanasi...">                    
                </div>
                <div class="absolute-btns">
                    <button class="absolute-btn-cancel">Bekor qilish</button>
                    <button class="absolute-btn-ok">Saqlash</button>
                </div>
            </div>
        </div>
    </div>
    <div class="test-wrapper">
        <div class="test-block">
            <p class="test-block-title">Test Yaratish</p>
            <input type="text" name="question" id="question" placeholder="Test savolini kiriting...  "><br>
            <div class="options">
                <p class="options-title">Variantlar</p>
                <div>
                    <input id="option1" type="radio" name="rad"/>
                    <label for="option1"><input type="text"></label>
                </div>
                <div>
                    <input id="option2" type="radio" name="rad"/>
                    <label for="option2"><input type="text"></label>
                </div>
                <div>
                    <input id="option3" type="radio" name="rad"/>
                    <label for="option3"><input type="text"></label>
                </div>
                <div>
                    <input id="option4" type="radio" name="rad"/>
                    <label for="option4"><input type="text"></label>
                </div>
            </div>
            <button>Saqlash</button>
        </div>
    </div>
    `
    cb()
}
function testPageFuncs(){
    function getTest(){
       fetch('/api/test/getTests')
       .then(res => res.json())
       .then(document.querySelector('table tbody').innerHTML = '')
       .then(data => data.forEach((item, i) => {
        document.querySelector('table tbody').innerHTML += `
        <tr data-id="${item._id}" data-roleId="${item.roleId}" data-title="${item.title}" data-opened="${item.opened}" data-closed="${item.closed}">
            <td>${i+1}</td>
            <td id="roleId">${item.roleId.title}</td>
            <td id="title">${item.title}</td>
            <td id="opened">${item.opened}</td>
            <td id="closed">${item.closed}</td>
            <td>
                <i class="fa fa-trash fa-2x" id="delete_user"></i>
                <i class="fa fa-edit fa-2x" id="edit_user"></i>
                <i class="fa fa-plus-circle fa-2x" id="add_test"></i>
            </td>
        </tr>
        `
        deleteTest()
        testPlus()
        editTest()
       }))
    }
    getTest()
    function deleteTest(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                fetch('/api/test/deleteTest', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body:JSON.stringify({
                        id:item.parentElement.parentElement.dataset.id
                    })
                })
                    .then(res=>res.json())
                    .then(alert('Muaffaqiyatli o\'chirilib tashlandi ...'), item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement))
            }
        })
    }
    function addTest(){
        document.querySelector('.btn.btn-default').onclick = () =>{
            document.querySelector('.absolute-menu-wrapper').style.display='block'
            document.querySelector('.page-container').style.overflow='hidden'
            document.querySelector('.page-container').scrollTop = 0
            getOption()
        }
        document.querySelector('.absolute-btn-cancel').onclick = () => {
            document.querySelector('.absolute-menu-wrapper').style.display='none'
            document.querySelector('.page-container').style.overflow='auto'
        }
        document.querySelector('.absolute-btn-ok').onclick = () => {
            let i = 0
            document.querySelectorAll('.absoute-body input').forEach(item => {
                if(item.value === ""){
                    i++
                }
            })
            if(i===0){
                if(document.querySelector('input#opened').value<document.querySelector("input#closed").value){
                    fetch(`/api/test/createTest`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            roleId: document.querySelector('.absolute-body select').value,
                            title: document.querySelector('.absolute-body input#title').value,
                            opened: document.querySelector('.absolute-body input#opened').value,
                            closed: document.querySelector('.absolute-body input#closed').value
                        })
                    })
                    .then(res => res.json())
                    .then(getTest)
                    .then(alert('Muaffaqqiyatli yaratildi'),document.querySelector('.absolute-menu-wrapper').style.display='none',
                    document.querySelector('.page-container').style.overflow='auto')
                }else{
                    alert('Malumotlar xato kiritilgan ...')
                }
            }else{
                alert("Majburiy malumotlar kiritlmadi !!!")
            }
        }
    }
    addTest()
    function getOption(){
        document.querySelector('.absolute-body select').innerHTML = '<option value="" disabled selected>Lavozimni tanlang...</option>'
        fetch(`/api/role/getRoles`)
        .then(res => res.json())
        .then(data => data.forEach(item => {
            document.querySelector('.absolute-body select').innerHTML +=`
                <option value="${item._id}">${item.title}</option>
            `
        }))
    }

    function editTest() {
        document.querySelectorAll('td i#edit_user').forEach(item => {
            item.onclick = () => {
                document.querySelector('.absolute-menu-wrapper').style.display='block'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('.page-container').style.overflow='hidden'
                getOption()
                document.querySelector('.absolute-body select').value = item.parentElement.parentElement.dataset.roleId,
                document.querySelector('.absolute-body input#title').value = item.parentElement.parentElement.dataset.title

                document.querySelector('.absolute-btn-ok').onclick = () => {
                    let i = 0
                    document.querySelectorAll('.absoute-body input').forEach(item => {
                        if(item.value === ""){
                            i++
                        }
                    })
                    if(i===0){
                        if(document.querySelector('input#opened').value<document.querySelector("input#closed").value){
                            fetch(`/api/test/updateTest`, {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id:item.parentElement.parentElement.dataset.id,
                                    roleId: document.querySelector('.absolute-body select').value,
                                    title: document.querySelector('.absolute-body input#title').value,
                                    opened: document.querySelector('.absolute-body input#opened').value,
                                    closed: document.querySelector('.absolute-body input#closed').value
                                })
                            })
                            .then(res => res.json())
                            .then(getTest)                                
                            .then(alert('Muaffaqqiyatli yaratildi'),document.querySelector('.absolute-menu-wrapper').style.display='none',
                            document.querySelector('.page-container').style.overflow='auto' )
                        }else{
                            alert('Malumotlar xato kiritilgan ...')
                        }
                    }else{
                        alert("Majburiy malumotlar kiritlmadi !!!")
                    }
                }
            }
        })
    }
    function testPlus(){
        document.querySelectorAll('td i#add_test').forEach(item => {
            item.onclick = () =>{
                document.querySelectorAll('.test-block input[name="rad"]').forEach( item =>{
                    item.onclick = () =>{
                        document.querySelectorAll('.test-block input[name="rad"]').forEach(input=>input.parentElement.querySelector('label input').dataset.check = false)
                        item.parentElement.querySelector('label input').dataset.check = true
                    }
                })
                document.querySelector('.test-wrapper').style.display='block'
                document.querySelector('.test-block button').onclick = () => {
                    let i=0
                    function uuid() {
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                            return v.toString(16);
                        });
                    }
                    const data = {
                        id: item.parentElement.parentElement.dataset.id,
                        tests: [{
                            id: uuid(),
                            question: document.querySelector('.test-block input#question').value,
                            options: []
                        }]
                    }
                    if(document.querySelector('.test-block input#question').value!==""){
                        document.querySelectorAll('.options div label input').forEach(input => {
                            if(input.value===""){i++}
                            else{
                                data.tests[0].options.push({'option': input.value, "boolean": input.dataset.check})
                            }
                        })
                        if(i>2){
                            alert('Eng kamida 2ta variant berilishi kerak !!!')
                        }else{
                            let checks = -1
                            data.tests[0].options.forEach(( index, i) => {
                                if(index.boolean=='true'){
                                    checks=i 
                                }
                            })
                            if(checks!==(-1)){
                                fetch('/api/test/updateTest',{
                                    method: "POST",
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                })
                                .then(res => res.json())
                                .then(alert("Muaffaqiyatli amalga oshirildi..."))
                                .catch(error => {
                                    console.error('Error:', error)
                                });
                            }else{
                                alert("To'g'ri javobni tanlash majburiy !!!")
                            }
                                                        
                        }
                    }else{
                        alert('Savolni kiritish majburiy')
                    }
                    
                    document.querySelector('.test-wrapper').style.display='none'

                }                    
            }
        })
    }
}