const LocalStorage = {
    setItem(storeName, obj) {
        try {
            const jsonValue = JSON.stringify(obj)
            localStorage.setItem(storeName, jsonValue)
        } catch (e) {
            // saving error
            return
        }
    },

    getItem(storeName) {
        try {
            const jsonValue = localStorage.getItem(storeName)
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
            // error reading value
            return
        }
    }
};

export default LocalStorage;