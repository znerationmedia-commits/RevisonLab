const fetch = require('node-fetch');

async function testSyllabus() {
    const url = 'http://localhost:3000/api/generate/syllabus';
    const body = {
        subject: 'Science',
        grade: 'Form 2',
        syllabus: 'KSSM'
    };

    console.log(`Testing Syllabus API: ${JSON.stringify(body)}`);
    console.log(`URL: ${url}`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const data = await response.json();
        console.log('Success! Received Syllabus:');
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

testSyllabus();
