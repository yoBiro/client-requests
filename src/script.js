let url = 'https://fakestoreapi.com/users'

// request | promise
let resp = await fetch(url)

// tratamento da resposta
let dados = await resp.json()

let linhas = document.querySelectorAll('tr')
let cards = document.querySelectorAll('.card-body')

let modal = document.querySelector('#modal')
let carrinho = document.querySelector('#carrinho')
let fechar = document.querySelector('#fechar')

console.log(cards[0].children)

for (let i = 0; i < cards.length && i < dados.length; i++) {

    let filhosCard = cards[i].children

    filhosCard[0].textContent =
        dados[i].name.firstname + ' ' + dados[i].name.lastname

    filhosCard[1].textContent = dados[i].id
    filhosCard[2].textContent = dados[i].email
    filhosCard[3].textContent = dados[i].username
    filhosCard[4].textContent = dados[i].password

    console.log(dados[i])

    let card = cards[i].parentElement

    card.addEventListener('click', async () => {

        let id = dados[i].id

        let respCart = await fetch(
            `https://fakestoreapi.com/carts/user/${id}`
        )

        let cart = await respCart.json()

        console.log(cart)

        carrinho.innerHTML = ''

        for (let produto of cart[0].products) {

            let div = document.createElement('div')

            div.innerHTML = `
                <p>Produto: ${produto.productId}</p>
                <p>Quantidade: ${produto.quantity}</p>
            `

            carrinho.appendChild(div)
        }

        modal.showModal()
    })

    fechar.addEventListener('click', () => {
        modal.close()
    })
}