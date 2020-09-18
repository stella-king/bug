var navs = [{
	"title": "前台",
	"icon": "fa-printer",
	"href": "/back/cate/index/id/100",
	"spread": true
}, {
	"title": "后台",
	"icon": "&#xe60a;",
	"spread": false,
	"href": "/back/cate/index/id/101"
	
}, {
	"title": "打印统计",
	"icon": "&#xe629;",
	"spread": false,
	"href": "order.html"
	
}, {
	"title": "打印查询",
	"icon": "&#xe629;",
	"spread": false,
	"href": "printer_log.php"
	
}, {
	"title": "个人中心",
	"icon": "&#xe612;",
	"href": "user.php",
	"spread": true,
	"children": [
			{
				"title": "用户信息",
				"href": "user.php"
			},{
				"title": "实名认证",
				"href": "attest_auth.php"
			}
		]
}
];