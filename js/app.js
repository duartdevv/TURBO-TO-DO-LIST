let i = 0
let ic = 0
const list = document.querySelector('#list')
const inputTask = document.querySelector('#inputTask')
inputTask.addEventListener('input', function () {
    btnAdd.disabled = inputTask.value.trim() === ""
});
inputTask.addEventListener('keydown', function(e){
    if (e.key === "Enter"){
        btnAdd.click()
    }
}) 
let stats = document.querySelector('#stats')
    function updStats(){
        if (stats == 1){
            stats.innerText = '1 Tarefa'
        } else {
            stats.innerText = `${i} Tarefas`
        }
    }
let btnAdd = document.querySelector('#btnAdd')
btnAdd.addEventListener('click', function taskAdd() {
    // Impede que o usuário crie uma tarefa vazia;
    if (inputTask.value.trim() ==="") return

    // cria o elemento li dentro da TO DO LIST;
    const li = document.createElement('li')
    li.textContent = inputTask.value
    list.appendChild(li)  
    inputTask.value = ""
    inputTask.focus()    
    
    // Sobe os stats de tarefas
    i++
    updStats()

    // Botão de CHECK para alguma tarefa;
    const btnCheck = document.createElement('button')
    btnCheck.textContent = '✔'
    btnCheck.classList.add('check')
    btnCheck.addEventListener('click', function(e){
        e.stopPropagation()
        li.classList.toggle('done')
    })
    li.appendChild(btnCheck)

    // botão de remover algum item da lista;
    const btnRemove = document.createElement('button')
    btnRemove.textContent = 'X'
    btnRemove.addEventListener('click', function(e){
        e.stopPropagation()
        li.remove()
        i--
        updStats()
    })
    li.appendChild(btnRemove)
})
// botão para dar ClearALL;
const btnClearAll = document.querySelector('#btnClearAll')
    btnClearAll.addEventListener('click', function(){
        list.innerHTML = ''
        i = 0
        updStats()
    })

// typewritter EFFECT no footer
const typewriterText = "Duart Dev todos os direitos reservados."
let index = 0
function typeWriter() {
    if (index < typewriterText.length) {
        document.getElementById("footer-text").innerHTML += typewriterText.charAt(index);
        index++;
        setTimeout(typeWriter, 60);
    }
}
typeWriter();

// botão para fazer DOWNLOAD da lista em .txt;

const btnDownload = document.querySelector('#btnDownload')

btnDownload.addEventListener('click', function () {
    const tarefas = [...document.querySelectorAll('#list li')]
        .map(li => {
            const texto = li.childNodes[0].textContent.trim()
            const done = li.classList.contains('done') ? '[✔]' : '[ ]'
            return `${done} ${texto}`
        })
        .join('\n')

    if (tarefas.trim() === "") {
        alert("Sua lista está vazia!")
        return
    }

    const blob = new Blob([tarefas], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'minhas_tarefas.txt'
    a.click()

    URL.revokeObjectURL(url)
})