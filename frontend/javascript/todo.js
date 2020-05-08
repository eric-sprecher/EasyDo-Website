
var vue = new Vue({
    el: "#root",
    data: {
        userID: '',
        greetName: '',
        message: '',
        newTask: '',
        month: 0,
        day: 0,
        errorMessage: '',
        todo_list: [],
        items_today: [],
        items_tomorrow: [],
        items_later: []
    },

    methods: {

        addItem: function(){
            var today = new Date();
            var tomorrow = new Date(today);
            //Sets tomorrow to tomorrows date to determine if new task takes place tomorrow.
            tomorrow.setDate(tomorrow.getDate() + 1);

            var currentDay = today.getDate();
            var currentMonth = today.getMonth() + 1;

            if(this.month == 0){
                this.errorMessage = "Please enter a month!";
            }
            else if(this.day == 0){
                this.errorMessage = "Please enter a day!";
            }
            else if(!this.newTask.replace(/\s/g, '').length){
                this.errorMessage = "Add a Task!";
            }
            else{
                //Gets rid of any white space that the user may have accidently entered.
                var input = this.newTask.replace(/\s/g, ' ');
                
                //ADDS THE TODO ITEM TO THE DATABASE
                this.todo_list.push({task: this.newTask, date: `${this.day} ${this.month}`});
                updateList(this.userID);

                //Resets the fields for new entry

                this.newTask = '';
                this.errorMessage = '';

                //Determines what day the user wished to complete a task and posts it to the appropriate array.
                if(this.day == currentDay && this.month == currentMonth){
                    this.items_today.push({'task': input});
                }
                else if(this.day == tomorrow.getDate() && this.month == tomorrow.getMonth() + 1){
                    this.items_tomorrow.push({'task': input})
                }
                else{
                    this.items_later.push({'task': input});
                }
                
                //Clears the month and day field after submitting.
                this.month = 0;
                this.day = 0;
            }
        },

        sortTasksByDate: function(){
            var today = new Date();
            var tomorrow = new Date(today);
            //Sets tomorrow to tomorrows date to determine if new task takes place tomorrow.
            tomorrow.setDate(tomorrow.getDate() + 1);

            var currentDay = today.getDate();
            var currentMonth = today.getMonth() + 1;

            for(var i = 0; i < this.todo_list.length; i++){

                var taskDate = this.todo_list[i].date.split(' ');
                var taskDay = taskDate[0];
                var taskMonth = taskDate[1];

                console.log(taskDay + " " + taskMonth);

                if(taskDay == currentDay && taskMonth == currentMonth){
                    this.items_today.push({task: this.todo_list[i].task, originIndex: i});
                }
                else if(taskDay == tomorrow.getDate() && taskMonth == tomorrow.getMonth() + 1){
                    this.items_tomorrow.push({task: this.todo_list[i].task, originIndex: i})
                }
                else{
                    this.items_later.push({task: this.todo_list[i].task, originIndex: i});
                }
            }
        },

        
        removeTask_Today: function(index){
            var itemBeingDeleted = this.items_today[index];
            this.todo_list.splice(itemBeingDeleted.originIndex, 1);
            console.log(this.items_today[index].originIndex);
            this.items_today.splice(index, 1);

            updateList(this.userID);
            //RESETS THE ORIGIN INDEX FOR EACH ITEM IN SPECIFIED ARRAY. USED TO DELETE ITEMS FROM MAIN TODO WHICH WILL SAVE
            //STATE TO ACTUAL ARRAY. DONE FOR ACCURACY AND GUARANTEE CORRECT ITEM IS DELETED.
            for(var i = 0; i < this.items_today.length; i++){
                this.items_today[i].originIndex = i;
            }
        },

        removeTask_Tomorrow: function(index){
            var itemBeingDeleted = this.items_tomorrow[index];
            this.todo_list.splice(itemBeingDeleted.originIndex, 1);
            this.items_tomorrow.splice(index, 1);
            //RESETS THE ORIGIN INDEX FOR EACH ITEM IN SPECIFIED ARRAY. USED TO DELETE ITEMS FROM MAIN TODO WHICH WILL SAVE
            //STATE TO ACTUAL ARRAY. DONE FOR ACCURACY AND GUARANTEE CORRECT ITEM IS DELETED.
            for(var i = 0; i < this.items_tomorrow.length; i++){
                this.items_tomorrow[i].originIndex = i;
            }
            updateList(this.userID);
        },

        removeTask_Later: function(index){
            var itemBeingDeleted = this.items_later[index];
            this.todo_list.splice(itemBeingDeleted.originIndex, 1);
            this.items_later.splice(index, 1);
            //RESETS THE ORIGIN INDEX FOR EACH ITEM IN SPECIFIED ARRAY. USED TO DELETE ITEMS FROM MAIN TODO WHICH WILL SAVE
            //STATE TO ACTUAL ARRAY. DONE FOR ACCURACY AND GUARANTEE CORRECT ITEM IS DELETED.
            for(var i = 0; i < this.items_later.length; i++){
                this.items_later[i].originIndex = i;
            }
            updateList(this.userID);
        }
    }
})

window.onload = init;

function init(){
    var infoButton = document.getElementById('info');
    var signoutButton = document.getElementById('signOut');

    //GETS THE ID PARAMETER FROM THE SEARCH BAR TO QUERY DATABASE FOR THAT USER
    const urlParams = new URLSearchParams(window.location.search);
    vue.userID = urlParams.get('id');

    fetchData(vue.userID);

    infoButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/about?id=' + vue.userID;
    });

    signoutButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000'
    });
}

function fetchData(userID){
    axios({
        method: 'get',
        url: 'todo/' + userID
    })
    .then(result => {
        vue.todo_list = result.data.todo_list;
        vue.sortTasksByDate();
    })
    .catch(err => console.log(err));
}

function updateList(userID){
    axios({
        method: 'put',
        url: 'todo/' + userID,
        data: {
            todo_list: vue.todo_list
        }
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

