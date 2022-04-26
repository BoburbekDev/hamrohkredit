function generatePage(root, callback){
    root.innerHTML = ''
    root.innerHTML = `
    <div class="header align-center-between">
        <img src="./img/hamroh logo-01.png" alt="hamroh_logo" class="header_logo">
        <div class="header_info align-center-between">
            <div class="info_gmail align-center-between">
                <img src="./img/Vector.png" alt="">
                <p>hamrohsavdo@gmail.com</p>
            </div>
            <div class="info_phone align-center-between">
                <img src="./img/Vector (1).png" alt="">
                <p>55-801-44-44</p>
            </div>
            
            <img src="./img/Vector (2).png" alt="" class="header_login">
            <div class="burger">
                <span></span>
            </div>
        </div>
    </div>
    <div class="menu align-center-between">
        <p class="home_page">Bosh sahifa</p>
        <p class="news_page">Yangiliklar</p>
        <p class="employee_page">Xodimlar</p>
        <p class="about_page">Biz xaqimizda</p>
        <img src="./img/user.png" alt="" class="header_login">
    </div>
    <div class="render_page">
    </div>
    <div class="footer">
        <img src="./img/hamroh logo-02.png" alt="" class="footer_logo">
        <div class="footer_location">
            <p class="footer_location_title">Manzil</p>
            <div class="footer_location_body">
                <img src="./img/Vector (3).png" alt="">
                <p>Buvayda tumani Yangiqo'rg'on shahar</p>
            </div>
        </div>
        <div class="footer_social">
            <p class="footer_social_title">Ijtimoiy tarmoqlar</p>
            <div class="footer_social_body">
                <a href="" title=""><img src="./img/facebook.png" alt="facebook"></a>
                <a href="" title=""><img src="./img/instagram.png" alt="instagram"></a>
                <a href="" title=""><img src="./img/telegram.png" alt="telegram"></a>
                <a href="" title=""><img src="./img/twitter.png" alt="twitter"></a>
                <a href="" title=""><img src="./img/youtube.png" alt="youtube"></a>
            </div>
        </div>
    </div>
    `
    callback()
}

