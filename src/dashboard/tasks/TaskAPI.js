import { v4 as uuidv4 } from 'uuid';

const API_SERVER_URL = 'https://api.todoist.com/rest/v2/tasks/'
const TOKEN = process.env.REACT_APP_TASK_API_KEY;
const PROJECT_ID = '2329648933';

export async function fetchTasks() {
  const url = `${API_SERVER_URL}?project_id=${PROJECT_ID}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    }
    );
    const fetchedData = await response.json();
    const filtered = fetchedData.map(t => {
      return {
        ...t,
        labels: t.labels.join(', '),
        due_date: new Date(t.due?.date),
      }
    });

    return filtered;
  } catch (error) {
    console.warn(error)
  }
}

export async function updateTask( taskId, updated ) {
  const url = `${API_SERVER_URL}${taskId}`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'X-Request-Id': `${uuidv4()}`,
      },
      body: JSON.stringify(updated),
    }
    );
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.warn(error);
  }
}

// e.g. task : {"content": "Buy Milk", "due_date": "2024-03-29", "due_lang": "en", "priority": 4}
export async function createTask( task ) {
  try {
    const response = await fetch(API_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'X-Request-Id': `${uuidv4()}`,
      },
      body: JSON.stringify({
        ...task,
        project_id: PROJECT_ID,
      }),
    }
    );
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.warn(error);
  }
}

export async function deleteTask( taskId ) {
  const url = `${API_SERVER_URL}${taskId}`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'X-Request-Id': `${uuidv4()}`,
      },
    }
    );
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.warn(error)
  }
}