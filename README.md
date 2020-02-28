# TASK_ROUTE_WORKFLOW
Fresher

* ClientSide_Angular: Angular
* MainSystemSide: Spring Security
* MainAPISide: Spring boot
* Database: MySQL

#RUN

- Trong MainAPISide tìm và duy chuyển đến thư mục target/
 + Thực hiện lệnh: java -jar WorkFlow-0.0.1-SNAPSHOT
 + Server sẽ chạy ở cổng 9999
 
- Trong MainSystemSide tìm và duy chuyển đến thư mục target/
 + Thực hiện lệnh: java -jar test-1.0
 + Server sẽ kết nối với MainAPISide ở cổng 9999 và thực hiện mở cổng mới 8888
 
- Trong ClientSide duy chuyển đến thư mục ClientSide_Angular/
 + Thực hiển lệnh: npm install
 + Thực hiện tiếp: ng serve
 
 => Có thể xem UTC trong thư mục document
