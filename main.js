'use strict'



const i18nRu = {
    btnAdd: 'Добавить',
    inputNew: 'Новая задача',
    btnDelChecked: 'Удалить выполненные',
    title: 'Список задач',
    messageAllDone: 'Нет новых задач'
}
let uuid = 0;
let userLang = navigator.language || navigator.userLanguage;
let userLangCode = userLang.substr(-2).toLowerCase();

if (userLangCode === 'ru'){
    let translateTags = document.querySelectorAll('[data-i18n]');
    for (let tag of translateTags) {
        let code = tag.dataset.i18n;

        if (tag.tagName.toLowerCase() === 'input'){
            tag.placeholder = i18nRu[code];
        } else {
            tag.innerText = i18nRu[code];
        }
    }
}
localforage.config({
    name: 'App To Do'
});


new Vue({
    el: '#app',
    data: {
        newTask: "",
        uniqueId: Date.now().toString(),
        todos: [],
        containerTextarea: 0,
    },
    watch: {
        todos: function (todos) {
            localforage.setItem('savedTasks', todos);
        },



    },
    methods: {
        saveNewTask: function () {
            let newTask = this.newTask
            if (!newTask) {
                return
                /* this.todos.splice(0, 0);*/
            }

            let id = 'task' + this.uniqueId++
            let newTaskTodos = {
                label: newTask,
                id: id,
                statusChecked: false,
                editedTask: null,
            }

            this.todos.splice(0, 0, newTaskTodos);
            this.newTask = '';


            }
        ,
        editingTask: function(task, index) {

            console.log(task.label, index)
            Vue.set(this.todos, index, task);
        },
        toggleStatusChecked: function (task, index) {
            task.statusChecked = !task.statusChecked;
            Vue.set(this.todos, index, task);
        },

        removeCurrentTask(index) {
            Vue.delete(this.todos, index);
        },
        removeCompleted: function () {
            this.todos = this.active;
        },

    },
    computed: {
        active: function () {
            return this.todos.filter(function (task, index) {
                return !task.statusChecked;
            });
        },


    },



    mounted(){
        localforage.getItem('savedTasks').then((tasks) => {
            if (tasks !== null) {
                this.todos = tasks;
            }
        })

    },
})




