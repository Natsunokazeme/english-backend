# 使用Node.js作为基础镜像
   FROM node:14-alpine

   # 设置工作目录
   WORKDIR /app

   # 将Nest项目的所有文件复制到容器中
   COPY . .

   # 安装项目依赖
   RUN npm install

   # 暴露应用程序的端口
   EXPOSE 8080

   # 启动应用程序
   CMD ["npm", "run", "start:prod"]