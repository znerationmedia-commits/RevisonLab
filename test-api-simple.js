async function testAPI() {
  try {
    const res = await fetch('http://localhost:5000/api/quests');
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data count:', Array.isArray(data) ? data.length : 'Not an array');
    if (res.status === 200) {
      console.log('✅ API is working!');
    } else {
      console.log('❌ API failed with status:', res.status);
    }
  } catch (e) {
    console.error('❌ Connection failed:', e.message);
  }
}
testAPI();
