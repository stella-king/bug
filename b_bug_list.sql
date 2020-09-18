/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : bug

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-09-09 17:42:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for b_bug_list
-- ----------------------------
DROP TABLE IF EXISTS `b_bug_list`;
CREATE TABLE `b_bug_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cate_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '类别id',
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '2' COMMENT '0已完成@1处理中@2未处理',
  `level` tinyint(2) NOT NULL COMMENT '级别0加急@1一般',
  `user_ask_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '提出问题人id',
  `user_ask_name` varchar(20) NOT NULL DEFAULT '' COMMENT '提出问题账号',
  `user_solve_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '解决人id',
  `user_solve_name` varchar(20) NOT NULL DEFAULT '' COMMENT '解决人账号',
  `add_time` int(10) NOT NULL DEFAULT '0',
  `update_time` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cate_id` (`cate_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4923672 DEFAULT CHARSET=utf8;
