// Test registration endpoint using native fetch

const API_URL = 'https://mern-backend-main-zeta.vercel.app';

async function testRegistration() {
  console.log('🧪 Testing Registration Endpoint...\n');
  
  const testUser = {
    firstName: "Test",
    lastName: "User",
    email: `test${Date.now()}@example.com`, // Unique email
    password: "test123"
  };
  
  console.log('📝 Test Data:', JSON.stringify(testUser, null, 2));
  console.log('\n📡 Sending POST request to:', `${API_URL}/api/users/register`);
  
  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ SUCCESS!');
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('\n❌ ERROR!');
      console.log('Status:', response.status);
      console.log('Error:', JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.log('\n❌ NETWORK ERROR!');
    console.log('Error:', error.message);
  }
}

testRegistration();
