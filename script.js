let taskListAll = [];

function addToTaskList() {
    let task = document.querySelector('.text-task').value
    if (!document.querySelector('.text-task').value) {
        alert('Пстая задача!\n попробуйте снова')
        return
    }
    let taskList = {
        text: task,
        check: false,
        important: false,
    }
    taskListAll.push(taskList);
    localStorage.setItem('text', JSON.stringify(taskListAll));
    document.querySelector('.text-task').value = ''
    addOnHtml();
}

function addOnHtml() {
    let day = new Date()
    day = [day.getDate(), '0' + (day.getMonth() + 1), day.getFullYear()]
    day = day.join('.')
    let taskText = ''
    if (taskListAll.length === 0) {
        document.querySelector('.h3-task').innerHTML = "<h3>Пустой список</h3>"
    } else {
        document.querySelector('.h3-task').innerHTML = "<h3>Список задач:</h3>"
    }
    taskListAll.forEach(function (value, index) {
        if (taskListAll[index].check === true) {
            taskText +=
                `<li id="${index}">` +
                `<div class="all-info">` +
                `<div class="main-info">` +
                `<div class="task-text">` +
                taskListAll[index].text +
                `</div>` +
                `<div class="block-but">` +
                `<button id="butdel- ${index}" class="button-del">удалить</button> ` +
                `<button id="button-demove- ${index}" class="but-rem">редактировать</button> ` +
                `</div>` +
                `</div>` +
                `<p class="p-data">` +
                day +
                `</p>` +
                `<div class="block-check">` +
                'Выполненно' +
                `<input class="checkbox-ready" id="checkbox${index}" type="checkbox" checked>` +
                `</div>` +
                `</div>` +
                '</li>'
        } else {
            taskText +=
                `<li id="${index}">` +
                `<div class="all-info">` +
                `<div class="main-info">` +
                `<div class="task-text">` +
                taskListAll[index].text +
                `</div>` +
                `<div class="block-but">` +
                `<button id="butdel- ${index}" class="button-del">удалить</button> ` +
                `<button id="button-demove- ${index}" class="but-rem">редактировать</button> ` +
                `</div>` +
                `</div>` +
                `<p class="p-data">` +
                day +
                `</p>` +
                `<div class="block-check">` +
                'Выполненно' +
                `<input class="checkbox-ready" id="checkbox${index}" type="checkbox" >` +
                `</div>` +
                `</div>` +
                '</li>'
        }
    })
    document.querySelector('.list-all').innerHTML = taskText
}

document.querySelector(".list-all").addEventListener('change', function (event) {
    let idCheckBox = event.target.getAttribute('id')
    if (idCheckBox.includes('checkbox')) {
        let i = +idCheckBox[idCheckBox.length - 1]
        taskListAll.forEach(function (value, index) {
            if (i === index) {
                taskListAll[index].check = !taskListAll[index].check
                localStorage.setItem('text', JSON.stringify(taskListAll))
            }
        })
    }
})
document.querySelector(".list-all").addEventListener('click', function (event) {
    let idButton = event.target.getAttribute(`id`)
    if (idButton.includes('butdel')) {
        let i = +idButton[idButton.length - 1]
        taskListAll.forEach(function (value, index) {
            if (i === index) {
                taskListAll.splice(i, 1)
                localStorage.setItem('text', JSON.stringify(taskListAll))
            }
            addOnHtml()
        })
    }
})

document.querySelector(".list-all").addEventListener('click', function (event) {
    let idButRem = event.target.getAttribute(`id`)
    if (idButRem.includes('button-demove')) {
        let i = +idButRem[idButRem.length - 1]
        taskListAll.forEach(function (value, index) {
            if (i === index) {
                let str = prompt('Редактируй',)
                if (!str) {
                    return
                }
                taskListAll[index].text = str
                localStorage.setItem('text', JSON.stringify(taskListAll))
            }
            addOnHtml()
        })
    }
})

document.querySelector('.text-task').addEventListener('keydown', function (key) {
    if (key.keyCode === 13) {
        addToTaskList()
    }
})

document.querySelector('.add-button').addEventListener('click', addToTaskList)

if (localStorage.getItem('text') !== null) {
    taskListAll = JSON.parse(localStorage.getItem('text'))
    addOnHtml()
}
