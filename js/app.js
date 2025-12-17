let total = 0

const list = document.querySelector('#list')
const inputTask = document.querySelector('#inputTask')
const btnAdd = document.querySelector('#btnAdd')
const btnClearAll = document.querySelector('#btnClearAll')
const stats = document.querySelector('#stats')
const btnDownload = document.querySelector('#btnDownload')

inputTask.addEventListener('input', () => {
  btnAdd.disabled = inputTask.value.trim() === ''
})

inputTask.addEventListener('keydown', e => {
  if (e.key === 'Enter') btnAdd.click()
})

function updateStats() {
  stats.innerText = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`
}

btnAdd.addEventListener('click', () => {
  if (!inputTask.value.trim()) return

  const li = document.createElement('li')
  li.append(inputTask.value)

  const btnCheck = document.createElement('button')
  btnCheck.className = 'check'
  btnCheck.innerText = '✔'
  btnCheck.onclick = e => {
    e.stopPropagation()
    li.classList.toggle('done')
  }

  const btnRemove = document.createElement('button')
  btnRemove.className = 'remove'
  btnRemove.innerText = 'X'
  btnRemove.onclick = e => {
    e.stopPropagation()
    li.remove()
    total--
    updateStats()
  }

  li.append(btnCheck, btnRemove)
  list.appendChild(li)

  inputTask.value = ''
  inputTask.focus()

  total++
  updateStats()
})

btnClearAll.addEventListener('click', () => {
  list.innerHTML = ''
  total = 0
  updateStats()
})

const text = 'Duart Dev todos os direitos reservados.'
let idx = 0
function typeWriter() {
  if (idx < text.length) {
    document.getElementById('footer-text').innerHTML += text[idx++]
    setTimeout(typeWriter, 60)
  }
}
typeWriter()

btnDownload.addEventListener('click', () => {
  const data = [...list.children]
    .map(li => `${li.classList.contains('done') ? '[✔]' : '[ ]'} ${li.childNodes[0].textContent}`)
    .join('\n')

  if (!data) return alert('Sua lista está vazia!')

  const blob = new Blob([data], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'minhas_tarefas.txt'
  a.click()
  URL.revokeObjectURL(a.href)
})
