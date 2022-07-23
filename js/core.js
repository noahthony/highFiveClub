


// ----- hide all warning messages 0----------

function hideWarning(){
    var warnings = document.getElementsByClassName('warning'),
        warningsLength = warnings.length;
    
    for(var i = 0, c = warningsLength; i < c; i++){
        if(warnings[i].className == 'warning'){
            warnings[i].style.display = 'none';
        }
    }
}


// --- hide all services from view ---

function hideServices(){
    var services = document.getElementById('services').getElementsByTagName('label');
    var servicesLength = services.length;

    for(var i = 0, c = servicesLength; i < c; i ++){
        services[i].style.display = 'none';
    }
}


// --- clear the choices the client has made --- 

function clearServices(){
    var serviceInputs = document.getElementById('services').getElementsByTagName('input');
    var inputsLength = serviceInputs.length;

    for(var i = 0; i < inputsLength; i++){
        if(serviceInputs[i].type == 'checkbox'){
            serviceInputs[i].checked = false;
        }else{
            alert('An error occured');
        }
    }
}




// resets all the user's service choices 

// function clearServices(){
//     var services = document.getElementById('services').getElementsByTagName('input');
//     var servicesLength = services.length;

//     for(var i = 0, c = servicesLength; i < c; i++){
//         if(services[i].type == 'checkbox'){
//             services[i].checked = false;
//         }
//     }
// }

/*
    Creating services based on the client's choice of event.
*/

function servicesDisplay(serviceName){
    var service = document.getElementById(serviceName).parentNode;
    service.style.display = 'inline';

}


function categorySearch(category){
    var categoryLength = category.length;
    for(var i = 0; i < categoryLength; i++){
        servicesDisplay(category[i]);
    }
}

function getProject(){

    var project = document.getElementById('project');
    return project.options[project.selectedIndex].value;
}

function serviceSetup(client_project){

    var cer = [
        'decoration',
        'photography',
        'hall',
        'security',
        'sound',
        'videography'
    ];

    var wed = cer;

    var travel = [
        'logistic',
        'security',
        'transport',
        'cleaning',
        'babysit'
    ];

    var present = [
        'decoration',
        'photography',
        'hall',
        'sound',
        'videography'
    ];

    var donation = [
        'photography',
        'security',
        'transport',
        'videography'
    ];



    switch(client_project){
        case 'ceremony':
            categorySearch(cer);
            break;
        case 'wedding':
            categorySearch(wed);
            break;
        case 'travel':
            categorySearch(travel);
            break;
        case 'presentation':
            categorySearch(present);
            break;
        case 'donation':
            categorySearch(donation);
            break;
        default:
            alert("A problem occured...");
    }
}


// selects the appropriate warning message depending on the situation 

function getWarning(element){

    while(element = element.nextElementSibling){
        if(element.className == 'warning'){
            return element;
        }
    }
    return false;
}

/*
    Creating an object check to store all the checking functions
    we're going to perforn on each input of the form .
    returns true when everything is valid.
*/

var check = {};

check['formula'] = function(){
    var formula = document.getElementById('formula');
    var warningStyle = getWarning(formula).style;

    if(formula.options[formula.selectedIndex].value != 'none'){
        warningStyle.display = 'none';
        return true;
    }else{
        warningStyle.display = 'inline-block';
        return false;
    }

};


check['title'] = function(){
    var title = document.getElementById('title');
    var warningStyle = getWarning(title).style;

    if(title.options[title.selectedIndex].value != 'none'){
        warningStyle.display = 'none';
        return true;
    }else{
        warningStyle.display = 'inline-block';
        return false;
    }
};

check['name'] = function(id){
    var name = document.getElementById(id);
    var warningStyle = getWarning(name).style;

    if(name.value != '' && name.value.length > 1){
        name.className = 'correct';
        warningStyle.display = 'none';
        return true;
    }else{
        name.className = 'incorrect';
        warningStyle.display = 'inline-block';
        return false;
    }
};


check['surname'] = check['name'];


check['phone'] = function(){
    var phone = document.getElementById('phone');
    var warningStyle = getWarning(phone).style;

    if(phone.value != '' && phone.value.length == 11){
        phone.className = 'correct';
        warningStyle.display = 'none';
        return true;
    }else{
        phone.className = 'incorrect';
        warningStyle.display = 'inline-block'
    }
};


check['email'] = function(){
    var email = document.getElementById('email');
    var warningStyle = getWarning(email).style;

    if(email.value  != ''){
        email.className = 'correct';
        warningStyle = 'none';
        return true;
    }else{
        email.className = 'incorrect';
        warningStyle.display = 'inline-block';
        return false;
    }
};


check['project'] = function(){
    var project = document.getElementById('project');
    var warningStyle = getWarning(project).style;

    if(project.options[project.selectedIndex].value != 'none'){
        warningStyle.display = 'none'
        return true;
    }else{
        warningStyle.display = 'inline-block';
        return false;
    }
};


