function generateResultPage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" class="form-control input-sm" placeholder="Qidirish...">
                </div>
            </div>
            <div class="table-filter">
                <span>Test Natijalari</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>F.I.O</th>
                        <th>Test nomi</th>
                        <th>Natija</th>
                        <th>Amallar</th>
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
function resultPageFuncs(){
    function getResult(){
        fetch('/api/result/getResults')
            .then(res=> res.json())
            .then(document.querySelector('table tbody').innerHTML = '')
            .then(data => data.forEach((item, i) =>{
                document.querySelector('table tbody').innerHTML += `
                <tr data-id="${item._id}">
                    <td>${i+1}</td>
                    <td>${item.userId.name}</td>
                    <td>${item.testId.title}</td>
                    <td>${item.result}</td>
                    <td>
                        <i class="fa fa-trash fa-2x" id="delete_user"></i>
                    </td>
                </tr>
            `
            deleteResult()
            }))
       
    }
    getResult()
    function deleteResult(){
        document.querySelectorAll('td i#delete_user').forEach(item => {
            item.onclick = () => {
                fetch(`/api/result/deleteResult`, {
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