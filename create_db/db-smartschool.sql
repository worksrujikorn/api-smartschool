/*
 Navicat Premium Data Transfer

 Source Server         : noodee_db
 Source Server Type    : MariaDB
 Source Server Version : 100515
 Source Host           : 103.245.164.92:3306
 Source Schema         : db-smartschool

 Target Server Type    : MariaDB
 Target Server Version : 100515
 File Encoding         : 65001

 Date: 07/07/2022 11:37:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for assess_recorder
-- ----------------------------
DROP TABLE IF EXISTS `assess_recorder`;
CREATE TABLE `assess_recorder`  (
  `assess_recorder_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `recorder_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assess_time` datetime(0) NULL DEFAULT NULL,
  `recorder` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`assess_recorder_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for assess_recorder_list
-- ----------------------------
DROP TABLE IF EXISTS `assess_recorder_list`;
CREATE TABLE `assess_recorder_list`  (
  `assess_recorder_list_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `recorder_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score_id` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`assess_recorder_list_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for behaviour_score
-- ----------------------------
DROP TABLE IF EXISTS `behaviour_score`;
CREATE TABLE `behaviour_score`  (
  `behaviour_score_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `score_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `behaviour` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score_amount` int(11) NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`behaviour_score_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for checkin_classroom
-- ----------------------------
DROP TABLE IF EXISTS `checkin_classroom`;
CREATE TABLE `checkin_classroom`  (
  `checkin_classroom_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `checkin_classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schedule_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_classroom_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 383 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for checkin_facescan
-- ----------------------------
DROP TABLE IF EXISTS `checkin_facescan`;
CREATE TABLE `checkin_facescan`  (
  `checkin_facescan_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `facescan_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `timein` datetime(0) NULL DEFAULT NULL,
  `timeout` datetime(0) NULL DEFAULT NULL,
  `scan_status` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time_line` datetime(0) NULL DEFAULT NULL,
  `who` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_year_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_facescan_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1127 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for checkin_facescan_teacher
-- ----------------------------
DROP TABLE IF EXISTS `checkin_facescan_teacher`;
CREATE TABLE `checkin_facescan_teacher`  (
  `checkin_facescan_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `facescan_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `timein` datetime(0) NULL DEFAULT NULL,
  `timeout` datetime(0) NULL DEFAULT NULL,
  `scan_status` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time_line` datetime(0) NULL DEFAULT NULL,
  `who` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_year_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_facescan_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 107 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for checkin_line
-- ----------------------------
DROP TABLE IF EXISTS `checkin_line`;
CREATE TABLE `checkin_line`  (
  `checkin_line_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chechkin_line_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_line_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for checkin_teach
-- ----------------------------
DROP TABLE IF EXISTS `checkin_teach`;
CREATE TABLE `checkin_teach`  (
  `checkin_teach_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chechkin_teach_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `shedule_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_teach_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for form_assess
-- ----------------------------
DROP TABLE IF EXISTS `form_assess`;
CREATE TABLE `form_assess`  (
  `form_assess_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `form_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `form_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `form_role` int(2) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`form_assess_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for form_assess_list
-- ----------------------------
DROP TABLE IF EXISTS `form_assess_list`;
CREATE TABLE `form_assess_list`  (
  `form_assess_list_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `form_assess_list_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `form_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assess_code` int(2) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`form_assess_list_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ms_attached_photos
-- ----------------------------
DROP TABLE IF EXISTS `ms_attached_photos`;
CREATE TABLE `ms_attached_photos`  (
  `ms_attached_photos_id` int(11) NOT NULL,
  `ms_attached_photos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_attached_photos_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_attached_photos
-- ----------------------------
INSERT INTO `ms_attached_photos` VALUES (0, 'ว่าง');
INSERT INTO `ms_attached_photos` VALUES (1, 'บ้านที่อาศัยอยู่กับพ่อแม่ (เป็นเจ้าของ/เช่า) ');
INSERT INTO `ms_attached_photos` VALUES (2, 'บ้านของญาติ/ผู้ปกครองที่ไม่ใช่ญาติ');
INSERT INTO `ms_attached_photos` VALUES (3, 'บ้านหรือที่พักประเภท วัด มูลนิธิ หอพัก โรงงาน อยู่กับนายจ้าง ');
INSERT INTO `ms_attached_photos` VALUES (4, 'ภาพนักเรียนและป้ายชื่อโรงเรียน เนื่องจากถ่ายภาพบ้านไม่ได้ เพราะบ้านอยู่ต่างอำเภอ\r\n/ ต่างจังหวัด/ต่างประเทศ หรือไม่ได้รับอนุญาตให้ถ่ายภาพ');

-- ----------------------------
-- Table structure for ms_com_internet
-- ----------------------------
DROP TABLE IF EXISTS `ms_com_internet`;
CREATE TABLE `ms_com_internet`  (
  `ms_com_internet_id` int(11) NOT NULL,
  `ms_com_internet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_com_internet_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_com_internet
-- ----------------------------
INSERT INTO `ms_com_internet` VALUES (0, 'ว่าง');
INSERT INTO `ms_com_internet` VALUES (1, 'สามารถเข้าถึง Internet ได้จากที่บ้าน');
INSERT INTO `ms_com_internet` VALUES (2, 'ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน ');

-- ----------------------------
-- Table structure for ms_dependency
-- ----------------------------
DROP TABLE IF EXISTS `ms_dependency`;
CREATE TABLE `ms_dependency`  (
  `ms_dependency_id` int(11) NOT NULL,
  `ms_dependency` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_dependency_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_dependency
-- ----------------------------
INSERT INTO `ms_dependency` VALUES (0, 'ว่าง');
INSERT INTO `ms_dependency` VALUES (1, 'มีคนพิการ');
INSERT INTO `ms_dependency` VALUES (2, 'มีผู้สูงอายุเกิน 60 ปี');
INSERT INTO `ms_dependency` VALUES (3, 'เป็นพ่อ/แม่เลี้ยงเดี่ยว');
INSERT INTO `ms_dependency` VALUES (4, 'มีคนอายุ 15-65 ปีว่างงาน(ที่ไม่ใช่นักเรียนนักศึกษา)');

-- ----------------------------
-- Table structure for ms_electronic_comm
-- ----------------------------
DROP TABLE IF EXISTS `ms_electronic_comm`;
CREATE TABLE `ms_electronic_comm`  (
  `ms_electronic_comm_id` int(11) NOT NULL,
  `ms_electronic_comm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_electronic_comm_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_electronic_comm
-- ----------------------------
INSERT INTO `ms_electronic_comm` VALUES (0, 'ว่าง');
INSERT INTO `ms_electronic_comm` VALUES (1, 'ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง) ');
INSERT INTO `ms_electronic_comm` VALUES (2, 'ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)');

-- ----------------------------
-- Table structure for ms_farm_land_type
-- ----------------------------
DROP TABLE IF EXISTS `ms_farm_land_type`;
CREATE TABLE `ms_farm_land_type`  (
  `ms_farm_land_type_id` int(11) NOT NULL,
  `ms_farm_land_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_farm_land_type_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_farm_land_type
-- ----------------------------
INSERT INTO `ms_farm_land_type` VALUES (0, 'ว่าง');
INSERT INTO `ms_farm_land_type` VALUES (1, 'ไม่เกิน 1 ไร่');
INSERT INTO `ms_farm_land_type` VALUES (2, 'ไม่มีที่ดินเป็นของตนเอง');
INSERT INTO `ms_farm_land_type` VALUES (3, 'เป็นเจ้าของจำนวน...ไร่');
INSERT INTO `ms_farm_land_type` VALUES (4, 'เช่าจำนวน...ไร่');

-- ----------------------------
-- Table structure for ms_fm_marital_status
-- ----------------------------
DROP TABLE IF EXISTS `ms_fm_marital_status`;
CREATE TABLE `ms_fm_marital_status`  (
  `ms_fm_marital_status_id` int(11) NOT NULL,
  `ms_fm_marital_status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_fm_marital_status_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_fm_marital_status
-- ----------------------------
INSERT INTO `ms_fm_marital_status` VALUES (0, 'blank');
INSERT INTO `ms_fm_marital_status` VALUES (1, 'อยู่ร่วมกัน');
INSERT INTO `ms_fm_marital_status` VALUES (2, 'แยกกันอยู่');
INSERT INTO `ms_fm_marital_status` VALUES (3, 'หย่าร้าง');
INSERT INTO `ms_fm_marital_status` VALUES (4, 'บิดาเสียชีวิต');
INSERT INTO `ms_fm_marital_status` VALUES (5, 'มารดาเสียชีวิต');
INSERT INTO `ms_fm_marital_status` VALUES (6, 'บิดามารดาเสียชีวิต');

-- ----------------------------
-- Table structure for ms_game_addiction
-- ----------------------------
DROP TABLE IF EXISTS `ms_game_addiction`;
CREATE TABLE `ms_game_addiction`  (
  `ms_game_addiction_id` int(11) NOT NULL,
  `ms_game_addiction` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_game_addiction_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_game_addiction
-- ----------------------------
INSERT INTO `ms_game_addiction` VALUES (0, 'ว่าง');
INSERT INTO `ms_game_addiction` VALUES (1, 'เล่นเกมเกินวันละ 1 ชั่วโมง');
INSERT INTO `ms_game_addiction` VALUES (2, 'ขาดจินตนาการและความคิดสร้างสรรค์');
INSERT INTO `ms_game_addiction` VALUES (3, 'เก็บตัว แยกตัวจากกลุ่มเพื่อน');
INSERT INTO `ms_game_addiction` VALUES (4, 'ใช้จ่ายเงินผิดปกติ ');
INSERT INTO `ms_game_addiction` VALUES (5, 'อยู่ในกลุ่มเพื่อนเล่นเกม');
INSERT INTO `ms_game_addiction` VALUES (6, 'ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน');
INSERT INTO `ms_game_addiction` VALUES (7, 'ใช้เวลาเล่นเกมเกิน 2 ชั่วโมง');
INSERT INTO `ms_game_addiction` VALUES (8, 'หมกมุ่น จริงจังในการเล่นเกม');
INSERT INTO `ms_game_addiction` VALUES (9, 'ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม');
INSERT INTO `ms_game_addiction` VALUES (10, ' อื่นๆ');

-- ----------------------------
-- Table structure for ms_health
-- ----------------------------
DROP TABLE IF EXISTS `ms_health`;
CREATE TABLE `ms_health`  (
  `ms_health_id` int(11) NOT NULL,
  `ms_health` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_health_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_health
-- ----------------------------
INSERT INTO `ms_health` VALUES (0, 'ว่าง');
INSERT INTO `ms_health` VALUES (1, 'ร่างกายไม่แข็งแรง');
INSERT INTO `ms_health` VALUES (2, 'มีโรคประจำตัวหรือเจ็บป่วยบ่อย');
INSERT INTO `ms_health` VALUES (3, 'มีภาวะทุพโภชนาการ');
INSERT INTO `ms_health` VALUES (4, 'ป่วยเป็นโรคร้ายแรง/เรื้อรัง ');
INSERT INTO `ms_health` VALUES (5, 'สมรรถภาพทางร่างกายต่ำ');

-- ----------------------------
-- Table structure for ms_hobbies
-- ----------------------------
DROP TABLE IF EXISTS `ms_hobbies`;
CREATE TABLE `ms_hobbies`  (
  `ms_hobbies_id` int(11) NOT NULL,
  `ms_hobbies` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_hobbies_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_hobbies
-- ----------------------------
INSERT INTO `ms_hobbies` VALUES (0, 'ว่าง');
INSERT INTO `ms_hobbies` VALUES (1, 'ดูทีวี / ฟังเพลง');
INSERT INTO `ms_hobbies` VALUES (2, 'อ่านหนังสือ');
INSERT INTO `ms_hobbies` VALUES (3, 'แว้น / สก๊อย');
INSERT INTO `ms_hobbies` VALUES (4, 'ไปสวนสาธารณะ ');
INSERT INTO `ms_hobbies` VALUES (5, 'ไปเที่ยวห้าง / ดูหนัง');
INSERT INTO `ms_hobbies` VALUES (6, 'ไปหาเพื่อน / เพื่อน');
INSERT INTO `ms_hobbies` VALUES (7, 'เล่นเกม คอม / มือถือ');
INSERT INTO `ms_hobbies` VALUES (8, 'เล่นดนตรี');
INSERT INTO `ms_hobbies` VALUES (9, 'อื่นๆ');

-- ----------------------------
-- Table structure for ms_housing_envir
-- ----------------------------
DROP TABLE IF EXISTS `ms_housing_envir`;
CREATE TABLE `ms_housing_envir`  (
  `ms_housing_envir_id` int(11) NOT NULL,
  `ms_housing_envir` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_housing_envir_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_housing_envir
-- ----------------------------
INSERT INTO `ms_housing_envir` VALUES (0, 'ว่าง');
INSERT INTO `ms_housing_envir` VALUES (1, 'สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้');
INSERT INTO `ms_housing_envir` VALUES (2, 'ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ');
INSERT INTO `ms_housing_envir` VALUES (3, 'อื่นๆ');

-- ----------------------------
-- Table structure for ms_housing_type
-- ----------------------------
DROP TABLE IF EXISTS `ms_housing_type`;
CREATE TABLE `ms_housing_type`  (
  `ms_housing_type_id` int(11) NOT NULL,
  `ms_housing_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_housing_type_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_housing_type
-- ----------------------------
INSERT INTO `ms_housing_type` VALUES (0, 'ว่าง');
INSERT INTO `ms_housing_type` VALUES (1, 'บ้านของตนเอง');
INSERT INTO `ms_housing_type` VALUES (2, 'บ้านเช่า');
INSERT INTO `ms_housing_type` VALUES (3, 'อาศัยอยู่กับผู้อื่น');

-- ----------------------------
-- Table structure for ms_informant
-- ----------------------------
DROP TABLE IF EXISTS `ms_informant`;
CREATE TABLE `ms_informant`  (
  `ms_informant_id` int(11) NOT NULL,
  `ms_informant` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_informant_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_informant
-- ----------------------------
INSERT INTO `ms_informant` VALUES (0, 'ว่าง');
INSERT INTO `ms_informant` VALUES (1, 'บิดา ');
INSERT INTO `ms_informant` VALUES (2, 'มารดา  ');
INSERT INTO `ms_informant` VALUES (3, 'พี่ชาย');
INSERT INTO `ms_informant` VALUES (4, 'พี่สาว');
INSERT INTO `ms_informant` VALUES (5, 'น้า');
INSERT INTO `ms_informant` VALUES (6, 'อา  ');
INSERT INTO `ms_informant` VALUES (7, 'ป้า  ');
INSERT INTO `ms_informant` VALUES (8, 'ลุง');
INSERT INTO `ms_informant` VALUES (9, 'ปู่');
INSERT INTO `ms_informant` VALUES (10, 'ย่า');
INSERT INTO `ms_informant` VALUES (11, 'ตา  ');
INSERT INTO `ms_informant` VALUES (12, 'ยาย');
INSERT INTO `ms_informant` VALUES (13, 'ทวด  ');
INSERT INTO `ms_informant` VALUES (14, 'พ่อเลี้ยง');
INSERT INTO `ms_informant` VALUES (15, 'แม่เลี้ยง');

-- ----------------------------
-- Table structure for ms_journey
-- ----------------------------
DROP TABLE IF EXISTS `ms_journey`;
CREATE TABLE `ms_journey`  (
  ` ms_journey_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  ` ms_journey` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (` ms_journey_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_journey
-- ----------------------------
INSERT INTO `ms_journey` VALUES ('0', 'ว่าง');
INSERT INTO `ms_journey` VALUES ('1', 'ผู้ปกครองมาส่ง');
INSERT INTO `ms_journey` VALUES ('2', 'รถยนต์');
INSERT INTO `ms_journey` VALUES ('3', 'รถโดยสารประจำทาง');
INSERT INTO `ms_journey` VALUES ('4', 'รถจักรยาน');
INSERT INTO `ms_journey` VALUES ('5', 'รถจักรยานยนต์');
INSERT INTO `ms_journey` VALUES ('6', 'เดิน');
INSERT INTO `ms_journey` VALUES ('7', 'รถโรงเรียน');
INSERT INTO `ms_journey` VALUES ('8', 'อื่นๆ');

-- ----------------------------
-- Table structure for ms_parents_leave_child_with_someone
-- ----------------------------
DROP TABLE IF EXISTS `ms_parents_leave_child_with_someone`;
CREATE TABLE `ms_parents_leave_child_with_someone`  (
  `ms_parents_leave_child_with_someone_id` int(11) NOT NULL,
  `ms_parents_leave_child_with_someone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_parents_leave_child_with_someone_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_parents_leave_child_with_someone
-- ----------------------------
INSERT INTO `ms_parents_leave_child_with_someone` VALUES (0, 'blank');
INSERT INTO `ms_parents_leave_child_with_someone` VALUES (1, 'ญาติ');
INSERT INTO `ms_parents_leave_child_with_someone` VALUES (2, 'เพื่อนบ้าน');
INSERT INTO `ms_parents_leave_child_with_someone` VALUES (3, 'อยู่ด้วยตนเอง');

-- ----------------------------
-- Table structure for ms_relatoinship_family
-- ----------------------------
DROP TABLE IF EXISTS `ms_relatoinship_family`;
CREATE TABLE `ms_relatoinship_family`  (
  `ms_relatoinship_family_id` int(11) NOT NULL,
  `ms_relatoinship_family` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_relatoinship_family_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_relatoinship_family
-- ----------------------------
INSERT INTO `ms_relatoinship_family` VALUES (0, 'ไม่มี');
INSERT INTO `ms_relatoinship_family` VALUES (1, 'สนิทสนม');
INSERT INTO `ms_relatoinship_family` VALUES (2, 'เฉยๆ');
INSERT INTO `ms_relatoinship_family` VALUES (3, 'ห่างเหิน');
INSERT INTO `ms_relatoinship_family` VALUES (4, 'ขัดแย้ง');

-- ----------------------------
-- Table structure for ms_sexual
-- ----------------------------
DROP TABLE IF EXISTS `ms_sexual`;
CREATE TABLE `ms_sexual`  (
  `ms_sexual_id` int(11) NOT NULL,
  `ms_sexual` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_sexual_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_sexual
-- ----------------------------
INSERT INTO `ms_sexual` VALUES (0, 'ว่าง');
INSERT INTO `ms_sexual` VALUES (1, 'อยู่ในกลุ่มขายบริการ ');
INSERT INTO `ms_sexual` VALUES (2, 'ขายบริการทางเพศ');
INSERT INTO `ms_sexual` VALUES (3, 'ใช้เครื่องมือสื่อสารที่เกี่ยวข้องกับด้านเพศเป็นเวลานานและบ่อยครั้ง');
INSERT INTO `ms_sexual` VALUES (4, 'หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ');
INSERT INTO `ms_sexual` VALUES (5, 'ตั้งครรภ์');
INSERT INTO `ms_sexual` VALUES (6, 'มีการมั่วสุมทางเพศ');

-- ----------------------------
-- Table structure for ms_substance_abuse
-- ----------------------------
DROP TABLE IF EXISTS `ms_substance_abuse`;
CREATE TABLE `ms_substance_abuse`  (
  `ms_substance_abuse_id` int(11) NOT NULL,
  `ms_substance_abuse` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_substance_abuse_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_substance_abuse
-- ----------------------------
INSERT INTO `ms_substance_abuse` VALUES (0, 'ว่าง');
INSERT INTO `ms_substance_abuse` VALUES (1, 'คบเพื่อนในกลุ่มที่ใช้สารเสพติด');
INSERT INTO `ms_substance_abuse` VALUES (2, 'สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด');
INSERT INTO `ms_substance_abuse` VALUES (3, 'อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด');
INSERT INTO `ms_substance_abuse` VALUES (4, 'ปัจจุบันเกี่ยวข้องกับสารเสพติด');
INSERT INTO `ms_substance_abuse` VALUES (5, 'เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ');

-- ----------------------------
-- Table structure for ms_vehicle
-- ----------------------------
DROP TABLE IF EXISTS `ms_vehicle`;
CREATE TABLE `ms_vehicle`  (
  `ms_vehicle_id` int(11) NOT NULL,
  `ms_vehicle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_vehicle_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_vehicle
-- ----------------------------
INSERT INTO `ms_vehicle` VALUES (0, 'รถมอเตอร์ไซด์');
INSERT INTO `ms_vehicle` VALUES (1, 'รถยนต์ส่วนบุคคล');
INSERT INTO `ms_vehicle` VALUES (2, 'รถบรรทุกเล็ก/รถตู้');
INSERT INTO `ms_vehicle` VALUES (3, 'รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆประเภทเดียวกัน');

-- ----------------------------
-- Table structure for ms_violent
-- ----------------------------
DROP TABLE IF EXISTS `ms_violent`;
CREATE TABLE `ms_violent`  (
  `ms_violent_id` int(11) NOT NULL,
  `ms_violent` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_violent_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_violent
-- ----------------------------
INSERT INTO `ms_violent` VALUES (0, 'ว่าง');
INSERT INTO `ms_violent` VALUES (1, 'มีการทะเลาะวิวาท ');
INSERT INTO `ms_violent` VALUES (2, 'ทำร้ายร่างกายผู้อื่น');
INSERT INTO `ms_violent` VALUES (3, 'ก้าวร้าว เกเร');
INSERT INTO `ms_violent` VALUES (4, 'ทำร้ายร่างกายตนเอง');
INSERT INTO `ms_violent` VALUES (5, 'ทะเลาะวิวาทเป็นประจำ');
INSERT INTO `ms_violent` VALUES (6, 'อื่นๆ');

-- ----------------------------
-- Table structure for ms_want_school_help
-- ----------------------------
DROP TABLE IF EXISTS `ms_want_school_help`;
CREATE TABLE `ms_want_school_help`  (
  `ms_want_school_help_id` int(11) NOT NULL,
  `ms_want_school_help` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_want_school_help_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_want_school_help
-- ----------------------------
INSERT INTO `ms_want_school_help` VALUES (0, 'blank');
INSERT INTO `ms_want_school_help` VALUES (1, 'เบี้ยสูงอายุ');
INSERT INTO `ms_want_school_help` VALUES (2, 'เบี้ยพิการ');
INSERT INTO `ms_want_school_help` VALUES (3, 'อื่นๆ');

-- ----------------------------
-- Table structure for ms_welfare_safety
-- ----------------------------
DROP TABLE IF EXISTS `ms_welfare_safety`;
CREATE TABLE `ms_welfare_safety`  (
  `ms_welfare_safety_id` int(11) NOT NULL,
  `ms_welfare_safety` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_welfare_safety_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_welfare_safety
-- ----------------------------
INSERT INTO `ms_welfare_safety` VALUES (1, 'พ่อแม่แยกทางกัน หรือ แต่งงานใหม');
INSERT INTO `ms_welfare_safety` VALUES (2, 'มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้ายแรง/เรื้อรัง/ติดต่อ');
INSERT INTO `ms_welfare_safety` VALUES (3, 'บุคคลในครอบครัวเล่นการพนัน');
INSERT INTO `ms_welfare_safety` VALUES (4, 'ไม่มีผู้ดูแล');
INSERT INTO `ms_welfare_safety` VALUES (5, 'ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน');
INSERT INTO `ms_welfare_safety` VALUES (6, 'พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์');
INSERT INTO `ms_welfare_safety` VALUES (7, 'เล่นการพนัน');
INSERT INTO `ms_welfare_safety` VALUES (8, 'บุคคลในครอบครัวติดสารเสพติด');
INSERT INTO `ms_welfare_safety` VALUES (9, 'มีความขัดแย้ง/ทะเลาะกันในครอบครัว');
INSERT INTO `ms_welfare_safety` VALUES (10, 'ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว');
INSERT INTO `ms_welfare_safety` VALUES (11, 'ถูกล่วงละเมิดทางเพศ');

-- ----------------------------
-- Table structure for ms_work_responsibility
-- ----------------------------
DROP TABLE IF EXISTS `ms_work_responsibility`;
CREATE TABLE `ms_work_responsibility`  (
  `ms_work_responsibility_id` int(11) NOT NULL,
  `ms_work_responsibility` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ms_work_responsibility_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ms_work_responsibility
-- ----------------------------
INSERT INTO `ms_work_responsibility` VALUES (0, 'ว่าง');
INSERT INTO `ms_work_responsibility` VALUES (1, 'ช่วยงานบ้าน');
INSERT INTO `ms_work_responsibility` VALUES (2, 'ช่วยค้าขายเล็กๆน้อยๆ');
INSERT INTO `ms_work_responsibility` VALUES (3, 'ช่วยงานในนาไร่ ');
INSERT INTO `ms_work_responsibility` VALUES (4, 'ช่วยคนดูแลคนเจ็บป่วย/พิการ ');
INSERT INTO `ms_work_responsibility` VALUES (5, 'ทำงานพิเศษแถวบ้าน');
INSERT INTO `ms_work_responsibility` VALUES (6, 'อื่นๆ ');

-- ----------------------------
-- Table structure for news_noti
-- ----------------------------
DROP TABLE IF EXISTS `news_noti`;
CREATE TABLE `news_noti`  (
  `newsnoti_id` int(11) NOT NULL AUTO_INCREMENT,
  `news_code` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `login_code` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `newsnoti_status` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`newsnoti_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4684 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for score_assess
-- ----------------------------
DROP TABLE IF EXISTS `score_assess`;
CREATE TABLE `score_assess`  (
  `score_assess_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `score_code` int(3) NULL DEFAULT NULL,
  `form_assess_list_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assess_choice` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score` int(2) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`score_assess_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment`  (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `comment_detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_group_assess
-- ----------------------------
DROP TABLE IF EXISTS `t_group_assess`;
CREATE TABLE `t_group_assess`  (
  `group_assess_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assess_group_code` int(2) NULL DEFAULT NULL,
  `assess_group_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`group_assess_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_home_visit
-- ----------------------------
DROP TABLE IF EXISTS `t_home_visit`;
CREATE TABLE `t_home_visit`  (
  `home_visit_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `school_year` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `school_term` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `visit_date` date NOT NULL,
  `student_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `teacher_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `student_no` int(11) NOT NULL,
  `classroom_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `father_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `father_occupation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `father_phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mother_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mother_occupation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mother_phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fm_marital_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `parent_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_occupaton` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `household_member` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hours_family_together` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_father_chk` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `relationship_mother_chk` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_brother_chk` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_sister_chk` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_grand` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_relative` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_other` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `relationship_other_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parents_leave_child_with_someone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `household_income` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `receive_expenses_from` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `money_to_school` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `work_to_earn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `work_to_earn_inc_perday` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `want_schools_help` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `want_schools_help_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `agency_help` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `agency_help_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Parents_concern` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dependency` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `housing_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `housing_envir` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `housing_envir_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fm_vehicle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `farm_land` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `farm_land_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `health` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `welfare_safety` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `distance_school_km` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `distance_school_hr` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `distance_school_min` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `journey` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `journey_other` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `work_responsibility` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `work_responsibility_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hobbies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hobbies_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `substance_abuse` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `violent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `violent_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sexual` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `game_addiction` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `game_addiction_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `com_internet` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `electronic_comm` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `informant` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `current_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `current_address_near` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `attached_photos` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo_house` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo_teacher_fm_student` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `geolocation_house` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_signature1` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `teacher_signature2` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `teacher_signature3` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Created_date` datetime(0) NULL DEFAULT NULL,
  `Cwho` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `iframe_google_map` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `google_map` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_relation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parents_leave_child_with_someone_other` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`home_visit_id`, `title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_leave
-- ----------------------------
DROP TABLE IF EXISTS `t_leave`;
CREATE TABLE `t_leave`  (
  `leave_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `leave_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `leave_type` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `leave_person` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `leave_status` int(2) NULL DEFAULT NULL,
  `detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `approve_person` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category_code` int(3) NULL DEFAULT NULL,
  `leave_from` datetime(0) NULL DEFAULT NULL,
  `leave_to` datetime(0) NULL DEFAULT NULL,
  `approve_date` datetime(0) NULL DEFAULT NULL,
  `role_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`leave_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_login
-- ----------------------------
DROP TABLE IF EXISTS `t_login`;
CREATE TABLE `t_login`  (
  `login_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_code` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `device` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`login_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 260 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_login
-- ----------------------------
INSERT INTO `t_login` VALUES (1, 'admin', 'admin', '$2a$04$4ESmDVEH6qQcK6E8Kjyw1O2wz8/qcoCiMEn5.tldbuiDjszo5eRVW', 1, '2022-04-08 08:10:03', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTcxNjE3MTMsImV4cCI6MTY1NzI0ODExM30.LUcJggowK1nw0Js5KoyPHB-FPMyXwNf3k202V-TXZ60', NULL);

-- ----------------------------
-- Table structure for t_master_assess
-- ----------------------------
DROP TABLE IF EXISTS `t_master_assess`;
CREATE TABLE `t_master_assess`  (
  `assess_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assess_code` int(2) NULL DEFAULT NULL,
  `assess_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assess_group_id` int(2) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`assess_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_behaviour
-- ----------------------------
DROP TABLE IF EXISTS `t_master_behaviour`;
CREATE TABLE `t_master_behaviour`  (
  `behaviour_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `behaviour_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `score` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_behaviour
-- ----------------------------
INSERT INTO `t_master_behaviour` VALUES ('B000001', 'กินอาหารในห้องเรียน', 8);
INSERT INTO `t_master_behaviour` VALUES ('B000002', 'การพูดจา', 5);
INSERT INTO `t_master_behaviour` VALUES ('B000003', 'การเอาใจใส่เรื่องการเรียน', 4);
INSERT INTO `t_master_behaviour` VALUES ('B000004', 'ไม่ตั้งใจเรียน', 10);

-- ----------------------------
-- Table structure for t_master_category
-- ----------------------------
DROP TABLE IF EXISTS `t_master_category`;
CREATE TABLE `t_master_category`  (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_code` int(3) NULL DEFAULT NULL,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category_group` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_category
-- ----------------------------
INSERT INTO `t_master_category` VALUES (1, 1, 'ลากิจ', 'Leave data', NULL, 'admin');
INSERT INTO `t_master_category` VALUES (2, 2, 'ลาป่วย', 'Leave data', NULL, 'admin');

-- ----------------------------
-- Table structure for t_master_classroom
-- ----------------------------
DROP TABLE IF EXISTS `t_master_classroom`;
CREATE TABLE `t_master_classroom`  (
  `classroom_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_level` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`classroom_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_facescan
-- ----------------------------
DROP TABLE IF EXISTS `t_master_facescan`;
CREATE TABLE `t_master_facescan`  (
  `facescan_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `facescan_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `picture` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`facescan_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_group
-- ----------------------------
DROP TABLE IF EXISTS `t_master_group`;
CREATE TABLE `t_master_group`  (
  `group_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_ip_facescan
-- ----------------------------
DROP TABLE IF EXISTS `t_master_ip_facescan`;
CREATE TABLE `t_master_ip_facescan`  (
  `ip_facescan_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `serial_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name_facescan` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name_school` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ip_facescan_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_ip_facescan
-- ----------------------------
INSERT INTO `t_master_ip_facescan` VALUES (1, '192.168.20.78', '84E0F42592D5527A', 'UFACE', '2022-03-14 11:07:27', 'admin', 'telecorp', 'student');
INSERT INTO `t_master_ip_facescan` VALUES (2, '192.168.20.8', '84E0F4245EA8527A', 'UFACE', '2022-03-21 09:56:27', 'admin', 'telecorp', 'teacher');

-- ----------------------------
-- Table structure for t_master_parent
-- ----------------------------
DROP TABLE IF EXISTS `t_master_parent`;
CREATE TABLE `t_master_parent`  (
  `parent_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_code` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_idcard` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Address` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `picture` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`parent_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 141 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_role
-- ----------------------------
DROP TABLE IF EXISTS `t_master_role`;
CREATE TABLE `t_master_role`  (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_role
-- ----------------------------
INSERT INTO `t_master_role` VALUES (1, '1', 'Admin', 'Admin', NULL, 'Admin');
INSERT INTO `t_master_role` VALUES (2, '2', 'Director', 'ผู้อำนวยการ', NULL, 'Admin');
INSERT INTO `t_master_role` VALUES (3, '3', 'Teacher', 'ครู', NULL, 'Admin');
INSERT INTO `t_master_role` VALUES (4, '4', 'Student', 'นักเรียน', NULL, 'Admin');
INSERT INTO `t_master_role` VALUES (5, '5', 'Parent', 'ผู้ปกครอง', NULL, 'Admin');

-- ----------------------------
-- Table structure for t_master_room
-- ----------------------------
DROP TABLE IF EXISTS `t_master_room`;
CREATE TABLE `t_master_room`  (
  `room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `room_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `room_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`room_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_school
-- ----------------------------
DROP TABLE IF EXISTS `t_master_school`;
CREATE TABLE `t_master_school`  (
  `school_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `school_name_th` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_name_en` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`school_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_school
-- ----------------------------
INSERT INTO `t_master_school` VALUES (1, 'เทเลคอร์ป', '2022-05-24 14:55:35', 'admin_frank', 'telecorp');

-- ----------------------------
-- Table structure for t_master_school_color
-- ----------------------------
DROP TABLE IF EXISTS `t_master_school_color`;
CREATE TABLE `t_master_school_color`  (
  `school_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `school_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sidebarcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sidebarfrontcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `iconcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hoversidebarfrontcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `logouticoncolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `notifyiconcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `notifyfrontcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `hovercolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dashbordfront` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dashbordcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schooliconcolor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schoolfrontcolor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schoolname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `schoolnameEN` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`school_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_school_color
-- ----------------------------
INSERT INTO `t_master_school_color` VALUES (1, 'S001', 'color_theme', '#004aad', '#ffffff', '#bababa', '#004aad', '#f94343', '#ff3333', '#eeb4b4', 'admin_frank', '2022-05-13 11:07:47', '#ffffff', '#000000', '#ffffff', 'https://api.noodee.net/api/smartschool/icon/20220620143658-logo-login.png', '#ffffff', 'โรงเรียนเทเลคอร์ป', 'Telecorp');
INSERT INTO `t_master_school_color` VALUES (2, 'S002', 'color_theme', '#ef9dc5', '#ffffff', '#a1a1a1', '#ef9dc5', '#f94343', '#ff3333', '#000000', 'admin_frank', '2022-05-13 11:07:47', '#ffffff', '#000000', '#ffffff', 'https://api.noodee.net/api/smartschool/icon/20220524163230-Untitled-4.png', '#ededed', 'โรงเรียนสวนผึ้ง', 'Suanphueng');

-- ----------------------------
-- Table structure for t_master_school_year
-- ----------------------------
DROP TABLE IF EXISTS `t_master_school_year`;
CREATE TABLE `t_master_school_year`  (
  `school_year_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `school_term` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_year` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `school_year_start` date NULL DEFAULT NULL,
  `school_year_end` date NULL DEFAULT NULL,
  PRIMARY KEY (`school_year_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_school_year
-- ----------------------------
INSERT INTO `t_master_school_year` VALUES (43, '1', '2564', '2022-04-28 03:38:08', '2021-04-28', '2021-10-31');
INSERT INTO `t_master_school_year` VALUES (44, '2', '2564', '2022-04-28 03:38:15', '2021-11-01', '2022-05-15');
INSERT INTO `t_master_school_year` VALUES (45, '1', '2565', '2022-05-09 06:20:53', '2022-05-16', '2022-09-29');
INSERT INTO `t_master_school_year` VALUES (46, '2', '2565', '2022-04-28 03:38:28', '2022-11-01', '2023-03-31');

-- ----------------------------
-- Table structure for t_master_student
-- ----------------------------
DROP TABLE IF EXISTS `t_master_student`;
CREATE TABLE `t_master_student`  (
  `student_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_idcard` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birthday` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Address` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `picture` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `parent_1` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_3` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname_en` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname_en` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `score` float(11, 0) NULL DEFAULT 100,
  `school_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_subject
-- ----------------------------
DROP TABLE IF EXISTS `t_master_subject`;
CREATE TABLE `t_master_subject`  (
  `subject_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `subject_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_id` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`subject_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_master_teacher
-- ----------------------------
DROP TABLE IF EXISTS `t_master_teacher`;
CREATE TABLE `t_master_teacher`  (
  `teacher_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_idcard` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Address` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `picture` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `subject_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `group_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 154 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_teacher
-- ----------------------------
INSERT INTO `t_master_teacher` VALUES (10, 'admin', '221112222212', NULL, 'พรชนก', 'โอษะคลัง', '0812232222', 'บางรัก กทม.', 'pornkanok@noodee.net', 'https://api.noodee.net/api/smartschool/teacher/20220410110014-t4.jpg', 'admin', '123456', '0', 3, NULL, '2022-04-19 09:57:42', 'Admin', '', '');

-- ----------------------------
-- Table structure for t_master_time_checkin
-- ----------------------------
DROP TABLE IF EXISTS `t_master_time_checkin`;
CREATE TABLE `t_master_time_checkin`  (
  `time_ckeck_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time_check` time(0) NULL DEFAULT NULL,
  `name_check` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` timestamp(0) NOT NULL DEFAULT current_timestamp,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  UNIQUE INDEX `id`(`time_ckeck_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_master_time_checkin
-- ----------------------------
INSERT INTO `t_master_time_checkin` VALUES (1, '08:00:00', 'checkin', '2022-03-15 15:29:58', 'Admin_FranK');
INSERT INTO `t_master_time_checkin` VALUES (2, '16:00:00', 'checkout', '2022-03-15 15:30:15', 'Admin_FranK');

-- ----------------------------
-- Table structure for t_news
-- ----------------------------
DROP TABLE IF EXISTS `t_news`;
CREATE TABLE `t_news`  (
  `news_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `news_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `news_subject` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `news_detail` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `news_picture` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `news_start` datetime(0) NULL DEFAULT NULL,
  `news_end` datetime(0) NULL DEFAULT NULL,
  `news_status` int(2) NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`news_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_news
-- ----------------------------
INSERT INTO `t_news` VALUES (41, 'N000005', 'วันปีใหม่', 'วันปีใหม่ประจำปี', 'https://api.noodee.net/api/smartschool/news/วันปีใหม่-information.jpg', '2021-12-29 17:00:00', '2022-10-29 17:00:00', 1, '2022-04-21 09:35:54', 'Admin_Frank');
INSERT INTO `t_news` VALUES (42, 'N000006', 'วันวาเลนไทน์', 'วันวาเลนไทน์ประจำปี', 'https://api.noodee.net/api/smartschool/news/วันวาเลนไทน์-information_6.jpg', '2021-12-29 17:00:00', '2022-10-29 17:00:00', 1, '2022-04-21 09:36:12', 'Admin_Frank');
INSERT INTO `t_news` VALUES (43, 'N000007', 'วันแม่', 'วันแม่ประจำปี', 'https://api.noodee.net/api/smartschool/news/วันแม่-information_4.png', '2021-12-29 17:00:00', '2022-10-29 17:00:00', 1, '2022-04-21 09:36:27', 'Admin_Frank');
INSERT INTO `t_news` VALUES (44, 'N000008', 'วันพ่อ', 'วันพ่อประจำปี', 'https://api.noodee.net/api/smartschool/news/วันพ่อ-information_5.png', '2021-12-29 17:00:00', '2022-10-29 17:00:00', 1, '2022-04-21 09:36:42', 'Admin_Frank');

-- ----------------------------
-- Table structure for t_notification
-- ----------------------------
DROP TABLE IF EXISTS `t_notification`;
CREATE TABLE `t_notification`  (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Category` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Message` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` timestamp(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`notification_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_schedule
-- ----------------------------
DROP TABLE IF EXISTS `t_schedule`;
CREATE TABLE `t_schedule`  (
  `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `schedule_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `subject_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `room_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hours` int(3) NULL DEFAULT NULL,
  `period` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `classroom_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `who` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`schedule_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 411 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for test_test
-- ----------------------------
DROP TABLE IF EXISTS `test_test`;
CREATE TABLE `test_test`  (
  `test_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `recorder_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `student_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assess_time` datetime(0) NULL DEFAULT NULL,
  `recorder` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`test_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_test
-- ----------------------------
INSERT INTO `test_test` VALUES (1, NULL, NULL, NULL, NULL, '{\"study\":\"1\",\"behavior\":\"0\",\"eco\":\"0\",\"other\":\"0\"}');

-- ----------------------------
-- Table structure for user_token
-- ----------------------------
DROP TABLE IF EXISTS `user_token`;
CREATE TABLE `user_token`  (
  `id_token` bigint(20) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_token`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_token
-- ----------------------------
INSERT INTO `user_token` VALUES (30, 'ExponentPushToken[J7ksObDIqbcYEbQhv_v2F6]', 'P0000030');
INSERT INTO `user_token` VALUES (40, 'ExponentPushToken[HVHeWTHQac-SlH_optGi5C]', 'P0000030');
INSERT INTO `user_token` VALUES (41, 'ExponentPushToken[OzCQSMKgg0Xv8aJfm2UvmV]', 'P0000030');
INSERT INTO `user_token` VALUES (43, 'ExponentPushToken[chNbEmH4HxFdF7AIR92Y4r]', 'P0000037');
INSERT INTO `user_token` VALUES (50, 'ExponentPushToken[f6r38wK360mkXGAWOibbAh]', 'P0000030');
INSERT INTO `user_token` VALUES (51, 'ExponentPushToken[J7ksObDIqbcYEbQhv_v2F6]', 'P0000030');
INSERT INTO `user_token` VALUES (52, 'ExponentPushToken[QcqyHiNDoFGE3Y_AKvJFbT]', 'P0000030');
INSERT INTO `user_token` VALUES (53, 'ExponentPushToken[zxQ0YRIjXDpoYltxPQFm1w]', 'P0000030');
INSERT INTO `user_token` VALUES (54, 'ExponentPushToken[qVwVA6LWZeVndupSu4iS9Q]', 'P0000030');
INSERT INTO `user_token` VALUES (55, 'ExponentPushToken[AngAfhJwABw0rWdOPr6MQ9]', 'P0000030');
INSERT INTO `user_token` VALUES (56, 'ExponentPushToken[aDmMnLIOAu94zsK16TYAkL]', 'P0000030');
INSERT INTO `user_token` VALUES (58, 'ExponentPushToken[chK-eyGRba1Q32GrIwsc0Q]', 'P0000040');

SET FOREIGN_KEY_CHECKS = 1;
