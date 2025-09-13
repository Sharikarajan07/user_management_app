// Simple API test script
const http = require('http');

function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body,
          headers: res.headers
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing User Management API...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint...');
    const rootResponse = await testEndpoint('/');
    console.log(`   Status: ${rootResponse.statusCode}`);
    console.log(`   Response: ${rootResponse.body}\n`);

    // Test 2: Health check
    console.log('2. Testing health endpoint...');
    const healthResponse = await testEndpoint('/api/v1/health');
    console.log(`   Status: ${healthResponse.statusCode}`);
    console.log(`   Response: ${healthResponse.body}\n`);

    // Test 3: Get all users
    console.log('3. Testing get all users...');
    const usersResponse = await testEndpoint('/api/v1/users');
    console.log(`   Status: ${usersResponse.statusCode}`);
    console.log(`   Response: ${usersResponse.body}\n`);

    // Test 4: Get user stats
    console.log('4. Testing user stats...');
    const statsResponse = await testEndpoint('/api/v1/users/stats');
    console.log(`   Status: ${statsResponse.statusCode}`);
    console.log(`   Response: ${statsResponse.body}\n`);

    // Test 5: Create a user
    console.log('5. Testing create user...');
    const newUser = {
      username: 'testuser',
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '+1234567890',
      location: 'Test City'
    };
    const createResponse = await testEndpoint('/api/v1/users', 'POST', newUser);
    console.log(`   Status: ${createResponse.statusCode}`);
    console.log(`   Response: ${createResponse.body}\n`);

    console.log('✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();