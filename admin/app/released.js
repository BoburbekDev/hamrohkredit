function generateReleasedPage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control input-sm" placeholder="Qidirish...">
                </div>
                </div>
            </div>
            <div class="table-filter">
                <span>Ishdan ketganlar</span>
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
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
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

function releasedPageFuncs(){
    function getEmployees(){
        document.querySelector('table tbody').innerHTML = ''
        fetch('/api/employee/getReleased')
        .then(res => res.json())
        .then(data => data.forEach((item, i) => {
            document.querySelector('table tbody').innerHTML += `
            <tr data-id="${item._id}" data-name="${item.name}" data-img="${item.img}" data-email="${item.email}" data-roleId="${item.roleId.title}" data-branch="${item.branchId._id}" data-branchId="${item.branchId.name}">
                <td>${i+1}</td>
                <td id="img"><img src="/${item.img}"></td>
                <td id="name">${item.name}</td>
                <td id="email">${item.email}</td>
                <td id="roleId">${item.roleId.title}</td>
                <td id="branchId">${item.branchId.name}</td>
            </tr>
            `
        }))

    }
    getEmployees()
}