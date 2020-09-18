<?php
namespace app\back\controller;

use app\common\AdminLogin;
use think\Validate;
use think\Request;
use think\Db;
use think\facade\Session;
use think\Controller;

class Cate  extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if (empty(Session::get('admin'))) {
           $this->error("请先登录", '/back/index/login');
        }

    }

    public function index()
    {

        $id = $this->request->param('id');
        $nowPage = $this->request->param('nowPage');

        $rows = Db::name('bug_list')->order('id DESC')->where(['cate_id' => $id])->cache(false)->paginate(10);

        $page = $rows->render();

        $status = [
        	'0' => '<font color="green">已完成</font>',
        	'1' => '<font color="blue">处理中</font>',
        	'2' => '<font color="">未处理</font>',
        ];

        $this->assign('status',$status);
        $this->assign('cate_id',$id);
        $this->assign('page', $page);
        $this->assign('rows',$rows);
        return $this->fetch();
    }

   //发布问题
    public function send_ques()
    {
    	if ($this->request->isAjax()) {
    		
            $titel     = $this->request->get('title');
            $desc      = $this->request->get('desc');
            $lev       = $this->request->get('lev');
            $cate_id   = $this->request->get('cate_id');
            $time = time();
            
            $data = [
                'cate_id'  => $cate_id,
                'level'  => $lev,
                'title'  => $titel,
                'content'  => $desc,
                'user_ask_id'  => Session::get('admin')['id'],
                'user_ask_name'  => Session::get('admin')['name'],
                'add_time'  => $time,
                'update_time'  => $time,
            ];

            if(empty($titel)) {
            	$this->error('标题不能为空');exit;
            }

            if(empty($desc)) {
            	$this->error('内容不能空');exit;
            }

            $re = Db::name('bug_list')->insert($data);
            
            if($re) {
            	$this->success('添加成功');exit;
            }
         	$this->error('添加失败');exit;
           
        }

        $this->assign('cate_id',$this->request->param('cate_id'));
        return $this->fetch('cate/add');
    }

   
}
