'#snippets';
'#exclude(define)';

let PreService = Magix.Service.extend((bag, callback) => {

});
Magix.mix(PreService, {
    serviceList: [],
    taskList: [],
    Actions: {
        login(cb) {
            console.log('login process');
            setTimeout(cb, 10000); //模拟登录
        },
        vcode(cb) {
            setTimeout(cb, 1000);
        }
    },
    addService(sync, bag, callback) {
        PreService.serviceList.push({
            sync,
            bag,
            callback
        });
    },
    addTask(action) {
        let list = PreService.taskList;
        if (list[action] != 1) {
            list[action] = 1;
            list.push(action);
            PreService.runTask();
        } else {
            console.log(action, ' in list ,ignore');
        }
    },
    runService() {
        let service = PreService.serviceList.shift();
        if (service) {
            console.log('run waiting list', service);
            service.sync(service.bag, service.callback);
            PreService.runService();
        }
    },
    runTask() {
        if (!PreService.$run) {
            PreService.$run = true;
            let list = PreService.taskList;
            let action = list.shift();
            if (action) {
                let afun = PreService.Actions[action];
                if (afun) {
                    afun(() => {
                        console.log(action + ' end');
                        delete list[action];
                        delete PreService.$run;
                        PreService.runTask();
                    });
                } else {
                    delete list[action];
                    delete PreService.$run;
                    PreService.runTask();
                }
            } else {
                delete PreService.$run;
                PreService.runService();
            }
        }
    },
    intervene() {
        return PreService.$run;
    }
});