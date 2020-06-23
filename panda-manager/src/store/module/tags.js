export default {
    state: {
        menuList: {},
        tagList: {},
        tagName: '',
        oldTagName: ''
    },
    getters: {
        
    },
    mutations: {
        setMenuList (state, list = {}) {
            state.menuList = list
        },
        addTagItem(state, data = {}){
            console.log(data)
            const tagName = data.tagName
            const oldTagName = data.oldTagName
            console.log("tagName:"+tagName)
            let item = state.menuList[tagName]
            console.log(item)
            item.color = 'primary'
            state.tagList[tagName] = item

            if(oldTagName !== ''){
                let oldItem = state.menuList[oldTagName]
                oldItem.color = 'default'
                state.tagList[oldTagName] = oldItem
            }
            
            // 数据更新
            state.tagName = tagName
            state.oldTagName = oldTagName
        },
        setOpenMenu(state, data = {}) {
            console.log(data)
            state.openMenu = '123123'
        }
    },
    actions: {
    }
}