check['services'] = function(){
    var services = document.getElementById('services').getElementsByTagName('input');
    var warning = document.getElementById('services').querySelector('p');
    var warningStyle = getWarning(warning).style;
    var servicesLength = services.length;
    var validity = false;

    for(var i = 0; i < servicesLength; i ++){
        validity = services[i].checked || validity;
    }

    if(validity){
        warningStyle.display = 'none';
        return true;
    }else{
        warningStyle.display = 'inline-block';
        return false;
    }
};


check['details'] = function(){
    var details = document.getElementById('customer-details');

    if(details.value == ''){
        details.value = 'Nothing specific';
    }
    return true;
};


/* ----- initializing check up function ------ */

function inputCheck(){

    var form = document.getElementById('reservation-form'),
        inputs = document.getElementsByTagName('input'),
        inputsLength = inputs.length,
        dropLists = document.getElementsByTagName('select'),
        dropListsLength = dropLists.length;

    
    for(var i = 0; i < inputsLength; i++){

        if(inputs[i].type == 'text' || inputs[i].type == 'password'){

            inputs[i].onkeyup = function(){
                check[this.id](this.id); // 'this' represent the element being modified
            };
            inputs[i].onblur = function(){
                check[this.id](this.id); // 'this' represent the element being modified
            };
        }
    }


    for(var i = 0; i < dropListsLength; i++ ){

        if(dropLists[i]){
            dropLists[i].onblur = function(){
                check[this.id](); // 'this' represent the element being modified
            };
            dropLists[i].onchange = function(){
                check[this.id](); // 'this' represent the element being modified
            };
        }
    }


    form.onsubmit = function(){

        var result = true;

        for(var i in check){
            result = check[i](i) && result;
        }

        if(result){
            alert('The form has been filled.');
        }

        return false;
    }


}


// ----------------------------------------------------------------//
//                  actions to be performed on page load
// ----------------------------------------------------------------// 


window.onload = function(){

    hideWarning();
    hideServices();
    inputCheck();
    hideServices();
};


// getting all elements we're going to be using 


// progression bar 

var progressBar = document.getElementById('progress');

// getting each form part and their buttons 

var form1 ={
    "form": document.getElementById('form1'),
    'back': null,
    'next': document.getElementById('next1')
},
form2 = {
    'form': document.getElementById('form2'),
    'back': document.getElementById('prev1'),
    'next': document.getElementById('next2')
},
form3 = {
    'form': document.getElementById('form3'),
    'back': document.getElementById('prev2'),
    'next': document.getElementById('next3')
},
form4 = {
    'form': document.getElementById('form4'),
    'back': document.getElementById('prev3'),
    'next': document.getElementById('next4')
},
form5 = {
    'form': document.getElementById('form5'),
    'back': document.getElementById('prev4'),
    'next': null
};




// *********************************************************************
//                              Start Events 


// --- form 1 ---


form1.next.onclick = function (){
    if(check['formula']()){
        form1.form.style.left = "-500px";   // current form 
        form2.form.style.left = "20px";     // next form
        progressBar.style.width = (92 * 2) + 'px';
    }
};


// --- form 2 --- 


var fields = ['title', 'name', 'surname', 'phone', 'email'];


form2.next.onclick = function (){
    var result = true;
    for(var i = 0, c = fields.length; i < c; i++){
        result = check[fields[i]](fields[i]) && result;
    }
    if(result){
        form2.form.style.left = "-500px";   // current form 
        form3.form.style.left = "20px";     // next form
        progressBar.style.width = (92*3) + 'px';
    }
};
form2.back.onclick = function(){
    var result = true;

    for(var i = 0, c = fields.length; i < c; i++){
        result = check[fields[i]](fields[i]) && result;
    }

    if(result){
        form2.form.style.left = "500px";
        form1.form.style.left = "20px";
        progressBar.style.width = (92) + 'px';
    }
};


// --- form 3 ---


form3.next.onclick = function (){
    if(check['project']()){
        serviceSetup(getProject());
        form3.form.style.left = "-500px";   // current form 
        form4.form.style.left = "20px";     // next form
        progressBar.style.width = (92 * 4) + 'px';
    }
};
form3.back.onclick = function(){

    if(check['project']()){
        form3.form.style.left = "500px";
        form2.form.style.left = "20px";
        progressBar.style.width = (92*2) + 'px';
    }
};

// --- form 4 --- 


form4.next.onclick = function (){
    if(check.services()){
        form4.form.style.left = "-500px";   // current form 
        form5.form.style.left = "20px";     // next form
        progressBar.style.width = (92 * 5) + 'px';
    }
};
form4.back.onclick = function(){

    clearServices();
    hideServices();
    form4.form.style.left = "500px";
    form3.form.style.left = "20px";
    progressBar.style.width = (92*3) + 'px';
};

// --- form 5 ---

form5.back.onclick = function(){
    form5.form.style.left = "500px";
    form4.form.style.left = "20px";
    progressBar.style.width = (92*4) + "px";
};