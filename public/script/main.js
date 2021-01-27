const Mask = { 
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)
    }, 
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g, "") 

        if(value.length > 14) {
            value = value.slice(0,-1)
        }

        //check if is cpf or cnpj
        if(value.length >  11) {
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        }else {
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")

        }

        return value

    }
}


const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
   if(currentPage.includes(item.getAttribute("href"))) {
       item.classList.add("active")
   }
}

const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Deseja mesmo deletar??")
    if(!confirmation){
        event.preventDefault()
    }
})
