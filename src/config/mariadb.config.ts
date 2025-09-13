
// Para usar MariaDB, descomente este arquivo e comente o arquivo mariadb.config.ts  
// ============================================================
// Configuração do banco de dados MariaDB
// ============================================================
// 
// import { registerAs } from '@nestjs/config';
// import mysql2 from 'mysql2';

// export default registerAs('database', () => ({
//   dialect: 'mysql' as const,  
//   dialectModule: mysql2,
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT, 10) || 5432,
//   username: process.env.DB_USERNAME || 'user',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'nestjs_db',
//   dialectOptions: {
//     connectTimeout: 20000,
//     acquireTimeout: 20000,
//   },
//   autoLoadModels: true,
//   synchronize: true,
// }));
