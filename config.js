/*
* 项目配置文件
*/

module.exports = {
    
    host: '0.0.0.0',
    
    port_normal : '80',

    port_ssl : '443',
    
    staticFileDir : 'static',               //静态文件文件夹
                
    gzip : true,                            //是否开启 GZIP
    
    /*
     * 浏览器缓存时间
     * 0: 没有缓存
     */
    cacheControl : 7 * 24 * 3600            //浏览器缓存时间（秒）
    
};
