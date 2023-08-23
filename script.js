const inputEl = document.querySelector('#password')
const uppercaseCharsEl = document.querySelector('#uppercase-check')
const symbolCharsEl = document.querySelector('#symbol-check')
const numberCharsEl = document.querySelector('#number-check')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar') 
let passwordLength = 16

function generationPassword(){

    let chars = 'abcdefghijlmnopqrstuvxz'

    const uppercaseChars = 'ABCDEFGHIJLMNOPQRSTUVXZ'
    const numberChars = '1234567890'
    const symbolChars = '!@#$%¨&*()?/|[]_-='

    if(symbolCharsEl.checked){
        chars += symbolChars
    }

    if(uppercaseCharsEl.checked) {
        chars += uppercaseChars
    }

    if(numberCharsEl.checked) {
        chars += numberChars
    }

    let password = ''

    for(let i=0; i<passwordLength; i++){
        const randomPassword = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomPassword, randomPassword + 1)
        
    }

    inputEl.value = password

    CalculaQuality()
    CalculeFontSize()

}

function CalculaQuality() {
   const percent = Math.round((passwordLength / 64) * 25 +
   (uppercaseCharsEl.checked ? 15 : 0) +
   (numberCharsEl.checked ? 25 : 0) +
   (symbolCharsEl.checked ? 35 : 0)
   )
   securityIndicatorBarEl.style.width = `${percent}%`

   if(percent > 69) {

    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.add('safe')

   }else if(percent > 50) {

    securityIndicatorBarEl.classList.remove('critical')
    securityIndicatorBarEl.classList.add('warning')
    securityIndicatorBarEl.classList.remove('safe')

   }else {

    securityIndicatorBarEl.classList.add('critical')
    securityIndicatorBarEl.classList.remove('warning')
    securityIndicatorBarEl.classList.remove('safe')

   }

   if(percent >= 100) {
    securityIndicatorBarEl.classList.add('completed')
   }else {
    securityIndicatorBarEl.classList.remove('completed')
   }
   
}

function CalculeFontSize() {
    if(passwordLength > 45) {
        inputEl.classList.remove("fpp")
        inputEl.classList.remove("fmm")
        inputEl.classList.add("fgg")
    }else if(passwordLength > 32) {
        inputEl.classList.remove('fpp')
        inputEl.classList.add('fmm')
        inputEl.classList.remove('fgg')
    }else if(passwordLength > 22) {
        inputEl.classList.add('fpp')
        inputEl.classList.remove('fmm')
        inputEl.classList.remove('fgg')
    }else {
        inputEl.classList.remove('fpp')
        inputEl.classList.remove('fmm')
        inputEl.classList.remove('fgg')
    }
}


function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector('#password-length')
passwordLengthEl.addEventListener('input', function() {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    generationPassword()
})

uppercaseCharsEl.addEventListener('click',generationPassword)
numberCharsEl.addEventListener('click',generationPassword)
symbolCharsEl.addEventListener('click',generationPassword)


document.querySelector('#copy-1').addEventListener("click",copy)
    document.querySelector('#copy-2').addEventListener("click",copy)

    


generationPassword()