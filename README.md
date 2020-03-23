# cameraUse
技术栈：nodejs：v13.10.1，mongodb：v4.2.3
监控系统nodejs+express+mongodb后台部分，
后台所有接口设置了拦截器，判断是否读取到了cookie中的token字段，如果读取到了，则可以成功调用，否则，提示失败。
系统登录时会生成token和cookie，本人目前觉得其实二选一即可，可是因为之前没做过，因此两个都生成了，生成的token添加到cookie中，作为其中一个字段，用于判断是否登录成功。
