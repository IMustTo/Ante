require('shelljs/global');

const path = require('path');

const indexPath = path.resolve('F:/WORKSPACES/i3618new/i3618-core/i3618-core-web/src/main/webapp/WEB-INF/pages/star/index.jsp');
const staticPath = path.resolve('F:/WORKSPACES/i3618new/i3618-core/i3618-core-web/src/main/webapp/resources/mobile/static');

// copy static
rm('-rf', staticPath);
mkdir('-p', staticPath);
cp('-R', 'dist/static/*', staticPath);

// copy index
cat('dist/index.html').to(indexPath);

sed('-i', '<!DOCTYPE html>', '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n<!DOCTYPE html>', indexPath);
sed('-i', /<script>[\s\S]*<\/script>/, '', indexPath);
