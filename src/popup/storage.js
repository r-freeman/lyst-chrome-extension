const storage = {
    getData: (key) => {
        return new Promise(resolve => {
            let data = JSON.parse(localStorage.getItem(key));
            return data && resolve(data);
        });
    },
    setData: (key, data) => {
        return new Promise(resolve => {
            localStorage.setItem(key, JSON.stringify(data));
            resolve();
        });
    },
    deleteItem: (key) => {
        return new Promise(resolve => {
            localStorage.removeItem(key);
            resolve()
        })
    }
};

export default storage;