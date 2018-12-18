(function () {
    function AppView() {
        let appContainer = null;

        this.init = function(app) {
            appContainer = app;
            this.printTestData();
            this.addUserForm();
        }

        this.printTestData = function () {
            appContainer.innerHTML = `
                <section class="section">
                    <div class="container">
                        <h1 class="title">Hello from AppView!</h1>
                        <p class="subtitle">Test app created.</p>

                        <div id="users">
                        </div>
                    </div>
                </section>
            `;
        }

        this.addUserForm = function() {
            document.getElementById('users').innerHTML += `
            <div class="columns">
                <div class="column">
                    <form id="addNewUser">
                        <h4 class="title is-4">Добавить пользователя</h4>
                        <div class="field-body">
                        <div class="field">
                          <div class="control has-icons-left has-icons-right">
                            <input type="text" class="input" id="newUserName" name="username" placeholder="Введите имя" required>
                            <span class="icon is-small is-left">
                              <i class="fas fa-user"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field">
                          <div class="control has-icons-left has-icons-right">
                            <input id="newUserEmail" class="input" type="email" placeholder="Email input" name="useremail" placeholder="Введите email" required>
                            <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                            </span>
                          </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="control">
                                <button class="button is-link" id="addBtn">Добавить</button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
        }

        this.printUser = function(user) {
            let userListContainer = document.getElementById('users-list__container'),
                row = document.createElement('tr'),
                td1 = document.createElement('td'),
                td2 = document.createElement('td'),
                td3 = document.createElement('td');

            row.setAttribute('data-id', user.id);
            td1.innerHTML = `<strong>${user.data().userName}</strong>`;
            td2.innerHTML = `${user.data().email}`;
            td3.innerHTML = `<a href="#" class="delete is-medium" title="удалить пользователя">Удалить</a>`;
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            if (userListContainer) {
                userListContainer.appendChild(row);
            } else {
                document.getElementById('users').innerHTML += `
                <div class="columns">
                    <div class="column">
                        <div class="users-list">
                            <h4 class="title is-4">Список пользователей:</h4>
                            <table id="users-list" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Пользователь</th>
                                        <th>email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="users-list__container"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `;
                userListContainer = document.getElementById('users-list__container');
                userListContainer.appendChild(row);
            }
            
        }

        this.clearUserList = function() {
            let container = document.getElementById('users-list__container');
            if (container) container.innerHTML = '';
        }
    }

    function AppModel() {
        let myAppView = null,
            usersList = [];

        this.init = function (view) {
            myAppView = view;
            this.getUsersList();
            this.printUsersList();
        }

        this.addUser = function(username, useremail) {
            myAppDB.collection("users").doc(`user_${username.replace(/\s/g, "").toLowerCase()}`).set({
                userName: `${username}`,
                email: `${useremail}`,
            })
            .then(function (username) {
                console.log("Пользователь добавлен в коллецию users");
            })
            .catch(function (error) {
                console.error("Ошибка добавления пользователя: ", error);
            });

            this.updateUsersList();
        }

        this.deleteUser = function(userid) {
            myAppDB.collection("users").doc(userid).delete()
            .then(function () {
                console.log("Пользователь удален из коллеции users");
            })
            .catch(function (error) {
                console.error("Ошибка удаления пользователя: ", error);
            });

            this.updateUsersList();
        }

        this.getUsersList = function() {
            myAppDB.collection("users").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    usersList.push(doc.data());
                    console.log(`${doc.id} => ${doc.data().userName} \(${doc.data().email}\)`);
                });
            });
            console.log('Users List: ');
            console.log(usersList);
        }

        this.printUsersList = function() {
            myAppDB.collection("users").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    myAppView.printUser(doc);
                });
            })
            .catch(function (error) {
                console.log("Что то пошло не так: " + error);
            });
        }

        this.updateUsersList = function() {
            myAppView.clearUserList();
            this.printUsersList();
        }
    }

    function AppController() {
        let myAppModel = null,
            appContainer = null,
            form = null,
            addBtn = null;

        this.init = function (app, model) {
            myAppModel = model;
            appContainer = app;

            document.addEventListener('click', function(event) {
                form = appContainer.querySelector('#addNewUser');
                addBtn = appContainer.querySelector('#addBtn');

                if (event.target && event.target.id === 'addBtn') {
                    event.preventDefault();
                    myAppModel.addUser(
                        form.newUserName.value,
                        form.newUserName.value
                    );
                    form.newUserName.value = '';
                    form.newUserName.value = '';
                }

                if (event.target && event.target.classList.contains('delete')) {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.deleteUser(event.target.parentElement.parentElement.dataset.id);
                }
            });
        }
    }

    let myApp = {
        init: function () {
            let myAppView = new AppView(),
                myAppModel = new AppModel(),
                myAppController = new AppController();

            myAppView.init(document.getElementById('app'));
            myAppModel.init(myAppView);
            myAppController.init(document.getElementById('app'), myAppModel);

            /*myAppModel.addUser('Test User One', 'testuser@mail.ru');
            myAppModel.addUser('Testuser', 'test@gmail.com');
            myAppModel.addUser('user test', 'usertest@gmail.com');
            myAppModel.addUser('Yuri', 'mymail@gmail.com');
            myAppModel.addUser('Vasya', 'vasya1991@gmail.com');
            myAppModel.addUser('Lena', 'lenusik@gmail.com');*/
        },
    };

    myApp.init();
})();