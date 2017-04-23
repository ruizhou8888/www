import Cookie from 'js-cookie'

export default {
    set: function(cookieName, value, day) {
        Cookie.set(cookieName, value, { expires: day });
    },
    get: function(cookieName) {
        return Cookie.get(cookieName)
    },
    del: function(cookieName) {
        Cookie.remove(cookieName)
    }
}