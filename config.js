module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    redis: {
        CONNECT: process.env.REDIS_CONNECT || 'rediss://red-cdlecgcgqg4a7d6cugbg:BPq5pqNk4kZaytdw3BY7WgXdagNd4wKo@oregon-redis.render.com:6379' 
    },
    api: {
        PORT: process.env.PORT || 5000
    },
    post: {
        PORT: process.env.POST_PORT || 3002
    },
    jwt: {
        SECRET: process.env.SECRET || 'secret'
    },
    mysql: {
        HOST: process.env.MYSQL_HOST || 'sql9.freemysqlhosting.net',
        DATABASE: process.env.MYSQL_DATABASE || 'sql9535911',
        USER: process.env.MYSQL_USER || 'sql9535911',
        PASSWORD: process.env.MYSQL_PASSWORD || 'S9Me4CJ8Hu',
    },
    MysqlServices: {
        HOST: process.env.MYSQL_HOST || 'localhost',
        PORT: process.env.MYSQL_PORT || 3001
    },
    cacheServices: {
        HOST: process.env.MYSQL_HOST || 'localhost',
        PORT: process.env.MYSQL_PORT || 3003
    }
}