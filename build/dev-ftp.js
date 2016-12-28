/* eslint-disable */
const path = require('path');
const fs = require("fs");
const Client = require('ftp');

// 读取目录下全部文件
const readFileList = (preFld, filesList, subFld = '') => {
  const folder = path.join(preFld, subFld);
  const files = fs.readdirSync(folder);

  files.forEach((itm, index) => {
    var stat = fs.statSync(path.join(folder, itm));

    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(preFld, filesList, `${subFld}/${itm}`);
    } else {
      var obj = {}; //定义一个对象存放文件的路径和名字
      obj.path = path.join(folder, itm); //路径
      obj.filename = `${subFld}/${itm}`; //名字
      filesList.push(obj);
    }
  });
};

const getFileList = (folder) => {
  var filesList = [];
  readFileList(folder, filesList);
  return filesList;
};

const c = new Client();

c.on('ready', () => {
  const staticPath = path.resolve('F:/WORKSPACES/i3618new/i3618-core/i3618-core-web/src/main/webapp/resources/mobile/static/');

  Promise.all(
    getFileList(staticPath).map(item => new Promise((resolve) => {
        c.put(
          item.path,
          `apache-tomcat-7.0.59/webapps/core-web/resources/mobile/static/${item.filename}`,
          (err) => {
            if (err) throw err;
            console.log(`copy ${item.filename} success!`);
            resolve(true);
          }
        );
      })
    )
  ).then(() => {
    c.put('F:/WORKSPACES/i3618new/i3618-core/i3618-core-web/src/main/webapp/WEB-INF/pages/star/index.jsp', 'apache-tomcat-7.0.59/webapps/core-web/WEB-INF/pages/star/index.jsp', (err) => {
      if (err) throw err;

      console.log('copy star-index success!');
      c.end();
    });
  });
});

c.connect({
  host: '121.42.209.241',
  // port: '22',
  user: 'i3618',
  password: 'fzAaDgMryAaSrcT1',
});
