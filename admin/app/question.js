function generateQuestionPage(root,cb){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="card">
        <div class="card-body">
            <div class="table-filter">
                <span>Test savollari</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TR</th>
                        <th>Sarlavha</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <div class="test-wrapper">
        <div class="test-block">
            <p class="test-block-title">Test Tahrirlash</p>
            <input type="text" name="question" id="question" placeholder="Test savolini kiriting...  "><br>
            <div class="options">
                <p class="options-title">Variantlar</p>
            </div>
            <button>Saqlash</button>
        </div>
    </div>
    `
    cb()
}
function questionPageFuncs(){
    var questions =[]
    function getTest(){
        fetch('/api/test/getTests')
        .then(res => res.json())
        .then(document.querySelector('table tbody').innerHTML = '')
        .then(data => data.forEach((item, i) => {
        document.querySelector('table tbody').innerHTML += `
        <tr data-id="${item._id}">
            <td>${i+1}</td>
            <td id="title">${item.title}</td>
            <td>
                <i class="fa fa-edit fa-2x" id="edit_user"></i>
            </td>
        </tr>
        `
        editTest()
        }))
    }
    getTest()
    function editTest(){
        document.querySelectorAll('td i.fa-edit').forEach(item => {
            item.onclick = () => {
                const idd = item.parentElement.parentElement.dataset.id
                fetch('/api/question/getQuestionById', {
                    method: "POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: item.parentElement.parentElement.dataset.id
                    })
                })
                .then(res => res.json(), 
                    document.querySelector('table thead').innerHTML = `
                        <tr>
                            <th>TR</th>
                            <th>Savol</th>
                            <th>Javob</th>
                            <th>Amallar</th>
                        </tr>
                    `,  
                    document.querySelector('table tbody').innerHTML = ''

                )
                .then(data => data.tests.forEach((item, i) => {
                    questions.push({id:item.id, option: item.options})
                    answer = item.options.findIndex(itm=> itm.boolean == "true")
                    document.querySelector('table tbody').innerHTML += `
                    <tr data-question='${item.question}' data-test="${item.id}" data-id="${idd}">
                        <td>${i+1}</td>
                        <td id="question">${item.question}</td>
                        <td id="answer">${item.options[answer].option}</td>
                        <td>
                            <i class="fa fa-edit fa-2x" id="edit_user"></i>
                            <i class="fa fa-trash fa-2x" id="delete_user"></i>
                        </td>
                    </tr>
                    `
                    deleteQuestion() 
                    editQuestion()   
                }))
            }
        })
    }

    function deleteQuestion() {
        document.querySelectorAll('td i.fa.fa-trash').forEach(item => {
            item.onclick = () => {
                fetch('/api/question/deleteQuestion',{
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({
                        id: item.parentElement.parentElement.dataset.id,
                        testId: item.parentElement.parentElement.dataset.test
                    })
                })
                .then(res => res.json())
                .then(alert('Muaffaqiyatli amalga oshirildi...'))
                .then(getTest())
            }
        })
    }

    function editQuestion(){
        document.querySelectorAll("i.fa.fa-edit.fa-2x#edit_user").forEach(item => {
            item.onclick = () => {
                document.querySelector('.test-wrapper').style.display='block'
                document.querySelector('.page-container').style.overflow='hidden'
                document.querySelector('.page-container').scrollTop = 0
                document.querySelector('input#question').value = item.parentElement.parentElement.dataset.question
                document.querySelector('.options').innerHTML = '<p class="options-title">Variantlar</p>'
                questions.forEach(question=> {
                    if(question.id== item.parentElement.parentElement.dataset.test){
                        question.option.forEach((i,a)=>{
                            if(i.boolean=="true"){
                                document.querySelector('.options').innerHTML += `
                                    <div>
                                        <input id="${a}" type="radio" checked="true" name="rad"/>
                                        <label for="${a}"><input type="text" data-check="true" value="${i.option}"></label>
                                    </div>                
                                        `      
                            }else{
                                document.querySelector('.options').innerHTML += `
                                <div>
                                    <input id="${a}" type="radio" name="rad"/>
                                    <label for="${a}"><input type="text" data-check="false" value="${i.option}"></label>
                                </div>                
                                    ` 
                            }
                        })        
                    }
                })
                document.querySelectorAll('.test-block input[name="rad"]').forEach( item =>{
                    item.onclick = () =>{
                        document.querySelectorAll('.test-block input[name="rad"]').forEach(input=>input.parentElement.querySelector('label input').dataset.check = false)
                        item.parentElement.querySelector('label input').dataset.check = true
                    }
                })
                document.querySelector('.test-block button').onclick = () => {
                    const options = []
                    let i = 0
                    if(document.querySelector('.test-block input#question').value!==""){
                        document.querySelectorAll('.options div label input').forEach(input => {
                            if(input.value===""){i++}
                            else{
                                options.push({'option': input.value, "boolean": input.dataset.check})
                            }
                        })
                        if(i>2){
                            alert('Eng kamida 2ta variant berilishi kerak !!!')
                        }else{
                            let checks = -1
                            options.forEach(( index, i) => {
                                if(index.boolean=='true'){
                                    checks=i 
                                }
                            })
                            if(checks!==(-1)){
                                fetch('/api/question/editQuestion',{
                                    method: "POST",
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: item.parentElement.parentElement.dataset.id,
                                        testId : item.parentElement.parentElement.dataset.test,
                                        question: document.querySelector('input#question').value,
                                        options: options
                                    })
                                })
                                .then(res => res.json())
                                .then(
                                    document.querySelector('.test-wrapper').style.display='none',
                                    document.querySelector('.page-container').style.overflow='auto',
                                    alert("Muaffaqiyatli amalga oshirildi..."),
                                    questions = [],
                                    getTest()
                                )
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
                }            
            }
        })
    }
}