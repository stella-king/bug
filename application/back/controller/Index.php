<?php
namespace app\back\controller;

use app\common\AdminLogin;
use think\captcha\Captcha;
use think\Validate;
use think\Request;
use think\Db;
use think\facade\Session;
use think\Controller;

class Index extends Controller
{

    public function index()
    {	
        if (empty(Session::get('admin'))) {
            $this->error("请先登录", '/back/index/login');
        }
        return $this->fetch();
    }

     /**
     * 管理员登陆
     */
    public function login()
    {
    	$url = $this->request->get('url', 'index/login');
    	if ($this->request->isPost()) {
    		
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $vercode  = $this->request->post('vercode');
            $token = $this->request->post('__token__');
            $rule = [
                'username|用户名'      => 'require|length:3,30',
                'password|密码'        => 'require|length:3,30',
                'vercode|验证码'       =>'require|captcha',
                '__token__'           => 'token',
            ];
            $data = [
                'username'  => $username,
                'password'  => $password,
                'vercode'  => $vercode,
                '__token__' => $token,
            ];
            $validate = new Validate($rule);
            
            $result = $validate->check($data);

            if (!$result) {
                $this->error($validate->getError(), $url, ['token' => $this->request->token()]);
            }
            
            $repwd = b_md5($username,$password);
         	$find = Db::name('admin')->where(['name' => $username])->find(); 

         	if(empty($find)) {
         		$this->error('用户名不存在');
         	}

         	if($find['pwd'] !== $repwd) {
         		$this->error('密码错误');
         	}
         	
         	Session::set('admin',$find);
         	
            $this->success('ok','/back/index/index');
        }

        if (isset(Session::get('admin')['id']) && Session::get('admin')['id'] > 0) {
            $this->error("您已登录", '/back/index/index');
        }

        return $this->fetch();
    }

    public function logout()
    {
        Session::delete('admin');
        Session::clear();
        $this->success('请先登录','/back/index/login');
        //Saas::instance()->handleLogout($adminId);
    }

    // 验证码获取
    public function verify()
    {
    	$config = array(
            'fontSize' => 32,
            'length' => 4,
            'useCurve' => false,
            'useNoise' => false,
        	'reset' => false
        );    

        $captcha = new Captcha($config);
        $captcha->codeSet = '0123456789'; 
        return $captcha->entry();    
    }
}
