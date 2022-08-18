//SELEÇÃO DE ELEMENTOS
// Formulário
const todoForm = document.querySelector("#todo-form");
// Input que adiciona tarefas
const todoInput = document.querySelector("#todo-input");
// Inclui novas tarefas
const todoList = document.querySelector("#todo-list");
// Formulário de edição
const editForm = document.querySelector("#edit-form");
// Campo de edição
const editInput = document.querySelector("#edit-input");
// Cancelar edição
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
// Para edição do formulário
let oldInputValue;




//FUNÇÕES
// Salva nova tarefa
const saveTodo = (text) => {

    // Cria a div de nova tarefa
    const todo = document.createElement("div");
    todo.classList.add("todo");

    //Cria o texto da tarefa
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //Botão de tarefa concluída
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    //Botão de edição
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    //Botão de excluir tarefa
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    //Colocando o todo da lista geral
    todoList.appendChild(todo);

    //Limpando campo depois de adicionado
    todoInput.value = "";

    //Deixa o cursor no input depois de incluir a tarefa
    todoInput.focus();
}




//EVENTOS
todoForm.addEventListener("submit", (e) => {

//Envia o formulário sem recarregar a página
    e.preventDefault();

// Salva nova tarefa
    const inputValue = todoInput.value

    if(inputValue){
        //Salva a tarefa
        saveTodo(inputValue)
    }
});

//Esconde e aparece os campos que são pertinentes a cada ação
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (editInputValue) => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

       let todoTitle =  todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = editInputValue;
        }
    })
}

// Evento nos botões de salvar, editar e excluir tarefas
document.addEventListener("click", (e) => {

    //Elemento filho
    const targetEl = e.target;
    //Elemento pai
    const parentEl = targetEl.closest("div");
    //Seleciona título da tarefa
    let todoList;

    //Seleciona título da tarefa
    if(parentEl && parentEl.querySelector("h3")) {
       todoTitle = parentEl.querySelector("h3").innerText;
    }

    //Consegue clicar e reverter a ação do botão
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    //Remove a tarefa
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) {
        //Edita a tarefa - esconde o adicionar e mostra o editar
        toggleForms()

        // Edição - Muda o valor do input
        editInput.value = todoTitle;
        // Edição - Salva o valor do input
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})


//Confirmação da edição de tarefa
editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    //Se tiver informação irá atualizar ao clique do botão confirmar
    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})