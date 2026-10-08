import http from 'http';

const CLIENT_URL = 'http://localhost:5174';
const SERVER_URL = 'http://localhost:8080';

let passCount = 0;
let failCount = 0;

function logPass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
  passCount++;
}

function logFail(msg, err) {
  console.error(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
  if (err) console.error(err);
  failCount++;
}

async function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const reqUrl = new URL(url);
    const reqOptions = {
      hostname: reqUrl.hostname,
      port: reqUrl.port,
      path: reqUrl.pathname + reqUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed, raw: data });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: null, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runAllTests() {
  console.log('====================================================');
  console.log('        MAYUR PORTFOLIO - FULL TEST SUITE           ');
  console.log('====================================================\n');

  // TEST 1: Backend Root Endpoint
  try {
    const res = await request(`${SERVER_URL}/`);
    if (res.status === 200 && res.body && res.body.ok === true) {
      logPass(`Backend Root GET / -> Status 200, service: ${res.body.service}`);
    } else {
      logFail(`Backend Root GET / failed: Expected 200 OK with ok: true`, res);
    }
  } catch (err) {
    logFail('Backend Root GET / error', err);
  }

  // TEST 2: Backend Health Endpoint
  try {
    const res = await request(`${SERVER_URL}/api/health`);
    if (res.status === 200 && res.body && res.body.ok === true) {
      logPass(`Backend Health GET /api/health -> Status 200 OK`);
    } else {
      logFail(`Backend Health GET /api/health failed`, res);
    }
  } catch (err) {
    logFail('Backend Health GET /api/health error', err);
  }

  // TEST 3: Backend Projects Endpoint Data Validation
  try {
    const res = await request(`${SERVER_URL}/api/projects`);
    if (res.status === 200 && Array.isArray(res.body) && res.body.length > 0) {
      logPass(`Backend Projects GET /api/projects -> Received ${res.body.length} projects`);
      
      // Validate schema of each project
      let validSchema = true;
      for (const item of res.body) {
        if (!item.title || !item.desc || !Array.isArray(item.tech) || !item.link) {
          validSchema = false;
          logFail(`Project schema invalid for ${item.title || 'unknown'}`, item);
        }
      }
      if (validSchema) {
        logPass(`Project items schema validation passed (titles: ${res.body.map(p => p.title).join(', ')})`);
      }
    } else {
      logFail(`Backend Projects GET /api/projects failed`, res);
    }
  } catch (err) {
    logFail('Backend Projects GET /api/projects error', err);
  }

  // TEST 4: Backend Contact API - Valid Payload
  try {
    const payload = { name: 'Test Runner', email: 'test@example.com', message: 'Automated test suite execution' };
    const res = await request(`${SERVER_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
    if (res.status === 200 && res.body && res.body.ok === true) {
      logPass(`Backend Contact POST /api/contact (Valid Payload) -> Status 200 OK`);
    } else {
      logFail(`Backend Contact POST /api/contact failed`, res);
    }
  } catch (err) {
    logFail('Backend Contact POST /api/contact error', err);
  }

  // TEST 5: Backend Contact API - Validation Error (Missing fields)
  try {
    const payload = { name: 'Test Runner', email: '' }; // missing email and message
    const res = await request(`${SERVER_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
    if (res.status === 400 && res.body && res.body.error === 'Missing fields') {
      logPass(`Backend Contact POST /api/contact (Missing Fields) -> Handled with 400 Bad Request`);
    } else {
      logFail(`Backend Contact validation test failed: Expected 400, got ${res.status}`, res);
    }
  } catch (err) {
    logFail('Backend Contact validation test error', err);
  }

  // TEST 6: Client Vite Proxy - Health Endpoint via Client Port
  try {
    const res = await request(`${CLIENT_URL}/api/health`);
    if (res.status === 200 && res.body && res.body.ok === true) {
      logPass(`Vite Dev Proxy -> ${CLIENT_URL}/api/health -> Proxied cleanly to backend`);
    } else {
      logFail(`Vite Dev Proxy to /api/health failed`, res);
    }
  } catch (err) {
    logFail('Vite Dev Proxy /api/health error', err);
  }

  // TEST 7: Client Vite Proxy - Projects Endpoint via Client Port
  try {
    const res = await request(`${CLIENT_URL}/api/projects`);
    if (res.status === 200 && Array.isArray(res.body) && res.body.length > 0) {
      logPass(`Vite Dev Proxy -> ${CLIENT_URL}/api/projects -> Proxied cleanly (${res.body.length} items)`);
    } else {
      logFail(`Vite Dev Proxy to /api/projects failed`, res);
    }
  } catch (err) {
    logFail('Vite Dev Proxy /api/projects error', err);
  }

  // TEST 8: Client Home Page HTML Server
  try {
    const res = await request(`${CLIENT_URL}/`);
    if (res.status === 200 && res.raw.includes('<div id="root">')) {
      logPass(`Client SPA HTML Server -> ${CLIENT_URL}/ -> Returned index.html with root container`);
    } else {
      logFail(`Client SPA HTML Server failed`, res);
    }
  } catch (err) {
    logFail('Client SPA HTML Server error', err);
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runAllTests();
