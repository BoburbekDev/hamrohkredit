function loginPage(root, callback){
    root.innerHTML = ''
    root.innerHTML += `
    <div class="login_wrapper">
        <div class="login">
            <p class="login_text">Hodimlar uchun Testda qatnashish</p>
            <div class="login_body">
                <div>
                    <input type="text" id="email" name="email" required>
                    <label for="email">Email</label>
                </div>
                <div>
                    <input type="password" id="parol" name="parol" required>
                    <label for="parol">Parol</label>
                </div>
                <button class="goToTest">Tasdiqlash</button>
            </div>
        </div>
    </div>
    `
    callback()
}
function loginPageFuncs(){
    document.querySelector('.goToTest').onclick = () =>{
        if(document.querySelector('.login_body input#email').value === '' ||  document.querySelector('.login_body input#parol').value === ""){
            alert('Majburiy malumotlar kiritilmadi !')
        }else{
            if(document.querySelector('.login_body input#email').value === "hamroh@mail.ru" && document.querySelector('.login_body input#parol').value ==='umidjon1111'){
                loadScript('./app/start.js', () => {
                    generatePage(body, pageFuncs)
                })
            }else{
                alert('Email yoki Parol xato')
            }
        }
    }
}