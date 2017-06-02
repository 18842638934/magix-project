let Magix = require('magix');
let StorageService = {},
    StorageUpdateTime,
    Backend, Test = false,
    StorageLink,
    StorageData = {};
Backend = 'localStorage';

let UpdateStorage = () => {
    let updateTime = (+new Date()).toString();
    let dataString = JSON.stringify(StorageData);
    StorageService.store = dataString;
    StorageService.update = updateTime;
    if ('behavior' == Backend) {
        StorageLink.setAttribute('update', updateTime);
        StorageLink.setAttribute('storage', dataString);
        StorageLink.save('storage');
    }
};

let Storage = Magix.mix({
    set(key, value) {
        StorageData[key] = value;
        UpdateStorage();
    },
    get(key) {
        return StorageData[key];
    },
    del(key) {
        delete StorageData[key];
        UpdateStorage();
    }
}, Magix.Event);
if (Backend in window) {
    try {
        localStorage.setItem(Backend, Magix.guid());
        Test = true;
        localStorage.removeItem(Backend);
    } catch (ignore) {}
}
if (Test) {
    StorageService = localStorage;
    StorageUpdateTime = StorageService.update;
} else {
    Backend = 'globalStorage';
    if (Backend in window) {
        try {
            let globalStorage = window[Backend];
            StorageService = 'localhost' == location.hostname ? globalStorage['localhost.localdomain'] : globalStorage[location.hostname];
            StorageUpdateTime = StorageService.update;
        } catch (n) {}
    } else {
        StorageLink = document.createElement('link');
        if (StorageLink.addBehavior) {
            StorageLink.style.behavior = 'url(#default#userData)';
            document.getElementsByTagName('head')[0].appendChild(StorageLink);
            try {
                StorageLink.load('storage');
            } catch (i) {
                StorageLink.setAttribute('storage', '{}');
                StorageLink.save('storage');
                StorageLink.load('storage');
            }
            let data = '{}';
            try {
                data = StorageLink.getAttribute('storage');
                StorageUpdateTime = StorageLink.getAttribute('update');
            } catch (g) {}
            Backend = 'behavior';
            StorageService.store = data;
        }
    }
}
let CheckedChange = () => {
    var currentUpdate;
    clearTimeout(CheckedChange.timer);
    CheckedChange.timer = setTimeout(function() {
        if ('behavior' == Backend) {
            StorageLink.load('storage');
            try {
                currentUpdate = StorageLink.getAttribute('update');
            } catch (t) {}
        } else {
            currentUpdate = StorageService.update;
        }
        if (currentUpdate) {
            if (currentUpdate != StorageUpdateTime) {
                StorageUpdateTime = currentUpdate;
                let newData, dataString = '{}';
                if ('behavior' == Backend) {
                    StorageLink.load('storage');
                    try {
                        dataString = StorageLink.getAttribute('storage');
                    } catch (t) {}
                    StorageService.store = dataString;
                }
                newData = JSON.parse(StorageService.store);
                let keys = Magix.keys(StorageData).concat(Magix.keys(newData)),
                    locker = {};
                for (let key of keys) {
                    if (locker[key] !== 1) {
                        locker[key] = 1;
                        let value1 = JSON.stringify(StorageData[key]);
                        let value2 = JSON.stringify(newData[key]);
                        if (value2 != value1) {
                            Storage.fire('change', {
                                key,
                                from: StorageData[key],
                                to: newData[key]
                            });
                        }
                    }
                }
                StorageData = newData;
            }
        }
    }, 25);
};
if ('addEventListener' in window) {
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            CheckedChange();
        }
    }, false);
}
if (Backend == 'behavior') {
    setInterval(CheckedChange, 1000);
} else {
    if ('addEventListener' in window) {
        window.addEventListener('storage', CheckedChange, false);
    } else {
        document.attachEvent('onstorage', CheckedChange);
    }
}
if (StorageService.store) {
    try {
        StorageData = JSON.parse(StorageService.store);
    } catch (e) {
        StorageService.store = '{}';
    }
} else {
    StorageService.store = '{}';
}
module.exports = Storage;