function generatePageFuncs() {
    const render = document.querySelector('.render_page')
    function generateHomePage(callback){
        document.querySelectorAll('.menu p').forEach(p=>{
            p.style.opacity='.4'
            p.style.color='#fff'
        })
        document.querySelector(".home_page").style.opacity='1'
        document.querySelector(".home_page").style.color='#F9CA48'
        render.innerHTML = ''
        render.innerHTML += `
        <div class="home_main">
            <div class="carousel-wrapper">
                <div class="carousel">
                </div>
            </div>
            <div class="our_skills">
                <p class="our_skills_title">Bizning xizmatlarimiz</p>
                <div class="our_skills_body">
                    <div class="our_skill">
                        <img src="./img/Vector (4).png" alt="">
                        <p>7000 xildan ziyod maxsulotlar</p>
                    </div>
                    <div class="our_skill">
                        <img src="./img/Group.png" alt="">
                        <p>Kreditga olish imkoniyati</p>
                    </div>
                    <div class="our_skill">
                        <img class="skill_last" src="./img/gradient.png" alt="">
                        <p>Yetkazib berish xizmati</p>
                    </div>
                </div>
            </div>
            <div class="our_about">
                <p class="our_about_title">Hamroh raqamlarda</p>
                <div class="our_about_body">
                    <div class="our_about_thing">
                        <img src="./img/participant.png" alt="">
                        <h2>102</h2>
                        <p>Hodimlar</p>
                    </div>
                    <div class="our_about_thing">
                        <img src="./img/open-box.png" alt="">
                        <h2>7000</h2>
                        <p>Mahsulotlar</p>
                    </div>
                    <div class="our_about_thing">
                        <img src="./img/branch.png" alt="">
                        <h2>7</h2>
                        <p>Filiallar</p>
                    </div>
                    <div class="our_about_thing">
                        <img src="./img/customer.png" alt="">
                        <h2>1000</h2>
                        <p>Mijozlar</p>
                    </div>
                </div>
            </div>
            <div class="our_companions">
                <p class="our_companions_title">Bizning hamkorlarimiz</p>
                <div class="our_companions_body">
                </div>
            </div>
        </div>           
        `
        callback()
    }
    function generateHomePageFuncs(){
        function getSlider(){
            fetch('/api/slider/getSliders')
                .then(res => res.json())
                .then(data => data.forEach((item,i) => {
                    if(i==0){
                        document.querySelector('.carousel').innerHTML += `
                            <img class="carousel__photo initial" src="/${item.img}">
                        `
                    }
                    else{
                        document.querySelector('.carousel').innerHTML += `
                            <img class="carousel__photo" src="/${item.img}">
                        `
                    }
                }))
                .then(document.querySelector('.carousel').innerHTML+=`
                <div class="carousel__button--next"></div>
                <div class="carousel__button--prev"></div>`)
                .then(activityCarousel)
        }
        getSlider()
        function getPartners (){
            document.querySelector('.our_companions_body').innerHTML = ''
            fetch(`/api/partner/getPartners`)
            .then(res => res.json())
            .then(data => data.forEach(item => {
                document.querySelector('.our_companions_body').innerHTML+=`
                    <img src="/${item.img}" alt="">
                `
            }))
        }
        getPartners()
        function activityCarousel(){
            document.querySelector('.carousel__button--next').onclick = () => {
                const imgs = document.querySelectorAll('.carousel__photo')
                let a
                imgs.forEach((img,i)=>{
                    if(img.className === 'carousel__photo initial'){
                        imgs[i].classList.remove('initial')
                        a = i   
                    };
                })
                if(a===(imgs.length-1)) imgs[0].classList.add('initial')
                else imgs[a+1].classList.add('initial')
            }
            document.querySelector('.carousel__button--prev').onclick = () => {
                const imgs = document.querySelectorAll('.carousel__photo')
                let a
                imgs.forEach((img,i)=>{
                    if(img.className === 'carousel__photo initial'){
                        imgs[i].classList.remove('initial')
                        a = i   
                    };
                })
                if(a===0) imgs[imgs.length-1].classList.add('initial')
                else imgs[a-1].classList.add('initial')
            }
            var acCar = setInterval(()=>{
                if(document.querySelector('.home_page').style.opacity=='1'){
                    const imgs = document.querySelectorAll('.carousel__photo')
                    let a
                    imgs.forEach((img,i)=>{
                        if(img.className === 'carousel__photo initial'){
                            imgs[i].classList.remove('initial')
                            a = i   
                        };
                    })
                    if(a==(imgs.length-1))imgs[0].classList.add('initial')
                    else{ 
                        if(imgs[a+1].classList != 'undefined') {
                            imgs[a+1].classList.add('initial')
                        }
                    }
                }
                else{
                    clearInterval(acCar)
                }
            },3000)
        }
    }
    generateHomePage(generateHomePageFuncs)
    document.querySelector(".home_page").onclick = () => generateHomePage(generateHomePageFuncs)

    function generateNewPage(callback){
        document.querySelectorAll('.menu p').forEach(p=>{
            p.style.opacity='.4'
            p.style.color='#fff'
        })
        document.querySelector(".news_page").style.opacity='1'
        document.querySelector(".news_page").style.color='#F9CA48'
        render.innerHTML = ''
        render.innerHTML += `
            <div class="news_content">
                <div class="news_trends">
                </div>
            </div>       
        `
        callback()
    }

    function generateNewPageFuncs(){
        function getNews(){
            document.querySelector('.news_trends').innerHTML = ''
            fetch(`/api/article/getArticles`)
            .then(res => res.json())
            .then(data => data.forEach(item =>{
                const time = item.createdAt.slice(0,10)
                document.querySelector('.news_trends').innerHTML += `
                <div class="trend_card">
                    <div class="trend_card_img">
                        <p class="trend_card_date">${item.createdAt.slice(0,10)}</p>
                        <img src="/${item.img}" alt="">
                    </div>
                    <div class="trend_card_body">
                        <p class="trend_card_title">${item.title}</p>
                        <p class="trend_card_text">${item.text}</p>
                        <div class="trend_card_btn">Batafsil</div>
                    </div>
                </div>
                `
            }))
        }
        getNews()
    }
    document.querySelector(".news_page").onclick = () => generateNewPage(generateNewPageFuncs)

    function generateEmployeePage(callback){
        document.querySelectorAll('.menu p').forEach(p=>{
            p.style.opacity='.4'
            p.style.color='#fff'
        })
        document.querySelector(".employee_page").style.opacity='1'
        document.querySelector(".employee_page").style.color='#F9CA48'
        render.innerHTML = ''
        render.innerHTML += `
            <div class="employee_content">
                <div class="comfort_body"></div>
                <div class="employee_body">
                </div>
            </div>
        `;
        callback()
    }

    function generateEmployeePageFuncs(){
        document.querySelector('.employee_body').innerHTML=''
        fetch(`/api/reward/getRewardes`)
        .then(res => res.json())
        .then(data => data.forEach(item => {
            document.querySelector('.employee_body').innerHTML += `
                <div class="trend_card">
                    <div class="trend_card_img">
                        <p class="trend_card_date">${item.createdAt.slice(0,10)}</p>
                        <img src="/${item.img}" alt="">
                    </div>
                    <div class="trend_card_body">
                        <p class="trend_card_title">${item.title}</p>
                        <p class="trend_card_text">${item.text}</p>
                        <div class="trend_card_btn">Batafsil</div>
                    </div>
                </div>
                `
        }))
        document.querySelector('.comfort_body').innerHTML = ''
        fetch(`/api/comfort/getComforts`)
        .then(res => res.json())
        .then(data => data.forEach(item => {
            document.querySelector('.comfort_body').innerHTML += `
                <div class="comfort_card">
                    <img src="/${item.img}">
                    <p>${item.text}<p>
                </div>
            `
        }))
    }
    document.querySelector(".employee_page").onclick = () => generateEmployeePage(generateEmployeePageFuncs)

    function generateAboutPage(callback){
        document.querySelectorAll('.menu p').forEach(p=>{
            p.style.opacity='.4'
            p.style.color='#fff'
        })
        document.querySelector(".about_page").style.opacity='1'
        document.querySelector(".about_page").style.color='#F9CA48'
        render.innerHTML = ''
        render.innerHTML += `
            <div class="about_content">
                <div class="hamroh_about">
                    <div class="hamroh_about_body">
                        <p class="hamroh_about_title">Hamroh</p>
                        <p class="hamroh_about_text">«Hamroh» kompaniyasi dastlab 2012 yil may oyida Oltiariq tumanida «Kafolat» nomi ostida o'z faoliyatini boshlagan. Boltaboyev Bahodirjon rahbarligida 6 nafar xodimlar bilan savdo markazidagi ishlar yo'lga qo'yilgan. Keyinchalik savdo markaziga mijozlar oqimining o'sib borishi bilan yangidan-yangi xodimlar ishga jalb qilinib kompaniya kengaytirila boshlagan. 
                        2014 yilda Qo'qon shahrida 2-filial o'z ishini boshlagan. Unga «Oila market» nomi berilgan.
                        Bir necha yillar mobaynida ushbu savdo markazlari Kafolat va Oila market nomi bilan ish faoliyatini olib borgan. Biroq 2019 yilga kelib «Hamroh» nomi ostiga birlashtirilgan va yagona markaz orqali boshqarilgan. 
                        2019 yil fevral oyida Qumtepa tumanida 3-filial ochilgan. Unda dastlab 5 nafar xodimlar ish faoliyatlarini boshlagan. Ayni damda mazkur filialimizda 20dan ortiq ishchi xodimlar mehnat qilishmoqda.
                        Vanihoyat, 4-filialimizni 2020 yil dekabr oyida Marg'ilon shahrida ochishga muvaffaq bo'ldik va 20dan ortiq yangi ish o'rni ham yaratdik. Hozirda kompaniyamizda 160dan ortiq malakali xodimlar ishlab kelmoqda.  
                        </p>
                    </div>
                    <img src="./img/5.jpg" alt="" class="hamroh_about_img">
                </div>
                <div class="main_office">
                    <p class="main_office_title">Hamroh Savdo Majmualari</p>
                    <div class="main_office_body">
                        
                    </div>
                </div>
                <div class="hamroh_maps">
                    
                </div>
            </div>
        `
        callback()
    }

    function generateAboutPageFuncs(){
        document.querySelector('.main_office_body').innerHTML = ''
        fetch('/api/branch/getBranches')
        .then(res => res.json())
        .then(data => data.forEach(item => {
            document.querySelector('.main_office_body').innerHTML += `
                <div class="main_office_body_thing">
                    <div class="main_office_body_thing_body">
                        <p class="main_office_body_thing_body_title">${item.name}</p>
                        <div class="main_office_body_thing_about">
                            <div class="main_office_body_thing_about_location">
                                <img src="./img/placeholder.png" alt="">
                                <p>Manzil: ${item.location}</p>
                            </div>
                            <div class="main_office_body_thing_about_location">
                                <img src="./img/delivery.png" alt="">
                                <p>Mo'jjal: ${item.arentr}</p>
                            </div>
                            <div class="main_office_body_thing_about_phone">
                                <img src="./img/Vector (1).png" alt="">
                                <p>Phone: ${item.phone}</p>
                            </div>
                        </div>
                    </div>
                    <img src="/${item.img}" alt="" class="main_office_body_img">
                </div>
                `
        }))
    }
    document.querySelector(".about_page").onclick = () => generateAboutPage(generateAboutPageFuncs)

    function generateLoginPage(callback){
        document.querySelectorAll('.menu p').forEach(p=>{
            p.style.opacity='.4'
            p.style.color='#fff'
        })
        render.innerHTML = ''
        render.innerHTML += `
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
    
    function generateLoginPageFuncs(){
        function goToTest(){
            document.querySelector('.goToTest').onclick = () =>{
                if(document.querySelector('.login_body input#email').value === '' ||  document.querySelector('.login_body input#parol').value === ""){
                    alert('Majburiy malumotlar kiritilmadi !')
                }else{
                    fetch('/api/employee/employeeLogin', {
                        method: "POST",
                        headers: {
                            'Content-type': "application/json"
                        },
                        body: JSON.stringify({
                            email: document.querySelector('.login_body #email').value,
                            password: document.querySelector('.login_body #parol').value
                        })
                    })
                    .then(async res => {
                        if(res.status == 200){
                            const content = await res.json()
                            generateTestPage(root,testPageFuncs,content)
                            
                        }else{
                            alert('Email yoki Parol xato')
                        }
                    })
                }
                
            }
        }
        goToTest()
    }

    document.querySelector('.menu img.header_login').onclick = () => generateLoginPage(generateLoginPageFuncs)
    document.querySelector('img.header_login').onclick = () => generateLoginPage(generateLoginPageFuncs)
    function generateTestPage(root, testPageFuncs,content){
        root.innerHTML = ""
        root.innerHTML = `
        <div class="header align-center-between">
            <img src="./img/hamroh logo-01.png" alt="hamroh_logo" class="header_logo">
            <div class="header_info align-center-between">
                <div class="info_gmail align-center-between">
                    <img src="./img/Vector.png" alt="">
                    <p>Info@hamroh.uz</p>
                </div>
                <div class="info_phone align-center-between">
                    <img src="./img/Vector (1).png" alt="">
                    <p>+998 (94) 304 05 26</p>
                </div>
                <img src="./img/Vector (2).png" alt="" class="header_login">
                <p>${content.name}</p>
                <img src="./img/logout.png" class="logout" alt="logout">
            </div>
        </div>
        <div class="test_page" data-opened="${content.opened}" data-closed="${content-closed}" data-id='${content._id}' id="${content.roleId}">
        </div>
        <div class="footer">
            <img src="./img/hamroh logo-02.png" alt="" class="footer_logo">
            <div class="footer_location">
                <p class="footer_location_title">Manzil</p>
                <div class="footer_location_body">
                    <img src="./img/Vector (3).png" alt="">
                    <p>Farg'ona Shahar Motrudiy ko'chasi 60</p>
                </div>
            </div>
            <div class="footer_social">
                <p class="footer_social_title">Ijtimoiy tarmoqlar</p>
                <div class="footer_social_body">
                    <a href="" title=""><img src="./img/facebook.png" alt="facebook"></a>
                    <a href="" title=""><img src="./img/instagram.png" alt="instagram"></a>
                    <a href="" title=""><img src="./img/telegram.png" alt="telegram"></a>
                    <a href="" title=""><img src="./img/twitter.png" alt="twitter"></a>
                    <a href="" title=""><img src="./img/youtube.png" alt="youtube"></a>
                </div>
            </div>
        </div>
        `
        testPageFuncs(content)
    }
    function testPageFuncs(content){        
        document.querySelector('img.logout').onclick= () => generatePage(root, generatePageFuncs)
        function getTest(){
            const testPage = document.querySelector('.test_page')
            if(content.isBoolean==true){
                fetch('/api/prezentation/get')
                .then(res => res.json())
                .then( data=> data.forEach(item => {
                    testPage.innerHTML+=`
                        <a href="./${item.img}" style="display: block; text-align:center; text-decoration: none;  color: black; margin: .7rem auto; font-size: 2rem;">Prezentatsiyani yuklash</a>

                    `
                }))
            }
            fetch('/api/test/getTestForEmployee', {
                method: "POST",
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    id: testPage.dataset.id,
                    roleId: testPage.id
                })
            })
            .then(res => res.json())
            .then(data => data.forEach(item => {
                testPage.innerHTML += `
                <div class="test_block" data-id="${item._id}">
                    <p>Nomi: ${item.title}</p>
                    <p>Ochilgan vaqt: ${item.opened}</p>
                    <p>Yopilgan vaqt: ${item.closed}</p>
                    <button class="start_test">Boshlash</button>
                </div>
                `
                beginningTest()
            }))
        }

        function beginningTest(){
            document.querySelectorAll('.start_test').forEach( item => {
                item.onclick = () => {
                    fetch('/api/result/getResults')
                        .then(res=>res.json())
                        .then(data => {
                            let findIndex = data.findIndex(result => result.userId._id == item.parentElement.parentElement.dataset.id && result.testId._id == item.parentElement.dataset.id)
                            if(data[findIndex]){
                                alert("Testni ishlab bolgansiz ... Natijangiz :"+ data[findIndex].result);

                            }else{
                                fetch('/api/test/getTestById', {
                                    method: "POST",
                                    headers: {
                                        "Content-type": 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: item.parentElement.dataset.id
                                    })
                                })
                                .then(res => res.json())
                                .then(data =>  
                                    loadScript('/app/testPage.js',() => {
                                    generateTestsPage(document.querySelector('.test_page'), testsPageFuncs,data, document.querySelector('.test_page').dataset.id)
                                }))
                            }
                        })
                }
            })
        }
        getTest()
    }
    
    document.querySelector('.burger').onclick = () =>{
        document.querySelector('.burger').classList.toggle('open')
        document.querySelector('.menu').classList.toggle('height')
        document.querySelector('.menu').onclick = () => {
            document.querySelector('.burger').classList.remove('open')
            document.querySelector('.menu').classList.remove('height')
        }
    }
}