/*
 * 2016年 05月 08日 星期日 18:19:14 CST
 * author: tate_fan
 * */

var urlMap = module.exports = {
  detection: [
    "detect",
    "landmark"
  ],
  train: [
    "verify",
    "search",
    "identify"
  ],
  recognition: [
    "compare",
    "verify",
    "identify"
  ],
  grouping: ["grouping"],
  person: [
    "create",
    "delete",
    "add_face",
    "remove_face",
    "set_info",
    "get_info"
  ],
  faceset: [
    "create",
    "delete",
    "add_face",
    "remove_face",
    "set_info",
    "get_info"
  ],
  group: [
    "create",
    "delete",
    "add_person",
    "remove_person",
    "set_info",
    "get_info"
  ],
  info: [
    "get_image",
    "get_face",
    "get_person_list",
    "get_faceset_list",
    "get_group_list",
    "get_session",
    "get_app"
  ]
};

