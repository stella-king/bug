<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

// 打印变量
function d()
{
    echo '<br/>------------debug info.-------------<pre>';
    if(func_num_args()>0){
        foreach(func_get_args() as $arg){
            if(is_array($arg))
                print_r($arg);
            else
                var_dump($arg);
            echo '<br/>';
        }
    }else{
        echo 'argument-empty.';
    }
    echo '</pre>------------debug end.-------------<br/>';
}

// 密码加密
function b_md5($username,$pwd,$salt = 'Hadl@#563')
{
    return md5(md5($username . $pwd . $salt));
}