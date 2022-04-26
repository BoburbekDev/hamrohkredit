function generatePage(root,callback){
    root.innerHTML =''
    root.innerHTML += `
    <header>
        <div class="logo">
            <div class="img">
                <span class="logo-text">Hamroh</span>
                <span class="logo-text minbar">H</span>
            </div>
        </div>
        <div class="topbar">
            <div class="left">
                <a class="navbar-collopse"> <i class="fa fa-bars"></i> </a>
                <span class="topbar-title">Profile</span>
            </div>
            <div class="right">
                <span class="">
                    <i class="fa fa-bell"></i>
                </span>
            </div>
        </div>
    </header>
    <div class="main">
        <aside>
            <nav>
                <ul class="nav">
                    <li class="active">
                        <a href="#" class="article_page">
                            <i class="fa fa-newspaper-o"></i>
                            <span class="span">Yangiliklar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="branch_page">
                            <i class="fa fa-location-arrow"></i>
                            <span class="span">Filiallar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="partner_page">
                            <i class="fab fa-handshake-alt"></i>
                            <span class="span">Hamkorlar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="slider_page">
                            <i class="fab fa-handshake-alt"></i>
                            <span class="span">Slider</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="role_page">
                            <i class="fa fa-user"></i>
                            <span class="span">Bo'limlar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="employee_page">
                            <i class="fa fa-users"></i>
                            <span class="span">Hodimlar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="released_page">
                            <i class="fa fa-users"></i>
                            <span class="span">Ishdan ketganlar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="reward_page">
                            <i class="fa fa-users"></i>
                            <span class="span">Taqdirlash</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="comfort_page">
                            <i class="fa fa-users"></i>
                            <span class="span">Qulayliklar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="statistic_page">
                            <i class="fa fa-users"></i>
                            <span class="span">Statistika</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="prezen_page">
                            <i class="fas fa-poll-h"></i>
                            <span class="span">Prezentatsiya</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="test_page">
                            <i class="fa fa-user"></i>
                            <span class="span">Sinov</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="result_page">
                            <i class="fas fa-poll-h"></i>
                            <span class="span">Natijalar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="question_page">
                            <i class="fas fa-poll-h"></i>
                            <span class="span">Test savollari</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="nav-footer">
                <a href="#" class="btn btn-sm">
                    <i class="fa fa-sign-out"></i>
                </a>
            </div>
        </aside>
        <div class="page-container">
            
        </div>
    </div>
    `
    callback()
}

function pageFuncs(){
    document.querySelector('.nav-footer a.btn-sm').onclick = () => {
        loadScript('./app/login.js', () => {
            loginPage(body, loginPageFuncs)
        })
    }
    loadScript('./app/article.js', () => {
        generateArticlePage(document.querySelector('.page-container'),articlePageFuncs)
    })

    document.querySelector('.article_page').onclick = () => loadScript('./app/article.js', () => {
        generateArticlePage(document.querySelector('.page-container'),articlePageFuncs)
    })

    document.querySelector('.comfort_page').onclick = () => loadScript('./app/comfort.js', () => {
        generateComfortPage(document.querySelector('.page-container'),comfortPageFuncs)
    })

    document.querySelector('.employee_page').onclick = ()=>loadScript('./app/employee.js', () => {
        generateEmployeePage(document.querySelector('.page-container'),employeePageFuncs)
    })

    document.querySelector('.released_page').onclick = ()=>loadScript('./app/released.js', () => {
        generateReleasedPage(document.querySelector('.page-container'),releasedPageFuncs)
    })

    document.querySelector('.branch_page').onclick = ()=>loadScript('./app/branch.js', () => {
        generateBranchPage(document.querySelector('.page-container'),branchPageFuncs)
    })

    document.querySelector('.prezen_page').onclick = ()=>loadScript('./app/prezen.js', () => {
        generatePrezenPage(document.querySelector('.page-container'),prezenPageFuncs)
    })

    document.querySelector('.partner_page').onclick = ()=>loadScript('./app/partner.js', () => {
        generatePartnerPage(document.querySelector('.page-container'),partnerPageFuncs)
    })

    document.querySelector('.reward_page').onclick = ()=>loadScript('./app/reward.js', () => {
        generateRewardPage(document.querySelector('.page-container'),rewardPageFuncs)
    })

    document.querySelector('.slider_page').onclick = ()=>loadScript('./app/slider.js', () => {
        generateSliderPage(document.querySelector('.page-container'),sliderPageFuncs)
    })

    document.querySelector('.role_page').onclick = ()=>loadScript('./app/role.js', () => {
        generateRolePage(document.querySelector('.page-container'),rolePageFuncs)
    })  

    document.querySelector('.test_page').onclick = ()=>loadScript('./app/test.js', () => {
        generateTestPage(document.querySelector('.page-container'),testPageFuncs)
    })
    document.querySelector('.result_page').onclick = ()=>loadScript('./app/result.js', () => {
        generateResultPage(document.querySelector('.page-container'),resultPageFuncs)
    })
    document.querySelector('.question_page').onclick = ()=>loadScript('./app/question.js', () => {
        generateQuestionPage(document.querySelector('.page-container'),questionPageFuncs)
    })
    document.querySelector('.statistic_page').onclick = ()=>loadScript('./app/statistic.js', () => {
        generateStatisticPage(document.querySelector('.page-container'),statisticPageFuncs)
    })
}