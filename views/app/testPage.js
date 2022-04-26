function generateTestsPage(selector, callback, data, id) {
    selector.innerHTML = ''
    selector.innerHTML += `
        <p><span>29</span>:<span>59</span></p>
        <div class="test-wrapper">
            <div class="question"></div>
            <div class="options"></div>
            <div class="buttons">
                <button class="prev">Previous</button>
                <button class="next">Next</button>
                <button class="finish" style="display:none">Finish Test</button>
            </div>
        </div>
    `
    callback(data, id);
}

function testsPageFuncs(data, id) {
    
    function setTime(){
        document.querySelector('p span:last-child').innerHTML=document.querySelector('p span:last-child').innerHTML*1-1
        if(document.querySelector('p span:last-child').innerHTML==0){
            document.querySelector('p span:last-child').innerHTML=59
            document.querySelector('p span:first-child').innerHTML = document.querySelector('p span:first-child').innerHTML*1 - 1
            if(document.querySelector('p span:first-child').innerHTML == 0){
                clickFinishTest()
            }
        }
    }
    
    let timeTest = setInterval(setTime,1000)
    let index = 0
    let natija = 0;
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const finishTest = document.querySelector('.finish');
    finishTest.addEventListener('click', clickFinishTest);
    next.addEventListener('click', clickNext);
    prev.addEventListener('click', clickPrev);
    function showTest(){
        document.querySelector('.question').innerHTML = data.tests[index].question
        document.querySelector('.options').innerHTML=''
        data.tests[index].options.forEach((option, i) => {
            if(index==0){
                prev.setAttribute('disabled','true')
            }else{
                prev.removeAttribute('disabled')
            }
            if(index==data.tests.length-1){
                finishTest.style.display='block'
                next.setAttribute('disabled', 'true')
            }
            else{
                finishTest.style.display='none'
                next.removeAttribute('disabled')
            }
            document.querySelector('.options').innerHTML += `
                ${option.checked==true ?  `<input type="radio" id="${i}" name="${data.tests[index].question}" checked>`:`<input type="radio" id="${i}" name="${data.tests[index].question}">`} 
                <label for="${i}">${option.option}</label><br>
                `
            checkAnswers()
        })
    }

    function checkAnswers() {
        const question = document.querySelector('.question');
        const inputs = document.querySelectorAll('.options input');
        inputs.forEach(input => {   
            if(!input.checked) {
                data.tests[index].options[input.id*1].checked = false;
            } else {
                data.tests[index].options[input.id*1].checked = true;
            }
        })
    }

    function clickNext() {
        checkAnswers();
        if(index >= data.tests.length ) { return; } 
        else {         
            index = index + 1;
            showTest();
        }
    }

    function clickPrev() {
        checkAnswers();
        if(index <= 0) { return } 
        else {
            index = index - 1;
            showTest();
        }
    }

    function clickFinishTest() {
        clearInterval(timeTest)
        checkAnswers()
        data.tests.forEach(answer => {
            answer.options.forEach(option => {
                if((option.checked == true) && (option.boolean == 'true')) {
                    natija = natija + 1;
                }
            })
        })
        fetch('/api/result/CreateResult',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                result: Math.round((natija/data.tests.length)*100) + '%',
                info: data.tests,
                testId: data._id,
                userId: id
            })
        })
        .then(alert("Natija :" +  Math.round((natija/data.tests.length)*100) + '%'), alert('Asosiy sahifaga qaytilmoqda ...'))
        .then(loadScript("/app/home.js", () => {
            generatePage(root, generatePageFuncs)
        }))
    }
    showTest()
}