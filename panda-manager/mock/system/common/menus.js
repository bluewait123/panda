//next(err, data)
next(null, {
    code: '0000',
    message: 'success',
    data: {
        list: [
            {id: 'A100', parentId:'0', name:'工作台', icon: 'ios-speedometer', routerUrl: 'work'},
            {id: 'A200', parentId:'0', name:'系统管理', icon: 'md-settings', routerUrl: 'system'},
            {id: 'A200100', parentId:'A200', name:'用户管理', icon: 'md-person', routerUrl: 'system_user'},
            {id: 'A200200', parentId:'A200', name:'角色管理', icon: 'md-ribbon', routerUrl: 'system_role'},
            {id: 'A200300', parentId:'A200', name:'资源管理', icon: 'md-menu', routerUrl: 'system_menu'},
            {id: 'B100', parentId:'0', name:'笔记管理', icon: 'ios-musical-notes', routerUrl: 'note'},
            {id: 'B100100', parentId:'B100', name:'笔记种类配置', icon: 'ios-build', routerUrl: 'note_type'},
            {id: 'B100200', parentId:'B100', name:'笔记管理', icon: 'ios-build', routerUrl: 'note_manager'},
            {id: 'B100300', parentId:'B100', name:'我的心愿单', icon: 'ios-build', routerUrl: 'note_love'},
            {id: 'B200', parentId:'0', name:'文档管理', icon: 'ios-build', routerUrl: 'word'},
            {id: 'B200100', parentId:'B200', name:'文档分类配置', icon: 'ios-build', routerUrl: 'word_type'},
            {id: 'B200200', parentId:'B200', name:'文档管理', icon: 'ios-build', routerUrl: 'word_manager'},
            {id: 'C100', parentId:'0', name:'商品管理', icon: 'ios-build', routerUrl: 'product'},
            {id: 'C100100', parentId:'C100', name:'商品分类配置', icon: 'ios-build', routerUrl: 'product_type'}
        ],
        buttons:[
            'system_user_list',
            'system_user_info',
            'system_user_add',
            'system_user_edit',
            'system_user_enable',
            'system_user_disable',
            'system_user_reset_password',
            'system_role_list',
            'system_role_info',
            'system_role_add',
            'system_role_edit',
            'system_role_delete'
        ]
    }
});