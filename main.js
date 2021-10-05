//change colors
let html = document.querySelector('html');
let checkRadio = document.querySelectorAll('[radio]');
checkRadio.forEach(radio =>{
    radio.addEventListener("change", function(){
        html.className = radio.id;
        saveTheme(radio.id);
    })
})

window.onload = ()=>{
    const theme = getTheme();
    if(theme[0] === undefined){
        return
    }else{
        document.getElementById(theme[0]).checked = true;
        html.className = theme[0];
    }
}

function getTheme(){
    let theme;
    theme = localStorage.getItem('theme') === null ? [] : JSON.parse(localStorage.getItem('theme'))
    return theme; 
}

function saveTheme(newTheme){
    const theme = getTheme();
    theme[0] = newTheme;
    localStorage.setItem("theme", JSON.stringify(theme));
}

//help window
window.addEventListener("keydown", (e)=>{
    if(e.key === 'h'){
        alert('Backspace = Delete \n R = Reset \n Enter = Equal');     
    }
})

let nums = document.querySelectorAll("[data-num]");
let oprs = document.querySelectorAll("[data-op]");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let equal = document.querySelector('.equal');
let container = document.querySelector('.input__area');
let dot = document.querySelector('[data-dot]');
let backNum;
let op;
let test = false;

nums.forEach(num => num.addEventListener('click', typing))
equal.addEventListener('click', result)
del.addEventListener("click", deleting)
dot.addEventListener("click", checkDots);
reset.addEventListener('click', reseting)
oprs.forEach(operator => operator.addEventListener("click", operating))

//------------ TO USE THE KEYBOARD -----------
window.addEventListener("keydown", function(e){
    nums.forEach(num =>{
        if(e.key === num.textContent){
            container.innerHTML += num.textContent;          
            if(container.textContent.length > 12){
                container.style.fontSize = "20px";
            }else{
                container.style.fontSize = "32px";
            }
        }
    })
    oprs.forEach(operator =>{
        if(e.key === operator.textContent){
            backNum = container.innerHTML;
            container.innerHTML = '';
            op = operator.textContent;
            test = false;            
        }
    })
    if(e.key === "Backspace"){
        deleting();            
    }
    if(e.key === "=" || e.key === "Enter"){
        result();
    }
    if(e.key === "."){
        checkDots();
    }
    if(e.key === "r"){
        reseting();
    }   
    if(e.key === "*"){
        backNum = container.innerHTML;
        container.innerHTML = '';
        op = "x";
        test = false;
    }
})

// --------------- TYPE NUMBERS -----------------
function typing(){
    container.innerHTML += this.textContent;
    if(container.textContent.length > 12){
        container.style.fontSize = "20px";
    }else{
        container.style.fontSize = "32px";
    }
}

// -------------- TYPE OPERATORS ---------
function operating(){
    backNum = container.innerHTML;
    container.innerHTML = '';
    op = this.textContent;
    test = false;
}

//---------------------- EQUAL ---------------
function result(){
    if(container.textContent !== '' && backNum !== ''){
        if(op === "+"){
            container.innerHTML = parseFloat(backNum) + parseFloat(container.textContent);
        }
        if(op === "-"){
            container.innerHTML = parseFloat(backNum) - parseFloat(container.textContent);
        }
        if(op === "x"){
            container.innerHTML = parseFloat(backNum) * parseFloat(container.textContent);
        }
        if(op === "/"){
            container.innerHTML = parseFloat(backNum) / parseFloat(container.textContent);
        }
        if(container.textContent.includes(".")){
            test = true;
        }
    }else{
        alert("Não há números para realizar operações.")
    }
}

//-------------------------- DELETE LAST DIGITED CHARACTER ---------------- 
function deleting(){
    let newNum = container.textContent.split('');
    if(newNum[newNum.length - 1] === '.'){
        test = false;
    }
    newNum[newNum.length - 1] = '';
    container.innerHTML = newNum.join('');
    if(container.textContent.length > 12){
        container.style.fontSize = "20px";
    }else{
        container.style.fontSize = "32px";
    }

}

// --------------------- CLEAR --------------------------------
function reseting(){
    container.textContent = '';
    backNum = '';
    op = '';
    test = false;
}

//---------- PREVENT DOT TO BE CLICKED MORE THAN ONCE ---------
function checkDots(){
    if(!test){
        container.textContent += ".";
    }
    test = true
}