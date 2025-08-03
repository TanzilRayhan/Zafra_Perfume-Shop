const { Client } = require('pg');

async function testDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'zafra',
  });

  try {
    await client.connect();
    console.log('✅ Database connection successful!');
    
    // Check if customer table exists
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'customer'
    `);
    
    if (result.rows.length > 0) {
      console.log('✅ Customer table exists!');
      
      // Show table structure
      const columns = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'customer'
        ORDER BY ordinal_position
      `);
      
      console.log('\n📋 Customer table structure:');
      columns.rows.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : ''} ${col.column_default ? `[DEFAULT: ${col.column_default}]` : ''}`);
      });
    } else {
      console.log('❌ Customer table does not exist!');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testDatabase(); 