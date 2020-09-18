/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : bug

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-09-08 18:11:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for b_admin
-- ----------------------------
DROP TABLE IF EXISTS `b_admin`;
CREATE TABLE `b_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL DEFAULT '',
  `pwd` char(32) NOT NULL DEFAULT '',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `login_ip` varchar(20) NOT NULL,
  `add_time` int(10) NOT NULL DEFAULT '0',
  `update_time` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_admin
-- ----------------------------
INSERT INTO `b_admin` VALUES ('1', 'qw12', 'c69be130a3622ea46dedaca5ce952ed6', '0', '127.0.0.1', '1599537683', '1599537683');
INSERT INTO `b_admin` VALUES ('2', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537988', '1599537988');
INSERT INTO `b_admin` VALUES ('3', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537988', '1599537988');
INSERT INTO `b_admin` VALUES ('4', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537989', '1599537989');
INSERT INTO `b_admin` VALUES ('5', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537989', '1599537989');
INSERT INTO `b_admin` VALUES ('6', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537989', '1599537989');
INSERT INTO `b_admin` VALUES ('7', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537989', '1599537989');
INSERT INTO `b_admin` VALUES ('8', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537989', '1599537989');
INSERT INTO `b_admin` VALUES ('9', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599537992', '1599537992');
INSERT INTO `b_admin` VALUES ('10', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599538002', '1599538002');
INSERT INTO `b_admin` VALUES ('11', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599538002', '1599538002');
INSERT INTO `b_admin` VALUES ('12', '', '2023f05fdade4934f8a0925519ae2893', '0', '127.0.0.1', '1599538002', '1599538002');

-- ----------------------------
-- Table structure for b_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `b_admin_log`;
CREATE TABLE `b_admin_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) NOT NULL,
  `admin_name` varchar(25) NOT NULL DEFAULT '',
  `content` varchar(255) NOT NULL,
  `login_ip` varchar(20) NOT NULL,
  `add_time` int(10) NOT NULL DEFAULT '0',
  `update_time` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_admin_log
-- ----------------------------

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_bug_list
-- ----------------------------
INSERT INTO `b_bug_list` VALUES ('1', '0', '你是', '你是你是你是你是你是', '2', '0', '1', 'qw12', '0', '', '1599559333', '1599559333');
INSERT INTO `b_bug_list` VALUES ('2', '0', '你是', '你是你是你是你是你是', '2', '0', '1', 'qw12', '0', '', '1599559360', '1599559360');
INSERT INTO `b_bug_list` VALUES ('3', '100', '12312', '撒   手打', '2', '0', '1', 'qw12', '0', '', '1599559770', '1599559770');

-- ----------------------------
-- Table structure for b_cate
-- ----------------------------
DROP TABLE IF EXISTS `b_cate`;
CREATE TABLE `b_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `status` (`status`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of b_cate
-- ----------------------------
INSERT INTO `b_cate` VALUES ('100', '前台', '0');
INSERT INTO `b_cate` VALUES ('101', '后台', '0');
